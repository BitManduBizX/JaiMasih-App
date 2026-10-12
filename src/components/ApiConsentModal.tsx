import React, { useState } from 'react';
import { Key, ShieldCheck, ExternalLink, Check, Trash2, X, RefreshCw } from 'lucide-react';

interface ApiConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string) => void;
}

export const ApiConsentModal: React.FC<ApiConsentModalProps> = ({
  isOpen,
  onClose,
  onKeySaved,
}) => {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('jaimasih_gemini_api_key') || '';
  });
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (trimmed) {
      localStorage.setItem('jaimasih_gemini_api_key', trimmed);
      onKeySaved(trimmed);
      setStatusMsg('API Key सफलतापूर्वक सुरक्षित गरियो!');
      setTimeout(() => {
        setStatusMsg(null);
        onClose();
      }, 1000);
    } else {
      localStorage.removeItem('jaimasih_gemini_api_key');
      onKeySaved('');
      setStatusMsg('कस्टम की हटाइयो। अब प्रणालीको पूर्वनिर्धारित ब्याकएन्ड प्रयोग हुनेछ।');
    }
  };

  const handleRemove = () => {
    localStorage.removeItem('jaimasih_gemini_api_key');
    setApiKey('');
    onKeySaved('');
    setStatusMsg('API Key हटाइयो।');
    setTimeout(() => setStatusMsg(null), 1500);
  };

  const handleTestKey = async () => {
    const keyToTest = apiKey.trim();
    if (!keyToTest) return;

    setIsTesting(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-key': keyToTest,
        },
        body: JSON.stringify({
          message: 'नमस्ते, परीक्षण सन्देश।',
          customApiKey: keyToTest,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setStatusMsg('सफलता! Gemini 3.8 Flash मोडेलसँग जडान सफल भयो।');
      } else {
        setStatusMsg('जडान असफल भयो। कृपया Key सही छ भनी जाँच्नुहोस्।');
      }
    } catch (err: any) {
      setStatusMsg('परीक्षण गर्दा त्रुटि भयो: ' + err.message);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-[#F5F0EB] p-6 sm:p-8 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#9B1B30] flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#2C3539]">
                Gemini AI API Key कन्फिगरेसन
              </h3>
              <p className="text-xs text-[#2C3539]/60">
                मुक्ति एआई (Mukti AI) को व्यक्तिगत प्रयोग
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#2C3539]/60 hover:text-black hover:bg-[#F5F0EB] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security & Privacy Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-5 flex items-start gap-2.5 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">100% Free & Secure. Stored locally on your device only.</div>
            <p className="text-emerald-800/80 mt-0.5">
              तपाईंको API Key कहिल्यै हाम्रो सर्भरमा स्थायी रूपमा भण्डारण हुँदैन। यो तपाईंको आफ्नै ब्राउजरको सुरक्षित `localStorage` मा मात्र रहन्छ।
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-[#2C3539] mb-1.5">
              Google Gemini API Key:
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#e4ded6] rounded-xl font-mono text-xs text-[#2C3539] focus:outline-none focus:ring-2 focus:ring-[#9B1B30]/30 focus:border-[#9B1B30]"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#2C3539]/60">
            <span>नि:शुल्क API Key छैन?</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9B1B30] font-medium hover:underline flex items-center gap-1"
            >
              <span>Google AI Studio बाट नि:शुल्क Key लिनुहोस्</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {statusMsg && (
            <div className="p-3 bg-[#FDFBF7] border border-[#ded6cc] rounded-lg text-xs font-medium text-[#9B1B30]">
              {statusMsg}
            </div>
          )}

          <div className="pt-3 border-t border-[#F5F0EB] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {apiKey && (
                <>
                  <button
                    onClick={handleTestKey}
                    disabled={isTesting}
                    className="px-3 py-1.5 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>जाँच्नुहोस् (Test)</span>
                  </button>

                  <button
                    onClick={handleRemove}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="हटाउनुहोस् (Delete Key)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-[#F5F0EB] text-[#2C3539] rounded-lg hover:bg-[#eae3db] cursor-pointer"
              >
                बन्द
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 bg-[#9B1B30] hover:bg-[#811a2c] text-white font-medium rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                सुरक्षित गर्नुहोस् (Save)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
