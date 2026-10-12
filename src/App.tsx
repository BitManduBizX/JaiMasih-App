/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, Bhajan, Church } from './types';
import { churchesData } from './data/churchData';
import { bhajansData } from './data/bhajanData';
import { hymnSynthesizer } from './utils/audioPlayerEngine';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHeroOverview } from './components/HomeHeroOverview';
import { TimelineModule } from './components/TimelineModule';
import { ChurchDirectoryModule } from './components/ChurchDirectoryModule';
import { BhajanModule } from './components/BhajanModule';
import { BibleModule } from './components/BibleModule';
import { MuktiAiAssistant } from './components/MuktiAiAssistant';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { UniversalSearchModal } from './components/UniversalSearchModal';
import { ApiConsentModal } from './components/ApiConsentModal';
import { Sparkles, MessageCircle, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [currentBhajan, setCurrentBhajan] = useState<Bhajan>(bhajansData[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [hasCustomKey, setHasCustomKey] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('jaimasih_gemini_api_key'));
  });
  const [showFloatingAi, setShowFloatingAi] = useState<boolean>(false);

  // Global keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTogglePlay = (bhajanToPlay?: Bhajan) => {
    const target = bhajanToPlay || currentBhajan;
    if (isPlaying) {
      hymnSynthesizer.stop();
      setIsPlaying(false);
      setActiveNoteIndex(0);
    } else {
      if (target.id !== currentBhajan.id) {
        setCurrentBhajan(target);
      }
      const notes = target.melodyNotes || [392, 440, 493, 523];
      setIsPlaying(true);
      hymnSynthesizer.playMelody(
        notes,
        (noteIndex) => setActiveNoteIndex(noteIndex),
        () => {
          setIsPlaying(false);
          setActiveNoteIndex(0);
        }
      );
    }
  };

  const handleNextBhajan = () => {
    const currentIndex = bhajansData.findIndex((b) => b.id === currentBhajan.id);
    const nextIndex = (currentIndex + 1) % bhajansData.length;
    const next = bhajansData[nextIndex];
    setCurrentBhajan(next);
    if (isPlaying) {
      hymnSynthesizer.stop();
      const notes = next.melodyNotes || [392, 440, 493, 523];
      hymnSynthesizer.playMelody(
        notes,
        (noteIndex) => setActiveNoteIndex(noteIndex),
        () => {
          setIsPlaying(false);
          setActiveNoteIndex(0);
        }
      );
    }
  };

  const handlePrevBhajan = () => {
    const currentIndex = bhajansData.findIndex((b) => b.id === currentBhajan.id);
    const prevIndex = (currentIndex - 1 + bhajansData.length) % bhajansData.length;
    const prev = bhajansData[prevIndex];
    setCurrentBhajan(prev);
    if (isPlaying) {
      hymnSynthesizer.stop();
      const notes = prev.melodyNotes || [392, 440, 493, 523];
      hymnSynthesizer.playMelody(
        notes,
        (noteIndex) => setActiveNoteIndex(noteIndex),
        () => {
          setIsPlaying(false);
          setActiveNoteIndex(0);
        }
      );
    }
  };

  const fontSizeClass =
    fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-lg' : 'text-sm';

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C3539] ${fontSizeClass}`}>
        {/* Main Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSearch={() => setIsSearchOpen(true)}
          fontSize={fontSize}
          setFontSize={setFontSize}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          hasCustomKey={hasCustomKey}
        />

        {/* Main Content Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-28">
          {activeTab === 'home' && (
            <HomeHeroOverview
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              featuredChurch={churchesData[0]}
              featuredBhajan={bhajansData[0]}
              onPlayBhajan={handleTogglePlay}
              isPlaying={isPlaying}
              onOpenAi={() => setActiveTab('ai')}
            />
          )}

          {activeTab === 'history' && <TimelineModule />}

          {activeTab === 'churches' && <ChurchDirectoryModule />}

          {activeTab === 'bhajans' && (
            <BhajanModule
              currentBhajan={currentBhajan}
              setCurrentBhajan={(bhajan) => setCurrentBhajan(bhajan)}
              isPlaying={isPlaying}
              togglePlayBhajan={handleTogglePlay}
              activeNoteIndex={activeNoteIndex}
            />
          )}

          {activeTab === 'bible' && <BibleModule />}

          {activeTab === 'faq' && <BibleModule />}

          {activeTab === 'ai' && (
            <div className="py-2">
              <div className="mb-4 text-center">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#9B1B30]">
                  मुक्ति एआई (Mukti AI) - डिजिटल परामर्श केन्द्र
                </h2>
                <p className="text-xs sm:text-sm text-[#2C3539]/70 mt-1 max-w-xl mx-auto">
                  नेपाली ख्रिष्टिय इतिहास, बाइबल पद, मण्डली खोजी वा कुनै पनि आध्यात्मिक प्रश्न सोध्नुहोस्।
                </p>
              </div>
              <MuktiAiAssistant
                isFullPage={true}
                onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
                hasCustomKey={hasCustomKey}
              />
            </div>
          )}
        </main>

        {/* Sticky Audio Player Bar */}
        <AudioPlayerBar
          currentBhajan={currentBhajan}
          isPlaying={isPlaying}
          onTogglePlay={() => handleTogglePlay(currentBhajan)}
          onPrevBhajan={handlePrevBhajan}
          onNextBhajan={handleNextBhajan}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Floating Mukti AI Assistant Widget in Bottom-Right corner */}
        {activeTab !== 'ai' && (
          <div className="fixed bottom-20 right-4 sm:right-6 z-50">
            {showFloatingAi ? (
              <div className="w-[360px] sm:w-[420px] shadow-2xl rounded-2xl animate-in slide-in-from-bottom-5 duration-200">
                <MuktiAiAssistant
                  isFullPage={false}
                  onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
                  hasCustomKey={hasCustomKey}
                  onCloseFloating={() => setShowFloatingAi(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowFloatingAi(true)}
                className="flex items-center gap-2.5 px-4 py-3 bg-[#9B1B30] hover:bg-[#811a2c] text-white rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-[#D4AF37]/50"
                title="Open Mukti AI Assistant"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="text-xs font-semibold tracking-wide">
                  मुक्ति AI (Ask AI)
                </span>
              </button>
            )}
          </div>
        )}

        {/* Global Search Modal */}
        <UniversalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={(tab, item) => {
            setActiveTab(tab);
            if (tab === 'bhajans' && item) {
              setCurrentBhajan(item);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Gemini API Key Configuration Modal */}
        <ApiConsentModal
          isOpen={isApiKeyModalOpen}
          onClose={() => setIsApiKeyModalOpen(false)}
          onKeySaved={(key) => setHasCustomKey(Boolean(key))}
        />

        {/* Global Footer */}
        <Footer
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
