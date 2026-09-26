import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import {
  Heart,
  X,
  Zap,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  Music,
  Info,
  ChevronLeft,
  ChevronRight,
  Share2,
  Flag,
  Flame,
  Award
} from 'lucide-react';

export const DiscoverDeck: React.FC = () => {
  const {
    discoverProfiles,
    currentProfileIndex,
    handleSwipe,
    handleUndoSwipe,
    resetDiscoverDeck,
    setPreviewProfile,
    showToast
  } = useApp();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const currentProfile: UserProfile | undefined = discoverProfiles[currentProfileIndex];
  const nextProfile: UserProfile | undefined = discoverProfiles[currentProfileIndex + 1];

  // Touch & Mouse Drag Handling for Card Swiping
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (dragOffset.x > threshold) {
      // Like (right)
      handleSwipe('like');
    } else if (dragOffset.x < -threshold) {
      // Pass (left)
      handleSwipe('pass');
    } else if (dragOffset.y < -threshold) {
      // Super Like (up)
      handleSwipe('superlike');
    }

    setDragOffset({ x: 0, y: 0 });
    setActivePhotoIndex(0);
  };

  const nextPhoto = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setActivePhotoIndex(prev => (prev < max - 1 ? prev + 1 : prev));
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  if (!currentProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-[72vh] px-6 text-center animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-dark-850 border border-white/10 flex items-center justify-center mb-4 shadow-vibe-glow">
          <Flame className="w-10 h-10 text-vibe-400 fill-vibe-500/20" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">You've Caught Up on Vibes!</h3>
        <p className="text-xs text-slate-400 max-w-xs mb-6">
          There are no more new profiles matching your current filters right now. Try expanding your distance or rewind your swipes.
        </p>
        <div className="flex gap-3">
          <button
            onClick={resetDiscoverDeck}
            className="px-5 py-2.5 rounded-2xl bg-vibe-500 hover:bg-vibe-600 text-white font-semibold text-xs transition-all shadow-vibe-glow flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" /> Reset Deck
          </button>
          <button
            onClick={handleUndoSwipe}
            className="px-4 py-2.5 rounded-2xl bg-dark-800 hover:bg-dark-700 text-slate-300 font-semibold text-xs border border-white/10 transition-all"
          >
            Rewind Last
          </button>
        </div>
      </div>
    );
  }

  // Calculate dynamic rotation and transform based on drag
  const rotateDeg = (dragOffset.x / 15);
  const opacityLike = Math.min(Math.max(dragOffset.x / 100, 0), 1);
  const opacityPass = Math.min(Math.max(-dragOffset.x / 100, 0), 1);
  const opacitySuper = Math.min(Math.max(-dragOffset.y / 100, 0), 1);

  return (
    <div className="relative w-full max-w-md mx-auto h-[calc(100vh-145px)] flex flex-col justify-between px-3 pb-2 select-none">
      {/* Cards Deck Stack */}
      <div className="relative flex-1 w-full rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Card Preview */}
        {nextProfile && (
          <div className="absolute inset-0 scale-[0.96] translate-y-2 opacity-50 rounded-3xl overflow-hidden bg-dark-900 border border-white/10 pointer-events-none">
            <img
              src={nextProfile.photos[0]}
              alt={nextProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Top Active Card */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            transform: isDragging
              ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotateDeg}deg)`
              : 'translate(0px, 0px) rotate(0deg)',
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          className="absolute inset-0 rounded-3xl overflow-hidden bg-dark-900 border border-white/15 cursor-grab active:cursor-grabbing shadow-2xl flex flex-col justify-between"
        >
          {/* Photos Carousel */}
          <div className="absolute inset-0">
            <img
              src={currentProfile.photos[activePhotoIndex] || currentProfile.photos[0]}
              alt={currentProfile.name}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 vibe-card-overlay pointer-events-none" />

            {/* Photo Segment Indicators */}
            {currentProfile.photos.length > 1 && (
              <div className="absolute top-3 left-3 right-3 flex gap-1.5 z-20 pointer-events-none">
                {currentProfile.photos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      idx === activePhotoIndex
                        ? 'bg-white shadow-sm'
                        : 'bg-white/30 backdrop-blur-sm'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Tap Left / Right photo switchers */}
            <div className="absolute inset-y-0 left-0 w-1/3 z-10" onClick={e => prevPhoto(e)} />
            <div className="absolute inset-y-0 right-0 w-1/3 z-10" onClick={e => nextPhoto(e, currentProfile.photos.length)} />
          </div>

          {/* Swipe Feedback Badges */}
          <div className="relative z-20 p-4 flex justify-between pointer-events-none">
            {/* LIKE Stamp */}
            <div
              style={{ opacity: opacityLike }}
              className="border-3 border-emerald-400 bg-emerald-500/20 backdrop-blur-md text-emerald-400 font-extrabold text-xl px-4 py-1.5 rounded-2xl rotate-[-15deg] shadow-lg transition-opacity"
            >
              VIBE LIKE ❤️
            </div>

            {/* SUPER LIKE Stamp */}
            <div
              style={{ opacity: opacitySuper }}
              className="border-3 border-electric-400 bg-electric-500/20 backdrop-blur-md text-electric-300 font-extrabold text-xl px-4 py-1.5 rounded-2xl shadow-lg transition-opacity"
            >
              SUPER VIBE ⚡
            </div>

            {/* PASS Stamp */}
            <div
              style={{ opacity: opacityPass }}
              className="border-3 border-rose-500 bg-rose-500/20 backdrop-blur-md text-rose-400 font-extrabold text-xl px-4 py-1.5 rounded-2xl rotate-[15deg] shadow-lg transition-opacity"
            >
              PASS ✖
            </div>
          </div>

          {/* Card Body & Info */}
          <div className="relative z-20 p-5 mt-auto text-white pointer-events-auto">
            {/* Compatibility & Vibe Tag */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-vibe-500/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-vibe-400/40">
                <Sparkles className="w-3 h-3 fill-white" />
                {currentProfile.compatibilityScore || 92}% Match
              </span>

              {currentProfile.isDateModeActive && (
                <span className="bg-amber-500/80 backdrop-blur-md text-amber-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-400/40 animate-pulse">
                  <Zap className="w-3 h-3 fill-amber-200" />
                  Date Ready Tonight
                </span>
              )}

              {currentProfile.mutualInterestsCount && currentProfile.mutualInterestsCount > 0 ? (
                <span className="bg-dark-900/80 backdrop-blur-md text-neon-cyan text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-neon-cyan/30">
                  {currentProfile.mutualInterestsCount} Mutual Vibes
                </span>
              ) : null}
            </div>

            {/* Name, Age, Verification */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-display font-extrabold tracking-tight">
                  {currentProfile.name}
                </h2>
                <span className="text-2xl font-light text-slate-300">{currentProfile.age}</span>
                {currentProfile.verified && (
                  <span title="Verified Vibe">
                    <ShieldCheck className="w-5 h-5 text-neon-cyan fill-neon-cyan/20" />
                  </span>
                )}
              </div>

              {/* Tap for Profile Detail */}
              <button
                onClick={() => setPreviewProfile(currentProfile)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all shadow-md"
                title="View Full Profile"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            {/* Profession & Distance */}
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                {currentProfile.profession}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-vibe-400" />
                {currentProfile.distanceKm} km away
              </span>
            </div>

            {/* Tagline / Bio snippet */}
            <p className="text-xs text-slate-200 mt-2 line-clamp-2 leading-relaxed bg-dark-950/40 backdrop-blur-sm p-2 rounded-xl border border-white/5">
              {currentProfile.vibeTagline || currentProfile.bio}
            </p>

            {/* Passions Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {currentProfile.interests.slice(0, 4).map(interest => (
                <span
                  key={interest}
                  className="bg-white/10 backdrop-blur-md text-[10px] font-medium px-2 py-0.5 rounded-lg text-slate-200 border border-white/10"
                >
                  {interest}
                </span>
              ))}
              {currentProfile.interests.length > 4 && (
                <span className="bg-white/5 text-[10px] text-slate-400 px-1.5 py-0.5 rounded-lg">
                  +{currentProfile.interests.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Deck Bar (Pass, Rewind, Superlike, Like, Boost) */}
      <div className="flex items-center justify-center gap-3 pt-3">
        {/* Undo / Rewind */}
        <button
          onClick={handleUndoSwipe}
          className="w-12 h-12 rounded-full bg-dark-850 hover:bg-dark-800 text-amber-400 border border-amber-500/20 flex items-center justify-center shadow-lg transition-transform active:scale-90 hover:scale-105"
          title="Rewind Last Swipe"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Pass (Cross) */}
        <button
          onClick={() => handleSwipe('pass')}
          className="w-14 h-14 rounded-full bg-dark-850 hover:bg-rose-950/40 text-rose-500 border border-rose-500/30 flex items-center justify-center shadow-lg transition-transform active:scale-90 hover:scale-105"
          title="Pass"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Super Like (Star / Zap) */}
        <button
          onClick={() => handleSwipe('superlike')}
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-electric-600 to-neon-violet text-white shadow-neon-glow flex items-center justify-center transition-transform active:scale-90 hover:scale-110"
          title="Super Like"
        >
          <Zap className="w-6 h-6 fill-white" />
        </button>

        {/* Like (Heart) */}
        <button
          onClick={() => handleSwipe('like')}
          className="w-16 h-16 rounded-full vibe-gradient-bg text-white shadow-vibe-glow flex items-center justify-center transition-transform active:scale-90 hover:scale-110"
          title="Like"
        >
          <Heart className="w-8 h-8 fill-white" />
        </button>

        {/* Share Profile */}
        <button
          onClick={() => {
            showToast('Profile Link Copied 🔗', `Share link for ${currentProfile.name} ready!`, 'info');
          }}
          className="w-12 h-12 rounded-full bg-dark-850 hover:bg-dark-800 text-neon-cyan border border-neon-cyan/20 flex items-center justify-center shadow-lg transition-transform active:scale-90 hover:scale-105"
          title="Share Profile"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
