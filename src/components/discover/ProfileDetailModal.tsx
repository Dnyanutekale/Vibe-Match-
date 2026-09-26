import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import {
  X,
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Heart,
  Zap,
  Music,
  HelpCircle,
  Flag,
  UserX,
  Share2,
  Calendar,
  Compass
} from 'lucide-react';

export const ProfileDetailModal: React.FC = () => {
  const { previewProfile, setPreviewProfile, handleSwipe, showToast } = useApp();

  if (!previewProfile) return null;

  return (
    <div className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fadeIn">
      {/* Top Floating Close Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-dark-950 via-dark-950/80 to-transparent">
        <button
          onClick={() => setPreviewProfile(null)}
          className="p-2.5 rounded-full bg-dark-900/80 backdrop-blur-md text-white border border-white/10 hover:bg-dark-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              showToast('Profile Shared 🔗', `Link for ${previewProfile.name} copied!`, 'info');
            }}
            className="p-2.5 rounded-full bg-dark-900/80 backdrop-blur-md text-slate-300 hover:text-white border border-white/10"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              showToast('Report Submitted 🛡️', 'Our moderation team will review this profile within 2 hours.', 'warning');
            }}
            className="p-2.5 rounded-full bg-dark-900/80 backdrop-blur-md text-slate-300 hover:text-rose-400 border border-white/10"
            title="Report or Block"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile Body Content */}
      <div className="max-w-md mx-auto w-full px-4 pb-28 space-y-5">
        {/* Main Photo Card */}
        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/10">
          <img
            src={previewProfile.photos[0]}
            alt={previewProfile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 vibe-card-overlay" />
          
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-display font-extrabold">{previewProfile.name}</h1>
              <span className="text-3xl font-light text-slate-300">{previewProfile.age}</span>
              {previewProfile.verified && (
                <ShieldCheck className="w-6 h-6 text-neon-cyan fill-neon-cyan/20" />
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
              <MapPin className="w-3.5 h-3.5 text-vibe-400" />
              <span>{previewProfile.distanceKm} km away</span>
              <span>•</span>
              <span>{previewProfile.hometown || 'Bay Area'}</span>
            </div>
          </div>
        </div>

        {/* Compatibility Match Meter */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-vibe-500/15 via-electric-500/15 to-neon-cyan/15 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vibe-500/20 border border-vibe-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-vibe-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Vibe Compatibility Score</div>
              <div className="text-[11px] text-slate-400">Based on shared creative passions & preferences</div>
            </div>
          </div>
          <span className="text-xl font-display font-black vibe-gradient-text">
            {previewProfile.compatibilityScore || 94}%
          </span>
        </div>

        {/* About & Bio */}
        <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Me</h3>
          <p className="text-sm text-slate-200 leading-relaxed">{previewProfile.bio}</p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <span>{previewProfile.profession}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>{previewProfile.education}</span>
            </div>
            {previewProfile.zodiac && (
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-slate-400" />
                <span>{previewProfile.zodiac}</span>
              </div>
            )}
            {previewProfile.height && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{previewProfile.height}</span>
              </div>
            )}
          </div>
        </div>

        {/* Relationship Goal */}
        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Looking for</div>
            <div className="text-sm font-semibold text-vibe-300 mt-0.5">{previewProfile.relationshipGoal}</div>
          </div>
          <div className="p-2 rounded-xl bg-vibe-500/10 text-vibe-400">
            <Heart className="w-5 h-5 fill-vibe-500/20" />
          </div>
        </div>

        {/* Daily Answer Prompt */}
        {previewProfile.dailyAnswer && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-dark-900 to-dark-850 border border-electric-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-electric-400">
              <HelpCircle className="w-4 h-4" />
              <span>{previewProfile.dailyAnswer.question}</span>
            </div>
            <p className="text-sm text-white font-medium italic leading-relaxed">
              "{previewProfile.dailyAnswer.answer}"
            </p>
          </div>
        )}

        {/* Additional Photos */}
        {previewProfile.photos.slice(1).map((photoUrl, idx) => (
          <div key={idx} className="rounded-3xl overflow-hidden aspect-[4/5] shadow-xl border border-white/10">
            <img src={photoUrl} alt={`${previewProfile.name} ${idx + 2}`} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Spotify Anthem */}
        {previewProfile.spotifyTopTrack && (
          <div className="p-4 rounded-2xl bg-dark-900 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={previewProfile.spotifyTopTrack.albumArt}
                alt="Album"
                className="w-12 h-12 rounded-xl object-cover shadow-md"
              />
              <div>
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Music className="w-3 h-3" /> Spotify Anthem
                </div>
                <div className="text-sm font-semibold text-white">{previewProfile.spotifyTopTrack.song}</div>
                <div className="text-xs text-slate-400">{previewProfile.spotifyTopTrack.artist}</div>
              </div>
            </div>
          </div>
        )}

        {/* Passions & Subcultures */}
        <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Passions & Interests</h3>
          <div className="flex flex-wrap gap-2">
            {previewProfile.interests.map(int => (
              <span
                key={int}
                className="px-3 py-1.5 rounded-xl bg-dark-800 border border-white/10 text-xs font-medium text-slate-200"
              >
                {int}
              </span>
            ))}
          </div>
        </div>

        {/* Block & Report options */}
        <div className="flex items-center justify-center gap-4 pt-4 text-xs text-slate-500">
          <button
            onClick={() => {
              showToast('User Blocked 🚫', `${previewProfile.name} will not see your profile.`, 'info');
              setPreviewProfile(null);
            }}
            className="flex items-center gap-1.5 hover:text-slate-300"
          >
            <UserX className="w-4 h-4" /> Block {previewProfile.name}
          </button>
          <span>•</span>
          <button
            onClick={() => {
              showToast('Report Logged 🛡️', 'Thank you for keeping VibeMate safe.', 'warning');
            }}
            className="flex items-center gap-1.5 hover:text-rose-400"
          >
            <Flag className="w-4 h-4" /> Report
          </button>
        </div>
      </div>

      {/* Floating Bottom Decision Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-bottom-bar flex items-center justify-center gap-4 max-w-md mx-auto z-30">
        <button
          onClick={() => {
            handleSwipe('pass', previewProfile);
            setPreviewProfile(null);
          }}
          className="flex-1 py-3 rounded-2xl bg-dark-800 hover:bg-rose-950/40 text-rose-400 font-bold text-sm border border-rose-500/20 transition-all flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" /> Pass
        </button>

        <button
          onClick={() => {
            handleSwipe('superlike', previewProfile);
            setPreviewProfile(null);
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-tr from-electric-500 to-neon-violet text-white shadow-neon-glow"
          title="Super Like"
        >
          <Zap className="w-5 h-5 fill-white" />
        </button>

        <button
          onClick={() => {
            handleSwipe('like', previewProfile);
            setPreviewProfile(null);
          }}
          className="flex-1 py-3 rounded-2xl vibe-gradient-bg text-white font-bold text-sm shadow-vibe-glow transition-all flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4 fill-white" /> Like
        </button>
      </div>
    </div>
  );
};
