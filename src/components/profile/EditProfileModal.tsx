import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { RelationshipGoal } from '../../types';
import { Camera, Plus, Trash2, Check } from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const { isEditProfileOpen, setIsEditProfileOpen, currentUser, updateCurrentUser, showToast } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [profession, setProfession] = useState(currentUser.profession);
  const [education, setEducation] = useState(currentUser.education);
  const [relationshipGoal, setRelationshipGoal] = useState<RelationshipGoal>(currentUser.relationshipGoal);
  const [height, setHeight] = useState(currentUser.height || `5'11"`);
  const [zodiac, setZodiac] = useState(currentUser.zodiac || 'Libra ♎');
  const [interestsStr, setInterestsStr] = useState(currentUser.interests.join(', '));

  const handleSave = () => {
    const updatedInterests = interestsStr.split(',').map(s => s.trim()).filter(Boolean);
    updateCurrentUser({
      name,
      bio,
      profession,
      education,
      relationshipGoal,
      height,
      zodiac,
      interests: updatedInterests
    });
    setIsEditProfileOpen(false);
  };

  return (
    <Modal
      isOpen={isEditProfileOpen}
      onClose={() => setIsEditProfileOpen(false)}
      title="Edit Profile"
      subtitle="Update your photos, bio, and vibe preferences"
    >
      <div className="space-y-4">
        {/* Photo Gallery Grid */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-2">Photos</label>
          <div className="grid grid-cols-3 gap-2">
            {currentUser.photos.map((p, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                <img src={p} alt="Photo" className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-dark-950/80 text-vibe-400 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Main
                  </span>
                )}
              </div>
            ))}
            <button
              onClick={() => showToast('Upload Photo', 'In production, uploads new photo from camera roll.', 'info')}
              className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/20 hover:border-vibe-500/60 bg-dark-850 flex flex-col items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <Camera className="w-5 h-5 text-vibe-400 mb-1" />
              <span className="text-[10px]">+ Add</span>
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">About Me (Bio)</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full bg-dark-850 border border-white/10 rounded-xl p-3 text-xs text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Profession</label>
              <input
                type="text"
                value={profession}
                onChange={e => setProfession(e.target.value)}
                className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Education</label>
              <input
                type="text"
                value={education}
                onChange={e => setEducation(e.target.value)}
                className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Relationship Goal</label>
            <select
              value={relationshipGoal}
              onChange={e => setRelationshipGoal(e.target.value as RelationshipGoal)}
              className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="Serious relationship">Serious relationship</option>
              <option value="Casual dating">Casual dating</option>
              <option value="Friendship">Friendship</option>
              <option value="Networking">Networking</option>
              <option value="Still figuring it out">Still figuring it out</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Interests (comma separated)</label>
            <input
              type="text"
              value={interestsStr}
              onChange={e => setInterestsStr(e.target.value)}
              className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 rounded-2xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow"
        >
          Save Profile
        </button>
      </div>
    </Modal>
  );
};
