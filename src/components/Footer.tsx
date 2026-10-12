import React from 'react';
import { ActiveTab } from '../types';
import { Heart, ShieldCheck, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#242b2e] text-[#FDFBF7] mt-20 pt-16 pb-28 border-t border-[#3a444a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#9B1B30] flex items-center justify-center text-white">
                <span className="font-serif font-bold text-sm text-[#D4AF37]">✝</span>
              </div>
              <span className="text-lg font-serif font-bold tracking-tight text-white">
                JaiMasih<span className="text-[#D4AF37]">.org</span>
              </span>
            </div>
            <p className="text-xs text-[#FDFBF7]/70 leading-relaxed">
              नेपाली ख्रिष्टिय इतिहास, मण्डली सञ्जाल, भजन र धर्मशास्त्रीय अध्ययनको खुला डिजिटल अभिलेखालय।
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>१००% सुरक्षित र गैर-नाफामूलक खुला स्रोत</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-4">
              मुख्य खण्डहरू (Sections)
            </h4>
            <ul className="space-y-2 text-xs text-[#FDFBF7]/80">
              <li>
                <button
                  onClick={() => setActiveTab('history')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  इतिहास अभिलेख (Historical Timeline)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('churches')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  मण्डली डाइरेक्टरी (Church Directory Nepal)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('bhajans')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ख्रिष्टिय भजन तथा कोरस (Hymns & Chords)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('bible')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  पवित्र बाइबल तथा जिज्ञासा (Scripture & FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('ai')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  मुक्ति एआई सहायक (Mukti AI Assistant)
                </button>
              </li>
            </ul>
          </div>

          {/* Historical References */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-4">
              ऐतिहासिक सन्दर्भहरू (Scholarly Sources)
            </h4>
            <ul className="space-y-2 text-xs text-[#FDFBF7]/80">
              <li className="flex items-center gap-1.5">
                <span>Cindy L. Perry (1993) · Biographical History</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>Jonathan Lindell (1979) · Gospel of God</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>पास्टर गङ्गा प्रसाद प्रधान (१९१४) · पहिलो बाइबल</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>UMN & INF ऐतिहासिक अभिलेखालय (१९५२–१९९०)</span>
              </li>
            </ul>
          </div>

          {/* Community Covenant */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-4">
              प्रतिबद्धता (Our Pledge)
            </h4>
            <p className="text-xs text-[#FDFBF7]/70 leading-relaxed">
              हाम्रो उद्देश्य नेपाली इसाई समुदायको गौरवमय इतिहासको संरक्षण, अनुसन्धानकर्ताहरूलाई भरपर्दो तथ्य प्रदान, र मण्डलीहरूको डिजिटल पहुँच सुदृढ गर्नु हो।
            </p>
            <div className="text-xs text-white/50 pt-2 font-mono">
              Province 1 to Sudurpashchim · One Body in Christ
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3a444a]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDFBF7]/60">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} JaiMasih.org (जयमसीह डिजिटल अर्काइभ). सर्वाधिकार सुरक्षित।</span>
          </div>

          <div className="flex items-center gap-2 text-[#D4AF37]">
            <span>जयमसीह · ख्रिष्टमा अनुग्रह र शान्ति तपाईंहरू सबैसँग रहोस्</span>
            <Heart className="w-3.5 h-3.5 text-[#9B1B30] fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
