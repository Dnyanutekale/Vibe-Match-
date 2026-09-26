import { UserProfile, CurrentUser, MatchItem, Conversation, UserStoryGroup, FeedPost, DateIdea, NotificationItem, AdminAnalytics } from '../types';

export const initialCurrentUser: CurrentUser = {
  id: 'me',
  name: 'Alex Rivera',
  age: 25,
  gender: 'Man',
  bio: 'Architecture photographer & vinyl record collector 🎧. Always down for spontaneous rooftop coffee, 35mm film walks, and discovering hidden indie jazz bars.',
  photos: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
  ],
  distanceKm: 0,
  verified: true,
  profession: 'Lead UI/UX Architect',
  education: 'Rhode Island School of Design',
  height: `5'11" (180 cm)`,
  zodiac: 'Libra ♎',
  hometown: 'San Francisco, CA',
  relationshipGoal: 'Serious relationship',
  interests: ['Architecture', 'Vinyl Records', 'Specialty Coffee', 'Film Photography', 'Indie Rock', 'Bouldering'],
  hobbies: ['Analog Synths', 'Ceramics', 'Midnight Cycling', 'Matcha Tasting'],
  vibeTagline: 'Design by day, ambient beats by night ✨',
  mutualInterestsCount: 0,
  mutualFriendsCount: 0,
  spotifyTopTrack: {
    song: 'Bags',
    artist: 'Clairo',
    albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80'
  },
  dailyAnswer: {
    question: 'The best first date always involves...',
    answer: 'A cozy corner table, warm pastries, and zero phone checking for 3 straight hours.'
  },
  compatibilityScore: 100,
  vibeMood: 'Creative & Spontaneous 🎨',
  isDateModeActive: true,
  email: 'alex.rivera@vibemate.app',
  phone: '+1 (555) 382-9014',
  dob: '1999-10-14',
  datingPreference: 'Everyone',
  minAgePreference: 22,
  maxAgePreference: 32,
  maxDistanceKm: 25,
  isPremium: false,
  premiumTier: null,
  incognitoMode: false,
  onlineStatusVisible: true,
  readReceipts: true,
  locationVisibility: 'approximate',
  profileCompletionScore: 92,
  emergencyContacts: [
    { id: 'ec-1', name: 'Maya Lin (Best Friend)', phone: '+1 (555) 891-2345', relation: 'Roommate & Best Friend' }
  ],
  bookmarkedUsers: ['user-2', 'user-4'],
  blockedUsers: []
};

