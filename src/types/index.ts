export type RelationshipGoal = 
  | 'Serious relationship'
  | 'Casual dating'
  | 'Friendship'
  | 'Networking'
  | 'Still figuring it out';

export type Gender = 'Man' | 'Woman' | 'Non-binary' | 'Everyone';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'Man' | 'Woman' | 'Non-binary';
  bio: string;
  photos: string[];
  distanceKm: number;
  verified: boolean;
  profession: string;
  education: string;
  height?: string;
  zodiac?: string;
  hometown?: string;
  relationshipGoal: RelationshipGoal;
  interests: string[];
  hobbies: string[];
  vibeTagline: string;
  mutualInterestsCount?: number;
  mutualFriendsCount?: number;
  spotifyTopTrack?: {
    song: string;
    artist: string;
    albumArt: string;
  };
  dailyAnswer?: {
    question: string;
    answer: string;
  };
  compatibilityScore?: number; // 0-100 calculated
  vibeMood?: string;
  isDateModeActive?: boolean;
}

export interface CurrentUser extends UserProfile {
  email: string;
  phone: string;
  dob: string;
  datingPreference: Gender;
  minAgePreference: number;
  maxAgePreference: number;
  maxDistanceKm: number;
  isPremium: boolean;
  premiumTier?: 'Gold' | 'Platinum' | null;
  incognitoMode: boolean;
  onlineStatusVisible: boolean;
  readReceipts: boolean;
  locationVisibility: 'exact' | 'approximate' | 'hidden';
  profileCompletionScore: number;
  emergencyContacts: EmergencyContact[];
  bookmarkedUsers: string[];
  blockedUsers: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface MatchItem {
  id: string;
  user: UserProfile;
  matchedAt: string;
  hasUnreadMessage: boolean;
  lastMessageSnippet?: string;
  lastActive?: string;
  compatibilityScore: number;
  conversationIcebreakerSuggested?: string;
}

export type MessageType = 'text' | 'image' | 'video' | 'voice' | 'sticker' | 'gif' | 'date_invite' | 'vibe_game';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text?: string;
  mediaUrl?: string;
  messageType: MessageType;
  timestamp: string;
  isRead: boolean;
  reaction?: string;
  replyTo?: {
    id: string;
    text: string;
    senderName: string;
  };
  isDisappearing?: boolean;
  disappearSeconds?: number;
  voiceDurationSeconds?: number;
  isPinned?: boolean;
  aiSuggested?: boolean;
  dateInviteDetails?: {
    title: string;
    location: string;
    time: string;
    status: 'pending' | 'accepted' | 'declined';
  };
}

export interface Conversation {
  id: string;
  matchId: string;
  user: UserProfile;
  messages: ChatMessage[];
  unreadCount: number;
  isTyping?: boolean;
  lastSeen: string;
  disappearingTimeOption: 'off' | '10s' | '1m' | '1h' | '24h';
}

export interface StoryItem {
  id: string;
  mediaUrl: string;
  mediaType: 'photo' | 'video';
  caption?: string;
  overlayText?: string;
  filterName?: string;
  stickers?: Array<{
    id: string;
    emoji: string;
    x: number;
    y: number;
  }>;
  poll?: {
    question: string;
    optionA: string;
    optionB: string;
    votesA: number;
    votesB: number;
    userVote?: 'A' | 'B';
  };
  music?: {
    title: string;
    artist: string;
  };
  location?: string;
  createdAt: string;
  expiresAt: string;
  viewersCount: number;
  reactions: Array<{
    userId: string;
    userName: string;
    emoji: string;
  }>;
}

export interface UserStoryGroup {
  userId: string;
  userName: string;
  userAvatar: string;
  isVerified: boolean;
  isCloseFriend?: boolean;
  hasUnseen: boolean;
  stories: StoryItem[];
}

export interface FeedPost {
  id: string;
  author: UserProfile;
  content: string;
  mediaUrls?: string[];
  mediaType?: 'photo' | 'video';
  tags: string[];
  poll?: {
    question: string;
    options: Array<{ id: string; text: string; votes: number }>;
    userVotedId?: string;
  };
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  commentsCount: number;
  comments: Array<{
    id: string;
    authorName: string;
    authorAvatar: string;
    text: string;
    createdAt: string;
  }>;
  createdAt: string;
  location?: string;
}

export interface DateIdea {
  id: string;
  title: string;
  category: 'Coffee & Chill' | 'Active & Outdoors' | 'Art & Culture' | 'Foodie Romance' | 'Nightlife & Drinks' | 'Cozy & Creative';
  description: string;
  locationTip: string;
  estimatedBudget: '$' | '$$' | '$$$' | '$$$$';
  durationHours: string;
  suggestedIcebreakers: string[];
  vibeScore: number;
}

export interface NotificationItem {
  id: string;
  type: 'match' | 'message' | 'story_reaction' | 'story_reply' | 'like' | 'profile_view' | 'ai_tip' | 'date_reminder';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  activeToday: number;
  newRegistrationsWeek: number;
  totalMatches: number;
  messagesSentToday: number;
  activeStories: number;
  pendingVerifications: number;
  flaggedReports: number;
  premiumSubscribers: number;
  satisfactionRate: number;
}
