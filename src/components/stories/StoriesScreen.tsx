import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoryCreator } from './StoryCreator';
import {
  Plus,
  Sparkles,
  ShieldCheck,
  Music,
  Heart,
  Flame,
  Radio,
  Clock,
  Eye
} from 'lucide-react';

export const StoriesScreen: React.FC = () => {
  const { stories, openStoryViewer, currentUser } = useApp();
  const [isCreatingStory, setIsCreatingStory] = useState(false);

  const myStoryGroup = stories.find(s => s.userId === 'me');
  const otherStories = stories.filter(s => s.userId !== 'me');

  return (
    <div className="max-w-md mx-auto px-4 py-3 space-y-5 pb-24">
      {/* Top Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-electric-500/20 via-purple-500/20 to-vibe-500/20 border border-electric-500/30 flex items-center justify-between shadow-lg">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-electric-300">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>24H Vibe Stories</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 max-w-[220px]">
            Share spontaneous photo & video moments that vanish automatically after 24 hours.
          </p>
        </div>
        <button
          onClick={() => setIsCreatingStory(true)}
          className="px-3 py-2 rounded-2xl vibe-gradient-bg text-white text-xs font-bold shadow-vibe-glow flex items-center gap-1 hover:opacity-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Story
        </button>
      </div>

      {/* Stories Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Recent Stories
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Your Story Card */}
          <div
            onClick={() => {
              if (myStoryGroup && myStoryGroup.stories.length > 0) {
                const myIndex = stories.findIndex(s => s.userId === 'me');
                openStoryViewer(myIndex, 0);
              } else {
                setIsCreatingStory(true);
              }
            }}
            className="relative aspect-[9/14] rounded-3xl overflow-hidden border border-white/10 bg-dark-900 cursor-pointer shadow-lg group"
          >
            {myStoryGroup && myStoryGroup.stories.length > 0 ? (
              <img
                src={myStoryGroup.stories[0].mediaUrl}
                alt="My Story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <img
                src={currentUser.photos[0]}
                alt="Me"
                className="w-full h-full object-cover opacity-50 grayscale"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

            {/* Top add button or view count */}
            <div className="absolute top-3 left-3">
              {myStoryGroup && myStoryGroup.stories.length > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-dark-900/80 backdrop-blur-md text-[10px] text-white font-bold flex items-center gap-1 border border-white/10">
                  <Eye className="w-3 h-3 text-vibe-400" /> {myStoryGroup.stories[0].viewersCount}
                </span>
              ) : (
                <div className="w-8 h-8 rounded-full vibe-gradient-bg text-white flex items-center justify-center shadow-vibe-glow">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
              )}
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="text-xs font-bold">Your Story</div>
              <div className="text-[10px] text-slate-400">
                {myStoryGroup && myStoryGroup.stories.length > 0 ? `${myStoryGroup.stories.length} active` : 'Tap to share'}
              </div>
            </div>
          </div>

          {/* Friends & Matches Stories */}
          {otherStories.map((group, gIdx) => {
            const latestStory = group.stories[0];
            const realIndex = stories.findIndex(s => s.userId === group.userId);

            return (
              <div
                key={group.userId}
                onClick={() => openStoryViewer(realIndex, 0)}
                className="relative aspect-[9/14] rounded-3xl overflow-hidden border border-white/10 bg-dark-900 cursor-pointer shadow-lg group"
              >
                <img
                  src={latestStory.mediaUrl}
                  alt={group.userName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

                {/* Top Badge: Close friend / Music */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full p-[2px] story-ring-unseen shadow-md">
                    <img
                      src={group.userAvatar}
                      alt={group.userName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {latestStory.music && (
                    <span className="p-1 rounded-full bg-dark-900/80 backdrop-blur-md text-emerald-400 border border-white/10">
                      <Music className="w-3 h-3 animate-spin-slow" />
                    </span>
                  )}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold truncate">{group.userName}</span>
                    {group.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan shrink-0" />}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> {latestStory.createdAt}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Creator Modal */}
      {isCreatingStory && <StoryCreator onClose={() => setIsCreatingStory(false)} />}
    </div>
  );
};
