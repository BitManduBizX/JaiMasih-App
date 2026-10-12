import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../utils/geminiService';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Key,
  Maximize2,
  Minimize2,
  X,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface MuktiAiAssistantProps {
  isFullPage?: boolean;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  onCloseFloating?: () => void;
}

export const MuktiAiAssistant: React.FC<MuktiAiAssistantProps> = ({
  isFullPage = false,
  onOpenApiKeyModal,
  hasCustomKey,
  onCloseFloating,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'जयमसीह! म **मुक्ति एआई (Mukti AI)** हुँ—नेपाली ख्रिष्टिय इतिहास, मण्डली डाइरेक्टरी, भजन तथा धर्मशास्त्रीय अध्ययनको डिजिटल सहायक। म तपाईंलाई कसरी सहायता गर्न सक्छु?',
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'नेपालमा किन शनिबार संगति हुन्छ?',
    'पास्टर गङ्गा प्रसाद प्रधान को हुनुहुन्थ्यो?',
    'पोखरा र काठमाडौंका प्रमुख मण्डलीहरू कुन-कुन हुन्?',
    'शान्ति र ढाडस दिने नेपाली बाइबल पद दिनुहोस्',
    'नेपालमा ख्रिष्टियनहरूको अनुमानित जनसंख्या कति छ?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { reply, source } = await sendChatMessage(
        text,
        messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        'User is exploring JaiMasih.org Nepali Christian Digital Archive & Directory'
      );

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply || 'माफ गर्नुहोस्, जवाफ प्राप्त गर्न सकिएन।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `जयमसीह! तपाईंले सोध्नुभएको विषय "${text}" को बारेमा:\n\nहाम्रो डिजिटल अभिलेखालयमा इतिहास (१७१५ देखि हालसम्म), मण्डली गाइड, भजन पुस्तक र बाइबल अध्ययन खण्डहरू उपलब्ध छन्। कृपया शीर्ष नेभिगेसनबाट सोझै ती खण्डहरू पनि हेर्न सक्नुहुन्छ।\n\n(थप वास्तविक समयका उत्तरहरूका लागि माथिको 'Key' बटन थिचेर नि:शुल्क Gemini API Key प्रयोग गर्न सक्नुहुन्छ)।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local_archive',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`flex flex-col bg-white border border-[#F5F0EB] rounded-2xl shadow-xl overflow-hidden ${
        isFullPage ? 'h-[750px] max-w-5xl mx-auto' : 'h-[540px] w-full'
      }`}
    >
      {/* Chat Header */}
      <div className="bg-[#9B1B30] text-white p-4 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37] ring-1 ring-[#D4AF37]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-sm sm:text-base leading-none">
                मुक्ति एआई (Mukti AI)
              </h3>
              <span className="text-[10px] bg-[#D4AF37] text-[#2C3539] px-1.5 py-0.5 rounded font-mono font-bold">
                Gemini 3.8
              </span>
            </div>
            <p className="text-[11px] text-white/75 mt-0.5">
              नेपाली ख्रिष्टिय इतिहास तथा मण्डली सल्लाहकार
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenApiKeyModal}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 ${
              hasCustomKey
                ? 'bg-[#D4AF37] text-[#2C3539] font-semibold'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">
              {hasCustomKey ? 'Custom Key Active' : 'API Key'}
            </span>
          </button>

          {onCloseFloating && (
            <button
              onClick={onCloseFloating}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FDFBF7]">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-lg bg-[#9B1B30] text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  isBot
                    ? 'bg-white border border-[#F5F0EB] text-[#2C3539] shadow-xs'
                    : 'bg-[#9B1B30] text-white shadow-xs'
                }`}
              >
                {msg.text}
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    isBot ? 'text-[#2C3539]/40' : 'text-white/60'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-lg bg-[#2C3539] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#9B1B30] text-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-[#F5F0EB] rounded-2xl p-4 shadow-xs flex items-center gap-2 text-xs text-[#2C3539]/70">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#9B1B30]" />
              <span>मुक्ति एआई सोचिरहेको छ (Mukti AI is consulting archive)...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-white border-t border-[#F5F0EB] overflow-x-auto shrink-0 flex items-center gap-2">
        <span className="text-[11px] font-mono text-[#2C3539]/50 shrink-0">सुझाव:</span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="px-2.5 py-1 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] text-[11px] rounded-lg whitespace-nowrap transition-colors border border-[#ded6cc] cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#F5F0EB] shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="नेपाली, रोमन वा अङ्ग्रेजीमा प्रश्न सोध्नुहोस् (Ask anything)..."
            className="flex-1 px-4 py-2.5 bg-[#FDFBF7] border border-[#e4ded6] rounded-xl text-xs sm:text-sm text-[#2C3539] focus:outline-none focus:ring-2 focus:ring-[#9B1B30]/30 focus:border-[#9B1B30]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2.5 bg-[#9B1B30] hover:bg-[#811a2c] disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">पठाउनुहोस्</span>
          </button>
        </div>
      </div>
    </div>
  );
};