export const mockDiscoverProfiles: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Elena Rostova',
    age: 24,
    gender: 'Woman',
    bio: 'Documentary filmmaker & matcha addict 🍵 Exploring neon alleyways with my vintage Bolex camera. Let’s trade favorite obscure movies and debate the best noodle spot in town.',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
    ],
    distanceKm: 3.2,
    verified: true,
    profession: 'Creative Producer @ A24 Labs',
    education: 'NYU Tisch Film & TV',
    height: `5'7" (170 cm)`,
    zodiac: 'Scorpio ♏',
    hometown: 'Brooklyn, NY',
    relationshipGoal: 'Serious relationship',
    interests: ['Film Photography', 'Specialty Coffee', 'Indie Cinema', 'Japanese Ramen', 'Vinyl Records', 'Contemporary Art'],
    hobbies: ['Analog Editing', 'Thrifting 90s Jackets', 'Soundtrack Mixing'],
    vibeTagline: 'Looking for someone who actually watches the post-credits scene 🎬',
    mutualInterestsCount: 4,
    mutualFriendsCount: 3,
    spotifyTopTrack: {
      song: 'Chamber of Reflection',
      artist: 'Mac DeMarco',
      albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80'
    },
    dailyAnswer: {
      question: 'Two truths and a lie:',
      answer: 'Met Guillermo del Toro in an elevator, slept through a volcanic eruption in Iceland, own 40 vintage cameras.'
    },
    compatibilityScore: 94,
    vibeMood: 'Filmmaking & Golden Hour 🌅',
    isDateModeActive: true
  },
  {
    id: 'user-2',
    name: 'Julian Vance',
    age: 26,
    gender: 'Man',
    bio: 'Botanical garden curator 🌿 and weekend sourdough experimentalist. When not repotting rare monsteras, I produce lo-fi ambient tracks.',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    distanceKm: 4.8,
    verified: true,
    profession: 'Landscape Architect',
    education: 'UC Berkeley Environmental Design',
    height: `6'1" (185 cm)`,
    zodiac: 'Taurus ♉',
    hometown: 'Portland, OR',
    relationshipGoal: 'Casual dating',
    interests: ['Botany & Plants', 'Bouldering', 'Lo-Fi Beats', 'Specialty Coffee', 'Sourdough', 'Hiking'],
    hobbies: ['Bonsai Sculpting', 'Modular Synths', 'Trail Running'],
    vibeTagline: 'Green thumb, warm heart, killer pour-over ☕',
    mutualInterestsCount: 3,
    mutualFriendsCount: 1,
    spotifyTopTrack: {
      song: 'San Luis',
      artist: 'Gregory Alan Isakov',
      albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80'
    },
    dailyAnswer: {
      question: 'My simple pleasures:',
      answer: 'Freshly baked bread with salty French butter, morning dew on leaves, and acoustic guitar sessions.'
    },
    compatibilityScore: 89,
    vibeMood: 'Chill & Earthy 🍃',
    isDateModeActive: false
  },
  {
    id: 'user-3',
    name: 'Aria Chen',
    age: 24,
    gender: 'Woman',
    bio: 'Fintech product lead by day, competitive boulderer & techno enthusiast by night 🧗‍♀️⚡ Big fan of spicy street food, fast banter, and spontaneous weekend road trips.',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    distanceKm: 2.1,
    verified: true,
    profession: 'Lead Product Manager @ Starlight',
    education: 'Stanford University',
    height: `5'6" (168 cm)`,
    zodiac: 'Aries ♈',
    hometown: 'Seattle, WA',
    relationshipGoal: 'Serious relationship',
    interests: ['Bouldering', 'Startups', 'Electronic Music', 'Modern Art', 'Specialty Coffee', 'Spicy Food'],
    hobbies: ['Climbing V6s', 'DJing House Sets', 'High-altitude Treks'],
    vibeTagline: 'High energy, high standards, genuine connections only 💥',
    mutualInterestsCount: 5,
    mutualFriendsCount: 6,
    spotifyTopTrack: {
      song: 'Innerbloom',
      artist: 'RÜFÜS DU SOL',
      albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80'
    },
    dailyAnswer: {
      question: 'Teach me something about...',
      answer: 'How your brain works when you get deeply passionate about a craft or strange niche hobby.'
    },
    compatibilityScore: 96,
    vibeMood: 'Electric Energy ⚡',
    isDateModeActive: true
  },
  {
    id: 'user-4',
    name: 'Soren Lindqvist',
    age: 27,
    gender: 'Man',
    bio: 'Nordic minimalist furniture designer 🪑 Living for Bauhaus geometry, Scandinavian sauna sessions, and ceramic pottery. Fluent in Danish and espresso-machine repair.',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    distanceKm: 5.5,
    verified: true,
    profession: 'Industrial Designer @ Studio KBH',
    education: 'Royal Danish Academy of Fine Arts',
    height: `6'3" (190 cm)`,
    zodiac: 'Capricorn ♑',
    hometown: 'Copenhagen / Austin',
    relationshipGoal: 'Friendship',
    interests: ['Architecture', 'Ceramics', 'Design History', 'Espresso Craft', 'Cycling', 'Minimalism'],
    hobbies: ['Woodworking', 'Cold Plunge Swimming', 'Sketching Chairs'],
    vibeTagline: 'Form follows fun & good conversation 📐',
    mutualInterestsCount: 4,
    mutualFriendsCount: 2,
    spotifyTopTrack: {
      song: 'Daylight',
      artist: 'Harry Styles',
      albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80'
    },
    dailyAnswer: {
      question: 'My most controversial opinion:',
      answer: 'Most apartments have terrible ambient lighting and overhead lights should be outlawed.'
    },
    compatibilityScore: 88,
    vibeMood: 'Creative Flow 🎨',
    isDateModeActive: false
  },
  {
    id: 'user-5',
    name: 'Zoe Morales',
    age: 23,
    gender: 'Woman',
    bio: 'Sommelier & natural wine advocate 🍷 Traveling through Europe tasting pet-nats and writing poetic reviews. In search of someone who loves long dinners with deep conversation.',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    distanceKm: 1.8,
    verified: false,
    profession: 'Head Sommelier @ L’Osteria Vibe',
    education: 'Court of Master Sommeliers',
    height: `5'5" (165 cm)`,
    zodiac: 'Cancer ♋',
    hometown: 'Barcelona / SF',
    relationshipGoal: 'Still figuring it out',
    interests: ['Natural Wine', 'Culinary Arts', 'Travel', 'Jazz', 'Literature', 'Film Photography'],
    hobbies: ['Wine Pairing Dinners', 'Flea Market Scavenging', 'French Poetry'],
    vibeTagline: 'Life is too short for boring wine or small talk 🍇',
    mutualInterestsCount: 3,
    mutualFriendsCount: 4,
    spotifyTopTrack: {
      song: 'La Vie En Rose',
      artist: 'Édith Piaf / Louis Armstrong',
      albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=80'
    },
    dailyAnswer: {
      question: 'Together we could...',
      answer: 'Cook handmade fresh pasta from scratch while listening to 60s Italian vinyl records.'
    },
    compatibilityScore: 91,
    vibeMood: 'Romantic & Foodie 🍷',
    isDateModeActive: true
  },
  {
    id: 'user-6',
    name: 'Kaito Tanaka',
    age: 28,
    gender: 'Man',
    bio: 'Game developer & sci-fi bookworm 🕹️ Building immersive cyberpunk VR worlds. When AFK, you can find me testing ramen broths or playing guitar in the park.',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    distanceKm: 6.4,
    verified: true,
    profession: 'Principal Game Engineer @ Unreal Pixel',
    education: 'Tokyo Tech & MIT',
    height: `5'10" (178 cm)`,
    zodiac: 'Aquarius ♒',
    hometown: 'Tokyo / Bay Area',
    relationshipGoal: 'Networking',
    interests: ['Game Dev', 'Sci-Fi Books', 'Ramen Tasting', 'Cyberpunk Aesthetics', 'Synthwave', 'Bouldering'],
    hobbies: ['Indie Game Jams', 'Retro Arcade Collecting', 'Electric Skateboarding'],
    vibeTagline: 'Leveling up real-life connections one quest at a time 🎮',
    mutualInterestsCount: 2,
    mutualFriendsCount: 1,
    spotifyTopTrack: {
      song: 'Resonance',
      artist: 'HOME',
      albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=80'
    },
    dailyAnswer: {
      question: 'A skill I want to learn next:',
      answer: 'Astrophotography in the desert under zero light pollution.'
    },
    compatibilityScore: 85,
    vibeMood: 'Curious & Techy 🚀',
    isDateModeActive: false
  }
];

