export type ActiveTab = 'home' | 'history' | 'churches' | 'bhajans' | 'bible' | 'faq' | 'ai';

export interface HistoryEra {
  id: string;
  eraNumber: number;
  titleNepali: string;
  titleEnglish: string;
  timeframe: string;
  summary: string;
  keyHighlights: string[];
  figures: {
    name: string;
    role: string;
    contribution: string;
  }[];
  primarySources: string[];
  historicalContext: string;
}

export interface Church {
  id: string;
  name: string;
  nepaliName: string;
  city: string;
  district: string;
  province: string;
  address: string;
  pastor: string;
  foundedYear: number;
  serviceTimings: {
    saturdayWorship: string;
    wednesdayBibleStudy?: string;
    fridayPrayer?: string;
  };
  contactPhone: string;
  email?: string;
  website?: string;
  denomination: string;
  seatingCapacity: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  notes?: string;
}

export interface Bhajan {
  id: string;
  number: number;
  titleNepali: string;
  titleRoman: string;
  category: 'Classic Hymn (भजन)' | 'Chorus (कोरस)' | 'Contemporary (आधुनिक)' | 'Easter (पुनरुत्थान)' | 'Christmas (क्रिसमस)' | 'Youth (युवा)';
  key: string;
  tempo: string;
  composer?: string;
  lyricsNepali: string[];
  lyricsRoman: string[];
  chordsLines: {
    chordText: string;
    lyricText: string;
  }[];
  melodyNotes?: number[]; // Audio synthesizer frequency notes for melodic preview
}

export interface BibleVerse {
  verseNumber: number;
  nepaliText: string;
  englishText: string;
}

export interface BibleChapter {
  id: string;
  bookNepali: string;
  bookEnglish: string;
  chapterNumber: number;
  summary: string;
  verses: BibleVerse[];
}

export interface FaqItem {
  id: string;
  questionNepali: string;
  questionEnglish: string;
  answerNepali: string;
  answerEnglish: string;
  category: string;
  sources: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: string;
}
