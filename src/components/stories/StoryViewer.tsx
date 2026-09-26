import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  Music,
  MapPin,
  Send,
  Heart,
  Flame,
  User,
  Pause,
  Play
} from 'lucide-react';

export const StoryViewer: React.FC = () => {
  const {
    stories,
    activeStoryGroupIndex,
    activeStoryItemIndex,
    closeStoryViewer,
    nextStory,
    prevStory,
    reactToStory,
    replyToStory,
    setPreviewProfile,
    discoverProfiles
  } = useApp();

  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [pollVote, setPollVote] = useState<'A' | 'B' | null>(null);

  const durationMs = 5000; // 5 seconds per story
  const intervalRef = useRef<any>(null);

  const currentGroup = activeStoryGroupIndex !== null ? stories[activeStoryGroupIndex] : null;
  const currentStory = currentGroup ? currentGroup.stories[activeStoryItemIndex] : null;

  // Auto-progress timer
  useEffect(() => {
    if (!currentStory || isPaused) return;

    setProgress(0);
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = (elapsed / durationMs) * 100;

      if (currentProgress >= 100) {
        clearInterval(intervalRef.current);
        nextStory();
      } else {
        setProgress(currentProgress);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeStoryGroupIndex, activeStoryItemIndex, isPaused]);

  if (activeStoryGroupIndex === null || !currentGroup || !currentStory) {
    return null;
  }

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    replyToStory(activeStoryGroupIndex, currentStory.id, replyText);
    setReplyText('');
  };

  const handleReaction = (emoji: string) => {
    reactToStory(activeStoryGroupIndex, currentStory.id, emoji);
  };

  const handleVote = (option: 'A' | 'B') => {
    setPollVote(option);
  };

  const openUserProfile = () => {
    const profile = discoverProfiles.find(p => p.id === currentGroup.userId);
    if (profile) {
      closeStoryViewer();
      setPreviewProfile(profile);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-dark-950 flex items-center justify-center select-none"
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
    >
      <div className="relative w-full max-w-md h-full bg-dark-900 flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Story Background Media */}
        <div className="absolute inset-0">
          <img
            src={currentStory.mediaUrl}
            alt="Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-transparent to-dark-950/90" />
        </div>

        {/* Tap areas for Prev / Next */}
        <div
          className="absolute inset-y-16 left-0 w-1/3 z-10"
          onClick={e => {
            e.stopPropagation();
            prevStory();
          }}
        />
        <div
          className="absolute inset-y-16 right-0 w-1/3 z-10"
          onClick={e => {
            e.stopPropagation();
            nextStory();
          }}
        />

        {/* Top Header: Progress Bars & User Info */}
        <div className="relative z-20 p-4 space-y-3">
          {/* Progress Indicators */}
          <div className="flex gap-1.5">
            {currentGroup.stories.map((story, idx) => {
              let barWidth = '0%';
              if (idx < activeStoryItemIndex) barWidth = '100%';
              else if (idx === activeStoryItemIndex) barWidth = `${progress}%`;

              return (
                <div key={story.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
                    style={{ width: barWidth }}
                  />
                </div>
              );
            })}
          </div>

          {/* Author & Controls */}
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                openUserProfile();
              }}
            >
              <img
                src={currentGroup.userAvatar}
                alt={currentGroup.userName}
                className="w-9 h-9 rounded-full object-cover border-2 border-vibe-500 shadow-md"
              />
              <div className="text-white">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold">{currentGroup.userName}</span>
                  {currentGroup.isVerified && (
                    <ShieldCheck className="w-4 h-4 text-neon-cyan" />
                  )}
                </div>
                <div className="text-[10px] text-slate-300">{currentStory.createdAt}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={e => {
                  e.stopPropagation();
                  closeStoryViewer();
                }}
                className="p-1.5 rounded-full bg-dark-900/60 backdrop-blur-md text-white hover:bg-dark-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Music or Location Tag */}
          {(currentStory.music || currentStory.location) && (
            <div className="flex items-center gap-2 flex-wrap text-xs text-white">
              {currentStory.music && (
                <span className="px-2.5 py-1 rounded-full bg-dark-900/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[11px]">
                  <Music className="w-3 h-3 text-emerald-400 animate-spin-slow" />
                  {currentStory.music.title} • {currentStory.music.artist}
                </span>
              )}
              {currentStory.location && (
                <span className="px-2.5 py-1 rounded-full bg-dark-900/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[11px]">
                  <MapPin className="w-3 h-3 text-vibe-400" />
                  {currentStory.location}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Center: Story Poll / Caption / Text Stickers */}
        <div className="relative z-20 px-6 my-auto text-center space-y-4">
          {/* Text Overlay */}
          {currentStory.overlayText && (
            <div className="inline-block px-4 py-2 rounded-2xl bg-dark-950/70 backdrop-blur-md text-white font-extrabold text-lg border border-white/20 shadow-2xl animate-float-gentle">
              {currentStory.overlayText}
            </div>
          )}

          {/* Interactive Poll Sticker */}
          {currentStory.poll && (
            <div className="p-4 rounded-3xl bg-dark-950/85 backdrop-blur-xl border border-electric-500/30 shadow-2xl max-w-xs mx-auto text-white space-y-3">
              <div className="text-xs font-bold tracking-wide">{currentStory.poll.question}</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleVote('A');
                  }}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    pollVote === 'A'
                      ? 'bg-vibe-500 border-vibe-400 text-white shadow-vibe-glow'
                      : 'bg-dark-850/80 border-white/10 hover:border-white/30 text-slate-200'
                  }`}
                >
                  <div>{currentStory.poll.optionA}</div>
                  {pollVote && (
                    <div className="text-[10px] text-slate-300 mt-1">
                      {pollVote === 'A' ? '68%' : '32%'}
                    </div>
                  )}
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleVote('B');
                  }}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    pollVote === 'B'
                      ? 'bg-electric-500 border-electric-400 text-white shadow-neon-glow'
                      : 'bg-dark-850/80 border-white/10 hover:border-white/30 text-slate-200'
                  }`}
                >
                  <div>{currentStory.poll.optionB}</div>
                  {pollVote && (
                    <div className="text-[10px] text-slate-300 mt-1">
                      {pollVote === 'B' ? '74%' : '26%'}
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Caption */}
          {currentStory.caption && (
            <p className="text-xs text-white/90 bg-dark-950/60 backdrop-blur-sm p-3 rounded-2xl border border-white/10 max-w-xs mx-auto leading-relaxed">
              {currentStory.caption}
            </p>
          )}
        </div>

        {/* Bottom Bar: Reaction Emojis & Reply Input */}
        <div className="relative z-20 p-4 space-y-3 bg-gradient-to-t from-dark-950 via-dark-950/90 to-transparent">
          {/* Emoji Reactions */}
          <div className="flex justify-around items-center py-1">
            {['❤️', '🔥', '✨', '😂', '👏', '🥂'].map(emoji => (
              <button
                key={emoji}
                onClick={e => {
                  e.stopPropagation();
                  handleReaction(emoji);
                }}
                className="text-xl hover:scale-130 transition-transform active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply Bar */}
          <div
            className="flex items-center gap-2"
            onClick={e => e.stopPropagation()}
          >
            <input
              type="text"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder={`Reply to ${currentGroup.userName}...`}
              className="flex-1 bg-dark-900/90 border border-white/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-vibe-500"
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendReply();
              }}
            />
            <button
              onClick={handleSendReply}
              className="p-2.5 rounded-2xl vibe-gradient-bg text-white shadow-vibe-glow hover:opacity-90 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
