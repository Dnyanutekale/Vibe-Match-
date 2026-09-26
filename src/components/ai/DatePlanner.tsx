import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockDateIdeas } from '../../data/mockData';
import { DateIdea } from '../../types';
import {
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  Send,
  HelpCircle,
  Coffee,
  Wine,
  Compass,
  Heart,
  Palette,
  Check
} from 'lucide-react';

export const DatePlanner: React.FC = () => {
  const { matches, sendMessage, showToast } = useApp();

  const [city, setCity] = useState('San Francisco, CA');
  const [selectedBudget, setSelectedBudget] = useState<'any' | '$' | '$$' | '$$$'>('$$');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [targetMatchId, setTargetMatchId] = useState<string>(matches[0]?.id || 'match-1');
  const [isGenerated, setIsGenerated] = useState(true);

  const categories = ['All', 'Coffee & Chill', 'Active & Outdoors', 'Art & Culture', 'Foodie Romance', 'Nightlife & Drinks', 'Cozy & Creative'];

  const filteredIdeas = mockDateIdeas.filter(idea => {
    if (selectedCategory !== 'All' && idea.category !== selectedCategory) return false;
    return true;
  });

  const handleSendInvite = (date: DateIdea) => {
    const inviteText = `Hey! Vibe AI helped me plan this date: "${date.title}". Location: ${date.locationTip} (${date.estimatedBudget}). Down to check it out this week? ✨`;
    sendMessage(targetMatchId, inviteText, 'date_invite');
    showToast('Date Invitation Sent! 💌', `Sent "${date.title}" to your match chat!`, 'vibe');
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Date Planner Header */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/20 to-vibe-500/20 border border-amber-500/30 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Date Architect</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 max-w-[240px]">
            Generate low-pressure, high-chemistry date itineraries tailored to shared passions.
          </p>
        </div>
      </div>

      {/* Filter Parameters */}
      <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">City / Region</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">Budget Level</label>
            <div className="flex gap-1">
              {(['$', '$$', '$$$'] as const).map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBudget(b)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedBudget === b
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                      : 'bg-dark-900 border-white/10 text-slate-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category horizontal scroll */}
        <div>
          <label className="text-[10px] font-semibold text-slate-400 block mb-1.5">Vibe Theme</label>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold shrink-0 border transition-all ${
                  selectedCategory === cat
                    ? 'bg-vibe-500 border-vibe-400 text-white shadow-vibe-glow'
                    : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Itineraries Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Curated Date Concepts ({filteredIdeas.length})
        </h3>

        {filteredIdeas.map(date => (
          <div
            key={date.id}
            className="p-4 rounded-3xl bg-dark-900 border border-white/10 space-y-3 shadow-lg hover:border-white/20 transition-all"
          >
            {/* Header info */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-vibe-500/20 text-vibe-400 text-[10px] font-bold border border-vibe-500/30">
                  {date.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5">{date.title}</h4>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-xl border border-emerald-500/20">
                {date.vibeScore}% Vibe
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{date.description}</p>

            {/* Meta tags */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-dark-850 p-2.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-vibe-400 shrink-0" />
                <span className="truncate">{date.locationTip}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
                <span>{date.durationHours}</span>
              </div>
            </div>

            {/* Suggested Icebreakers for the Date */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold text-electric-300 uppercase tracking-wider flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Icebreaker for this spot:
              </div>
              <p className="text-[11px] text-slate-300 italic bg-dark-850/50 p-2 rounded-xl border border-white/5">
                "{date.suggestedIcebreakers[0]}"
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleSendInvite(date)}
                className="flex-1 py-2.5 rounded-xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Send Date Invite to Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
