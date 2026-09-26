import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { RelationshipGoal, Gender } from '../../types';
import { Sliders, ShieldCheck, MapPin, Check } from 'lucide-react';

export const FilterModal: React.FC = () => {
  const { isFilterOpen, setIsFilterOpen, currentUser, updateCurrentUser, showToast } = useApp();

  const [minAge, setMinAge] = useState(currentUser.minAgePreference || 21);
  const [maxAge, setMaxAge] = useState(currentUser.maxAgePreference || 35);
  const [maxDistance, setMaxDistance] = useState(currentUser.maxDistanceKm || 30);
  const [genderPref, setGenderPref] = useState<Gender>(currentUser.datingPreference || 'Everyone');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [dateModeOnly, setDateModeOnly] = useState(false);

  const handleApply = () => {
    updateCurrentUser({
      minAgePreference: minAge,
      maxAgePreference: maxAge,
      maxDistanceKm: maxDistance,
      datingPreference: genderPref
    });
    setIsFilterOpen(false);
    showToast('Filters Applied 🎯', `Showing matches ${minAge}-${maxAge} within ${maxDistance}km`, 'vibe');
  };

  return (
    <Modal
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      title="Discovery Filters"
      subtitle="Customize who you discover on VibeMate"
    >
      <div className="space-y-6">
        {/* Distance Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Maximum Distance</span>
            <span className="font-bold text-vibe-400">{maxDistance} km</span>
          </div>
          <input
            type="range"
            min="2"
            max="100"
            value={maxDistance}
            onChange={e => setMaxDistance(Number(e.target.value))}
            className="w-full accent-vibe-500 bg-dark-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Age Range Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Age Range</span>
            <span className="font-bold text-electric-400">{minAge} - {maxAge} years</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400">Min Age: {minAge}</label>
              <input
                type="range"
                min="18"
                max={maxAge}
                value={minAge}
                onChange={e => setMinAge(Number(e.target.value))}
                className="w-full accent-electric-500 bg-dark-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400">Max Age: {maxAge}</label>
              <input
                type="range"
                min={minAge}
                max="60"
                value={maxAge}
                onChange={e => setMaxAge(Number(e.target.value))}
                className="w-full accent-electric-500 bg-dark-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Gender preference */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Show Me</label>
          <div className="grid grid-cols-2 gap-2">
            {(['Everyone', 'Woman', 'Man', 'Non-binary'] as Gender[]).map(g => (
              <button
                key={g}
                onClick={() => setGenderPref(g)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  genderPref === g
                    ? 'bg-vibe-500/20 border-vibe-500 text-white shadow-vibe-glow'
                    : 'bg-dark-850 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between p-3 rounded-xl bg-dark-850 border border-white/5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-neon-cyan" />
              <div>
                <div className="text-xs font-semibold text-white">Verified Profiles Only</div>
                <div className="text-[10px] text-slate-400">Show only photo-verified profiles</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={e => setVerifiedOnly(e.target.checked)}
              className="w-5 h-5 accent-vibe-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-dark-850 border border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="text-base">⚡</span>
              <div>
                <div className="text-xs font-semibold text-white">Date Mode Ready</div>
                <div className="text-[10px] text-slate-400">Only people looking for spontaneous hangouts today</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={dateModeOnly}
              onChange={e => setDateModeOnly(e.target.checked)}
              className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleApply}
          className="w-full py-3 rounded-2xl vibe-gradient-bg text-white font-bold text-sm shadow-vibe-glow transition-all"
        >
          Apply Filters
        </button>
      </div>
    </Modal>
  );
};
