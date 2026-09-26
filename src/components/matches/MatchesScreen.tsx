import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MatchItem } from '../../types';
import {
  Heart,
  MessageCircle,
  Sparkles,
  Search,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Wand2
} from 'lucide-react';

export const MatchesScreen: React.FC = () => {
  const {
    matches,
    conversations,
    setActiveConversationId,
    setActiveTab,
    setPreviewProfile,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = matches.filter(m =>
    m.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.user.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.user.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenChat = (match: MatchItem) => {
    setActiveConversationId(match.id);
    setActiveTab('messages');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-3 space-y-5 pb-24">
      {/* Header Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search matches, passions, vibes..."
          className="w-full bg-dark-850 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
        />
      </div>

      {/* New Matches Bubble Carousel */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-vibe-400 fill-vibe-500" />
            New Matches ({matches.length})
          </h2>
          <span className="text-[11px] text-vibe-400 font-semibold cursor-pointer">View All</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
          {matches.map(match => (
            <div
              key={match.id}
              onClick={() => handleOpenChat(match)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className="relative w-16 h-16 rounded-2xl p-[2px] story-ring-unseen shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={match.user.photos[0]}
                  alt={match.user.name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
                {match.user.isDateModeActive && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-dark-950 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-dark-900 shadow-sm">
                    ⚡
                  </span>
                )}
                {match.hasUnreadMessage && (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-vibe-500 rounded-full border-2 border-dark-900 animate-pulse" />
                )}
              </div>
              <span className="text-xs font-semibold text-slate-200 max-w-[68px] truncate text-center">
                {match.user.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Match Cards & Conversation Starters */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Active Matches & Icebreakers
        </h2>

        {filteredMatches.length === 0 ? (
          <div className="text-center py-10 bg-dark-900/60 rounded-3xl border border-white/5 p-6">
            <p className="text-xs text-slate-400">No matches found for "{searchQuery}".</p>
          </div>
        ) : (
          filteredMatches.map(match => (
            <div
              key={match.id}
              className="p-4 rounded-3xl bg-dark-900 border border-white/10 hover:border-white/20 transition-all shadow-lg space-y-3"
            >
              {/* Top Row: User Avatar, Name, Compatibility, Actions */}
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setPreviewProfile(match.user)}
                >
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={match.user.photos[0]}
                      alt={match.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-white">{match.user.name}</h3>
                      <span className="text-xs text-slate-400">{match.user.age}</span>
                      {match.user.verified && (
                        <ShieldCheck className="w-4 h-4 text-neon-cyan" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span>{match.user.profession}</span>
                      <span>•</span>
                      <span className="text-slate-500">{match.matchedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Compatibility Badge */}
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-vibe-500/20 text-vibe-400 border border-vibe-500/30 text-[11px] font-bold">
                    {match.compatibilityScore}% Vibe
                  </span>
                </div>
              </div>

              {/* AI Suggested Icebreaker Snippet */}
              {match.conversationIcebreakerSuggested && (
                <div className="p-2.5 rounded-2xl bg-dark-850 border border-electric-500/20 text-xs flex items-start gap-2.5">
                  <Wand2 className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-electric-300 uppercase tracking-wider">
                      Vibe AI Suggested Starter
                    </div>
                    <p className="text-[11px] text-slate-300 italic mt-0.5 line-clamp-2">
                      "{match.conversationIcebreakerSuggested}"
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons: Chat Now & View Profile */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleOpenChat(match)}
                  className="flex-1 py-2.5 rounded-xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5 hover:opacity-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Start Chat</span>
                </button>
                <button
                  onClick={() => setPreviewProfile(match.user)}
                  className="px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 font-semibold text-xs border border-white/10 transition-all"
                >
                  Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
