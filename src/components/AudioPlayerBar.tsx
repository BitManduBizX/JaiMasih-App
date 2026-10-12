import React, { useState } from 'react';
import { Bhajan, ActiveTab } from '../types';
import {
  Play,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  ExternalLink,
} from 'lucide-react';

interface AudioPlayerBarProps {
  currentBhajan: Bhajan;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevBhajan: () => void;
  onNextBhajan: () => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentBhajan,
  isPlaying,
  onTogglePlay,
  onPrevBhajan,
  onNextBhajan,
  onSelectTab,
}) => {
  const [volume, setVolume] = useState<number>(70);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#ded6cc] shadow-2xl py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Current Hymn Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-xs sm:max-w-md">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9B1B30] to-[#7a1324] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Music className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9B1B30]">
              <span className="font-semibold">भजन नं. {currentBhajan.number}</span>
              <span>·</span>
              <span className="truncate">{currentBhajan.key}</span>
            </div>
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2C3539] truncate">
              {currentBhajan.titleNepali}
            </h4>
            <p className="text-[11px] text-[#2C3539]/60 truncate font-mono hidden sm:block">
              {currentBhajan.titleRoman}
            </p>
          </div>
        </div>

        {/* Player Controls (Play, Prev, Next) */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onPrevBhajan}
              className="p-1.5 rounded-lg text-[#2C3539]/70 hover:text-black hover:bg-[#F5F0EB] transition-colors cursor-pointer"
              title="Previous Hymn"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer ${
                isPlaying
                  ? 'bg-[#9B1B30] text-white ring-2 ring-[#9B1B30]/30'
                  : 'bg-[#D4AF37] hover:bg-[#c29d2b] text-[#2C3539]'
              }`}
              title={isPlaying ? 'Pause Melody' : 'Play Melody'}
            >
              {isPlaying ? (
                <Square className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              )}
            </button>

            <button
              onClick={onNextBhajan}
              className="p-1.5 rounded-lg text-[#2C3539]/70 hover:text-black hover:bg-[#F5F0EB] transition-colors cursor-pointer"
              title="Next Hymn"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-[#2C3539]/60 font-mono hidden md:block">
            {isPlaying ? 'Hymn Synthesizer Active · 432Hz Harmonic Organ' : 'Press Play for Melodic Audio'}
          </div>
        </div>

        {/* Right Side: Volume & Open Lyrics Action */}
        <div className="flex items-center gap-3">
          {/* Open full lyrics button */}
          <button
            onClick={() => onSelectTab('bhajans')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] text-xs font-medium rounded-lg transition-colors border border-[#e4ded6] cursor-pointer"
            title="भजनको शब्द र कर्ड्स हेर्नुहोस्"
          >
            <span className="hidden sm:inline">शब्द / कर्ड्स</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#9B1B30]" />
          </button>

          {/* Volume control */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#2C3539]/60 hover:text-black cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-16 h-1 bg-[#ded6cc] accent-[#9B1B30] rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
