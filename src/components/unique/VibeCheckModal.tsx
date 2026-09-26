import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Sparkles, Flame, Coffee, Compass, Music, Palette, Utensils, Heart } from 'lucide-react';

export const VibeCheckModal: React.FC = () => {
  const { isVibeCheckOpen, setIsVibeCheckOpen, currentUser, setVibeMood } = useApp();

  const moods = [
    { title: 'Creative & Spontaneous 🎨', desc: 'Down for photo walks, art galleries, and record stores', icon: Palette },
    { title: 'Chill & Cozy ☕', desc: 'Low-key coffee, indie bookshops, and slow conversations', icon: Coffee },
    { title: 'Electric Energy ⚡', desc: 'Bouldering, live electronic sets, and high tempo adventures', icon: Flame },
    { title: 'Romantic & Foodie 🍷', desc: 'Natural wine, handmade pasta, and candlelit dinners', icon: Utensils },
    { title: 'Deep & Philosophical 🌌', desc: 'Stargazing, acoustic tunes, and long heartfelt chats', icon: Compass },
    { title: 'Music & Audiophile 🎧', desc: 'Vinyl listening lounges and underground live gigs', icon: Music }
  ];

  const handleSelect = (moodTitle: string) => {
    setVibeMood(moodTitle);
    setIsVibeCheckOpen(false);
  };

  return (
    <Modal
      isOpen={isVibeCheckOpen}
      onClose={() => setIsVibeCheckOpen(false)}
      title="Vibe Check ✨"
      subtitle="What energy are you putting out into the world today?"
    >
      <div className="space-y-2.5">
        {moods.map((m, i) => {
          const Icon = m.icon;
          const isCurrent = currentUser.vibeMood === m.title;

          return (
            <div
              key={i}
              onClick={() => handleSelect(m.title)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                isCurrent
                  ? 'bg-gradient-to-r from-vibe-500/20 to-electric-500/20 border-vibe-400 text-white shadow-vibe-glow'
                  : 'bg-dark-850 border-white/5 hover:border-white/20 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-dark-900 border border-white/10 text-vibe-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{m.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{m.desc}</p>
                </div>
              </div>
              {isCurrent && (
                <span className="w-2.5 h-2.5 rounded-full bg-vibe-400 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
