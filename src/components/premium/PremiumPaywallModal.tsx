import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import {
  Crown,
  Sparkles,
  Zap,
  RotateCcw,
  Eye,
  ShieldCheck,
  Check,
  Flame,
  Award
} from 'lucide-react';

export const PremiumPaywallModal: React.FC = () => {
  const { isPremiumModalOpen, setIsPremiumModalOpen, currentUser, updateCurrentUser, showToast } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<'gold' | 'platinum'>('platinum');

  const handleSubscribeMock = () => {
    updateCurrentUser({
      isPremium: true,
      premiumTier: selectedPlan === 'gold' ? 'Gold' : 'Platinum'
    });
    setIsPremiumModalOpen(false);
    showToast(`Upgraded to Vibe ${selectedPlan === 'gold' ? 'Gold' : 'Platinum'}! 👑`, 'All premium features, unlimited likes, and AI tools are unlocked.', 'vibe');
  };

  const features = [
    { title: 'Unlimited Likes & Super Likes', desc: 'No daily swipe caps', icon: HeartIconMock },
    { title: 'See Who Liked You', desc: 'Match instantly without swiping', icon: Eye },
    { title: 'Unlimited Rewinds', desc: 'Undo accidental left swipes anytime', icon: RotateCcw },
    { title: '1 Free Profile Boost / Week', desc: 'Be the top profile in your city for 30m', icon: Zap },
    { title: 'Vibe AI Unlimited Wingman', desc: 'Real-time conversation generator & date planner', icon: Sparkles },
    { title: 'Incognito Mode & Travel Passport', desc: 'Browse privately & switch cities anywhere', icon: Crown }
  ];

  function HeartIconMock(props: any) {
    return <Flame {...props} className="w-4 h-4 text-vibe-400 fill-vibe-500" />;
  }

  return (
    <Modal
      isOpen={isPremiumModalOpen}
      onClose={() => setIsPremiumModalOpen(false)}
      title="VibeMate Premium"
      subtitle="Unlock the ultimate social & dating discovery toolkit"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Tier Selector */}
        <div className="grid grid-cols-2 gap-3">
          {/* Gold */}
          <div
            onClick={() => setSelectedPlan('gold')}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
              selectedPlan === 'gold'
                ? 'bg-amber-500/15 border-amber-400 shadow-md scale-102'
                : 'bg-dark-850 border-white/5 opacity-70'
            }`}
          >
            <div className="text-[10px] font-bold text-amber-400 uppercase">Vibe Gold</div>
            <div className="text-base font-extrabold text-white mt-0.5">$9.99<span className="text-xs font-normal text-slate-400">/mo</span></div>
            <div className="text-[10px] text-slate-300 mt-1">Essential boosts & rewinds</div>
          </div>

          {/* Platinum */}
          <div
            onClick={() => setSelectedPlan('platinum')}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
              selectedPlan === 'platinum'
                ? 'bg-gradient-to-br from-electric-500/20 to-vibe-500/20 border-electric-400 shadow-neon-glow scale-102'
                : 'bg-dark-850 border-white/5 opacity-70'
            }`}
          >
            <span className="absolute top-0 right-0 bg-electric-500 text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase">
              Best Vibe
            </span>
            <div className="text-[10px] font-bold text-electric-300 uppercase">Vibe Platinum</div>
            <div className="text-base font-extrabold text-white mt-0.5">$19.99<span className="text-xs font-normal text-slate-400">/mo</span></div>
            <div className="text-[10px] text-slate-300 mt-1">Full AI suite + Incognito</div>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 p-3.5 rounded-2xl bg-dark-850 border border-white/5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-start gap-2.5 text-xs">
                <div className="p-1.5 rounded-lg bg-dark-900 border border-white/10 shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-vibe-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">{f.title}</div>
                  <div className="text-[10px] text-slate-400">{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubscribeMock}
          className="w-full py-3.5 rounded-2xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-2 hover:opacity-95 transition-all"
        >
          <Crown className="w-4 h-4" />
          <span>Unlock Vibe {selectedPlan === 'gold' ? 'Gold' : 'Platinum'} (Demo)</span>
        </button>

        <p className="text-[10px] text-center text-slate-500">
          This is an interactive portfolio subscription UI mockup. No real payment required.
        </p>
      </div>
    </Modal>
  );
};