export const mockMatches: MatchItem[] = [
  {
    id: 'match-1',
    user: mockDiscoverProfiles[0], // Elena
    matchedAt: '12 mins ago',
    hasUnreadMessage: true,
    lastMessageSnippet: 'Loved your rooftop photo! What film stock were you using?',
    lastActive: 'Active 5m ago',
    compatibilityScore: 94,
    conversationIcebreakerSuggested: 'Ask Elena about her favorite camera lens or what she thought of the new Denis Villeneuve movie!'
  },
  {
    id: 'match-2',
    user: mockDiscoverProfiles[2], // Aria
    matchedAt: '2 hours ago',
    hasUnreadMessage: false,
    lastMessageSnippet: 'Down for the bouldering gym this Thursday evening!',
    lastActive: 'Active now',
    compatibilityScore: 96,
    conversationIcebreakerSuggested: 'Propose a quick post-climb smoothie or matcha stop at Sun Cafe.'
  },
  {
    id: 'match-3',
    user: mockDiscoverProfiles[4], // Zoe
    matchedAt: 'Yesterday',
    hasUnreadMessage: true,
    lastMessageSnippet: 'Found this unbelievable natural orange wine from Sicily 🍊',
    lastActive: 'Active 1h ago',
    compatibilityScore: 91,
    conversationIcebreakerSuggested: 'Ask Zoe what tasting notes she looks for in orange pet-nats.'
  },
  {
    id: 'match-4',
    user: mockDiscoverProfiles[1], // Julian
    matchedAt: '3 days ago',
    hasUnreadMessage: false,
    lastMessageSnippet: 'Thanks for the playlist link! Total vibe.',
    lastActive: 'Active yesterday',
    compatibilityScore: 89,
    conversationIcebreakerSuggested: 'Ask Julian if his rare monsteras have put out any new fenestrations!'
  }
];

