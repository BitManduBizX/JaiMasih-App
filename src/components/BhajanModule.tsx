import React, { useState } from 'react';
import { bhajansData } from '../data/bhajanData';
import { Bhajan } from '../types';
import { transposeChordLine } from '../utils/chordTransposer';
import {
  Music,
  Play,
  Square,
  Copy,
  Download,
  Share2,
  Check,
  Search,
  Sparkles,
  Guitar,
  Volume2,
} from 'lucide-react';

interface BhajanModuleProps {
  currentBhajan: Bhajan;
  setCurrentBhajan: (bhajan: Bhajan) => void;
  isPlaying: boolean;
  togglePlayBhajan: (bhajan: Bhajan) => void;
  activeNoteIndex: number;
}

export const BhajanModule: React.FC<BhajanModuleProps> = ({
  currentBhajan,
  setCurrentBhajan,
  isPlaying,
  togglePlayBhajan,
  activeNoteIndex,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showRoman, setShowRoman] = useState<boolean>(true);
  const [showChords, setShowChords] = useState<boolean>(true);
  const [transposeSemitones, setTransposeSemitones] = useState<number>(0);
  const [copiedLyrics, setCopiedLyrics] = useState<boolean>(false);

  const categories = [
    'All',
    'Classic Hymn (भजन)',
    'Chorus (कोरस)',
    'Contemporary (आधुनिक)',
    'Christmas (क्रिसमस)',
    'Easter (पुनरुत्थान)',
  ];

  const filteredBhajans = bhajansData.filter((b) => {
    const matchesSearch =
      searchTerm === '' ||
      b.titleNepali.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.titleRoman.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.number.toString().includes(searchTerm) ||
      b.lyricsNepali.some((line) => line.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || b.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyLyrics = () => {
    const text = `${currentBhajan.titleNepali} (${currentBhajan.titleRoman})\nCategory: ${currentBhajan.category}\nKey: ${currentBhajan.key}\n\n[नेपाली शब्दहरू]\n${currentBhajan.lyricsNepali.join('\n')}\n\n[Roman Transliteration]\n${currentBhajan.lyricsRoman.join('\n')}\n\nJaiMasih.org Nepali Hymnbook`;
    navigator.clipboard.writeText(text);
    setCopiedLyrics(true);
    setTimeout(() => setCopiedLyrics(false), 2000);
  };

  const handleDownloadLyrics = () => {
    const text = `${currentBhajan.titleNepali} - ${currentBhajan.titleRoman}\n${currentBhajan.lyricsNepali.join('\n')}\n\n${currentBhajan.lyricsRoman.join('\n')}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentBhajan.titleRoman.replace(/\s+/g, '_')}_Lyrics.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#2C3539] to-[#1a2124] text-white rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] tracking-wider uppercase mb-2">
            <span>ख्रिष्टिय भजन तथा सङ्गीत (Nepali Christian Hymnbook)</span>
            <span aria-hidden="true">·</span>
            <span>सङ्गीतिक आराधना र लय</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-3">
            "मसीह येशू मेरो मुक्तिदाता..."
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
            परम्परागत ख्रिष्टिय भजन, हृदयस्पर्शी मण्डली कोरसहरू, युवा आराधना, र चाडपर्वका गीतहरू। गितार तथा किबोर्ड बजाउनेहरूका लागि कर्ड्स (Chords) र ट्रान्सपोज सुविधायुक्त।
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-[#2C3539] font-bold shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Interface: Left Song List, Right Interactive Lyrics & Chords Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Song List & Search (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#F5F0EB] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#9B1B30] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="गीतको नाम, नम्बर वा शब्द खोज्नुहोस्..."
              className="w-full pl-10 pr-4 py-2 bg-[#FDFBF7] border border-[#e8e2d8] rounded-xl text-xs sm:text-sm text-[#2C3539] focus:outline-none focus:ring-1 focus:ring-[#9B1B30]"
            />
          </div>

          <div className="text-xs text-[#2C3539]/60 flex items-center justify-between pb-1 border-b border-[#F5F0EB]">
            <span>उपलब्ध गीतहरू ({filteredBhajans.length})</span>
            <span>अडियो तथा कर्ड्स सहित</span>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredBhajans.map((bhajan) => {
              const isCurrent = currentBhajan.id === bhajan.id;
              const isCurrentPlaying = isCurrent && isPlaying;
              return (
                <div
                  key={bhajan.id}
                  onClick={() => {
                    setCurrentBhajan(bhajan);
                    setTransposeSemitones(0);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    isCurrent
                      ? 'bg-[#FDFBF7] border-[#9B1B30] shadow-xs ring-1 ring-[#9B1B30]/20'
                      : 'bg-white border-[#F5F0EB] hover:bg-[#FDFBF7] hover:border-[#ded6cc]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayBhajan(bhajan);
                      }}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer ${
                        isCurrentPlaying
                          ? 'bg-[#9B1B30] text-white'
                          : 'bg-[#F5F0EB] text-[#2C3539] group-hover:bg-[#9B1B30] group-hover:text-white'
                      }`}
                      title={isCurrentPlaying ? 'Stop' : 'Play Preview Melodic Audio'}
                    >
                      {isCurrentPlaying ? (
                        <Square className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-[#2C3539]/60 font-mono">
                        <span className="font-bold text-[#9B1B30]">नम्बर {bhajan.number}</span>
                        <span>·</span>
                        <span>{bhajan.key}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#2C3539] truncate">
                        {bhajan.titleNepali}
                      </h4>
                      <p className="text-[11px] text-[#2C3539]/60 truncate font-mono">
                        {bhajan.titleRoman}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#2C3539]/50 font-mono shrink-0 hidden sm:inline">
                    {bhajan.category.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Lyrics, Chords & Melodic Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header of Active Hymn */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F0EB]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#9B1B30] mb-1">
                <span className="font-bold">भजन सङ्ख्या: {currentBhajan.number}</span>
                <span>·</span>
                <span>{currentBhajan.category}</span>
                <span>·</span>
                <span>{currentBhajan.tempo}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2C3539]">
                {currentBhajan.titleNepali}
              </h3>
              <p className="text-xs text-[#2C3539]/60 font-mono mt-0.5">
                {currentBhajan.titleRoman} · {currentBhajan.composer}
              </p>
            </div>

            {/* Play Button & Melodic State */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePlayBhajan(currentBhajan)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-[#9B1B30] text-white shadow-xs'
                    : 'bg-[#D4AF37] hover:bg-[#c29d2b] text-[#2C3539] shadow-xs'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>बन्द गर्नुहोस् (Stop)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>धुन सुन्नुहोस् (Play Melody)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Worship Tooling Bar */}
          <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#ece5db] flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Romanized toggle */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showRoman}
                  onChange={(e) => setShowRoman(e.target.checked)}
                  className="rounded text-[#9B1B30] focus:ring-[#9B1B30]"
                />
                <span className="text-[#2C3539]/80 font-medium">रोमन उच्चारण (Roman English)</span>
              </label>

              <span className="text-gray-300">|</span>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showChords}
                  onChange={(e) => setShowChords(e.target.checked)}
                  className="rounded text-[#9B1B30] focus:ring-[#9B1B30]"
                />
                <span className="text-[#2C3539]/80 font-medium flex items-center gap-1">
                  <Guitar className="w-3.5 h-3.5 text-[#9B1B30]" />
                  गितार कर्ड्स (Chords)
                </span>
              </label>
            </div>

            {/* Transpose Controls for Chords */}
            {showChords && (
              <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-[#ded6cc]">
                <span className="text-[11px] font-mono text-[#2C3539]/70">Key Transpose:</span>
                <button
                  onClick={() => setTransposeSemitones((prev) => prev - 1)}
                  className="px-1.5 py-0.5 rounded bg-[#F5F0EB] hover:bg-[#eae3db] font-mono text-xs font-bold cursor-pointer"
                  title="एक सुर तल (-1 semitone)"
                >
                  -
                </button>
                <span className="font-mono font-bold text-xs px-1 text-[#9B1B30]">
                  {transposeSemitones > 0 ? `+${transposeSemitones}` : transposeSemitones}
                </span>
                <button
                  onClick={() => setTransposeSemitones((prev) => prev + 1)}
                  className="px-1.5 py-0.5 rounded bg-[#F5F0EB] hover:bg-[#eae3db] font-mono text-xs font-bold cursor-pointer"
                  title="एक सुर माथि (+1 semitone)"
                >
                  +
                </button>
                {transposeSemitones !== 0 && (
                  <button
                    onClick={() => setTransposeSemitones(0)}
                    className="text-[10px] text-[#9B1B30] hover:underline ml-1 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Melodic Note Visualizer Bar when playing */}
          {isPlaying && (
            <div className="bg-[#9B1B30]/5 p-3 rounded-xl border border-[#9B1B30]/20 flex items-center justify-between text-xs animate-pulse">
              <div className="flex items-center gap-2 text-[#9B1B30] font-medium">
                <Volume2 className="w-4 h-4" />
                <span>धुन बज्दैछ (Hymn Melodic Synthesizer Playing...)</span>
              </div>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-4 rounded-full transition-all ${
                      activeNoteIndex % 8 === idx
                        ? 'bg-[#9B1B30] h-6'
                        : 'bg-[#9B1B30]/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Lyrics and Chords Area */}
          <div className="space-y-6">
            {/* If Chords are enabled, display chord-annotated sheet */}
            {showChords && currentBhajan.chordsLines.length > 0 ? (
              <div className="space-y-3 font-mono text-sm bg-[#FDFBF7] p-5 rounded-xl border border-[#ece5db]">
                <div className="text-[11px] text-[#9B1B30] font-bold mb-3 flex items-center gap-1.5 font-sans">
                  <Guitar className="w-3.5 h-3.5" />
                  गितार तथा किबोर्ड कर्ड्स शिट (Transpose: {transposeSemitones}):
                </div>
                {currentBhajan.chordsLines.map((line, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-[#9B1B30] font-bold text-xs tracking-wider whitespace-pre">
                      {transposeChordLine(line.chordText, transposeSemitones)}
                    </div>
                    <div className="text-[#2C3539] font-serif text-sm">
                      {line.lyricText}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Standard Nepali Lyrics Sheet */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-[#9B1B30] font-bold">
                नेपाली भजनका शब्दहरू (Lyrics in Nepali Script):
              </h4>
              <div className="space-y-1.5 text-base sm:text-lg font-serif text-[#2C3539] leading-relaxed bg-[#FDFBF7]/40 p-4 rounded-xl border border-[#F5F0EB]">
                {currentBhajan.lyricsNepali.map((line, idx) => (
                  <p key={idx} className={line === '' ? 'h-3' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Romanized Transliteration */}
            {showRoman && (
              <div className="space-y-2 pt-2 border-t border-[#F5F0EB]">
                <h4 className="text-xs font-mono uppercase text-[#2C3539]/60 font-bold">
                  रोमन उच्चारण (Romanized Pronunciation for Global Singers):
                </h4>
                <div className="space-y-1 text-xs sm:text-sm font-mono text-[#2C3539]/70 leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border border-[#ece5db]">
                  {currentBhajan.lyricsRoman.map((line, idx) => (
                    <p key={idx} className={line === '' ? 'h-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row: Copy & Download */}
          <div className="pt-4 border-t border-[#F5F0EB] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLyrics}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] rounded-lg font-medium transition-colors cursor-pointer"
              >
                {copiedLyrics ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLyrics ? 'कपी भयो!' : 'शब्दहरू कपी गर्नुहोस् (Copy)'}</span>
              </button>

              <button
                onClick={handleDownloadLyrics}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] rounded-lg font-medium transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>डाउनलोड (Text File)</span>
              </button>
            </div>

            <span className="text-[#2C3539]/50 font-mono text-[11px]">
              ख्रिष्टिय भजन पुस्तक © JaiMasih Archive
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
