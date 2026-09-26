import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { EyeOff, Eye, MapPin, CheckCheck, Lock } from 'lucide-react';

export const PrivacySettingsModal: React.FC = () => {
  const { isPrivacyModalOpen, setIsPrivacyModalOpen, currentUser, updateCurrentUser, showToast } = useApp();

  const [incognito, setIncognito] = useState(currentUser.incognitoMode || false);
  const [onlineVisible, setOnlineVisible] = useState(currentUser.onlineStatusVisible ?? true);
  const [readReceipts, setReadReceipts] = useState(currentUser.readReceipts ?? true);
  const [locationType, setLocationType] = useState<'exact' | 'approximate' | 'hidden'>(currentUser.locationVisibility || 'approximate');

  const handleSave = () => {
    updateCurrentUser({
      incognitoMode: incognito,
      onlineStatusVisible: onlineVisible,
      readReceipts: readReceipts,
      locationVisibility: locationType
    });
    setIsPrivacyModalOpen(false);
  };

  return (
    <Modal
      isOpen={isPrivacyModalOpen}
      onClose={() => setIsPrivacyModalOpen(false)}
      title="Privacy & Visibility"
      subtitle="Control how and when other members discover your profile"
    >
      <div className="space-y-4">
        {/* Incognito Mode */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Incognito Mode</div>
              <div className="text-[10px] text-slate-400">Only people you have swiped right on can see you</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={incognito}
            onChange={e => setIncognito(e.target.checked)}
            className="w-5 h-5 accent-purple-500 rounded"
          />
        </div>

        {/* Online Status */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Show Online Status</div>
              <div className="text-[10px] text-slate-400">Display green dot when active on VibeMate</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={onlineVisible}
            onChange={e => setOnlineVisible(e.target.checked)}
            className="w-5 h-5 accent-emerald-500 rounded"
          />
        </div>

        {/* Read Receipts */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 text-neon-cyan flex items-center justify-center">
              <CheckCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Read Receipts</div>
              <div className="text-[10px] text-slate-400">Let matches see when you've read messages</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={readReceipts}
            onChange={e => setReadReceipts(e.target.checked)}
            className="w-5 h-5 accent-neon-cyan rounded"
          />
        </div>

        {/* Location Visibility Mode */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-2">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-vibe-400" />
            <span>Location Distance Privacy</span>
          </div>
          <p className="text-[10px] text-slate-400">
            We never share your exact GPS coordinates. Choose your display preference:
          </p>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {(['approximate', 'hidden'] as const).map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setLocationType(opt)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                  locationType === opt
                    ? 'bg-vibe-500/20 border-vibe-500 text-white shadow-vibe-glow'
                    : 'bg-dark-900 border-white/5 text-slate-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 rounded-2xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow"
        >
          Save Privacy Settings
        </button>
      </div>
    </Modal>
  );
};