export const mockConversations: Record<string, Conversation> = {
  'match-1': {
    id: 'conv-1',
    matchId: 'match-1',
    user: mockDiscoverProfiles[0], // Elena
    unreadCount: 1,
    lastSeen: 'Active 5m ago',
    disappearingTimeOption: 'off',
    messages: [
      {
        id: 'm1-1',
        senderId: 'user-1',
        senderName: 'Elena',
        text: 'Hey Alex! ✨ Your portfolio photos on your profile are stunning.',
        messageType: 'text',
        timestamp: '11:42 AM',
        isRead: true
      },
      {
        id: 'm1-2',
        senderId: 'me',
        senderName: 'Alex',
        text: 'Thank you Elena! That means a lot coming from an A24 producer 🎬 Really appreciate that.',
        messageType: 'text',
        timestamp: '11:45 AM',
        isRead: true,
        reaction: '❤️'
      },
      {
        id: 'm1-3',
        senderId: 'user-1',
        senderName: 'Elena',
        text: 'Loved that golden hour rooftop photo! What film stock were you shooting with? Portra 400 or CineStill 800T?',
        messageType: 'text',
        timestamp: '11:48 AM',
        isRead: false
      }
    ]
  },
  'match-2': {
    id: 'conv-2',
    matchId: 'match-2',
    user: mockDiscoverProfiles[2], // Aria
    unreadCount: 0,
    lastSeen: 'Active now',
    disappearingTimeOption: 'off',
    messages: [
      {
        id: 'm2-1',
        senderId: 'user-3',
        senderName: 'Aria',
        text: 'Hey Alex! Saw you boulder too 🧗 Which gym do you usually hit up?',
        messageType: 'text',
        timestamp: 'Yesterday',
        isRead: true
      },
      {
        id: 'm2-2',
        senderId: 'me',
        senderName: 'Alex',
        text: 'Hey Aria! Usually Movement or Dogpatch Boulders. Trying to send this tricky V5 overhang currently 😅',
        messageType: 'text',
        timestamp: 'Yesterday',
        isRead: true
      },
      {
        id: 'm2-3',
        senderId: 'user-3',
        senderName: 'Aria',
        text: 'Nice! I just flashed a V6 slab yesterday. Down for the bouldering gym this Thursday evening!',
        messageType: 'text',
        timestamp: '9:15 AM',
        isRead: true,
        reaction: '🔥'
      }
    ]
  },
  'match-3': {
    id: 'conv-3',
    matchId: 'match-3',
    user: mockDiscoverProfiles[4], // Zoe
    unreadCount: 1,
    lastSeen: 'Active 1h ago',
    disappearingTimeOption: 'off',
    messages: [
      {
        id: 'm3-1',
        senderId: 'me',
        senderName: 'Alex',
        text: 'Hey Zoe! Saw you’re a sommelier. Any secret recommendation for an earthy, funky pet-nat?',
        messageType: 'text',
        timestamp: 'Yesterday',
        isRead: true
      },
      {
        id: 'm3-2',
        senderId: 'user-5',
        senderName: 'Zoe',
        text: 'Found this unbelievable natural orange wine from Sicily 🍊 The tasting notes are wild — dried apricots, sea salt and smoked rosemary!',
        messageType: 'text',
        timestamp: '10:02 AM',
        isRead: false
      }
    ]
  }
};

