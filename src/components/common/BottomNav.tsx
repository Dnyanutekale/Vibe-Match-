import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import {
  Flame,
  Heart,
  MessageCircle,
  Radio,
  Compass,
  User
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, matches, conversations, stories, currentUser } = useApp();

  const unreadMatchesCount = matches.filter(m => m.hasUnreadMessage).length;
  const unreadChatsCount = Object.values(conversations).reduce((acc, c) => acc + c.unreadCount, 0);
  const unseenStoriesCount = stories.filter(s => s.hasUnseen).length;

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeCount?: number;
    gradient?: string;
  }> = [
    {
      id: 'discover',
      label: 'Discover',
      icon: Flame,
      gradient: 'from-vibe-500 to-rose-600'
    },
    {
      id: 'matches',
      label: 'Matches',
      icon: Heart,
      badgeCount: unreadMatchesCount,
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'stories',
      label: 'Stories',
      icon: Radio,
      badgeCount: unseenStoriesCount,
      gradient: 'from-electric-500 to-purple-600'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      badgeCount: unreadChatsCount,
      gradient: 'from-neon-cyan to-blue-600'
    },
    {
      id: 'feed',
      label: 'Vibe Feed',
      icon: Compass,
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      gradient: 'from-emerald-400 to-teal-600'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-bottom-bar px-2 py-1.5 flex items-center justify-around max-w-lg mx-auto border-t border-white/10 sm:rounded-t-3xl shadow-2xl">
      {navItems.map(item => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-300 ${
              isActive
                ? 'text-white scale-105'
                : 'text-slate-400 hover:text-slate-200 hover:scale-102'
            }`}
          >
            {/* Active glow background */}
            {isActive && (
              <div
                className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-20 rounded-2xl blur-sm`}
              />
            )}

            <div className="relative flex items-center justify-center">
              <Icon
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive ? 'stroke-[2.5px] scale-110 text-white' : 'stroke-[1.8px]'
                }`}
              />

              {/* Badge indicator */}
              {item.badgeCount && item.badgeCount > 0 ? (
                <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 bg-vibe-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-dark-950">
                  {item.badgeCount > 9 ? '9+' : item.badgeCount}
                </span>
              ) : null}
            </div>

            <span
              className={`text-[10px] mt-1 font-medium transition-all ${
                isActive ? 'font-semibold text-white' : 'text-slate-400'
              }`}
            >
              {item.label}
            </span>

            {/* Micro active dot */}
            {isActive && (
              <div className="w-1 h-1 rounded-full bg-vibe-400 mt-0.5 animate-pulse" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
