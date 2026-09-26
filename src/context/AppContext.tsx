import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  CurrentUser,
  MatchItem,
  Conversation,
  ChatMessage,
  MessageType,
  UserStoryGroup,
  FeedPost,
  DateIdea,
  NotificationItem,
  AdminAnalytics
} from '../types';
import {
  initialCurrentUser,
  mockDiscoverProfiles,
  mockMatches,
  mockConversations,
  mockUserStories,
  mockFeedPosts,
  mockNotifications,
  mockAdminAnalytics
} from '../data/mockData';

export type ActiveTab = 'discover' | 'matches' | 'messages' | 'stories' | 'feed' | 'profile';

interface Toast {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'vibe' | 'warning';
}

interface AppContextType {
  // Navigation & Screen
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOnboarded: boolean;
  setIsOnboarded: (val: boolean) => void;
  
  // Current User
  currentUser: CurrentUser;
  updateCurrentUser: (updates: Partial<CurrentUser>) => void;
  toggleDateMode: () => void;
  setVibeMood: (mood: string) => void;

  // Discovery Deck
  discoverProfiles: UserProfile[];
  currentProfileIndex: number;
  swipeHistory: Array<{ profile: UserProfile; action: 'like' | 'pass' | 'superlike' }>;
  handleSwipe: (action: 'like' | 'pass' | 'superlike', profileOverride?: UserProfile) => void;
  handleUndoSwipe: () => void;
  resetDiscoverDeck: () => void;
  
  // Profile Preview
  previewProfile: UserProfile | null;
  setPreviewProfile: (profile: UserProfile | null) => void;

  // Match Modal
  matchedProfile: UserProfile | null;
  setMatchedProfile: (profile: UserProfile | null) => void;
  triggerMatchAnimation: (profile: UserProfile) => void;

  // Matches & Conversations
  matches: MatchItem[];
  conversations: Record<string, Conversation>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (convId: string, text: string, type?: MessageType, mediaUrl?: string, aiSuggested?: boolean) => void;
  reactToMessage: (convId: string, messageId: string, emoji: string) => void;
  deleteMessage: (convId: string, messageId: string) => void;
  pinMessage: (convId: string, messageId: string) => void;
  setDisappearingTime: (convId: string, option: 'off' | '10s' | '1m' | '1h' | '24h') => void;

  // Stories
  stories: UserStoryGroup[];
  activeStoryGroupIndex: number | null;
  activeStoryItemIndex: number;
  openStoryViewer: (groupIndex: number, itemIndex?: number) => void;
  closeStoryViewer: () => void;
  nextStory: () => void;
  prevStory: () => void;
  reactToStory: (groupIndex: number, storyId: string, emoji: string) => void;
  replyToStory: (groupIndex: number, storyId: string, text: string) => void;
  addNewStory: (mediaUrl: string, caption?: string, filterName?: string, musicTitle?: string, pollData?: { question: string; optionA: string; optionB: string }) => void;

  // Feed Posts
  feedPosts: FeedPost[];
  likeFeedPost: (postId: string) => void;
  saveFeedPost: (postId: string) => void;
  addFeedComment: (postId: string, text: string) => void;
  voteFeedPoll: (postId: string, optionId: string) => void;
  addNewFeedPost: (content: string, mediaUrls?: string[], tags?: string[]) => void;