export const mockUserStories: UserStoryGroup[] = [
  {
    userId: 'user-1',
    userName: 'Elena',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isCloseFriend: true,
    hasUnseen: true,
    stories: [
      {
        id: 's1-1',
        mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        mediaType: 'photo',
        caption: 'Testing 16mm test rolls at the pier 🎥 Golden hour hit just right.',
        overlayText: 'Golden hour magic ✨',
        filterName: 'Vintage Warmth',
        music: {
          title: 'Memory Lane',
          artist: 'Acoustic Dreams'
        },
        location: 'Pacific Pier Sunset',
        poll: {
          question: 'Should I color grade warm or moody noir?',
          optionA: 'Warm Golden 🌅',
          optionB: 'Moody Noir 🌒',
          votesA: 84,
          votesB: 42
        },
        createdAt: '2h ago',
        expiresAt: '22h remaining',
        viewersCount: 148,
        reactions: [
          { userId: 'user-2', userName: 'Julian', emoji: '🔥' },
          { userId: 'user-3', userName: 'Aria', emoji: '✨' }
        ]
      },
      {
        id: 's1-2',
        mediaUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
        mediaType: 'photo',
        caption: 'Late night espresso and script rewrites ☕',
        overlayText: 'Scene 4 draft #3',
        location: 'Cafe Trieste',
        createdAt: '45m ago',
        expiresAt: '23h remaining',
        viewersCount: 92,
        reactions: [
          { userId: 'me', userName: 'Alex', emoji: '☕' }
        ]
      }
    ]
  },
  {
    userId: 'user-3',
    userName: 'Aria',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isCloseFriend: false,
    hasUnseen: true,
    stories: [
      {
        id: 's3-1',
        mediaUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80',
        mediaType: 'photo',
        caption: 'Crux move sent on the new purple problem! 🧗‍♀️',
        overlayText: 'V6 Overhang Sent 💥',
        music: {
          title: 'Innerbloom',
          artist: 'RÜFÜS DU SOL'
        },
        location: 'Movement Gym',
        createdAt: '3h ago',
        expiresAt: '21h remaining',
        viewersCount: 210,
        reactions: [
          { userId: 'user-1', userName: 'Elena', emoji: '🙌' }
        ]
      }
    ]
  },
  {
    userId: 'user-2',
    userName: 'Julian',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    isVerified: true,
    isCloseFriend: false,
    hasUnseen: true,
    stories: [
      {
        id: 's2-1',
        mediaUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
        mediaType: 'photo',
        caption: 'Rare Variegated Monstera Thai Constellation unfurling its 5th leaf 🌱',
        location: 'Urban Botanical Lab',
        createdAt: '5h ago',
        expiresAt: '19h remaining',
        viewersCount: 175,
        reactions: [
          { userId: 'user-5', userName: 'Zoe', emoji: '🌱' }
        ]
      }
    ]
  },
  {
    userId: 'user-5',
    userName: 'Zoe',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    isVerified: false,
    isCloseFriend: true,
    hasUnseen: false,
    stories: [
      {
        id: 's5-1',
        mediaUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        mediaType: 'photo',
        caption: 'Candlelit natural wine cellar tasting in North Beach 🍷',
        location: 'L’Osteria Vibe',
        createdAt: '8h ago',
        expiresAt: '16h remaining',
        viewersCount: 310,
        reactions: [
          { userId: 'me', userName: 'Alex', emoji: '🍷' }
        ]
      }
    ]
  }
];

