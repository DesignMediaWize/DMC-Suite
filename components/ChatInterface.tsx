
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PlaceDetails } from '../types';
import { Send, Map, Loader2, Sparkles, Bot, Plus, Mic, ArrowRight, MapPin, Calendar, Users, DollarSign, Briefcase } from 'lucide-react';
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
  
  // Check if we have user messages to toggle between Landing View and Chat View
  const hasUserMessages = messages.some(m => m.role === 'user');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (hasUserMessages) {
        scrollToBottom();
    }
  }, [messages, isGenerating, hasUserMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    onSendMessage(input);
    setInput('');
  };

  const LandingPageContent = () => (
    <div className="flex flex-col xl:flex-row gap-12 pb-32 animate-in fade-in duration-500 max-w-7xl mx-auto w-full">
        
        {/* Left Column - Hero */}
        <div className="flex-1 flex flex-col items-center justify-center pt-10 xl:pt-20 text-center">
             {/* 3D Collage Effect */}
             <div className="relative w-72 h-72 mb-10">
                {/* Back Image */}
                <div className="absolute top-0 right-4 w-40 h-52 bg-gray-200 rounded-2xl overflow-hidden shadow-xl transform rotate-6 border-4 border-white z-10">
                     <img 
                        src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=400" 
                        className="w-full h-full object-cover" 
                        alt="Travel" 
                     />
                </div>
                {/* Middle Image */}
                <div className="absolute top-4 left-6 w-36 h-36 bg-gray-200 rounded-full overflow-hidden shadow-xl border-4 border-white z-20">
                     <img 
                        src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" 
                        className="w-full h-full object-cover" 
                        alt="Resort" 
                     />
                </div>
                {/* Front Image */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-32 bg-gray-200 rounded-xl overflow-hidden shadow-2xl border-4 border-white z-30 transform -rotate-3">
                     <img 
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400" 
                        className="w-full h-full object-cover" 
                        alt="Adventure" 
                     />
                </div>
                {/* Floating Pin */}
                <div className="absolute -top-6 left-10 text-rose-500 animate-bounce z-40 drop-shadow-md">
                    <MapPin fill="currentColor" size={42} strokeWidth={1.5} />
                </div>
             </div>

             <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Where to today?</h1>
             <p className="text-slate-500 text-lg max-w-md leading-relaxed font-medium">
                Hey there, I’m here to assist you in planning your experience. Ask me anything travel related.
             </p>
        </div>

        {/* Right Column - Feed */}
        <div className="w-full xl:w-[500px] space-y-12">
            
            {/* Section 1: For You */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                        For you in <MapPin size={18} /> <span className="underline decoration-dotted decoration-gray-400">Rinkeby-Kista</span>
                    </h3>
                    <div className="flex gap-2">
                         <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors">
                            <Map size={14} /> Map
                         </button>
                         <button className="text-xs font-bold text-slate-500 hover:text-slate-900 px-2">Explore</button>
                    </div>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 xl:mx-0 xl:px-0">
                    {/* Card 1 */}
                    <div className="min-w-[240px] w-[240px] h-64 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-all">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hotel" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20">Nov 28</div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h4 className="font-bold text-lg leading-tight mb-1">Stallmästaregården</h4>
                            <div className="flex items-center gap-1.5 text-xs opacity-90 font-medium"><Briefcase size={12} /> Hotel • Stockholm</div>
                        </div>
                    </div>
                     {/* Card 2 */}
                     <div className="min-w-[240px] w-[240px] h-64 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-all">
                        <img src="https://images.unsplash.com/photo-1590073242678-cfe4f25c65f5?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hotel" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h4 className="font-bold text-lg leading-tight mb-1">Blique by Nobis</h4>
                            <div className="flex items-center gap-1.5 text-xs opacity-90 font-medium"><Briefcase size={12} /> Hotel • Stockholm</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Get Started */}
            <div className="space-y-4">
                <h3 className="font-bold text-slate-900 px-1 text-lg">Get started</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square rounded-3xl relative overflow-hidden group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1565538563729-2df807e324c4?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Quiz" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm leading-tight">Take our travel quiz</div>
                    </div>
                    <div className="aspect-square rounded-3xl relative overflow-hidden group cursor-pointer" onClick={onGenerateItinerary}>
                         <img src="https://images.unsplash.com/photo-1544642083-d98c25db31ba?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Create" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm leading-tight">Create a trip</div>
                    </div>
                    <div className="aspect-square rounded-3xl relative overflow-hidden group cursor-pointer">
                         <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Tools" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm leading-tight">Creator tools</div>
                    </div>
                </div>
            </div>

             {/* Section 3: Get Inspired */}
             <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="font-bold text-slate-900 text-lg">Get inspired</h3>
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-900">See all</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-[3/4] rounded-3xl relative overflow-hidden group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Skye" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm leading-tight">Isle of Skye Self Guided Road Trip</div>
                    </div>
                    <div className="aspect-[3/4] rounded-3xl relative overflow-hidden group cursor-pointer">
                         <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Paris" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm leading-tight">My List of Things to Do, Eat, & See in...</div>
                    </div>
                    <div className="aspect-[3/4] rounded-3xl relative overflow-hidden group cursor-pointer">
                         <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Food" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                         <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm leading-tight">Prague: food guide by neighborhood</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white font-sans">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur-sm sticky top-0 z-20 h-[72px]">
        {hasUserMessages ? (
             // Standard Chat Header
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
                    <Bot size={16} />
                </div>
                <h2 className="font-bold text-gray-900">DMC Assistant</h2>
             </div>
        ) : (
            // Landing Page Header
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-8">
                     <h2 className="font-bold text-slate-900 text-lg">New chat</h2>
                
                    {/* Filters / Pills */}
                    <div className="hidden lg:flex items-center bg-gray-50 rounded-full p-1 border border-gray-100 shadow-sm">
                        <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-full transition-all">Where</button>
                        <div className="w-px h-3 bg-gray-300 mx-1"></div>
                        <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-full transition-all">When</button>
                        <div className="w-px h-3 bg-gray-300 mx-1"></div>
                        <button className="px-4 py-1.5 text-xs font-bold text-slate-900 bg-white shadow-sm rounded-full transition-all flex items-center gap-1">
                            2 travelers
                        </button>
                        <div className="w-px h-3 bg-gray-300 mx-1"></div>
                        <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-full transition-all">Budget</button>
                    </div>
                </div>

                <button 
                  onClick={onGenerateItinerary}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-slate-900 text-xs font-bold rounded-full hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
                >
                  <Briefcase size={16} />
                  <span>Create a trip</span>
                </button>
            </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth bg-white">
        
        {!hasUserMessages && <LandingPageContent />}

        {hasUserMessages && (
             <div className="max-w-3xl mx-auto space-y-8 pb-40 pt-4">
                 {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        {msg.role === 'model' && (
                             <div className="flex items-center gap-2 mb-2 px-2">
                                <Bot size={16} className="text-teal-600" />
                                <span className="text-xs font-bold text-gray-500">Mindtrip</span>
                             </div>
                        )}

                        <div className={`max-w-[90%] lg:max-w-[85%] ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-2xl rounded-tr-none shadow-md' : 'text-slate-900'}`}>
                        
                            <div className={`p-5 text-[15px] leading-relaxed ${msg.role === 'user' ? '' : ''}`}>
                                <div className="whitespace-pre-wrap">{msg.richContent ? msg.richContent.text : msg.text}</div>
                            </div>

                            {/* Generative UI: Place Cards */}
                            {msg.richContent?.places && msg.richContent.places.length > 0 && (
                                <div className="mt-2 px-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
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
                             {/* Grounding Sources */}
                            {msg.groundingSources && msg.groundingSources.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2 px-4 pb-4">
                                {msg.groundingSources.map((source, idx) => (
                                    <a 
                                    key={idx}
                                    href={source.uri}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-semibold text-gray-600 hover:text-teal-600 hover:border-teal-200 transition-all"
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
                        <Loader2 className="animate-spin text-teal-600" size={18} />
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Thinking...</span>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
             </div>
        )}
      </div>

      {/* Floating Input Area */}
      <div className="fixed bottom-0 left-0 md:left-[280px] right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-30">
         <div className="max-w-3xl mx-auto pointer-events-auto">
             
             {/* Helper Pill */}
             <div className="flex justify-center mb-4 transition-all duration-300">
                 <button className="px-5 py-2 bg-gray-100/90 backdrop-blur-md text-xs font-semibold text-slate-600 rounded-full hover:bg-gray-200 hover:text-slate-900 transition-all shadow-sm">
                    What can I ask Mindtrip?
                 </button>
             </div>

             <form onSubmit={handleSubmit} className="relative group">
                 {/* Shadow & Glow */}
                 <div className="absolute inset-0 bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.12)] border border-gray-200 group-focus-within:border-gray-400 group-focus-within:shadow-[0_8px_40px_rgb(0,0,0,0.18)] transition-all duration-300"></div>
                 
                 <div className="relative flex items-center px-4 py-3">
                     <button type="button" className="p-3 bg-gray-100 rounded-full text-slate-900 hover:bg-gray-200 transition-colors">
                        <Plus size={20} />
                     </button>
                     
                     <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-lg px-4 text-slate-900 placeholder-gray-400"
                        disabled={isGenerating}
                     />

                     <div className="flex items-center gap-2">
                        {!input && (
                             <button type="button" className="p-2 text-gray-400 hover:text-slate-900 transition-colors">
                                <Mic size={22} />
                             </button>
                        )}
                        <button 
                            type="submit" 
                            disabled={!input.trim() || isGenerating}
                            className={`p-2 rounded-full transition-all duration-300 ${
                                input.trim() 
                                ? 'bg-slate-900 text-white shadow-lg transform hover:scale-105' 
                                : 'bg-gray-100 text-gray-300'
                            }`}
                        >
                            <ArrowRight size={20} />
                        </button>
                     </div>
                 </div>
             </form>

             <div className="text-center mt-4 text-[11px] text-gray-400 font-medium flex items-center justify-center gap-1.5 opacity-80">
                 <InfoIcon /> Mindtrip can make mistakes. Check important info.
             </div>
         </div>
      </div>
    </div>
  );
};

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
