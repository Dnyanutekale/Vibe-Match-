import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FeedPost } from '../../types';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Send,
  Sparkles,
  MapPin,
  ShieldCheck,
  Plus,
  HelpCircle,
  Image as ImageIcon,
  Flame,
  Check
} from 'lucide-react';

export const VibeFeedScreen: React.FC = () => {
  const {
    feedPosts,
    likeFeedPost,
    saveFeedPost,
    addFeedComment,
    voteFeedPoll,
    addNewFeedPost,
    currentUser,
    setPreviewProfile,
    showToast
  } = useApp();

  const [isPosting, setIsPosting] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('#SocialVibes');
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    addNewFeedPost(newPostContent, undefined, [newPostTag, '#VibeMate']);
    setNewPostContent('');
    setIsPosting(false);
  };

  const handleSendComment = (postId: string) => {
    if (!commentInput.trim()) return;
    addFeedComment(postId, commentInput);
    setCommentInput('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-3 space-y-4 pb-24">
      {/* Create Post Banner */}
      <div className="p-4 rounded-3xl bg-dark-900 border border-white/10 shadow-lg space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.photos[0]}
            alt={currentUser.name}
            className="w-10 h-10 rounded-2xl object-cover border border-white/10 shrink-0"
          />
          <button
            onClick={() => setIsPosting(true)}
            className="flex-1 bg-dark-850 hover:bg-dark-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-400 text-left transition-colors"
          >
            What’s your vibe today, {currentUser.name.split(' ')[0]}?
          </button>
        </div>

        {isPosting && (
          <div className="space-y-3 pt-2 border-t border-white/5 animate-fadeIn">
            <textarea
              rows={3}
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
              placeholder="Share a thought, recommendation, or spontaneous plan..."
              className="w-full bg-dark-850 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500 resize-none"
            />
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={newPostTag}
                onChange={e => setNewPostTag(e.target.value)}
                placeholder="#Tag"
                className="w-32 bg-dark-850 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-vibe-400 font-bold"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPosting(false)}
                  className="px-3 py-1.5 rounded-xl bg-dark-800 text-slate-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-1.5 rounded-xl vibe-gradient-bg text-white text-xs font-bold shadow-vibe-glow"
                >
                  Post to Feed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {feedPosts.map(post => {
          const isCommentsOpen = openCommentsPostId === post.id;

          return (
            <div
              key={post.id}
              className="p-4 rounded-3xl bg-dark-900 border border-white/10 space-y-3 shadow-xl"
            >
              {/* Post Author Header */}
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={() => setPreviewProfile(post.author)}
                >
                  <img
                    src={post.author.photos[0]}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-2xl object-cover border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{post.author.name}</span>
                      {post.author.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span>{post.createdAt}</span>
                      {post.location && (
                        <span className="flex items-center gap-0.5 text-slate-400">
                          • <MapPin className="w-2.5 h-2.5 text-vibe-400" /> {post.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {post.author.isDateModeActive && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                    ⚡ Date Ready
                  </span>
                )}
              </div>

              {/* Content Text */}
              <p className="text-xs text-slate-200 leading-relaxed break-words">{post.content}</p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-semibold text-vibe-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Media Images Carousel */}
              {post.mediaUrls && post.mediaUrls.length > 0 && (
                <div className="rounded-2xl overflow-hidden border border-white/10 max-h-72">
                  <img
                    src={post.mediaUrls[0]}
                    alt="Post Media"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Interactive Poll */}
              {post.poll && (
                <div className="p-3.5 rounded-2xl bg-dark-850 border border-electric-500/30 space-y-2.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-electric-400" />
                    <span>{post.poll.question}</span>
                  </div>
                  <div className="space-y-1.5">
                    {post.poll.options.map(opt => {
                      const isVoted = post.poll?.userVotedId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => voteFeedPoll(post.id, opt.id)}
                          className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                            isVoted
                              ? 'bg-electric-500/20 border-electric-400 text-white shadow-neon-glow'
                              : 'bg-dark-900 border-white/10 text-slate-300 hover:border-white/25'
                          }`}
                        >
                          <span>{opt.text}</span>
                          <span className="text-[11px] text-slate-400">{opt.votes} votes</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Bar (Like, Comment, Save, Share) */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-slate-400">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => likeFeedPost(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold transition-all ${
                      post.isLiked ? 'text-vibe-400 scale-105' : 'hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-vibe-500' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentsCount}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveFeedPost(post.id)}
                    className={`p-1.5 rounded-lg hover:text-white transition-colors ${
                      post.isSaved ? 'text-amber-400' : ''
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-amber-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      showToast('Post Link Copied 🔗', undefined, 'info');
                    }}
                    className="p-1.5 rounded-lg hover:text-white"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Comments Section Drawer */}
              {isCommentsOpen && (
                <div className="pt-3 border-t border-white/5 space-y-3 animate-fadeIn">
                  <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                    {post.comments.length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic">No comments yet. Be the first!</p>
                    ) : (
                      post.comments.map(c => (
                        <div key={c.id} className="flex gap-2 text-xs">
                          <img
                            src={c.authorAvatar}
                            alt={c.authorName}
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />
                          <div className="bg-dark-850 p-2 rounded-xl flex-1">
                            <span className="font-bold text-white block text-[11px]">{c.authorName}</span>
                            <span className="text-slate-300 text-xs">{c.text}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add comment input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-dark-850 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSendComment(post.id);
                      }}
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="p-2 rounded-xl vibe-gradient-bg text-white"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
