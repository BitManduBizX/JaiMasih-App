import React, { useState } from 'react';
import { historyEras, thematicArticles } from '../data/historyData';
import { HistoryEra } from '../types';
import {
  Calendar,
  User,
  BookOpen,
  ChevronRight,
  BookmarkCheck,
  FileText,
  Copy,
  Check,
  Award,
  Sparkles,
} from 'lucide-react';

export const TimelineModule: React.FC = () => {
  const [selectedEraId, setSelectedEraId] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  const filteredEras =
    selectedEraId === 'all'
      ? historyEras
      : historyEras.filter((era) => era.id === selectedEraId);

  const selectedArticle = thematicArticles.find((a) => a.id === selectedArticleId);

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#F5F0EB] to-[#FDFBF7] border border-[#e8e2d8] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#9B1B30]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9B1B30] tracking-wider uppercase mb-2">
            <span>ऐतिहासिक अनुसन्धान अभिलेख (Historical Archive)</span>
            <span aria-hidden="true">·</span>
            <span>१७औं शताब्दी देखि २०२६ सम्म</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3539] tracking-tight mb-4">
            नेपाली ख्रिष्टिय इतिहास: त्याग, सेवा र पुनरुत्थान
          </h2>
          <p className="text-sm sm:text-base text-[#2C3539]/80 leading-relaxed mb-6">
            मल्लकालीन काठमाडौं उपत्यकामा क्यापुचिन पादरीहरूको प्रारम्भिक आगमनदेखि दार्जिलिङ-कालेम्पोङमा पास्टर गङ्गा प्रसाद प्रधानद्वारा पहिलो नेपाली बाइबल अनुवाद, र सन् १९५२ यता आधुनिक नेपालमा मण्डलीको अभूतपूर्व वृद्धि सम्मको प्रामाणिक इतिहास।
          </p>

          {/* Interactive Era Filter Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-white/80 rounded-xl border border-[#e4ded6] overflow-x-auto">
            <button
              onClick={() => setSelectedEraId('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedEraId === 'all'
                  ? 'bg-[#9B1B30] text-white shadow-xs'
                  : 'text-[#2C3539]/70 hover:text-[#9B1B30] hover:bg-[#F5F0EB]'
              }`}
            >
              सम्पूर्ण कालखण्ड (All 4 Eras)
            </button>
            {historyEras.map((era) => (
              <button
                key={era.id}
                onClick={() => setSelectedEraId(era.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  selectedEraId === era.id
                    ? 'bg-[#9B1B30] text-white shadow-xs'
                    : 'text-[#2C3539]/70 hover:text-[#9B1B30] hover:bg-[#F5F0EB]'
                }`}
              >
                युग {era.eraNumber}: {era.timeframe}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Thematic Deep-Dive Articles Banner */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#2C3539]">
              विशेष अनुसन्धान लेखहरू (Thematic Scholarly Insights)
            </h3>
            <p className="text-xs text-[#2C3539]/60">
              नेपाली मण्डली संस्कृति, संविधान र सेवा सम्बन्धी गम्भीर विश्लेषणहरू
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {thematicArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="bg-white border border-[#F5F0EB] hover:border-[#9B1B30]/30 rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#2C3539]/50 mb-2">
                  <span>{article.readTime}</span>
                  <span className="text-[#9B1B30] font-medium group-hover:translate-x-0.5 transition-transform">
                    पूरा पढ्नुहोस् →
                  </span>
                </div>
                <h4 className="font-serif font-bold text-[#2C3539] group-hover:text-[#9B1B30] transition-colors mb-2 text-base">
                  {article.titleNepali}
                </h4>
                <p className="text-xs text-[#2C3539]/70 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F5F0EB] text-[11px] text-[#2C3539]/50 font-mono">
                {article.titleEnglish}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Timeline Era Cards */}
      <div className="space-y-10">
        {filteredEras.map((era) => (
          <div
            key={era.id}
            className="bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs relative"
          >
            {/* Era Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F0EB] pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#9B1B30] font-mono mb-1">
                  <span className="font-bold">कालखण्ड ०{era.eraNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {era.timeframe}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C3539]">
                  {era.titleNepali}
                </h3>
                <p className="text-xs text-[#2C3539]/60 font-mono mt-0.5">
                  {era.titleEnglish}
                </p>
              </div>

              <div className="bg-[#F5F0EB] px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#2C3539]/80 self-start sm:self-center">
                ऐतिहासिक चरण ०{era.eraNumber}
              </div>
            </div>

            {/* Era Summary */}
            <p className="text-sm text-[#2C3539]/80 leading-relaxed mb-6 font-medium">
              {era.summary}
            </p>

            {/* Two column grid: Key Milestones & Prominent Figures */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              {/* Key Milestones */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#9B1B30] flex items-center gap-2">
                  <BookmarkCheck className="w-4 h-4" />
                  मुख्य ऐतिहासिक घटनाहरू (Milestones)
                </h4>
                <ul className="space-y-2.5">
                  {era.keyHighlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-[#2C3539]/80 flex items-start gap-2.5 leading-relaxed bg-[#FDFBF7] p-2.5 rounded-lg border border-[#f2ece4]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9B1B30] mt-2 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prominent Historical Figures */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  प्रमुख व्यक्तित्व तथा योगदान (Key Figures)
                </h4>
                <div className="space-y-2.5">
                  {era.figures.map((fig, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FDFBF7] border border-[#f2ece4] rounded-lg p-3 text-xs leading-relaxed"
                    >
                      <div className="font-bold text-[#2C3539] text-sm mb-0.5">
                        {fig.name}
                      </div>
                      <div className="text-[11px] text-[#9B1B30] font-medium mb-1">
                        {fig.role}
                      </div>
                      <p className="text-[#2C3539]/70">{fig.contribution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Context & Primary Sources */}
            <div className="pt-4 border-t border-[#F5F0EB] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#2C3539]/70">
              <div className="md:col-span-2">
                <span className="font-semibold text-[#2C3539]">ऐतिहासिक परिवेश: </span>
                <span>{era.historicalContext}</span>
              </div>

              <div className="bg-[#F5F0EB]/60 p-3 rounded-lg border border-[#ece5db]">
                <div className="font-semibold text-[#2C3539] mb-1 flex items-center gap-1.5 text-[11px]">
                  <BookOpen className="w-3.5 h-3.5 text-[#9B1B30]" />
                  प्राथमिक स्रोत सामग्री (Primary Sources)
                </div>
                <ul className="space-y-1 text-[11px] font-mono text-[#2C3539]/60">
                  {era.primarySources.map((src, idx) => (
                    <li key={idx} className="truncate" title={src}>
                      • {src}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bibliography & Scholarly Citation Generator */}
      <div className="bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#2C3539] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              अनुसन्धान सन्दर्भ तथा उद्धरण (Academic Bibliography & Citation)
            </h3>
            <p className="text-xs text-[#2C3539]/60">
              विद्यार्थी, इतिहासकार र अनुसन्धानकर्ताहरूका लागि मानक उद्धरण (APA / Chicago Format)
            </p>
          </div>
          <button
            onClick={() =>
              handleCopyCitation(
                'JaiMasih Digital Archive. (2026). Nepali Christian History and Church Archive. Kathmandu: JaiMasih.org. Retrieved from https://jaimasih.org'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] text-xs font-medium rounded-lg transition-colors border border-[#ded6cc] cursor-pointer self-start sm:self-center"
          >
            {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCitation ? 'उद्धरण कपी भयो!' : 'उद्धरण कपी गर्नुहोस् (Copy Citation)'}</span>
          </button>
        </div>

        <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#efe9df] text-xs font-mono text-[#2C3539]/80 space-y-2">
          <p>
            <strong>Suggested Citation (APA):</strong> JaiMasih Digital Archive. (2026).{' '}
            <em>Nepali Christian History and Church Directory Archive</em>. Kathmandu, Nepal: JaiMasih.org.
          </p>
          <p>
            <strong>Key Text:</strong> Perry, Cindy L. (1993).{' '}
            <em>A Biographical History of the Church in Nepal</em>. Kathmandu: Nepal Church History Project.
          </p>
        </div>
      </div>

      {/* Deep-Dive Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[85vh] rounded-2xl shadow-2xl border border-[#F5F0EB] flex flex-col animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-[#F5F0EB] flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#9B1B30] uppercase">
                  विशेष अनुसन्धान लेख · {selectedArticle.readTime}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C3539] mt-1">
                  {selectedArticle.titleNepali}
                </h3>
                <p className="text-xs text-[#2C3539]/60 font-mono mt-0.5">
                  {selectedArticle.titleEnglish}
                </p>
              </div>
              <button
                onClick={() => setSelectedArticleId(null)}
                className="p-1.5 rounded-lg text-[#2C3539]/60 hover:text-black hover:bg-[#F5F0EB] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#2C3539]/85 leading-relaxed whitespace-pre-line">
              {selectedArticle.content}
            </div>

            <div className="p-4 bg-[#FDFBF7] border-t border-[#F5F0EB] flex items-center justify-between text-xs text-[#2C3539]/60 rounded-b-2xl">
              <span>स्रोत: JaiMasih.org ऐतिहासिक अध्ययन</span>
              <button
                onClick={() => setSelectedArticleId(null)}
                className="px-4 py-1.5 bg-[#9B1B30] text-white rounded-lg hover:bg-[#811a2c] transition-colors cursor-pointer"
              >
                बन्द गर्नुहोस् (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
