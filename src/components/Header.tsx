import React, { useState } from 'react';
import { ActiveTab } from '../types';
import {
  Search,
  BookOpen,
  MapPin,
  Music,
  Scroll,
  Sparkles,
  HelpCircle,
  Menu,
  X,
  Key,
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  fontSize: 'sm' | 'base' | 'lg';
  setFontSize: (size: 'sm' | 'base' | 'lg') => void;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  fontSize,
  setFontSize,
  onOpenApiKeyModal,
  hasCustomKey,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: ActiveTab; labelNepali: string; labelEnglish: string; icon: React.ReactNode }[] = [
    { tab: 'history', labelNepali: 'इतिहास', labelEnglish: 'History Archive', icon: <Scroll className="w-4 h-4" /> },
    { tab: 'churches', labelNepali: 'मण्डली गाइड', labelEnglish: 'Church Directory', icon: <MapPin className="w-4 h-4" /> },
    { tab: 'bhajans', labelNepali: 'भजन तथा सङ्गीत', labelEnglish: 'Bhajan & Music', icon: <Music className="w-4 h-4" /> },
    { tab: 'bible', labelNepali: 'बाइबल तथा स्रोत', labelEnglish: 'Bible & Resources', icon: <BookOpen className="w-4 h-4" /> },
    { tab: 'faq', labelNepali: 'जिज्ञासा', labelEnglish: 'FAQ & Insights', icon: <HelpCircle className="w-4 h-4" /> },
    { tab: 'ai', labelNepali: 'मुक्ति एआई', labelEnglish: 'Mukti AI', icon: <Sparkles className="w-4 h-4 text-[#D4AF37]" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#F5F0EB] shadow-xs">
      {/* Top Heritage & Quick Stats Bar */}
      <div className="bg-[#9B1B30] text-[#FDFBF7] text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-medium tracking-wide">
              जयमसीह · नेपाली ख्रिष्टिय डिजिटल अभिलेख
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-white/80">
              "Building digital homes for churches in Nepal & worldwide"
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37] font-semibold">१२,०००+</span>
              <span className="text-white/80">Churches</span>
            </div>
            <span className="text-white/30">·</span>
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37] font-semibold">१४ लाख–२५ लाख+</span>
              <span className="text-white/80">Believers</span>
            </div>
            <span className="text-white/30 hidden sm:inline">·</span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[#D4AF37] font-semibold">१७१५–२०२६</span>
              <span className="text-white/80">Heritage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Emblem */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 group text-left transition-opacity hover:opacity-90 cursor-pointer"
          >
            {/* Himalayan Cross + Rhododendron motif emblem */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B1B30] to-[#751121] flex items-center justify-center text-white shadow-sm ring-1 ring-[#D4AF37]/30">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-[#FDFBF7]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Stylized Cross */}
                <line x1="12" y1="3" x2="12" y2="21" />
                <line x1="6" y1="9" x2="18" y2="9" />
                {/* Petals / Rhododendron leaves accent */}
                <circle cx="12" cy="9" r="1.5" fill="#D4AF37" stroke="none" />
                <path d="M12 4 C14 5, 14 7, 12 8" stroke="#D4AF37" strokeWidth="1.2" />
                <path d="M12 4 C10 5, 10 7, 12 8" stroke="#D4AF37" strokeWidth="1.2" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-serif font-bold text-[#9B1B30] tracking-tight">
                  JaiMasih<span className="text-[#D4AF37]">.org</span>
                </span>
                <span className="text-xs font-medium text-[#2C3539]/60">
                  (जयमसीह)
                </span>
              </div>
              <p className="text-[10px] text-[#2C3539]/70 tracking-wide uppercase font-medium">
                Nepali Christian Digital Archive & Directory
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#9B1B30] text-white shadow-xs font-semibold'
                      : 'text-[#2C3539]/80 hover:text-[#9B1B30] hover:bg-[#F5F0EB]'
                  }`}
                >
                  {item.icon}
                  <span>{item.labelNepali}</span>
                  <span className="text-[11px] opacity-75 hidden xl:inline">({item.labelEnglish})</span>
                </button>
              );
            })}
          </nav>

          {/* Action Controls: Search, Font size, API key */}
          <div className="flex items-center gap-2">
            {/* Universal Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] text-xs font-medium rounded-lg transition-all border border-[#e4ded6] cursor-pointer"
              title="Search archive (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#9B1B30]" />
              <span className="hidden sm:inline">खोजी (Search)</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-white rounded border border-[#d5cec6] text-[#2C3539]/60 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Font Size Adjuster for Elders (A- / A / A+) */}
            <div className="hidden sm:flex items-center bg-[#F5F0EB] rounded-lg p-0.5 border border-[#e4ded6]">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                  fontSize === 'sm' ? 'bg-white text-[#9B1B30] font-bold shadow-2xs' : 'text-[#2C3539]/70 hover:text-black'
                }`}
                title="सानो अक्षर (Small Font)"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                  fontSize === 'base' ? 'bg-white text-[#9B1B30] font-bold shadow-2xs' : 'text-[#2C3539]/70 hover:text-black'
                }`}
                title="सामान्य अक्षर (Regular Font)"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                  fontSize === 'lg' ? 'bg-white text-[#9B1B30] font-bold shadow-2xs' : 'text-[#2C3539]/70 hover:text-black'
                }`}
                title="ठूलो अक्षर (Large Font for Elders)"
              >
                A+
              </button>
            </div>

            {/* Custom Gemini Key Button */}
            <button
              onClick={onOpenApiKeyModal}
              className={`p-2 rounded-lg transition-colors border cursor-pointer ${
                hasCustomKey
                  ? 'bg-[#D4AF37]/15 text-[#9B1B30] border-[#D4AF37]/40'
                  : 'bg-[#F5F0EB] text-[#2C3539]/70 hover:text-[#9B1B30] border-[#e4ded6]'
              }`}
              title="Configure Gemini API Key (100% Free & Secure)"
            >
              <Key className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#F5F0EB] text-[#2C3539] hover:bg-[#eae3db] transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#F5F0EB] grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#9B1B30] text-white shadow-xs'
                      : 'bg-white text-[#2C3539] border border-[#F5F0EB] hover:bg-[#F5F0EB]'
                  }`}
                >
                  {item.icon}
                  <div>
                    <div className="font-semibold">{item.labelNepali}</div>
                    <div className="text-[10px] opacity-75">{item.labelEnglish}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
