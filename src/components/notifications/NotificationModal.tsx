import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { NotificationItem } from '../../types';
import {
  Bell,
  Heart,
  Flame,
  MessageCircle,
  Sparkles,
  Zap,
  Check,
  Calendar
} from 'lucide-react';

export const NotificationModal: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, markNotificationAsRead, setActiveTab, setActiveConversationId } = useApp();

  const handleNotificationClick = (item: NotificationItem) => {
    markNotificationAsRead(item.id);
    if (item.type === 'match' || item.type === 'message') {
      setIsNotificationsOpen(false);
      setActiveTab('messages');
      setActiveConversationId('match-1');
    } else if (item.type === 'story_reaction') {
      setIsNotificationsOpen(false);
      setActiveTab('stories');
    }
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'match':
        return <Flame className="w-4 h-4 text-vibe-400 fill-vibe-500" />;
      case 'like':
        return <Heart className="w-4 h-4 text-pink-400 fill-pink-500" />;
      case 'message':
        return <MessageCircle className="w-4 h-4 text-neon-cyan" />;
      case 'story_reaction':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'ai_tip':
        return <Sparkles className="w-4 h-4 text-electric-400" />;
      case 'date_reminder':
        return <Calendar className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <Modal
      isOpen={isNotificationsOpen}
      onClose={() => setIsNotificationsOpen(false)}
      title="Notifications"
      subtitle="Stay updated on matches, story vibes, and AI tips"
    >
      <div className="space-y-2.5">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No new notifications right now.
          </div>
        ) : (
          notifications.map(item => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                !item.read
                  ? 'bg-dark-850 border-vibe-500/30 shadow-sm'
                  : 'bg-dark-900 border-white/5 opacity-80 hover:opacity-100'
              }`}
            >
              {item.avatar ? (
                <img src={item.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/10" />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-dark-800 border border-white/10 flex items-center justify-center shrink-0">
                  {getIcon(item.type)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{item.description}</p>
              </div>

              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-vibe-500 shrink-0 mt-1" />
              )}
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};
