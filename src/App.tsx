import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/Toast';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { DiscoverDeck } from './components/discover/DiscoverDeck';
import { ProfileDetailModal } from './components/discover/ProfileDetailModal';
import { FilterModal } from './components/discover/FilterModal';
import { MatchCelebrationModal } from './components/discover/MatchCelebrationModal';
import { MatchesScreen } from './components/matches/MatchesScreen';
import { StoriesScreen } from './components/stories/StoriesScreen';
import { StoryViewer } from './components/stories/StoryViewer';
import { MessagesScreen } from './components/chat/MessagesScreen';
import { VibeFeedScreen } from './components/feed/VibeFeedScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { EditProfileModal } from './components/profile/EditProfileModal';
import { VerificationModal } from './components/profile/VerificationModal';
import { SafetyCenterModal } from './components/safety/SafetyCenterModal';
import { PrivacySettingsModal } from './components/safety/PrivacySettingsModal';
import { PremiumPaywallModal } from './components/premium/PremiumPaywallModal';
import { VibeAIHub } from './components/ai/VibeAIHub';
import { VibeCheckModal } from './components/unique/VibeCheckModal';
import { CompatibilityQuizModal } from './components/unique/CompatibilityQuizModal';
import { DateModeModal } from './components/unique/DateModeModal';
import { SharedPlaylistModal } from './components/unique/SharedPlaylistModal';
import { MemoryLaneModal } from './components/unique/MemoryLaneModal';
import { DailyQuestionModal } from './components/unique/DailyQuestionModal';
import { NearbyEventsModal } from './components/unique/NearbyEventsModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { NotificationModal } from './components/notifications/NotificationModal';
import { CameraStudioModal } from './components/camera/CameraStudioModal';

export const AppContent: React.FC = () => {
  const { activeTab, isOnboarded, setIsOnboarded, activeConversationId } = useApp();

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-between selection:bg-vibe-500 selection:text-white relative">
      {/* Onboarding Overlay Flow */}
      {!isOnboarded && (
        <OnboardingFlow onComplete={() => setIsOnboarded(true)} />
      )}

      {/* Main Top Header (Hidden when in direct 1-on-1 chat room) */}
      {!activeConversationId && <Header />}

      {/* Main Screen Content Router */}
      <main className="flex-1 w-full max-w-md mx-auto relative">
        {activeTab === 'discover' && <DiscoverDeck />}
        {activeTab === 'matches' && <MatchesScreen />}
        {activeTab === 'stories' && <StoriesScreen />}
        {activeTab === 'messages' && <MessagesScreen />}
        {activeTab === 'feed' && <VibeFeedScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </main>

      {/* Bottom Navigation Bar (Hidden when in direct 1-on-1 chat room) */}
      {!activeConversationId && <BottomNav />}

      {/* Global Modals & Overlays */}
      <ProfileDetailModal />
      <FilterModal />
      <MatchCelebrationModal />
      <StoryViewer />
      <VibeAIHub />
      <SafetyCenterModal />
      <PrivacySettingsModal />
      <VerificationModal />
      <PremiumPaywallModal />
      <VibeCheckModal />
      <CompatibilityQuizModal />
      <DateModeModal />
      <SharedPlaylistModal />
      <MemoryLaneModal />
      <DailyQuestionModal />
      <NearbyEventsModal />
      <AdminDashboardModal />
      <NotificationModal />
      <CameraStudioModal />
      <EditProfileModal />

      {/* Global Toast Alert Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AppContent;
