import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Wand2,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

export const ProfileAnalyzer: React.FC = () => {
  const { currentUser, updateCurrentUser, showToast } = useApp();
  const [isEnhancingBio, setIsEnhancingBio] = useState(false);

  const enhancedBioSuggestion = `Architecture photographer & vinyl digger 🎧 Living for spontaneous rooftop pour-overs, 35mm film grain, and obscure indie jazz records. Let’s trade favorite hidden city spots! ✨`;

  const handleApplyEnhancedBio = () => {
    updateCurrentUser({ bio: enhancedBioSuggestion });
    showToast('AI Bio Applied ✨', 'Your profile bio has been optimized for charisma and authenticity.', 'vibe');
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Score Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-vibe-500/20 via-electric-500/20 to-neon-cyan/20 border border-white/10 flex items-center justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-electric-300">
            <Sparkles className="w-4 h-4 text-electric-400" />
            <span>Vibe AI Profile Score</span>
          </div>
          <h2 className="text-3xl font-display font-black text-white mt-1">
            {currentUser.profileCompletionScore}% <span className="text-xs font-semibold text-emerald-400">Excellent</span>
          </h2>
          <p className="text-[11px] text-slate-300 mt-1 max-w-[210px]">
            Profiles with scores above 85% get 3.8x more quality matches and replies.
          </p>
        </div>

        {/* Circular gauge mock */}
        <div className="relative w-20 h-20 rounded-full border-4 border-vibe-500 flex items-center justify-center bg-dark-900 shadow-vibe-glow">
          <Flame className="w-8 h-8 text-vibe-400 fill-vibe-500" />
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 rounded-2xl bg-dark-850 border border-white/5">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Photo Hook</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">9.4 / 10</div>
        </div>
        <div className="p-3 rounded-2xl bg-dark-850 border border-white/5">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Bio Charisma</div>
          <div className="text-sm font-bold text-vibe-400 mt-1">8.8 / 10</div>
        </div>
        <div className="p-3 rounded-2xl bg-dark-850 border border-white/5">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Vibe Depth</div>
          <div className="text-sm font-bold text-neon-cyan mt-1">9.6 / 10</div>
        </div>
      </div>

      {/* AI Suggestions List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          High-Impact AI Recommendations
        </h3>

        {/* Suggestion 1 */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Bio Call-To-Action Optimization</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">+15% Replies</span>
          </div>
          <p className="text-xs text-slate-300">
            Current bio is strong! Adding an inviting question prompt gives prospective matches an effortless opening line.
          </p>
          <div className="p-2.5 rounded-xl bg-dark-900 border border-electric-500/30 text-xs italic text-slate-200">
            "{enhancedBioSuggestion}"
          </div>
          <button
            onClick={handleApplyEnhancedBio}
            className="w-full py-2 rounded-xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5"
          >
            <Wand2 className="w-3.5 h-3.5" /> Apply AI Suggested Bio
          </button>
        </div>

        {/* Suggestion 2 */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Add 2 More Subculture Hobbies</span>
            </div>
            <span className="text-[10px] text-amber-400 font-bold">+20% Common Ground</span>
          </div>
          <p className="text-xs text-slate-300">
            Niche hobbies like 'Analog Synths' or 'Bouldering' trigger significantly higher conversation engagement.
          </p>
        </div>

        {/* Suggestion 3 */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <TrendingUp className="w-4 h-4 text-neon-cyan" />
              <span>Spotify Track Vibe Check</span>
            </div>
            <span className="text-[10px] text-neon-cyan font-bold">Active</span>
          </div>
          <p className="text-xs text-slate-300">
            Your current anthem 'Bags by Clairo' resonates with 74% of music lovers in your area.
          </p>
        </div>
      </div>
    </div>
  );
};