  // Modals
  isFilterOpen: boolean;
  setIsFilterOpen: (val: boolean) => void;
  isAISuggestModalOpen: boolean;
  setIsAISuggestModalOpen: (val: boolean) => void;
  isVibeAIHubOpen: boolean;
  setIsVibeAIHubOpen: (val: boolean) => void;
  isSafetyCenterOpen: boolean;
  setIsSafetyCenterOpen: (val: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (val: boolean) => void;
  isVerificationModalOpen: boolean;
  setIsVerificationModalOpen: (val: boolean) => void;
  isPremiumModalOpen: boolean;
  setIsPremiumModalOpen: (val: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (val: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (val: boolean) => void;
  isCameraOpen: boolean;
  setIsCameraOpen: (val: boolean) => void;
  isEditProfileOpen: boolean;
  setIsEditProfileOpen: (val: boolean) => void;

  // Extra Features Modals
  isVibeCheckOpen: boolean;
  setIsVibeCheckOpen: (val: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (val: boolean) => void;
  isDateModeModalOpen: boolean;
  setIsDateModeModalOpen: (val: boolean) => void;
  isSharedPlaylistOpen: boolean;
  setIsSharedPlaylistOpen: (val: boolean) => void;
  isMemoryLaneOpen: boolean;
  setIsMemoryLaneOpen: (val: boolean) => void;
  isDailyQuestionOpen: boolean;
  setIsDailyQuestionOpen: (val: boolean) => void;
  isNearbyEventsOpen: boolean;
  setIsNearbyEventsOpen: (val: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  unreadNotificationsCount: number;

  // Admin Data
  adminAnalytics: AdminAnalytics;

  // Toasts
  toasts: Toast[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'vibe' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('discover');
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true); // start onboarded for instant interactive experience, can restart anytime

  // User
  const [currentUser, setCurrentUser] = useState<CurrentUser>(initialCurrentUser);

  // Discover Deck
  const [discoverProfiles, setDiscoverProfiles] = useState<UserProfile[]>(mockDiscoverProfiles);
  const [currentProfileIndex, setCurrentProfileIndex] = useState<number>(0);
  const [swipeHistory, setSwipeHistory] = useState<Array<{ profile: UserProfile; action: 'like' | 'pass' | 'superlike' }>>([]);
  const [previewProfile, setPreviewProfile] = useState<UserProfile | null>(null);
  const [matchedProfile, setMatchedProfile] = useState<UserProfile | null>(null);

  // Matches & Conversations
  const [matches, setMatches] = useState<MatchItem[]>(mockMatches);
  const [conversations, setConversations] = useState<Record<string, Conversation>>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Stories
  const [stories, setStories] = useState<UserStoryGroup[]>(mockUserStories);
  const [activeStoryGroupIndex, setActiveStoryGroupIndex] = useState<number | null>(null);
  const [activeStoryItemIndex, setActiveStoryItemIndex] = useState<number>(0);

  // Feed Posts
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(mockFeedPosts);

  // Modals
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAISuggestModalOpen, setIsAISuggestModalOpen] = useState(false);
  const [isVibeAIHubOpen, setIsVibeAIHubOpen] = useState(false);
  const [isSafetyCenterOpen, setIsSafetyCenterOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Unique Feature Modals
  const [isVibeCheckOpen, setIsVibeCheckOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDateModeModalOpen, setIsDateModeModalOpen] = useState(false);
  const [isSharedPlaylistOpen, setIsSharedPlaylistOpen] = useState(false);
  const [isMemoryLaneOpen, setIsMemoryLaneOpen] = useState(false);
  const [isDailyQuestionOpen, setIsDailyQuestionOpen] = useState(false);
  const [isNearbyEventsOpen, setIsNearbyEventsOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Admin Data
  const [adminAnalytics, setAdminAnalytics] = useState<AdminAnalytics>(mockAdminAnalytics);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'vibe' | 'warning' = 'vibe') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateCurrentUser = (updates: Partial<CurrentUser>) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updates };
      // Recalculate completeness
      let score = 50;
      if (updated.photos.length >= 3) score += 20;
      if (updated.bio && updated.bio.length > 20) score += 10;
      if (updated.interests.length >= 4) score += 10;
      if (updated.verified) score += 10;
      updated.profileCompletionScore = Math.min(score, 100);
      return updated;
    });
    showToast('Profile Updated', 'Your changes have been saved.', 'success');
  };

  const toggleDateMode = () => {
    const newState = !currentUser.isDateModeActive;
    updateCurrentUser({ isDateModeActive: newState });
    showToast(
      newState ? 'Date Mode Activated! ⚡' : 'Date Mode Deactivated',
      newState ? 'Nearby matches will see you are ready for spontaneous hangouts today.' : 'Your spontaneous availability status is now hidden.',
      newState ? 'vibe' : 'info'
    );
  };

  const setVibeMood = (mood: string) => {
    updateCurrentUser({ vibeMood: mood });
    showToast('Vibe Check Updated! ✨', `Current mood: ${mood}`, 'vibe');
  };

  // Confetti helper
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#d946ef', '#06b6d4', '#fbbf24', '#ffffff']
      });
    } catch {
      // safe fallback
    }
  };

  const triggerMatchAnimation = (profile: UserProfile) => {
    setMatchedProfile(profile);
    triggerConfetti();

    // Add to matches if not already present
    const existingMatch = matches.find(m => m.user.id === profile.id);
    if (!existingMatch) {
      const newMatchId = 'match-' + (matches.length + 1);
      const newMatchItem: MatchItem = {
        id: newMatchId,
        user: profile,
        matchedAt: 'Just now',
        hasUnreadMessage: true,
        lastMessageSnippet: 'Matched! Say hi with a vibe icebreaker ✨',
        lastActive: 'Active now',
        compatibilityScore: profile.compatibilityScore || 92,
        conversationIcebreakerSuggested: `Ask ${profile.name.split(' ')[0]} about their love for ${profile.interests[0] || 'art'}!`
      };
      setMatches(prev => [newMatchItem, ...prev]);

      // Initialize conversation
      setConversations(prev => ({
        ...prev,
        [newMatchId]: {
          id: 'conv-' + (Object.keys(prev).length + 1),
          matchId: newMatchId,
          user: profile,
          unreadCount: 0,
          lastSeen: 'Active now',
          disappearingTimeOption: 'off',
          messages: [
            {
              id: 'm-init-' + Date.now(),
              senderId: profile.id,
              senderName: profile.name.split(' ')[0],
              text: `Hey Alex! ✨ We just matched on VibeMate. Loved your profile!`,
              messageType: 'text',
              timestamp: 'Just now',
              isRead: true
            }
          ]
        }
      }));
    }
  };

  const handleSwipe = (action: 'like' | 'pass' | 'superlike', profileOverride?: UserProfile) => {
    const profile = profileOverride || discoverProfiles[currentProfileIndex];
    if (!profile) return;

    setSwipeHistory(prev => [...prev, { profile, action }]);

    if (action === 'like' || action === 'superlike') {
      // 70% chance of an instant match celebration for demo engagement!
      if (Math.random() < 0.75 || profile.id === 'user-1' || profile.id === 'user-3') {
        triggerMatchAnimation(profile);
      } else {
        showToast(
          action === 'superlike' ? 'Super Liked! ⚡' : 'Liked! ❤️',
          `Sent vibe to ${profile.name.split(' ')[0]}`,
          action === 'superlike' ? 'vibe' : 'success'
        );
      }
    } else {
      showToast('Passed', `Passed on ${profile.name.split(' ')[0]}`, 'info');
    }

    if (!profileOverride) {
      setCurrentProfileIndex(prev => prev + 1);
    }
  };

  const handleUndoSwipe = () => {
    if (swipeHistory.length === 0) {
      showToast('No Swipes to Rewind', 'You have not swiped on any cards yet.', 'warning');
      return;
    }
    const last = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory(prev => prev.slice(0, -1));
    setCurrentProfileIndex(prev => Math.max(0, prev - 1));
    showToast('Rewound Card ⏪', `Brought back ${last.profile.name.split(' ')[0]}`, 'info');
  };

  const resetDiscoverDeck = () => {
    setCurrentProfileIndex(0);
    setSwipeHistory([]);
    showToast('Deck Refreshed 🔄', 'All profiles are ready for discovery again!', 'vibe');
  };

  // Chat Actions
  const sendMessage = (
    convId: string,
    text: string,
    type: MessageType = 'text',
    mediaUrl?: string,
    aiSuggested: boolean = false
  ) => {
    if (!text && !mediaUrl) return;

    const newMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: 'me',
      senderName: currentUser.name.split(' ')[0],
      text,
      mediaUrl,
      messageType: type,
      timestamp: 'Just now',
      isRead: true,
      aiSuggested
    };

    setConversations(prev => {
      const conv = prev[convId];
      if (!conv) return prev;
      return {
        ...prev,
        [convId]: {
          ...conv,
          messages: [...conv.messages, newMessage]
        }
      };
    });

    // Update match snippet
    setMatches(prev =>
      prev.map(m =>
        m.id === convId
          ? {
              ...m,
              lastMessageSnippet: text ? (text.length > 30 ? text.slice(0, 30) + '...' : text) : `Sent a ${type}`
            }
          : m
      )
    );

    // Simulate an organic incoming reply after 2 seconds for high realism!
    setTimeout(() => {
      const partnerName = conversations[convId]?.user.name.split(' ')[0] || 'Match';
      const replies = [
        `Haha love that! 😄 What made you think of that?`,
        `Totally agree with you! ✨ Are you free later this week to grab coffee?`,
        `That's awesome! I've been wanting to try that place out for weeks.`,
        `That just made my day! Tell me more 🙌`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const incomingMsg: ChatMessage = {
        id: 'msg-in-' + Date.now(),
        senderId: conversations[convId]?.user.id || 'partner',
        senderName: partnerName,
        text: randomReply,
        messageType: 'text',
        timestamp: 'Just now',
        isRead: false
      };

      setConversations(p => {
        const c = p[convId];
        if (!c) return p;
        return {
          ...p,
          [convId]: {
            ...c,
            messages: [...c.messages, incomingMsg],
            unreadCount: c.unreadCount + 1
          }
        };
      });

      showToast(`New Message from ${partnerName} 💬`, randomReply, 'vibe');
    }, 2500);
  };

  const reactToMessage = (convId: string, messageId: string, emoji: string) => {
    setConversations(prev => {
      const conv = prev[convId];
      if (!conv) return prev;
      return {
        ...prev,
        [convId]: {
          ...conv,
          messages: conv.messages.map(m =>
            m.id === messageId ? { ...m, reaction: m.reaction === emoji ? undefined : emoji } : m
          )
        }
      };
    });
  };

  const deleteMessage = (convId: string, messageId: string) => {
    setConversations(prev => {
      const conv = prev[convId];
      if (!conv) return prev;
      return {
        ...prev,
        [convId]: {
          ...conv,
          messages: conv.messages.filter(m => m.id !== messageId)
        }
      };
    });
    showToast('Message Deleted', undefined, 'info');
  };

  const pinMessage = (convId: string, messageId: string) => {
    setConversations(prev => {
      const conv = prev[convId];
      if (!conv) return prev;
      return {
        ...prev,
        [convId]: {
          ...conv,
          messages: conv.messages.map(m =>
            m.id === messageId ? { ...m, isPinned: !m.isPinned } : m
          )
        }
      };
    });
    showToast('Message Pin Toggled 📌', undefined, 'info');
  };

  const setDisappearingTime = (convId: string, option: 'off' | '10s' | '1m' | '1h' | '24h') => {
    setConversations(prev => {
      const conv = prev[convId];
      if (!conv) return prev;
      return {
        ...prev,
        [convId]: {
          ...conv,
          disappearingTimeOption: option
        }
      };
    });
    showToast('Disappearing Timer Updated ⏱️', option === 'off' ? 'Disappearing messages turned off' : `Messages will vanish after ${option}`, 'vibe');
  };

  // Stories
  const openStoryViewer = (groupIndex: number, itemIndex: number = 0) => {
    setActiveStoryGroupIndex(groupIndex);
    setActiveStoryItemIndex(itemIndex);
  };

  const closeStoryViewer = () => {
    setActiveStoryGroupIndex(null);
    setActiveStoryItemIndex(0);
  };

  const nextStory = () => {
    if (activeStoryGroupIndex === null) return;
    const currentGroup = stories[activeStoryGroupIndex];
    if (activeStoryItemIndex < currentGroup.stories.length - 1) {
      setActiveStoryItemIndex(prev => prev + 1);
    } else if (activeStoryGroupIndex < stories.length - 1) {
      setActiveStoryGroupIndex(prev => (prev !== null ? prev + 1 : 0));
      setActiveStoryItemIndex(0);
    } else {
      closeStoryViewer();
    }
  };

  const prevStory = () => {
    if (activeStoryGroupIndex === null) return;
    if (activeStoryItemIndex > 0) {
      setActiveStoryItemIndex(prev => prev - 1);
    } else if (activeStoryGroupIndex > 0) {
      const prevGroup = stories[activeStoryGroupIndex - 1];
      setActiveStoryGroupIndex(prev => (prev !== null ? prev - 1 : 0));
      setActiveStoryItemIndex(prevGroup.stories.length - 1);
    }
  };

  const reactToStory = (groupIndex: number, storyId: string, emoji: string) => {
    const author = stories[groupIndex];
    showToast(`Reacted ${emoji} to ${author.userName}'s story! ✨`, undefined, 'vibe');
  };

  const replyToStory = (groupIndex: number, storyId: string, text: string) => {
    const author = stories[groupIndex];
    showToast(`Replied to ${author.userName}: "${text}"`, 'Sent directly to their chat 💬', 'success');
  };

  const addNewStory = (
    mediaUrl: string,
    caption?: string,
    filterName?: string,
    musicTitle?: string,
    pollData?: { question: string; optionA: string; optionB: string }
  ) => {
    const newStoryItem = {
      id: 'story-me-' + Date.now(),
      mediaUrl,
      mediaType: 'photo' as const,
      caption,
      filterName,
      music: musicTitle ? { title: musicTitle, artist: 'Trending Audio' } : undefined,
      poll: pollData
        ? {
            question: pollData.question,
            optionA: pollData.optionA,
            optionB: pollData.optionB,
            votesA: 0,
            votesB: 0
          }
        : undefined,
      createdAt: 'Just now',
      expiresAt: '24h remaining',
      viewersCount: 0,
      reactions: []
    };

    setStories(prev => {
      const myStoryGroupIndex = prev.findIndex(s => s.userId === 'me');
      if (myStoryGroupIndex >= 0) {
        const updated = [...prev];
        updated[myStoryGroupIndex] = {
          ...updated[myStoryGroupIndex],
          stories: [newStoryItem, ...updated[myStoryGroupIndex].stories]
        };
        return updated;
      } else {
        const myGroup: UserStoryGroup = {
          userId: 'me',
          userName: 'Your Story',
          userAvatar: currentUser.photos[0],
          isVerified: currentUser.verified,
          hasUnseen: false,
          stories: [newStoryItem]
        };
        return [myGroup, ...prev];
      }
    });

    showToast('Story Published! 📸', 'Your 24-hour temporary story is now live for matches.', 'vibe');
  };

  // Feed actions
  const likeFeedPost = (postId: string) => {
    setFeedPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1
          };
        }
        return post;
      })
    );
  };

  const saveFeedPost = (postId: string) => {
    setFeedPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return { ...post, isSaved: !post.isSaved };
        }
        return post;
      })
    );
    showToast('Saved Post 🔖', undefined, 'info');
  };

  const addFeedComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    setFeedPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: 'c-' + Date.now(),
            authorName: currentUser.name,
            authorAvatar: currentUser.photos[0],
            text,
            createdAt: 'Just now'
          };
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
    showToast('Comment Posted 💬', undefined, 'success');
  };

  const voteFeedPoll = (postId: string, optionId: string) => {
    setFeedPosts(prev =>
      prev.map(post => {
        if (post.id === postId && post.poll && !post.poll.userVotedId) {
          return {
            ...post,
            poll: {
              ...post.poll,
              userVotedId: optionId,
              options: post.poll.options.map(opt =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              )
            }
          };
        }
        return post;
      })
    );
    showToast('Vote Recorded 🗳️', undefined, 'vibe');
  };

  const addNewFeedPost = (content: string, mediaUrls?: string[], tags?: string[]) => {
    const newPost: FeedPost = {
      id: 'post-' + Date.now(),
      author: currentUser,
      content,
      mediaUrls,
      tags: tags || ['#VibeMate', '#SocialDiscovery'],
      likesCount: 0,
      isLiked: false,
      isSaved: false,
      commentsCount: 0,
      comments: [],
      createdAt: 'Just now'
    };
    setFeedPosts(prev => [newPost, ...prev]);
    showToast('Post Shared to Vibe Feed! ✨', undefined, 'vibe');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isOnboarded,
        setIsOnboarded,
        currentUser,
        updateCurrentUser,
        toggleDateMode,
        setVibeMood,
        discoverProfiles,
        currentProfileIndex,
        swipeHistory,
        handleSwipe,
        handleUndoSwipe,
        resetDiscoverDeck,
        previewProfile,
        setPreviewProfile,
        matchedProfile,
        setMatchedProfile,
        triggerMatchAnimation,
        matches,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        reactToMessage,
        deleteMessage,
        pinMessage,
        setDisappearingTime,
        stories,
        activeStoryGroupIndex,
        activeStoryItemIndex,
        openStoryViewer,
        closeStoryViewer,
        nextStory,
        prevStory,
        reactToStory,
        replyToStory,
        addNewStory,
        feedPosts,
        likeFeedPost,
        saveFeedPost,
        addFeedComment,
        voteFeedPoll,
        addNewFeedPost,
        isFilterOpen,
        setIsFilterOpen,
        isAISuggestModalOpen,
        setIsAISuggestModalOpen,
        isVibeAIHubOpen,
        setIsVibeAIHubOpen,
        isSafetyCenterOpen,
        setIsSafetyCenterOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        isVerificationModalOpen,
        setIsVerificationModalOpen,
        isPremiumModalOpen,
        setIsPremiumModalOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isCameraOpen,
        setIsCameraOpen,
        isEditProfileOpen,
        setIsEditProfileOpen,
        isVibeCheckOpen,
        setIsVibeCheckOpen,
        isQuizOpen,
        setIsQuizOpen,
        isDateModeModalOpen,
        setIsDateModeModalOpen,
        isSharedPlaylistOpen,
        setIsSharedPlaylistOpen,
        isMemoryLaneOpen,
        setIsMemoryLaneOpen,
        isDailyQuestionOpen,
        setIsDailyQuestionOpen,
        isNearbyEventsOpen,
        setIsNearbyEventsOpen,
        notifications,
        markNotificationAsRead,
        unreadNotificationsCount,
        adminAnalytics,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
