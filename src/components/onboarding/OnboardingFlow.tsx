import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RelationshipGoal, Gender } from '../../types';
import {
  Flame,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Camera,
  MapPin,
  Calendar,
  Heart,
  Check,
  ShieldCheck,
  Zap,
  Smile,
  Compass,
  Briefcase
} from 'lucide-react';

const RELATIONSHIP_GOALS: RelationshipGoal[] = [
  'Serious relationship',
  'Casual dating',
  'Friendship',
  'Networking',
  'Still figuring it out'
];

const INTEREST_TAGS = [
  'Architecture', 'Vinyl Records', 'Specialty Coffee', 'Film Photography', 'Indie Rock',
  'Bouldering', 'Natural Wine', 'Art Galleries', 'Electronic Music', 'Sourdough Baking',
  'Thrifting', 'Cyberpunk', 'Astrophotography', 'Hiking', 'Sci-Fi Books', 'Matcha',
  'Ceramics', 'Board Games', 'Live Gigs', 'Botanical Gardens', 'Road Trips'
];

const HOBBY_TAGS = [
  'Modular Synths', 'Cold Plunge', 'Pottery Wheel', 'Street Tacos', 'Running 10K',
  'Vintage Digicams', 'Game Jams', 'Cooking Italian', 'Bonsai Tree Care', 'Yoga Flow'
];

