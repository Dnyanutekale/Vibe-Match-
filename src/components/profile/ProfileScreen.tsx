import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Edit3,
  Settings,
  Crown,
  Sparkles,
  Zap,
  Music,
  HelpCircle,
  Radio,
  Share2,
  Lock,
  Flame,
  Camera,
  Heart,
  Calendar,
  Compass,
  Briefcase,
  GraduationCap,
  MapPin,
  BarChart3,
  CheckCircle2,
  Disc,
  Clock
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    currentUser,
    setIsEditProfileOpen,
    setIsVerificationModalOpen,
    setIsPremiumModalOpen,
    setIsSafetyCenterOpen,
    setIsPrivacyModalOpen,
    setIsAdminDashboardOpen,
    setIsVibeAIHubOpen,
    setIsVibeCheckOpen,
    setIsQuizOpen,
    setIsDateModeModalOpen,
    setIsSharedPlaylistOpen,
    setIsMemoryLaneOpen,
    setIsDailyQuestionOpen,
    setIsNearbyEventsOpen,
    showToast
  } = useApp();

  return (
    <div className="max-w-md mx-auto px-4 py-3 space-y-5 pb-28">
      {/* Top Profile Card */}
      <div className="relative rounded-3xl overflow-hidden bg-dark-900 border border-white/10 shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={currentUser.photos[0]}
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

          {/* Verification / Premium Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {currentUser.isPremium && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-dark-950 text-[10px] font-black flex items-center gap-1 shadow-md">
                <Crown className="w-3 h-3" /> {currentUser.premiumTier || 'Premium'}
              </span>
            )}
            {currentUser.verified ? (
              <span className="px-2.5 py-1 rounded-full bg-dark-900/80 backdrop-blur-md text-neon-cyan text-[10px] font-bold flex items-center gap-1 border border-neon-cyan/30">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            ) : (
              <button
                onClick={() => setIsVerificationModalOpen(true)}
                className="px-2.5 py-1 rounded-full bg-vibe-500/20 text-vibe-300 text-[10px] font-bold border border-vibe-500/40 hover:bg-vibe-500/30"
              >
                + Get Verified
              </button>
            )}
          </div>

          {/* Name & Details at bottom of photo */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-extrabold">{currentUser.name}</h1>
              <span className="text-2xl font-light text-slate-300">{currentUser.age}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.profession}</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-vibe-400" />
              <span>{currentUser.hometown || 'San Francisco'}</span>
            </div>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="p-4 bg-dark-850/70 border-t border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-vibe-400" /> Profile Strength
            </span>
            <span className="font-bold text-vibe-400">{currentUser.profileCompletionScore}%</span>
          </div>
          <div className="w-full h-2 bg-dark-950 rounded-full overflow-hidden">
            <div
              className="h-full vibe-gradient-bg rounded-full transition-all duration-500"
              style={{ width: `${currentUser.profileCompletionScore}%` }}
            />
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-[10px] text-slate-400">Complete profile for max discovery boost</span>
            <button
              onClick={() => setIsVibeAIHubOpen(true)}
              className="text-[11px] text-electric-300 font-bold hover:underline"
            >
              Vibe AI Audit →
            </button>
          </div>
        </div>
      </div>

      {/* Main Action Buttons Grid */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setIsEditProfileOpen(true)}
          className="p-3 rounded-2xl bg-dark-900 border border-white/10 hover:border-white/20 flex flex-col items-center justify-center gap-1.5 text-slate-200 transition-all shadow-md"
        >
          <Edit3 className="w-4 h-4 text-vibe-400" />
          <span className="text-xs font-semibold">Edit Profile</span>
        </button>

        <button
          onClick={() => setIsPremiumModalOpen(true)}
          className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500/15 to-vibe-500/15 border border-amber-500/30 flex flex-col items-center justify-center gap-1.5 text-amber-300 transition-all shadow-md"
        >
          <Crown className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold">Premium</span>
        </button>

        <button
          onClick={() => setIsSafetyCenterOpen(true)}
          className="p-3 rounded-2xl bg-dark-900 border border-white/10 hover:border-white/20 flex flex-col items-center justify-center gap-1.5 text-slate-200 transition-all shadow-md"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">Safety Shield</span>
        </button>
      </div>

      {/* Interactive Vibe Toolkit Grid (Unique Features) */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Vibe Discovery Toolkit
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Vibe Check */}
          <div
            onClick={() => setIsVibeCheckOpen(true)}
            className="p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-vibe-500/40 cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">✨</span>
              <span className="text-[10px] font-bold text-vibe-400">Update</span>
            </div>
            <div className="text-xs font-bold text-white">Vibe Check</div>
            <div className="text-[10px] text-slate-400 truncate">{currentUser.vibeMood || 'Spontaneous'}</div>
          </div>

          {/* Date Mode */}
          <div
            onClick={() => setIsDateModeModalOpen(true)}
            className="p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-amber-500/40 cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">⚡</span>
              <span className={`text-[10px] font-bold ${currentUser.isDateModeActive ? 'text-amber-400' : 'text-slate-500'}`}>
                {currentUser.isDateModeActive ? 'ON' : 'OFF'}
              </span>
            </div>
            <div className="text-xs font-bold text-white">Date Mode</div>
            <div className="text-[10px] text-slate-400 truncate">Spontaneous availability</div>
          </div>

          {/* Compatibility Quiz */}
          <div
            onClick={() => setIsQuizOpen(true)}
            className="p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-electric-500/40 cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">🧠</span>
              <span className="text-[10px] font-bold text-electric-300">Take Quiz</span>
            </div>
            <div className="text-xs font-bold text-white">Compatibility Quiz</div>
            <div className="text-[10px] text-slate-400 truncate">Vibe archetype score</div>
          </div>

          {/* Shared Playlist */}
          <div
            onClick={() => setIsSharedPlaylistOpen(true)}
            className="p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-emerald-500/40 cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">🎧</span>
              <span className="text-[10px] font-bold text-emerald-400">4 tracks</span>
            </div>
            <div className="text-xs font-bold text-white">Shared Playlist</div>
            <div className="text-[10px] text-slate-400 truncate">Match mixtape</div>
          </div>

          {/* Memory Lane */}
          <div
            onClick={() => setIsMemoryLaneOpen(true)}
            className="p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-purple-500/40 cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">📸</span>
              <span className="text-[10px] font-bold text-purple-400">Scrapbook</span>
            </div>
            <div className="text-xs font-bold text-white">Memory Lane</div>
            <div className="text-[10px] text-slate-400 truncate">Dates & milestones</div>
          </div>

          {/* Nearby Events */}
          <div
            onClick={() => setIsNearbyEventsOpen(true)}
            className="p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-neon-cyan/40 cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">📍</span>
              <span className="text-[10px] font-bold text-neon-cyan">Explore</span>
            </div>
            <div className="text-xs font-bold text-white">Nearby Events</div>
            <div className="text-[10px] text-slate-400 truncate">Local social mixers</div>
          </div>
        </div>
      </div>

      {/* Daily Question Card */}
      <div
        onClick={() => setIsDailyQuestionOpen(true)}
        className="p-4 rounded-3xl bg-dark-900 border border-white/10 hover:border-electric-500/40 cursor-pointer transition-all space-y-2 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-electric-300">
            <HelpCircle className="w-4 h-4 text-electric-400" />
            <span>Daily Question Response</span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">Tap to Edit</span>
        </div>
        <p className="text-xs text-white italic">
          "{currentUser.dailyAnswer?.answer || 'Tap to answer today’s prompt...'}"
        </p>
      </div>

      {/* Spotify Anthem */}
      {currentUser.spotifyTopTrack && (
        <div className="p-4 rounded-3xl bg-dark-900 border border-emerald-500/30 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.spotifyTopTrack.albumArt}
              alt="Album"
              className="w-12 h-12 rounded-2xl object-cover shadow-md"
            />
            <div>
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <Music className="w-3 h-3" /> Your Anthem
              </div>
              <div className="text-xs font-bold text-white">{currentUser.spotifyTopTrack.song}</div>
              <div className="text-[11px] text-slate-400">{currentUser.spotifyTopTrack.artist}</div>
            </div>
          </div>
        </div>
      )}

      {/* Passions & Subcultures */}
      <div className="p-4 rounded-3xl bg-dark-900 border border-white/10 space-y-2.5 shadow-lg">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Passions & Hobbies</h4>
        <div className="flex flex-wrap gap-1.5">
          {currentUser.interests.map(int => (
            <span
              key={int}
              className="px-3 py-1 rounded-xl bg-dark-850 border border-white/5 text-xs text-slate-200"
            >
              {int}
            </span>
          ))}
          {currentUser.hobbies.map(hob => (
            <span
              key={hob}
              className="px-3 py-1 rounded-xl bg-electric-500/15 border border-electric-500/30 text-xs text-electric-300"
            >
              {hob}
            </span>
          ))}
        </div>
      </div>

      {/* Settings & Admin Shortcuts */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => setIsPrivacyModalOpen(true)}
          className="w-full p-3.5 rounded-2xl bg-dark-900 border border-white/5 hover:border-white/15 flex items-center justify-between text-xs text-slate-300"
        >
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Privacy & Visibility Settings</span>
          </div>
          <span>→</span>
        </button>

        <button
          onClick={() => setIsAdminDashboardOpen(true)}
          className="w-full p-3.5 rounded-2xl bg-dark-900 border border-white/5 hover:border-white/15 flex items-center justify-between text-xs text-slate-300"
        >
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-4 h-4 text-neon-cyan" />
            <span>Admin & Moderation Dashboard</span>
          </div>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
