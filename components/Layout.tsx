import React, { useState } from 'react';
import { 
  MessageCircle, 
  Search, 
  Heart, 
  Briefcase, 
  Bell, 
  Compass, 
  PlusSquare, 
  ChevronLeft, 
  Sparkles,
  User,
  MoreHorizontal,
  Menu,
  X
} from 'lucide-react';
import { Page } from '../types';
import { UpdatesDrawer } from './UpdatesDrawer';
import { ChatsDrawer } from './ChatsDrawer';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  isUpdatesOpen: boolean;
  onToggleUpdates: () => void;
  isChatsOpen: boolean;
  onToggleChats: () => void;
  onCreateTrip: () => void;
  // Chat Drawer specific props
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activePage, 
  onNavigate, 
  isUpdatesOpen, 
  onToggleUpdates,
  isChatsOpen,
  onToggleChats,
  onCreateTrip,
  onNewChat,
  onSelectChat
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNav = (page: Page) => {
    if (page === 'updates') {
      if (isChatsOpen) onToggleChats(); // Close chats if opening updates
      onToggleUpdates();
    } else if (page === 'chat') {
      // Logic: If we are already on chat, toggle the drawer.
      // If we are NOT on chat, go to chat page.
      if (activePage === 'chat') {
          if (isUpdatesOpen) onToggleUpdates();
          onToggleChats();
      } else {
          onNavigate('chat');
          // Optionally open drawer when navigating to chat? 
          // Design preference: maybe not immediately.
      }
    } else {
      // Close all drawers if navigating to other pages
      if (isUpdatesOpen) onToggleUpdates();
      if (isChatsOpen) onToggleChats();
      onNavigate(page);
    }
    setIsMobileOpen(false);
  };

  return (
    <div className="flex h-full w-full bg-white text-slate-900 font-sans">
      
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-white rounded-full shadow-md border border-gray-200 text-slate-900"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed md:relative z-50 h-full w-[280px] bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header / Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('chat')}>
            <Sparkles className="text-slate-900 fill-current" size={24} />
            <span className="text-xl font-bold tracking-tight text-slate-900">dmc suite.</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Scrollable Nav Content */}
        <div className="flex-1 overflow-y-auto px-4 space-y-6">
          
          {/* Main Links */}
          <nav className="space-y-1">
            <NavItem 
              icon={<MessageCircle size={20} />} 
              label="Chats" 
              badge="1" 
              active={(activePage === 'chat' && !isUpdatesOpen) || isChatsOpen} 
              onClick={() => handleNav('chat')}
            />
            <NavItem 
              icon={<Search size={20} />} 
              label="Explore" 
              active={activePage === 'explore' && !isUpdatesOpen && !isChatsOpen}
              onClick={() => handleNav('explore')}
            />
            <NavItem 
              icon={<Heart size={20} />} 
              label="Saved" 
              active={activePage === 'saved' && !isUpdatesOpen && !isChatsOpen}
              onClick={() => handleNav('saved')}
            />
            <NavItem 
              icon={<Briefcase size={20} />} 
              label="Trips" 
              active={activePage === 'trips' && !isUpdatesOpen && !isChatsOpen}
              onClick={() => handleNav('trips')}
            />
            <NavItem 
              icon={<Bell size={20} />} 
              label="Updates" 
              active={isUpdatesOpen} // Highlight when drawer is open
              onClick={() => handleNav('updates')}
            />
            <NavItem 
              icon={<Compass size={20} />} 
              label="Inspiration" 
              active={activePage === 'inspiration' && !isUpdatesOpen && !isChatsOpen}
              onClick={() => handleNav('inspiration')}
            />
            <NavItem 
              icon={<PlusSquare size={20} />} 
              label="Create" 
              active={activePage === 'create' && !isUpdatesOpen && !isChatsOpen}
              onClick={() => handleNav('create')}
            />
          </nav>

          {/* New Chat CTA */}
          <div>
            <button 
              onClick={() => {
                onNewChat();
                if (isChatsOpen) onToggleChats();
                onNavigate('chat');
              }}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-slate-900 font-semibold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              New chat
            </button>
          </div>

          {/* Promo Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-200 p-5 mt-auto">
             <button className="absolute top-2 right-2 text-slate-600/50 hover:text-slate-900">
               <X size={14} />
             </button>
             <h3 className="font-bold text-slate-900 text-lg mb-1">DMC Mobile</h3>
             <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
               Real-time coordination for on-site agents and clients.
             </p>
             <div className="flex justify-end">
               <img 
                 src="https://images.unsplash.com/photo-1512428559087-560fa0cec34f?auto=format&fit=crop&q=80&w=100&h=150" 
                 alt="App Preview" 
                 className="w-12 h-16 object-cover rounded-md shadow-md -rotate-12 translate-y-2 translate-x-1 border-2 border-white"
               />
             </div>
             <button className="text-xs font-bold underline decoration-slate-900/30 hover:decoration-slate-900 text-slate-900 mt-[-20px] relative z-10">
               Get the App
             </button>
          </div>
        </div>

        {/* Footer / Profile */}
        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
              <User size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">Travel Agent</h4>
              <p className="text-xs text-slate-500">Premium Plan</p>
            </div>
            <MoreHorizontal size={18} className="text-gray-400 group-hover:text-slate-900" />
          </div>
          
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4 px-2 text-[11px] text-gray-400">
            <a href="#" className="hover:text-gray-600">Company</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600">Contact</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600">Help</a>
            <div className="w-full"></div>
            <a href="#" className="hover:text-gray-600">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600">Privacy</a>
          </div>
          
          <div className="mt-3 px-2 text-[11px] text-gray-300">
            © 2025 DMC Suite, Inc.
          </div>
        </div>
      </aside>

      {/* Updates Drawer (Slide-out Overlay) */}
      <UpdatesDrawer 
        isOpen={isUpdatesOpen} 
        onClose={onToggleUpdates}
        onCreateTrip={onCreateTrip}
      />

      {/* Chats Drawer (Slide-out Overlay) */}
      <ChatsDrawer 
        isOpen={isChatsOpen}
        onClose={onToggleChats}
        onNewChat={onNewChat}
        onSelectChat={onSelectChat}
        onNewTrip={onCreateTrip}
        activeChatId={'current'} // Mocked
      />

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Background Overlay when Drawers are open */}
      {(isUpdatesOpen || isChatsOpen) && (
        <div 
          className="fixed inset-0 bg-black/5 z-20 md:left-[280px]"
          onClick={() => {
              if (isUpdatesOpen) onToggleUpdates();
              if (isChatsOpen) onToggleChats();
          }}
        />
      )}
      
      {/* Main Application Area */}
      <main className="flex-1 h-full overflow-hidden relative bg-white">
        {children}
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, badge, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all group
      ${active ? 'bg-gray-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'}
    `}
  >
    <div className="flex items-center gap-4">
      <span className={`${active ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-900'}`}>
        {icon}
      </span>
      <span className="text-base">{label}</span>
    </div>
    {badge && (
      <span className="w-6 h-6 flex items-center justify-center bg-gray-200 text-xs font-bold text-slate-700 rounded-full">
        {badge}
      </span>
    )}
  </button>
);