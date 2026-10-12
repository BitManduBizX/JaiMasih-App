// Secure Gemini AI Service with Multi-Tier Fallback

export function getEffectiveApiKey(): string {
  // Read safely from Vite client environment variable, process env, or localStorage
  const viteEnvKey =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)
      : undefined;

  const processEnvKey =
    typeof process !== 'undefined' && process.env
      ? process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
      : undefined;

  let localKey: string | null = null;
  try {
    localKey = localStorage.getItem('jaimasih_gemini_api_key');
  } catch (e) {
    // Ignore localStorage access issues
  }

  return (localKey || viteEnvKey || processEnvKey || '').trim();
}

export async function sendChatMessage(
  message: string,
  history: Array<{ sender: 'user' | 'bot'; text: string }> = [],
  context: string = ''
): Promise<{ reply: string; source: string }> {
  const effectiveKey = getEffectiveApiKey();

  // Tier 1: Try server proxy route /api/gemini/chat if available
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(effectiveKey ? { 'x-gemini-key': effectiveKey } : {}),
      },
      body: JSON.stringify({
        message,
        history,
        context,
        customApiKey: effectiveKey,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.reply) {
        return { reply: data.reply, source: data.source || 'server_proxy' };
      }
    }
  } catch (serverErr) {
    // Server proxy not available (e.g. static host like Netlify)
    console.warn('Server proxy unavailable, checking client-side Gemini fallback:', serverErr);
  }

  // Tier 2: If on a static host (Netlify, Vercel, GitHub Pages) and an API key is present
  if (effectiveKey) {
    try {
      const systemInstructionText = `You are Mukti AI (मुक्ति एआई), an authoritative, culturally respectful, and scholarly digital assistant for "JaiMasih - Nepali Christian Digital Archive & Directory" (जयमसीह / Kristiya Sewa Nepal).
Expertise: Nepali Christian History (1715 Capuchin mission, William Carey, Ganga Prasad Pradhan 1914 Bible translation, 1952 INF, 1954 UMN, Anandaban Hospital, 1990 & 2015 Constitution Article 26), why Nepali Christians worship on Saturday (शनिबार is the national holiday), 12,000+ local churches across 7 provinces, and traditional hymns. Answer respectfully in Nepali or English.`;

      const contents = [
        ...history.slice(-4).map((h) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        })),
        {
          role: 'user',
          parts: [
            {
              text: context
                ? `[Context: ${context}]\n\n${message}`
                : message,
            },
          ],
        },
      ];

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
        effectiveKey
      )}`;

      const directRes = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstructionText }] },
          contents,
          generationConfig: { temperature: 0.7 },
        }),
      });

      if (directRes.ok) {
        const directData = await directRes.json();
        const generatedText =
          directData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
          return { reply: generatedText, source: 'gemini_direct' };
        }
      }
    } catch (directErr) {
      console.warn('Direct Gemini API call failed, falling back to local archive:', directErr);
    }
  }

  // Tier 3: Zero-downtime offline local archive knowledge fallback
  return {
    reply: getOfflineKnowledgeReply(message),
    source: 'local_archive_offline',
  };
}

function getOfflineKnowledgeReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('saturday') || q.includes('शनिबार') || q.includes('शनिवार') || q.includes('worship day')) {
    return `**नेपालमा ख्रिष्टियनहरू किन शनिबार संगति गर्छन्? (Why Nepali Christians Worship on Saturday)**\n\nनेपालमा आधिकारिक सरकारी साप्ताहिक बिदा आइतबार नभई **शनिबार** हो। जब सन् १९५० को दशकमा नेपालमा मण्डलीहरू (जस्तै रामघाट मण्डली पोखरा र पुतलीसडक चर्च काठमाडौं) स्थापना हुन थाले, विश्वासीहरूले सरकारी बिदाको दिन पारेर परमेश्वरको आराधना गर्ने निर्णय गरे ताकि सबै सरकारी कर्मचारी, शिक्षक, किसान र विद्यार्थीहरू एकसाथ सहभागी हुन सकून्।\n\nसामान्यतया नेपालका मण्डलीहरूमा शनिबार बिहान १०:०० बजेदेखि दिउँसो १:०० बजेसम्म मुख्य आराधना संगति हुने गर्दछ।`;
  }

  if (q.includes('ganga prasad') || q.includes('गङ्गा') || q.includes('गंगा') || q.includes('translator') || q.includes('bible translation')) {
    return `**पास्टर गङ्गा प्रसाद प्रधान (Ganga Prasad Pradhan, 1851–1932):**\n\nउहाँ पहिलो पटक सम्पूर्ण पवित्र बाइबल नेपाली भाषामा अनुवाद गर्ने व्यक्तित्व हुनुहुन्छ (सन् १९१४ मा ब्रिटिश एन्ड फरेन बाइबल सोसाइटीद्वारा प्रकाशित)। उहाँ दार्जिलिङमा जन्मेका नेपाली ख्रिष्टियन अगुवा, लेखक, र सम्पादक हुनुहुन्थ्यो जसले 'गोर्खे खबर कागत्' नामक पत्रिका पनि चलाउनुभएको थियो। नेपाली भाषा, साहित्य र आधुनिक शिक्षाको विकासमा उहाँको योगदान अतुलनीय छ।`;
  }

  if (q.includes('population') || q.includes('how many') || q.includes('संख्या') || q.includes('कति')) {
    return `**नेपाली ख्रिष्टियन जनसंख्या र तथ्याङ्क (Nepali Christian Demographics):**\n\n- राष्ट्रिय जनगणना २०२१ (२०७८) अनुसार नेपालमा ख्रिष्टियन जनसंख्या लगभग ५,१२,३१३ (१.७६%) देखाइएको छ।\n- तर मण्डली महासङ्घ (FNCN) र विभिन्न इसाई अनुसन्धान संस्थानहरूको अनुमान अनुसार नेपालमा हाल **१४ लाख देखि २५ लाख** भन्दा बढी ख्रिष्टियनहरू र **१२,००० देखि १५,०००** भन्दा बढी स्थानीय मण्डलीहरू (Local Churches) क्रियाशील छन्।`;
  }

  if (q.includes('capuchin') || q.includes('1715') || q.includes('history') || q.includes('इतिहास') || q.includes('first')) {
    return `**नेपाली इसाई इतिहासको संक्षिप्त रूपरेखा (Nepali Church History Timeline):**\n\n1. **क्यापुचिन पादरीहरू (१७१५-१७६९):** काठमाडौं उपत्यकामा मल्ल राजाहरू (जस्तै रणजीत मल्ल) को पालामा क्यापुचिन मिसन स्थापना।\n2. **दार्जिलिङ-कालेम्पोङ काल (१८१४-१९५१):** सीमाना बन्द रहँदा सीमावर्ती क्षेत्रबाट बाइबल अनुवाद र नेपाली ख्रिष्टियन साहित्यको जग बस्यो।\n3. **खुला सिमाना र सेवा (१९५१-१९९०):** प्रजातन्त्र स्थापनापछि INF, UMN, आनन्दवन कुष्ठरोग अस्पतालमार्फत स्वास्थ्य र शिक्षा सेवाको सुरुवात।\n4. **आधुनिक काल (१९९०-हाल):** संविधान २०७२ द्वारा धर्मनिरपेक्षता र धार्मिक स्वतन्त्रताको संवैधानिक मान्यता।`;
  }

  if (q.includes('church') || q.includes('मण्डली') || q.includes('pokhara') || q.includes('kathmandu') || q.includes('dharan')) {
    return `**मण्डली खोजी गाइड (Church Directory Guide):**\n\nहाम्रो मण्डली गाइड ट्याबमा काठमाडौं उपत्यका, पोखरा, धरान, बुटवल, नारायणगढ र नेपालगन्ज लगायत सातै प्रदेशका प्रमुख मण्डलीहरूको सूची, पास्टरहरूको सम्पर्क, र संगतिको समय उपलब्ध छ। डाइरेक्टरी खण्डमा फिल्टर प्रयोग गरी नजिकैको मण्डली फेला पार्न सक्नुहुन्छ!`;
  }

  return `जयमसीह! म **मुक्ति एआई (Mukti AI)** हुँ। म तपाईंलाई नेपाली ख्रिष्टिय इतिहास, मण्डलीहरूको ठेगाना, भजन तथा कोरसहरू, पवित्र बाइबलका पदहरू, र धर्मशास्त्रीय प्रश्नहरूको उत्तर दिन सक्छु।\n\nतपाईं कुनै विशेष विषय सोध्न सक्नुहुन्छ: जस्तै "नेपाली बाइबल अनुवादको इतिहास", "शनिबार किन संगति हुन्छ?", वा "काठमाडौंमा चर्चहरू कहाँ छन्?"।`;
}
