import React from 'react';
import { ActiveTab, Church, Bhajan } from '../types';
import {
  Scroll,
  MapPin,
  Music,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Compass,
  Play,
  Share2,
} from 'lucide-react';

interface HomeHeroOverviewProps {
  onNavigate: (tab: ActiveTab) => void;
  featuredChurch: Church;
  featuredBhajan: Bhajan;
  onPlayBhajan: (bhajan: Bhajan) => void;
  isPlaying: boolean;
  onOpenAi: () => void;
}

export const HomeHeroOverview: React.FC<HomeHeroOverviewProps> = ({
  onNavigate,
  featuredChurch,
  featuredBhajan,
  onPlayBhajan,
  isPlaying,
  onOpenAi,
}) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* Hero Section with Himalayan Aesthetic */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#9B1B30] via-[#851628] to-[#5a0f1b] text-white p-8 sm:p-14 shadow-lg border border-[#a8253b]/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Subtle Himalayan mountain silhouetted contour */}
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-mono text-[#D4AF37]">
            <span>जयमसीह · Kristiya Sewa Nepal</span>
            <span>·</span>
            <span>1715 – 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            नेपाली ख्रिष्टिय डिजिटल अभिलेखालय तथा मण्डली गाइड
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed font-sans max-w-2xl">
            नेपाली ख्रिष्टिय इतिहासको संरक्षण, सातै प्रदेशका मण्डलीहरूको प्रामाणिक डाइरेक्टरी, शास्त्रीय भजन तथा कोरस सङ्ग्रह, र धर्मशास्त्रीय अध्ययनको एकीकृत खुला मञ्च।
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('churches')}
              className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c29d2b] text-[#2C3539] text-sm font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#9B1B30]" />
              <span>मण्डली खोज्नुहोस् (Find Churches)</span>
            </button>

            <button
              onClick={() => onNavigate('history')}
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold backdrop-blur-xs transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <Scroll className="w-4 h-4 text-[#D4AF37]" />
              <span>इतिहास अन्वेषण गर्नुहोस् (Explore Archive)</span>
            </button>

            <button
              onClick={onOpenAi}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>मुक्ति AI लाई सोध्नुहोस्</span>
            </button>
          </div>
        </div>
      </section>

      {/* Target Audiences: Triple Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* For Local Believers & Elders */}
        <div
          onClick={() => onNavigate('bible')}
          className="bg-white border border-[#F5F0EB] hover:border-[#9B1B30]/30 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#9B1B30]/10 text-[#9B1B30] flex items-center justify-center mb-4 group-hover:bg-[#9B1B30] group-hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-[#9B1B30] font-bold uppercase mb-1">
            स्थानिय विश्वासी तथा पास्टरहरू
          </div>
          <h3 className="font-serif font-bold text-lg text-[#2C3539] mb-2">
            बाइबल अध्ययन तथा आराधना
          </h3>
          <p className="text-xs text-[#2C3539]/70 leading-relaxed mb-4">
            नेपाली संशोधित संस्करण, दैनिक पाठ तालिका, र शनिबारीय संगति सम्बन्धी आध्यात्मिक स्रोतहरू।
          </p>
          <div className="flex items-center gap-1 text-xs text-[#9B1B30] font-semibold">
            <span>अध्ययन सुरु गर्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* For Global Scholars & Researchers */}
        <div
          onClick={() => onNavigate('history')}
          className="bg-white border border-[#F5F0EB] hover:border-[#9B1B30]/30 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#9B1B30] flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#2C3539] transition-colors">
            <Scroll className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-[#D4AF37] font-bold uppercase mb-1">
            इतिहासकार तथा अनुसन्धानकर्ता
          </div>
          <h3 className="font-serif font-bold text-lg text-[#2C3539] mb-2">
            अभिलेख तथा प्राज्ञिक उद्धरण
          </h3>
          <p className="text-xs text-[#2C3539]/70 leading-relaxed mb-4">
            सन् १७१५ देखिका प्राथमिक स्रोतहरू, पास्टर गङ्गा प्रसाद प्रधानका अभिलेख र संविधान २०७२ धारा २६ को विश्लेषण।
          </p>
          <div className="flex items-center gap-1 text-xs text-[#9B1B30] font-semibold">
            <span>अभिलेखालय खोल्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* For Youth & Worship Teams */}
        <div
          onClick={() => onNavigate('bhajans')}
          className="bg-white border border-[#F5F0EB] hover:border-[#9B1B30]/30 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2C3539]/10 text-[#2C3539] flex items-center justify-center mb-4 group-hover:bg-[#2C3539] group-hover:text-white transition-colors">
            <Music className="w-5 h-5" />
          </div>
          <div className="text-xs font-mono text-[#2C3539]/60 font-bold uppercase mb-1">
            युवा तथा आराधना सङ्गीतिक समूह
          </div>
          <h3 className="font-serif font-bold text-lg text-[#2C3539] mb-2">
            भजन, कोरस तथा गितार कर्ड्स
          </h3>
          <p className="text-xs text-[#2C3539]/70 leading-relaxed mb-4">
            नेपाली भजन पुस्तक, रोमन उच्चारण, कर्ड्स ट्रान्सपोज सुविधा र सिन्थेसाइजर अडियो धुन।
          </p>
          <div className="flex items-center gap-1 text-xs text-[#9B1B30] font-semibold">
            <span>भजन सुन्नुहोस्</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* Highlights Grid: Spotlight Church & Hymn of the Day */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spotlight Church */}
        <div className="bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#9B1B30] mb-2">
              <span className="font-semibold">मण्डली स्पटलाइट · {featuredChurch.city}</span>
              <span>स्थापना: {featuredChurch.foundedYear}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C3539]">
              {featuredChurch.nepaliName}
            </h3>
            <p className="text-xs text-[#2C3539]/60 font-mono mb-4">
              {featuredChurch.name} · {featuredChurch.address}
            </p>

            <div className="space-y-2 text-xs text-[#2C3539]/80 bg-[#FDFBF7] p-4 rounded-xl border border-[#efe9df] mb-6">
              <div>
                <strong>शनिबारीय संगति:</strong> {featuredChurch.serviceTimings.saturdayWorship}
              </div>
              <div>
                <strong>पास्टर / अगुवा:</strong> {featuredChurch.pastor}
              </div>
              <div>
                <strong>सम्पर्क:</strong> {featuredChurch.contactPhone}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#F5F0EB]">
            <button
              onClick={() => onNavigate('churches')}
              className="text-xs font-semibold text-[#9B1B30] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>१२,०००+ मण्डलीहरूको सूची हेर्नुहोस्</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Featured Hymn Player */}
        <div className="bg-white border border-[#F5F0EB] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37] mb-2">
              <span className="font-semibold">आजको भजन (Featured Hymn)</span>
              <span>नं. {featuredBhajan.number} · {featuredBhajan.key}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C3539]">
              {featuredBhajan.titleNepali}
            </h3>
            <p className="text-xs text-[#2C3539]/60 font-mono mb-4">
              {featuredBhajan.titleRoman} · {featuredBhajan.category}
            </p>

            <div className="text-xs sm:text-sm font-serif text-[#2C3539]/85 italic bg-[#FDFBF7] p-4 rounded-xl border border-[#efe9df] mb-6 space-y-1">
              <p>"{featuredBhajan.lyricsNepali[0]}"</p>
              <p>"{featuredBhajan.lyricsNepali[1]}"</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#F5F0EB]">
            <button
              onClick={() => onPlayBhajan(featuredBhajan)}
              className="px-4 py-2 bg-[#9B1B30] hover:bg-[#811a2c] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlaying ? 'धुन बन्द गर्नुहोस्' : 'धुन सुन्नुहोस् (Listen)'}</span>
            </button>

            <button
              onClick={() => onNavigate('bhajans')}
              className="text-xs font-semibold text-[#9B1B30] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>पूर्ण भजन संग्रह</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
