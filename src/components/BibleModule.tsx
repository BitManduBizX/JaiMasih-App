import React, { useState } from 'react';
import { bibleChapters, dailyReadingPlan, faqList } from '../data/bibleData';
import { BibleChapter, FaqItem } from '../types';
import {
  BookOpen,
  Calendar,
  Share2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Columns,
  Download,
} from 'lucide-react';

export const BibleModule: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('john-3');
  const [activeVersion, setActiveVersion] = useState<'nnrv' | 'agape' | 'kjv' | 'bilingual'>('bilingual');
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);
  const [copiedFaqId, setCopiedFaqId] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-01');
  const [quoteCardTheme, setQuoteCardTheme] = useState<'rhododendron' | 'gold' | 'slate'>('rhododendron');
  const [checkedDays, setCheckedDays] = useState<Record<string, boolean>>({});

  const currentChapter: BibleChapter =
    bibleChapters.find((c) => c.id === selectedChapterId) || bibleChapters[0];

  const handleCopyVerse = (nepali: string, english: string, num: number) => {
    const text = `"${nepali}" (${currentChapter.bookNepali} ${currentChapter.chapterNumber}:${num} NNRV)\n"${english}" (${currentChapter.bookEnglish} ${currentChapter.chapterNumber}:${num} KJV)\nJaiMasih.org Digital Bible`;
    navigator.clipboard.writeText(text);
    setCopiedVerse(num);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const handleToggleDay = (day: string) => {
    setCheckedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleCopyFaq = (faq: FaqItem) => {
    const text = `प्रश्न: ${faq.questionNepali}\nउत्तर: ${faq.answerNepali}\n\nQ: ${faq.questionEnglish}\nA: ${faq.answerEnglish}\nस्रोत: ${faq.sources.join(', ')}\nJaiMasih.org Digital Archive`;
    navigator.clipboard.writeText(text);
    setCopiedFaqId(faq.id);
    setTimeout(() => setCopiedFaqId(null), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#801627] to-[#9B1B30] text-white rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] tracking-wider uppercase mb-2">
            <span>पवित्र बाइबल तथा धर्मशास्त्रीय अध्ययन (Scripture & Theology)</span>
            <span aria-hidden="true">·</span>
            <span>नेपाली तथा अङ्ग्रेजी समानान्तर पाठ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-3">
            "तपाईंको वचन मेरो खुट्टाको निम्ति बत्ती..."
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
            नयाँ नेपाली संशोधित संस्करण (NNRV), अगापे नेपाली बाइबल, र किङ जेम्स (KJV) को तुलनात्मक अध्ययन। साथै नेपाली दैनिक बाइबल पाठ योजना र अनुसन्धानमा आधारित जिज्ञाशाहरूको उत्तर।
          </p>

          {/* Quick Chapter Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {bibleChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedChapterId === ch.id
                    ? 'bg-[#D4AF37] text-[#2C3539] font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-white/90'
                }`}
              >
                {ch.bookNepali} {ch.chapterNumber} ({ch.bookEnglish} {ch.chapterNumber})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verse of the Day Card & Shareable Quote Generator */}
      <div className="bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9B1B30] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>आजको पद (Verse of the Day & Shareable Card)</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2C3539] mt-0.5">
              यूहन्ना ३:१६ (John 3:16)
            </h3>
          </div>

          {/* Card theme selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#2C3539]/60">कार्ड रङ्ग:</span>
            <button
              onClick={() => setQuoteCardTheme('rhododendron')}
              className={`w-6 h-6 rounded-full bg-[#9B1B30] transition-transform cursor-pointer ${
                quoteCardTheme === 'rhododendron' ? 'scale-110 ring-2 ring-[#D4AF37]' : ''
              }`}
              title="Crimson Rhododendron"
            />
            <button
              onClick={() => setQuoteCardTheme('gold')}
              className={`w-6 h-6 rounded-full bg-[#D4AF37] transition-transform cursor-pointer ${
                quoteCardTheme === 'gold' ? 'scale-110 ring-2 ring-[#9B1B30]' : ''
              }`}
              title="Sunrise Gold"
            />
            <button
              onClick={() => setQuoteCardTheme('slate')}
              className={`w-6 h-6 rounded-full bg-[#2C3539] transition-transform cursor-pointer ${
                quoteCardTheme === 'slate' ? 'scale-110 ring-2 ring-white' : ''
              }`}
              title="Slate Grey"
            />
          </div>
        </div>

        {/* Shareable Card Canvas Preview */}
        <div
          className={`rounded-2xl p-6 sm:p-10 shadow-lg text-white transition-all relative overflow-hidden ${
            quoteCardTheme === 'rhododendron'
              ? 'bg-gradient-to-br from-[#9B1B30] to-[#681120]'
              : quoteCardTheme === 'gold'
              ? 'bg-gradient-to-br from-[#c69a25] to-[#886915]'
              : 'bg-gradient-to-br from-[#2C3539] to-[#141a1d]'
          }`}
        >
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <div className="text-2xl font-serif font-bold opacity-30 select-none">“</div>
            <p className="text-lg sm:text-2xl font-serif leading-relaxed text-[#FDFBF7]">
              किनभने परमेश्वरले संसारलाई यस्तो प्रेम गर्नुभयो, कि उहाँले आफ्ना एकमात्र जन्माइएका पुत्र दिनुभयो, ताकि उहाँमाथि विश्वास गर्ने कोही पनि नाश नहोस्, तर त्यसले अनन्त जीवन पाओस्।
            </p>
            <p className="text-xs sm:text-sm font-sans opacity-85 italic">
              "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
            </p>
            <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono opacity-80">
              <span>यूहन्ना ३:१६ · John 3:16</span>
              <span>JaiMasih.org Archive</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3 text-xs">
          <button
            onClick={() => {
              const text = `“किनभने परमेश्वरले संसारलाई यस्तो प्रेम गर्नुभयो, कि उहाँले आफ्ना एकमात्र जन्माइएका पुत्र दिनुभयो, ताकि उहाँमाथि विश्वास गर्ने कोही पनि नाश नहोस्, तर त्यसले अनन्त जीवन पाओस्।” - यूहन्ना ३:१६ (John 3:16)\nJaiMasih.org`;
              navigator.clipboard.writeText(text);
              alert('पद कपी गरियो! तपाईं यसलाई सामाजिक सञ्जालमा सेयर गर्न सक्नुहुन्छ।');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] rounded-lg font-medium transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>पद कपी गर्नुहोस् (Copy Quote Text)</span>
          </button>
        </div>
      </div>

      {/* Interactive Scripture Reader Module */}
      <div className="bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F0EB]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#9B1B30] mb-1">
              <span>{currentChapter.bookNepali} {currentChapter.chapterNumber}</span>
              <span>·</span>
              <span>{currentChapter.bookEnglish} {currentChapter.chapterNumber}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2C3539]">
              {currentChapter.bookNepali} {currentChapter.chapterNumber} अध्याय
            </h3>
            <p className="text-xs text-[#2C3539]/60 mt-0.5">
              {currentChapter.summary}
            </p>
          </div>

          {/* Version Selector Tabs */}
          <div className="flex items-center bg-[#F5F0EB] rounded-xl p-1 border border-[#e4ded6]">
            <button
              onClick={() => setActiveVersion('bilingual')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeVersion === 'bilingual'
                  ? 'bg-white text-[#9B1B30] font-bold shadow-2xs'
                  : 'text-[#2C3539]/70 hover:text-black'
              }`}
            >
              समानान्तर (Bilingual Side-by-Side)
            </button>
            <button
              onClick={() => setActiveVersion('nnrv')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeVersion === 'nnrv'
                  ? 'bg-white text-[#9B1B30] font-bold shadow-2xs'
                  : 'text-[#2C3539]/70 hover:text-black'
              }`}
            >
              नेपाली (NNRV)
            </button>
            <button
              onClick={() => setActiveVersion('kjv')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeVersion === 'kjv'
                  ? 'bg-white text-[#9B1B30] font-bold shadow-2xs'
                  : 'text-[#2C3539]/70 hover:text-black'
              }`}
            >
              English (KJV)
            </button>
          </div>
        </div>

        {/* Verses Container */}
        <div className="space-y-4">
          {currentChapter.verses.map((verse) => (
            <div
              key={verse.verseNumber}
              className="p-4 rounded-xl border border-[#F5F0EB] hover:border-[#9B1B30]/30 hover:bg-[#FDFBF7] transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-[#9B1B30]/10 text-[#9B1B30] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {verse.verseNumber}
                </span>

                <button
                  onClick={() =>
                    handleCopyVerse(verse.nepaliText, verse.englishText, verse.verseNumber)
                  }
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-[#2C3539]/60 hover:text-black hover:bg-[#F5F0EB] transition-all cursor-pointer"
                  title="पद कपी गर्नुहोस् (Copy Verse)"
                >
                  {copiedVerse === verse.verseNumber ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {activeVersion === 'bilingual' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-base sm:text-lg font-serif text-[#2C3539] leading-relaxed">
                    {verse.nepaliText}
                  </div>
                  <div className="text-sm font-sans text-[#2C3539]/75 italic leading-relaxed md:border-l md:border-[#F5F0EB] md:pl-4">
                    {verse.englishText}
                  </div>
                </div>
              ) : activeVersion === 'nnrv' ? (
                <div className="text-base sm:text-lg font-serif text-[#2C3539] leading-relaxed">
                  {verse.nepaliText}
                </div>
              ) : (
                <div className="text-sm sm:text-base font-sans text-[#2C3539]/85 italic leading-relaxed">
                  {verse.englishText}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Nepali Bible Reading Plan (आजको बाइबल पाठ) */}
      <div className="bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#9B1B30] mb-1">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>दैनिक ख्रिष्टिय साधना (Daily Nepali Bible Reading Schedule)</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-[#2C3539] mb-4">
          हप्ताको बाइबल अध्ययन योजना
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {dailyReadingPlan.map((item, idx) => {
            const isDone = Boolean(checkedDays[item.day]);
            return (
              <div
                key={idx}
                onClick={() => handleToggleDay(item.day)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : 'bg-[#FDFBF7] border-[#ece5db] hover:bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-[#ded6cc] bg-white'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-[#2C3539]">{item.day}</div>
                  <div className="text-[#9B1B30] font-mono font-semibold">
                    {item.passage}
                  </div>
                  <div className="text-[#2C3539]/70">{item.theme}</div>
                  <div className="text-[11px] text-[#2C3539]/50 font-mono">
                    कण्ठ पद: {item.memoryVerse}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Common Questions & FAQ Module answering popular user queries */}
      <div className="bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#9B1B30] mb-1">
          <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
          <span>प्राज्ञिक जिज्ञासा तथा तथ्यहरू (Scholarly FAQs & Global Insights)</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C3539] mb-6">
          नेपाली इसाई सम्बन्धी आम प्रश्नहरूको प्रामाणिक उत्तर
        </h3>

        <div className="space-y-3">
          {faqList.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-[#F5F0EB] rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left bg-[#FDFBF7] hover:bg-[#f6efe6] transition-colors flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <div className="text-[11px] text-[#9B1B30] font-mono font-medium mb-1">
                      {faq.category}
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#2C3539]">
                      {faq.questionNepali}
                    </h4>
                    <p className="text-xs text-[#2C3539]/60 font-mono mt-0.5">
                      {faq.questionEnglish}
                    </p>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-[#9B1B30] shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-5 bg-white space-y-4 border-t border-[#F5F0EB] text-xs sm:text-sm text-[#2C3539]/85 leading-relaxed">
                    <div className="space-y-2">
                      <div className="font-semibold text-[#9B1B30] text-xs uppercase font-mono">
                        नेपाली विश्लेषण:
                      </div>
                      <p>{faq.answerNepali}</p>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-[#F5F0EB] text-xs text-[#2C3539]/70 italic">
                      <div className="font-mono text-[11px] not-italic text-[#2C3539]/50 uppercase font-bold">
                        English Scholarly Summary:
                      </div>
                      <p>{faq.answerEnglish}</p>
                    </div>

                    <div className="pt-3 border-t border-[#F5F0EB] flex flex-wrap items-center justify-between gap-3 text-xs text-[#2C3539]/60">
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <strong>स्रोतहरू (Sources):</strong>
                        <span>{faq.sources.join(' · ')}</span>
                      </div>

                      <button
                        onClick={() => handleCopyFaq(faq)}
                        className="flex items-center gap-1 text-[#9B1B30] hover:underline cursor-pointer"
                      >
                        {copiedFaqId === faq.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedFaqId === faq.id ? 'कपी भयो' : 'कपी गर्नुहोस् (Share)'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
