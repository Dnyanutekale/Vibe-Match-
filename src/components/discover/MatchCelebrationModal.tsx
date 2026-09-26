import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  MessageCircle,
  X,
  Mic,
  Image as ImageIcon,
  Smile,
  Flame,
  Wand2
} from 'lucide-react';

export const MatchCelebrationModal: React.FC = () => {
  const {
    matchedProfile,
    setMatchedProfile,
    currentUser,
    setActiveTab,
    setActiveConversationId,
    sendMessage,
    showToast
  } = useApp();

  const [customMessage, setCustomMessage] = useState('');
  const [selectedIcebreaker, setSelectedIcebreaker] = useState<string>('');

  if (!matchedProfile) return null;

  const icebreakers = [
    `Hey ${matchedProfile.name.split(' ')[0]}! ✨ Loved your photo. Are you more of a morning pour-over or late-night jazz person?`,
    `We both love ${matchedProfile.interests[0] || 'art'}! What's the most memorable experience you've had with it lately?`,
    `Our vibes matched at ${matchedProfile.compatibilityScore || 94}% ⚡ What's one song that never fails to put you in a good mood?`,
    `Your bio made me smile! If we were planning a first date this week, what vibe are we going with?`
  ];

  const handleSendMatchMessage = (textToSend?: string) => {
    const text = textToSend || customMessage || selectedIcebreaker || 'Hey! Loved matching with you ✨';
    
    // Find or create match ID
    const convId = 'match-1'; // or active match ID
    sendMessage(convId, text, 'text');
    
    setMatchedProfile(null);
    setActiveTab('messages');
    setActiveConversationId(convId);
    showToast('Match Message Sent! 💬', undefined, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-dark-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 animate-fadeIn overflow-y-auto no-scrollbar">
      {/* Top Close */}
      <div className="flex justify-end">
        <button
          onClick={() => setMatchedProfile(null)}
          className="p-2 rounded-full bg-dark-800/80 text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Match Animation & Avatars */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-sm mx-auto">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-vibe-500/20 via-electric-500/20 to-neon-cyan/20 border border-vibe-500/40 shadow-vibe-glow">
          <Sparkles className="w-4 h-4 text-vibe-400 animate-spin-slow" />
          <span className="text-xs font-bold text-white tracking-wider uppercase">It's a Vibe Match!</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-4xl font-display font-black vibe-gradient-text tracking-tight animate-heart-burst">
            Vibe Aligned! ✨
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            You and <span className="text-white font-bold">{matchedProfile.name.split(' ')[0]}</span> both liked each other.
          </p>
        </div>

        {/* Dual Overlapping Glowing Avatars */}
        <div className="relative flex items-center justify-center my-2">
          {/* User Avatar */}
          <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-vibe-500 to-rose-500 shadow-vibe-glow z-10 -mr-4">
            <img
              src={currentUser.photos[0]}
              alt="You"
              className="w-full h-full object-cover rounded-full border-2 border-dark-950"
            />
          </div>

          {/* Heart Center Sparkle */}
          <div className="absolute z-30 w-10 h-10 rounded-full bg-dark-900 border-2 border-vibe-500 flex items-center justify-center shadow-lg animate-pulse">
            <Flame className="w-5 h-5 text-vibe-400 fill-vibe-500" />
          </div>

          {/* Matched Avatar */}
          <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-electric-500 to-neon-cyan shadow-neon-glow z-20 -ml-4">
            <img
              src={matchedProfile.photos[0]}
              alt={matchedProfile.name}
              className="w-full h-full object-cover rounded-full border-2 border-dark-950"
            />
          </div>
        </div>

        {/* AI Icebreaker Suggestions */}
        <div className="w-full space-y-2 text-left">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
            <span className="flex items-center gap-1.5 text-electric-300">
              <Wand2 className="w-3.5 h-3.5" /> Vibe AI Icebreakers:
            </span>
            <span className="text-[10px] text-slate-500">Tap to select</span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
            {icebreakers.map((ib, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIcebreaker(ib);
                  setCustomMessage(ib);
                }}
                className={`w-full p-2.5 rounded-xl text-left text-xs transition-all border ${
                  selectedIcebreaker === ib
                    ? 'bg-electric-500/20 border-electric-400 text-white shadow-neon-glow'
                    : 'bg-dark-900/80 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                {ib}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Message Input Bar */}
        <div className="w-full relative">
          <input
            type="text"
            value={customMessage}
            onChange={e => setCustomMessage(e.target.value)}
            placeholder={`Say something nice to ${matchedProfile.name.split(' ')[0]}...`}
            className="w-full bg-dark-900 border border-white/15 rounded-2xl pl-4 pr-12 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500 shadow-inner"
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMatchMessage();
            }}
          />
          <button
            onClick={() => handleSendMatchMessage()}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-xl vibe-gradient-bg text-white shadow-md flex items-center justify-center hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Option to Keep Swiping */}
      <div className="pt-4 text-center max-w-sm mx-auto w-full">
        <button
          onClick={() => setMatchedProfile(null)}
          className="text-xs font-semibold text-slate-400 hover:text-white py-2 transition-colors"
        >
          Keep Swiping
        </button>
      </div>
    </div>
  );
};
