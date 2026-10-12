import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    appName: 'JaiMasih.org',
    timestamp: new Date().toISOString(),
    hasServerApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Mukti AI Gemini Chat Route
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history, context, customApiKey } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const effectiveApiKey =
      customApiKey ||
      (req.headers['x-gemini-key'] as string) ||
      process.env.GEMINI_API_KEY;

    if (!effectiveApiKey) {
      // Provide intelligent grounded response even without API key
      const fallbackReply = generateKnowledgeFallback(message);
      res.json({
        reply: fallbackReply,
        source: 'local_archive_fallback',
        needsApiKey: true,
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey: effectiveApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are Mukti AI (मुक्ति एआई), an authoritative, culturally respectful, and scholarly digital assistant for "JaiMasih - Nepali Christian Digital Archive & Directory" (जयमसीह / Kristiya Sewa Nepal).
Your areas of expertise:
1. Nepali Christian History:
   - 1715: Capuchin Catholic Mission in Kathmandu under Father Desideri and King Ranajit Malla.
   - 1814-1951: The diaspora era in Darjeeling & Kalimpong. William Carey, Ganga Prasad Pradhan (first translator of the entire Nepali Bible in 1914, printer, editor of Gorkhe Khabar Kagat).
   - 1951-1990: Opening of borders after Rana regime fall. Establishment of INF (International Nepal Fellowship - 1952), UMN (United Mission to Nepal - 1954), Anandaban Leprosy Hospital (1957). Growth of indigenous house fellowships (Kathmandu, Pokhara, Tansen).
   - 1990-Present: 1990 Constitution allowing religious freedom; 2008 secular state declaration; 2015 Constitution Article 26 with anti-conversion clauses. Explosive church growth (est. 12,000+ churches, 1.4M to 3M believers).
2. Church Practice & Culture:
   - Why do Nepali Christians worship on Saturday (शनिबार)? Because Saturday is Nepal's official government public holiday and day of rest. Worship typically takes place Saturday morning from 10:00 AM to 1:00 PM.
   - Traditional greeting: "जयमसीह" (Jai Masih / Victory to Christ) with folded hands (Namaste posture).
   - Shoes removed at church entrance (सम्मान र सफाइ).
3. Hymns and Bhajans:
   - Deep knowledge of traditional Nepali Christian Bhajans, Khristiya Bhajan Book, choruses, Easter, Christmas, and contemporary worship music.
4. Bible & Scripture:
   - Familiarity with NNRV (New Nepali Revised Version) and Agape Nepali Bible.

Guidelines:
- Speak warmly with humility, grace, and scholarly accuracy.
- Answer in the language the user speaks: Nepali (नेपाली), Romanized Nepali, or English.
- Cite specific historical figures, years, and biblical references where applicable.
- If recommending churches, mention actual districts and cities in Nepal.`;

    // Construct conversation contents
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'bot') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    const userPromptWithContext = context
      ? `[Archive Context: ${context}]\n\nUser Question: ${message}`
      : message;

    contents.push({ role: 'user', parts: [{ text: userPromptWithContext }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'जयमसीह! म तपाईंलाई कसरी सहायता गर्न सक्छु?';
    res.json({ reply, source: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Graceful fallback on API error
    const message = req.body?.message || '';
    const fallbackReply = generateKnowledgeFallback(message);
    res.json({
      reply: fallbackReply,
      source: 'local_archive_fallback',
      error: error.message || 'API error occurred',
    });
  }
});

// Built-in intelligent archive responder for zero-downtime offline experience
function generateKnowledgeFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('saturday') || q.includes('शनिबार') || q.includes('शनिवार') || q.includes('worship day')) {
    return `**नेपालमा ख्रिष्टियनहरू किन शनिबार संगति गर्छन्? (Why Nepali Christians Worship on Saturday)**\n\nनेपालमा आधिकारिक सरकारी साप्ताहिक बिदा आइतबार नभई **शनिबार** हो। जब सन् १९५० को दशकमा नेपालमा मण्डलीहरू स्थापना हुन थाले, विश्वासीहरूले सरकारी बिदाको दिन पारेर परमेश्वरको आराधना गर्ने निर्णय गरे ताकि सबै सरकारी कर्मचारी, शिक्षक, किसान र विद्यार्थीहरू एकसाथ सहभागी हुन सकून्।\n\nसामान्यतया नेपालका मण्डलीहरूमा शनिबार बिहान १०:०० बजेदेखि दिउँसो १:०० बजेसम्म मुख्य आराधना संगति हुने गर्दछ।`;
  }

  if (q.includes('ganga prasad') || q.includes('गङ्गा') || q.includes('गंगा') || q.includes('translator') || q.includes('bible translation')) {
    return `**पास्टर गङ्गा प्रसाद प्रधान (Ganga Prasad Pradhan, 1851–1932):**\n\nउहाँ पहिलो पटक सम्पूर्ण पवित्र बाइबल नेपाली भाषामा अनुवाद गर्ने व्यक्तित्व हुनुहुन्छ (सन् १९१४ मा पूरा)। उहाँ दार्जिलिङमा जन्मेका नेपाली ख्रिष्टियन अगुवा, लेखक, र सम्पादक हुनुहुन्थ्यो जसले 'गोर्खे खबर कागत्' नामक पत्रिका पनि चलाउनुभएको थियो। नेपाली भाषा, साहित्य र आधुनिक शिक्षाको विकासमा उहाँको योगदान अतुलनीय छ।`;
  }

  if (q.includes('population') || q.includes('how many') || q.includes('संख्या') || q.includes('कति')) {
    return `**नेपाली ख्रिष्टियन जनसंख्या र तथ्याङ्क (Nepali Christian Demographics):**\n\n- राष्ट्रिय जनगणना २०२१ (२०७८) अनुसार नेपालमा ख्रिष्टियन जनसंख्या लगभग ५,१२,३१३ (१.७६%) देखाइएको छ।\n- तर मण्डली महासङ्घ (FNCN) र विभिन्न इसाई अनुसन्धान संस्थानहरूको अनुमान अनुसार नेपालमा हाल **१४ लाख देखि २५ लाख** भन्दा बढी ख्रिष्टियनहरू र **१२,००० देखि १५,०००** भन्दा बढी स्थानीय मण्डलीहरू (Local Churches) क्रियाशील छन्।\n- नेपाल विश्वकै सबैभन्दा तीव्र गतिमा मण्डली वृद्धि हुने देशहरू मध्ये एक मानिन्छ।`;
  }

  if (q.includes('capuchin') || q.includes('1715') || q.includes('history') || q.includes('इतिहास') || q.includes('first')) {
    return `**नेपाली इसाई इतिहासको संक्षिप्त रूपरेखा (Nepali Church History Timeline):**\n\n1. **क्यापुचिन पादरीहरू (१७१५-१७६९):** काठमाडौं उपत्यकामा मल्ल राजाहरू (जस्तै रणजीत मल्ल) को पालामा फादर देसिदेरी लगायत क्यापुचिन मिसन स्थापना।\n2. **दार्जिलिङ-कालेम्पोङ काल (१८१४-१९५१):** सीमाना बन्द रहँदा सीमावर्ती क्षेत्रबाट बाइबल अनुवाद र नेपाली ख्रिष्टियन साहित्यको जग बस्यो।\n3. **खुला सिमाना र सेवा (१९५१-१९९०):** प्रजातन्त्र स्थापनापछि INF, UMN, आनन्दवन कुष्ठरोग अस्पतालमार्फत स्वास्थ्य र शिक्षा सेवाको सुरुवात।\n4. **आधुनिक काल (१९९०-हाल):** संविधान २०७२ द्वारा धर्मनिरपेक्षता र धार्मिक स्वतन्त्रताको संवैधानिक मान्यता।`;
  }

  if (q.includes('church') || q.includes('मण्डली') || q.includes('pokhara') || q.includes('kathmandu') || q.includes('dharan')) {
    return `**मण्डली खोजी गाइड (Church Directory Guide):**\n\nहाम्रो डाइरेक्टरी ट्याबमा काठमाडौं उपत्यका, पोखरा, धरान, बुटवल, नारायणगढ र नेपालगन्ज लगायत सातै प्रदेशका प्रमुख मण्डलीहरूको सूची, पास्टरहरूको सम्पर्क, र संगतिको समय उपलब्ध छ। डाइरेक्टरी खण्डमा फिल्टर प्रयोग गरी नजिकैको मण्डली फेला पार्न सक्नुहुन्छ!`;
  }

  return `जयमसीह! म **मुक्ति एआई (Mukti AI)** हुँ। म तपाईंलाई नेपाली ख्रिष्टियन इतिहास, मण्डलीहरूको ठेगाना, भजन तथा कोरसहरू, पवित्र बाइबलका पदहरू, र धर्मशास्त्रीय प्रश्नहरूको उत्तर दिन सक्छु।\n\nतपाईं कुनै विशेष विषय सोध्न सक्नुहुन्छ: जस्तै "नेपाली बाइबल अनुवादको इतिहास", "शनिबार किन संगति हुन्छ?", वा "काठमाडौंमा चर्चहरू कहाँ छन्?"।`;
}

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JaiMasih Platform server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
