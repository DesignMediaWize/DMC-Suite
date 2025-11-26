import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PlaceDetails } from '../types';
import { Send, Map, Loader2, Sparkles, Bot, ArrowRight } from 'lucide-react';
import { PlaceCard } from './PlaceCard';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isGenerating: boolean;
  onGenerateItinerary: () => void;
  onAddPlace: (place: PlaceDetails) => void;
  addedPlaceIds: Set<string>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  onSendMessage, 
  isGenerating,
  onGenerateItinerary,
  onAddPlace,
  addedPlaceIds
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    onSendMessage(input);
    setInput('');
  };

  // Preset prompts for empty state
  const quickPrompts = [
    "Plan a 3-day luxury trip to Kyoto",
    "Best sushi restaurants in Tokyo",
    "Romantic boutique hotels in Paris",
    "Weekend getaway in Napa Valley"
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-100">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 leading-tight">DMC Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Live Agent</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onGenerateItinerary}
          disabled={isGenerating || messages.length < 2}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
        >
          <Sparkles size={14} />
          <span>Build Itinerary</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-teal-600 animate-bounce-slow">
               <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Where to next?</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-8">
              I can research destinations, find availability, and build complete itineraries for your clients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
              {quickPrompts.map((prompt) => (
                <button 
                  key={prompt}
                  onClick={() => onSendMessage(prompt)}
                  className="text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 font-medium transition-colors border border-transparent hover:border-gray-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[90%] lg:max-w-[85%] ${msg.role === 'user' ? 'bg-slate-850 text-white rounded-2xl rounded-tr-none shadow-md' : ''}`}>
              
              {/* Text Bubble */}
              <div
                className={`p-4 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? ''
                    : 'bg-white text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {msg.richContent ? msg.richContent.text : msg.text}
                </div>
              </div>

              {/* Generative UI: Place Cards */}
              {msg.richContent?.places && msg.richContent.places.length > 0 && (
                <div className="mt-4 px-0 md:px-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                    {msg.richContent.places.map((place, idx) => (
                      <div key={idx} className="w-full">
                        <PlaceCard 
                          details={place} 
                          onAdd={onAddPlace}
                          isAdded={addedPlaceIds.has(place.name)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grounding Sources (Maps) */}
              {msg.groundingSources && msg.groundingSources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 px-4 pb-4">
                  {msg.groundingSources.map((source, idx) => (
                    <a 
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-semibold text-gray-600 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 transition-all"
                    >
                      <Map size={12} />
                      {source.title.replace('Map Link', 'View on Google Maps')}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex justify-start w-full">
            <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">AI Processing</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about hotels, flights, or experiences..."
            className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm font-medium text-gray-800 placeholder-gray-400 shadow-sm"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-md shadow-teal-200/50"
          >
            {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
          </button>
        </form>
        <div className="flex justify-center mt-3 gap-4 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
           <span>Gemini 2.5 Flash</span>
           <span>•</span>
           <span>Google Maps Grounding</span>
        </div>
      </div>
    </div>
  );
};