export const OnboardingFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { currentUser, updateCurrentUser, showToast } = useApp();

  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    dob: currentUser.dob || '2000-05-15',
    gender: currentUser.gender || 'Man',
    datingPreference: currentUser.datingPreference || 'Everyone',
    relationshipGoal: currentUser.relationshipGoal || 'Serious relationship',
    bio: currentUser.bio || '',
    photos: currentUser.photos || [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    profession: currentUser.profession || 'Creative Technologist',
    education: currentUser.education || 'Design Institute',
    interests: currentUser.interests || ['Film Photography', 'Specialty Coffee', 'Indie Rock'],
    hobbies: currentUser.hobbies || ['Analog Synths', 'Midnight Cycling'],
    locationEnabled: true
  });

  const totalSteps = 8;
  const progressPercent = Math.round(((step + 1) / totalSteps) * 100);

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    } else {
      // Save and complete
      updateCurrentUser({
        ...formData,
        profileCompletionScore: 95
      });
      showToast('Welcome to VibeMate! ✨', 'Your profile is ready. Start discovering matches!', 'vibe');
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const toggleInterest = (tag: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(tag);
      return {
        ...prev,
        interests: exists ? prev.interests.filter(t => t !== tag) : [...prev.interests, tag]
      };
    });
  };

  const toggleHobby = (tag: string) => {
    setFormData(prev => {
      const exists = prev.hobbies.includes(tag);
      return {
        ...prev,
        hobbies: exists ? prev.hobbies.filter(t => t !== tag) : [...prev.hobbies, tag]
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-dark-950 flex flex-col justify-between p-6 max-w-md mx-auto overflow-y-auto no-scrollbar">
      {/* Top Header & Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="p-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-vibe-500 fill-vibe-500" />
              <span className="font-display font-black vibe-gradient-text text-lg">VibeMate</span>
            </div>
          )}

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400">Step {step + 1} of {totalSteps}</span>
            <div className="text-[10px] text-vibe-400 font-bold">{progressPercent}% Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full vibe-gradient-bg transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col justify-center py-2">
        {step === 0 && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-vibe-500 via-electric-500 to-neon-cyan p-[2px] shadow-vibe-glow">
              <div className="w-full h-full bg-dark-900 rounded-[22px] flex items-center justify-center">
                <Flame className="w-10 h-10 text-vibe-400 fill-vibe-500 animate-pulse" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
                Find People Who Match Your <span className="vibe-gradient-text">Vibe</span>
              </h1>
              <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                A modern dating & social space with real-time audio/chat, AI wingman assistance, and 24h vibe stories.
              </p>
            </div>

            <div className="bg-dark-900/80 border border-white/10 p-4 rounded-2xl text-left space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-vibe-400" />
                <span>AI-assisted witty icebreakers & date planner</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Safety Shield with emergency check-in & verification</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Date Mode for spontaneous local hangouts</span>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
              <p className="text-xs text-slate-400 mt-1">Enter your details to get started on VibeMate.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@vibemate.app"
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white">Birthday & Gender</h2>
              <p className="text-xs text-slate-400 mt-1">We use your birth date to calculate age and ensure safety.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Date of Birth</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-dark-850 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-vibe-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">I identify as:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Man', 'Woman', 'Non-binary'] as const).map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        formData.gender === g
                          ? 'bg-vibe-500/20 border-vibe-500 text-white shadow-vibe-glow'
                          : 'bg-dark-850 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Show me:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Everyone', 'Woman', 'Man', 'Non-binary'] as Gender[]).map(gp => (
                    <button
                      key={gp}
                      type="button"
                      onClick={() => setFormData({ ...formData, datingPreference: gp })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        formData.datingPreference === gp
                          ? 'bg-electric-500/20 border-electric-500 text-white shadow-neon-glow'
                          : 'bg-dark-850 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {gp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white">Relationship Intentions</h2>
              <p className="text-xs text-slate-400 mt-1">Be upfront about what you are looking for on VibeMate.</p>
            </div>

            <div className="space-y-2.5">
              {RELATIONSHIP_GOALS.map(goal => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setFormData({ ...formData, relationshipGoal: goal })}
                  className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                    formData.relationshipGoal === goal
                      ? 'bg-vibe-500/15 border-vibe-500 text-white shadow-vibe-glow'
                      : 'bg-dark-850 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span className="text-sm font-semibold">{goal}</span>
                  {formData.relationshipGoal === goal && (
                    <div className="w-5 h-5 rounded-full bg-vibe-500 flex items-center justify-center text-white">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white">Profile Photos</h2>
              <p className="text-xs text-slate-400 mt-1">Upload at least 2 photos to make your profile stand out.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {formData.photos.map((photo, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
                >
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 bg-dark-950/80 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] font-bold text-vibe-400 border border-vibe-500/30">
                      Main
                    </span>
                  )}
                </div>
              ))}

              {/* Upload Slot */}
              <button
                type="button"
                onClick={() => {
                  showToast('Photo Slot Selected 📸', 'In production, this opens camera or photo gallery picker.', 'info');
                }}
                className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/20 hover:border-vibe-500/60 bg-dark-850/50 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-white transition-all"
              >
                <Camera className="w-6 h-6 text-vibe-400" />
                <span className="text-[10px] font-medium">+ Add Photo</span>
              </button>
            </div>

            <div className="bg-dark-900 border border-white/10 p-3 rounded-xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-neon-cyan shrink-0" />
              <div className="text-xs">
                <div className="font-semibold text-white">Approximate Location</div>
                <div className="text-slate-400 text-[11px]">San Francisco, CA (~3.5km range)</div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white">Bio & Career</h2>
              <p className="text-xs text-slate-400 mt-1">Tell prospective matches about your craft and passion.</p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">About You (Bio)</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Share what makes you tick, your favorite weekend activities, or what kind of energy you appreciate..."
                  className="w-full bg-dark-850 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Profession</label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={e => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="e.g. Architect / Designer"
                    className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Education</label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={e => setFormData({ ...formData, education: e.target.value })}
                    placeholder="e.g. Design Academy"
                    className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white">Interests & Passions</h2>
              <p className="text-xs text-slate-400 mt-1">Select at least 3 passions to help VibeMate match your wavelength.</p>
            </div>

            <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto no-scrollbar py-1">
              {INTEREST_TAGS.map(tag => {
                const isSelected = formData.interests.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleInterest(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-vibe-500 border-vibe-400 text-white shadow-vibe-glow'
                        : 'bg-dark-850 border-white/10 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    {tag} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-white">Hobbies & Subcultures</h2>
              <p className="text-xs text-slate-400 mt-1">What quirky activities or side quests do you love?</p>
            </div>

            <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto no-scrollbar py-1">
              {HOBBY_TAGS.map(tag => {
                const isSelected = formData.hobbies.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleHobby(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-electric-500 border-electric-400 text-white shadow-neon-glow'
                        : 'bg-dark-850 border-white/10 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    {tag} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-white/10 flex items-center gap-3">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white vibe-gradient-bg shadow-vibe-glow hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>{step === totalSteps - 1 ? "Let's Vibe! 🚀" : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
