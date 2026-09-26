import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Sparkles,
  Shield,
  Bell,
  SlidersHorizontal,
  Zap,
  Camera,
  HeartHandshake
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    currentUser,
    setIsFilterOpen,
    setIsVibeAIHubOpen,
    setIsSafetyCenterOpen,
    setIsNotificationsOpen,
    unreadNotificationsCount,
    setIsCameraOpen,
    setIsVibeCheckOpen,
    setIsDateModeModalOpen
  } = useApp();

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/5 px-4 py-2.5 flex items-center justify-between transition-all">
      {/* Brand logo & Mood badge */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center gap-1.5 cursor-pointer group" onClick={() => setIsVibeCheckOpen(true)}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-vibe-500 via-electric-500 to-neon-cyan p-[1.5px] flex items-center justify-center shadow-vibe-glow group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
              <Flame className="w-4 h-4 text-vibe-400 fill-vibe-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-display font-extrabold tracking-tight vibe-gradient-text leading-none">
              VibeMate
            </span>
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {currentUser.vibeMood ? currentUser.vibeMood.split(' ')[0] : 'Social'}
            </span>
          </div>
        </div>

        {/* Date mode pill */}
        <button
          onClick={() => setIsDateModeModalOpen(true)}
          className={`text-[11px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1 transition-all ${
            currentUser.isDateModeActive
              ? 'bg-gradient-to-r from-amber-500/20 to-vibe-500/20 text-amber-300 border border-amber-500/40 shadow-sm animate-pulse'
              : 'bg-dark-800/80 text-slate-400 border border-white/5 hover:text-slate-200'
          }`}
          title="Date Mode Status"
        >
          <Zap className={`w-3 h-3 ${currentUser.isDateModeActive ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
          <span>{currentUser.isDateModeActive ? 'Date Mode ON' : 'Date Mode'}</span>
        </button>
      </div>

      {/* Action shortcuts */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Camera quick studio */}
        <button
          onClick={() => setIsCameraOpen(true)}
          className="p-2 rounded-xl bg-dark-800/70 hover:bg-dark-700/80 text-slate-300 hover:text-white border border-white/5 transition-all"
          title="Vibe Camera Studio"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Vibe AI Assistant */}
        <button
          onClick={() => setIsVibeAIHubOpen(true)}
          className="relative p-2 rounded-xl bg-gradient-to-r from-electric-500/20 to-neon-violet/20 hover:from-electric-500/30 hover:to-neon-violet/30 text-electric-300 border border-electric-500/30 transition-all flex items-center gap-1 text-xs font-semibold"
          title="Vibe AI Dating Coach & Date Planner"
        >
          <Sparkles className="w-4 h-4 text-electric-400 animate-spin-slow" />
          <span className="hidden sm:inline">Vibe AI</span>
        </button>

        {/* Safety Center */}
        <button
          onClick={() => setIsSafetyCenterOpen(true)}
          className="p-2 rounded-xl bg-dark-800/70 hover:bg-dark-700/80 text-slate-300 hover:text-emerald-400 border border-white/5 transition-all"
          title="Safety Center & Emergency Check-In"
        >
          <Shield className="w-4 h-4" />
        </button>

        {/* Filters (in Discover tab) */}
        {activeTab === 'discover' && (
          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-2 rounded-xl bg-dark-800/70 hover:bg-dark-700/80 text-slate-300 hover:text-vibe-400 border border-white/5 transition-all"
            title="Discovery Filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}

        {/* Notifications */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-xl bg-dark-800/70 hover:bg-dark-700/80 text-slate-300 hover:text-white border border-white/5 transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-vibe-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-dark-900 animate-bounce">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
