import React, { useState, useEffect } from 'react';
import { churchesData } from '../data/churchData';
import { historyEras } from '../data/historyData';
import { bhajansData } from '../data/bhajanData';
import { bibleChapters } from '../data/bibleData';
import { ActiveTab, Church, Bhajan, HistoryEra, BibleChapter } from '../types';
import { Search, MapPin, Scroll, Music, BookOpen, X, ArrowRight } from 'lucide-react';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab, item?: any) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingChurches = q
    ? churchesData.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.nepaliName.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.pastor.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchingBhajans = q
    ? bhajansData.filter(
        (b) =>
          b.titleNepali.toLowerCase().includes(q) ||
          b.titleRoman.toLowerCase().includes(q) ||
          b.number.toString().includes(q) ||
          b.lyricsNepali.some((l) => l.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchingHistory = q
    ? historyEras.filter(
        (era) =>
          era.titleNepali.toLowerCase().includes(q) ||
          era.titleEnglish.toLowerCase().includes(q) ||
          era.keyHighlights.some((h) => h.toLowerCase().includes(q)) ||
          era.figures.some((f) => f.name.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const matchingBible = q
    ? bibleChapters.filter(
        (b) =>
          b.bookNepali.toLowerCase().includes(q) ||
          b.bookEnglish.toLowerCase().includes(q) ||
          b.verses.some((v) => v.nepaliText.toLowerCase().includes(q) || v.englishText.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const totalResults =
    matchingChurches.length + matchingBhajans.length + matchingHistory.length + matchingBible.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-[#F5F0EB] overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#F5F0EB] flex items-center gap-3 bg-[#FDFBF7]">
          <Search className="w-5 h-5 text-[#9B1B30] shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="चर्च, भजन, इतिहास, वा बाइबल पद खोज्नुहोस् (Type to search across everything)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#2C3539] focus:outline-none placeholder:text-[#2C3539]/40"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#2C3539]/50 hover:text-black hover:bg-[#F5F0EB] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!q ? (
            <div className="py-8 text-center text-xs text-[#2C3539]/50">
              <p>सुझाव खोजहरू: "पोखरा", "गङ्गा प्रसाद", "भजन १", "यूहन्ना ३", "शनिबार"</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-xs text-[#2C3539]/60">
              "{query}" को लागि कुनै नतिजा भेटिएन। कृपया अन्य शब्द प्रयोग गर्नुहोस्।
            </div>
          ) : (
            <>
              {/* Churches Results */}
              {matchingChurches.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#9B1B30] font-bold mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    मण्डलीहरू (Churches)
                  </h4>
                  <div className="space-y-1.5">
                    {matchingChurches.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onNavigate('churches');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-[#FDFBF7] hover:bg-[#F5F0EB] border border-[#f0eae0] flex items-center justify-between text-xs cursor-pointer group"
                      >
                        <div>
                          <div className="font-bold text-[#2C3539] group-hover:text-[#9B1B30]">
                            {c.nepaliName}
                          </div>
                          <div className="text-[11px] text-[#2C3539]/60">
                            {c.address}, {c.city} · पास्टर: {c.pastor}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#2C3539]/40 group-hover:text-[#9B1B30] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bhajans Results */}
              {matchingBhajans.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#D4AF37] font-bold mb-2 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5" />
                    ख्रिष्टिय भजन तथा कोरस (Hymns)
                  </h4>
                  <div className="space-y-1.5">
                    {matchingBhajans.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          onNavigate('bhajans', b);
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-[#FDFBF7] hover:bg-[#F5F0EB] border border-[#f0eae0] flex items-center justify-between text-xs cursor-pointer group"
                      >
                        <div>
                          <div className="font-bold text-[#2C3539] group-hover:text-[#9B1B30]">
                            नं. {b.number}: {b.titleNepali}
                          </div>
                          <div className="text-[11px] text-[#2C3539]/60 font-mono">
                            {b.titleRoman} · {b.key}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#2C3539]/40 group-hover:text-[#9B1B30] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* History Results */}
              {matchingHistory.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#9B1B30] font-bold mb-2 flex items-center gap-1.5">
                    <Scroll className="w-3.5 h-3.5" />
                    इतिहास अभिलेख (History)
                  </h4>
                  <div className="space-y-1.5">
                    {matchingHistory.map((h) => (
                      <div
                        key={h.id}
                        onClick={() => {
                          onNavigate('history');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-[#FDFBF7] hover:bg-[#F5F0EB] border border-[#f0eae0] flex items-center justify-between text-xs cursor-pointer group"
                      >
                        <div>
                          <div className="font-bold text-[#2C3539] group-hover:text-[#9B1B30]">
                            युग {h.eraNumber}: {h.titleNepali}
                          </div>
                          <div className="text-[11px] text-[#2C3539]/60">
                            {h.timeframe} · {h.summary.substring(0, 60)}...
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#2C3539]/40 group-hover:text-[#9B1B30] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bible Results */}
              {matchingBible.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#2C3539] font-bold mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    बाइबल अध्याय (Scripture)
                  </h4>
                  <div className="space-y-1.5">
                    {matchingBible.map((ch) => (
                      <div
                        key={ch.id}
                        onClick={() => {
                          onNavigate('bible');
                          onClose();
                        }}
                        className="p-2.5 rounded-lg bg-[#FDFBF7] hover:bg-[#F5F0EB] border border-[#f0eae0] flex items-center justify-between text-xs cursor-pointer group"
                      >
                        <div>
                          <div className="font-bold text-[#2C3539] group-hover:text-[#9B1B30]">
                            {ch.bookNepali} {ch.chapterNumber} ({ch.bookEnglish})
                          </div>
                          <div className="text-[11px] text-[#2C3539]/60">
                            {ch.summary}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#2C3539]/40 group-hover:text-[#9B1B30] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F5F0EB] border-t border-[#ded6cc] flex items-center justify-between text-[11px] text-[#2C3539]/60 font-mono">
          <span>Esc थिचेर बन्द गर्नुहोस्</span>
          <span>JaiMasih Universal Search Engine</span>
        </div>
      </div>
    </div>
  );
};