export const mockFeedPosts: FeedPost[] = [
  {
    id: 'post-1',
    author: mockDiscoverProfiles[0], // Elena
    content: 'Just wrapped a 3-day documentary shoot exploring the underground jazz cellar scene. The raw acoustics in these 1920s brick arches are unmatched! Who else gets chills from brass instruments recorded on tape?',
    mediaUrls: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    ],
    mediaType: 'photo',
    tags: ['#IndieFilm', '#JazzLovers', '#AnalogueAudio', '#SanFranciscoVibes'],
    likesCount: 142,
    isLiked: true,
    isSaved: false,
    commentsCount: 18,
    location: 'Black Cat Jazz Lounge',
    createdAt: '2 hours ago',
    comments: [
      {
        id: 'c1',
        authorName: 'Alex Rivera',
        authorAvatar: initialCurrentUser.photos[0],
        text: 'That ceiling reflection is gorgeous Elena! Did you capture the room reverb on ribbon mics?',
        createdAt: '1 hour ago'
      },
      {
        id: 'c2',
        authorName: 'Julian Vance',
        authorAvatar: mockDiscoverProfiles[1].photos[0],
        text: 'Incredible mood lighting! Reminds me of late night vinyl listening sessions.',
        createdAt: '45m ago'
      }
    ]
  },
  {
    id: 'post-2',
    author: mockDiscoverProfiles[2], // Aria
    content: 'Vibe check for this weekend! Which energy are we channeling for our next group meetup?',
    tags: ['#WeekendVibes', '#SocialDiscovery', '#OutdoorAdventures'],
    poll: {
      question: 'Ideal Saturday afternoon activity:',
      options: [
        { id: 'p1', text: 'Sunset Rooftop DJ set 🎶', votes: 128 },
        { id: 'p2', text: 'Bouldering & Matcha run 🧗‍♀️', votes: 94 },
        { id: 'p3', text: 'Vintage flea market stroll 🧥', votes: 76 },
        { id: 'p4', text: 'Cozy board games & wine 🍷', votes: 110 }
      ],
      userVotedId: 'p1'
    },
    likesCount: 236,
    isLiked: false,
    isSaved: true,
    commentsCount: 32,
    location: 'Mission District, SF',
    createdAt: '5 hours ago',
    comments: [
      {
        id: 'c3',
        authorName: 'Zoe Morales',
        authorAvatar: mockDiscoverProfiles[4].photos[0],
        text: 'If there is good orange wine at the rooftop count me in 100%!',
        createdAt: '3 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    author: mockDiscoverProfiles[1], // Julian
    content: 'Finally perfected my 78% hydration sourdough with roasted garlic & rosemary sprigs from the patio garden. Still warm, crackling crust. The best dates start with good food and good tunes.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    mediaType: 'photo',
    tags: ['#Baking', '#CulinaryCreatives', '#HomeCooked', '#SlowLiving'],
    likesCount: 95,
    isLiked: false,
    isSaved: false,
    commentsCount: 12,
    location: 'Haight-Ashbury',
    createdAt: '1 day ago',
    comments: []
  }
];

export const mockDateIdeas: DateIdea[] = [
  {
    id: 'date-1',
    title: 'Secret Vinyl Listening Lounge & Natural Wine',
    category: 'Nightlife & Drinks',
    description: 'A discreet speakeasy with custom Japanese tube amps, plush velvet booths, and curated natural orange wines. Perfect for close conversation and music appreciation.',
    locationTip: 'Look for the unmarked brass door on 4th & Geary',
    estimatedBudget: '$$',
    durationHours: '2 - 3 Hours',
    suggestedIcebreakers: [
      'What album would you take if you were stranded on a deserted island?',
      'What was the very first concert you ever went to?'
    ],
    vibeScore: 98
  },
  {
    id: 'date-2',
    title: 'Sunset Bouldering & Artisan Matcha Flights',
    category: 'Active & Outdoors',
    description: 'Fun, low-pressure bouldering session cheering each other on at the climbing wall, followed by ceremonial cold-whisked matcha and pastry tasting.',
    locationTip: 'Dogpatch Climbing Gym + Maru Matcha Pavilion',
    estimatedBudget: '$',
    durationHours: '2 Hours',
    suggestedIcebreakers: [
      'Are you more competitive with yourself or with other people?',
      'What’s your favorite adrenaline rush outside of sports?'
    ],
    vibeScore: 95
  },
  {
    id: 'date-3',
    title: 'Modern Art Gallery Scavenger Hunt & Pastry Walk',
    category: 'Art & Culture',
    description: 'Wander through modern contemporary exhibits with a fun mini-game: pick 1 piece that describes your match and 1 piece that makes no sense at all.',
    locationTip: 'SFMOMA 3rd Floor Contemporary Wing',
    estimatedBudget: '$$',
    durationHours: '2.5 Hours',
    suggestedIcebreakers: [
      'If you could commission an artist to paint any moment in your life, what would it be?',
      'What is your definition of truly timeless design?'
    ],
    vibeScore: 92
  },
  {
    id: 'date-4',
    title: 'Cozy Bookstore Scavenger & Rooftop Hot Chocolate',
    category: 'Cozy & Creative',
    description: 'Pick a favorite passage or funny postcard for each other in an independent labyrinth bookstore, then sip artisanal single-origin chocolate with city views.',
    locationTip: 'City Lights Booksellers & Vesuvio Rooftop Deck',
    estimatedBudget: '$',
    durationHours: '1.5 - 2 Hours',
    suggestedIcebreakers: [
      'What book or movie has shaped the way you think about relationships the most?',
      'What is a quirky niche topic you could give a 20-minute presentation on without prep?'
    ],
    vibeScore: 96
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    type: 'match',
    title: 'New Vibe Match! 🎉',
    description: 'You and Elena matched! You have 4 mutual passions in common.',
    timestamp: '12m ago',
    read: false,
    avatar: mockDiscoverProfiles[0].photos[0]
  },
  {
    id: 'n-2',
    type: 'story_reaction',
    title: 'Story Reaction 🔥',
    description: 'Aria reacted with "🔥" to your rooftop photo story.',
    timestamp: '45m ago',
    read: false,
    avatar: mockDiscoverProfiles[2].photos[0]
  },
  {
    id: 'n-3',
    type: 'ai_tip',
    title: 'Vibe AI Profile Insight 💡',
    description: 'Your profile score reached 92%! Adding 1 conversation prompt will boost match rates by ~35%.',
    timestamp: '2h ago',
    read: true
  },
  {
    id: 'n-4',
    type: 'like',
    title: 'Someone Super Liked You! ⚡',
    description: 'A verified designer 2km away just super liked your profile.',
    timestamp: '5h ago',
    read: true
  },
  {
    id: 'n-5',
    type: 'date_reminder',
    title: 'Date Mode Active 📍',
    description: 'You are marked available for casual coffee & bouldering this evening.',
    timestamp: '1d ago',
    read: true
  }
];

export const mockAdminAnalytics: AdminAnalytics = {
  totalUsers: 48920,
  activeToday: 12450,
  newRegistrationsWeek: 3120,
  totalMatches: 89430,
  messagesSentToday: 64200,
  activeStories: 4890,
  pendingVerifications: 14,
  flaggedReports: 3,
  premiumSubscribers: 6840,
  satisfactionRate: 98.4
};

export const mockCompatibilityQuestions = [
  {
    id: 'q1',
    question: 'How do you prefer to spend a spontaneous free Saturday evening?',
    options: [
      { id: 'o1', text: 'Exploring a buzzing underground jazz or electronic music event', category: 'electric' },
      { id: 'o2', text: 'Intimate dinner party with close friends, wine, and deep chats', category: 'intimate' },
      { id: 'o3', text: 'Quiet night at home with craft cooking, vinyl records, or books', category: 'cozy' },
      { id: 'o4', text: 'Night climbing or outdoor spontaneous rooftop stargazing', category: 'adventurous' }
    ]
  },
  {
    id: 'q2',
    question: 'What is your ideal communication rhythm when getting to know someone?',
    options: [
      { id: 'o1', text: 'Quality banter throughout the day, quick voice notes & memes', category: 'electric' },
      { id: 'o2', text: 'Few deep, thoughtful messages at night or direct phone calls', category: 'intimate' },
      { id: 'o3', text: 'Skip endless texting and meet up for a low-stakes coffee in person', category: 'adventurous' },
      { id: 'o4', text: 'Balanced check-ins with zero pressure and mutual respect for space', category: 'cozy' }
    ]
  },
  {
    id: 'q3',
    question: 'What matters most to you in building a lasting connection?',
    options: [
      { id: 'o1', text: 'Shared creative passions, aesthetic curiosity, and intellectual chemistry', category: 'intimate' },
      { id: 'o2', text: 'Emotional safety, reliable vulnerability, and kindness', category: 'cozy' },
      { id: 'o3', text: 'Shared ambition, high energy, and inspiring each other to level up', category: 'electric' },
      { id: 'o4', text: 'Humor, spontaneity, and making every mundane day an adventure', category: 'adventurous' }
    ]
  }
];

export const mockNearbyEvents = [
  {
    id: 'evt-1',
    title: 'Neon Nights: Rooftop Indie DJ Set & Mocktail Bar',
    date: 'Friday, 8:00 PM',
    distanceApprox: '~2.5 km away',
    attendeesCount: 78,
    category: 'Music & Vibes',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    tags: ['Live Vinyl', 'City Views', 'Singles Mixer']
  },
  {
    id: 'evt-2',
    title: 'Sunset Bouldering & Social Chill Session',
    date: 'Saturday, 4:30 PM',
    distanceApprox: '~3.8 km away',
    attendeesCount: 42,
    category: 'Sports & Active',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
    tags: ['All Skill Levels', 'Social Climb', 'Matcha Stop']
  },
  {
    id: 'evt-3',
    title: 'Ceramics & Pet-Nat Wine Workshop for Two',
    date: 'Sunday, 2:00 PM',
    distanceApprox: '~1.9 km away',
    attendeesCount: 24,
    category: 'Art & Craft',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    tags: ['Pottery Wheel', 'Creative Dating', 'Intimate']
  }
];
