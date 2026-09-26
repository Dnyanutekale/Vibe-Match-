import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Zap, Coffee, Clock, Sparkles, MapPin, Check } from 'lucide-react';

export const DateModeModal: React.FC = () => {
  const { isDateModeModalOpen, setIsDateModeModalOpen, currentUser, toggleDateMode } = useApp();

  return (
    <Modal
      isOpen={isDateModeModalOpen}
      onClose={() => setIsDateModeModalOpen(false)}
      title="Date Mode ⚡"
      subtitle="Spontaneous hangout availability radar"
    >
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-vibe-500/20 to-orange-500/20 border border-amber-500/40 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mx-auto text-amber-300 shadow-sm animate-pulse">
            <Zap className="w-6 h-6 fill-amber-400" />
          </div>
          <h4 className="text-sm font-bold text-white">
            {currentUser.isDateModeActive ? 'You are currently DATE READY' : 'Date Mode is currently OFF'}
          </h4>
          <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
            When active, nearby matches in your city see a glowing ⚡ badge on your profile indicating you are down for spontaneous coffee, climbing, or drinks today!
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neon-cyan" />
            <span>Auto-expires at midnight to protect your schedule</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-vibe-400" />
            <span>Only matches within 15 km will see your active badge</span>
          </div>
        </div>

        <button
          onClick={() => {
            toggleDateMode();
            setIsDateModeModalOpen(false);
          }}
          className={`w-full py-3 rounded-2xl font-bold text-xs shadow-lg transition-all ${
            currentUser.isDateModeActive
              ? 'bg-dark-800 text-slate-300 hover:text-white border border-white/10'
              : 'bg-gradient-to-r from-amber-500 to-vibe-500 text-dark-950 font-black shadow-vibe-glow'
          }`}
        >
          {currentUser.isDateModeActive ? 'Turn Off Date Mode' : 'Turn On Date Mode ⚡'}
        </button>
      </div>
    </Modal>
  );
};
