import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatRoom } from './ChatRoom';
import {
  MessageCircle,
  Search,
  ShieldCheck,
  CheckCheck,
  Clock,
  Sparkles,
  Zap,
  PhoneCall
} from 'lucide-react';

export const MessagesScreen: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    matches,
    setPreviewProfile
  } = useApp();

  const [search, setSearch] = useState('');

  if (activeConversationId) {
    return <ChatRoom convId={activeConversationId} onBack={() => setActiveConversationId(null)} />;
  }

  const convList = Object.values(conversations).filter(c =>
    c.user.name.toLowerCase().includes(search.toLowerCase()) ||
    c.messages.some(m => m.text?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-md mx-auto px-4 py-3 space-y-4 pb-24">
      {/* Search Header */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search conversations, keywords..."
          className="w-full bg-dark-850 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
        />
      </div>

      {/* Online Now Horizontal Row */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
          Online Matches
        </h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {matches.map(m => (
            <div
              key={m.id}
              onClick={() => setActiveConversationId(m.id)}
              className="flex flex-col items-center gap-1 cursor-pointer shrink-0"
            >
              <div className="relative w-14 h-14 rounded-2xl p-[2px] bg-gradient-to-tr from-emerald-400 to-neon-cyan shadow-sm">
                <img
                  src={m.user.photos[0]}
                  alt={m.user.name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-dark-950" />
              </div>
              <span className="text-[11px] font-semibold text-slate-200 truncate max-w-[56px] text-center">
                {m.user.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Messages ({convList.length})
        </h2>

        {convList.length === 0 ? (
          <div className="p-8 text-center bg-dark-900 rounded-3xl border border-white/5 space-y-2">
            <MessageCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-400">No conversations found.</p>
          </div>
        ) : (
          convList.map(conv => {
            const lastMsg = conv.messages[conv.messages.length - 1];
            const hasUnread = conv.unreadCount > 0;

            return (
              <div
                key={conv.id}
                onClick={() => setActiveConversationId(conv.matchId)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  hasUnread
                    ? 'bg-dark-900/90 border-vibe-500/30 shadow-vibe-glow'
                    : 'bg-dark-900/50 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar with online dot */}
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={conv.user.photos[0]}
                      alt={conv.user.name}
                      className="w-full h-full object-cover"
                    />
                    {conv.user.verified && (
                      <div className="absolute bottom-0 right-0 p-0.5 bg-dark-950 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
                      </div>
                    )}
                  </div>

                  {/* Name and Last Message */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className={`text-xs ${hasUnread ? 'font-bold text-white' : 'font-semibold text-slate-200'}`}>
                        {conv.user.name}
                      </h3>
                      {conv.user.isDateModeActive && (
                        <span className="text-[10px] text-amber-400 font-bold">⚡</span>
                      )}
                    </div>

                    <p
                      className={`text-xs truncate mt-0.5 ${
                        hasUnread ? 'text-slate-100 font-medium' : 'text-slate-400'
                      }`}
                    >
                      {lastMsg ? (
                        lastMsg.messageType === 'voice' ? (
                          '🎵 Voice message (0:14)'
                        ) : lastMsg.messageType === 'image' ? (
                          '📸 Sent a photo'
                        ) : lastMsg.messageType === 'date_invite' ? (
                          '📅 Date invitation'
                        ) : (
                          lastMsg.text
                        )
                      ) : (
                        'Say hello!'
                      )}
                    </p>
                  </div>
                </div>

                {/* Right side: time and unread badge */}
                <div className="text-right shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-500">
                    {lastMsg ? lastMsg.timestamp : 'New'}
                  </span>
                  {hasUnread && (
                    <span className="min-w-[18px] h-[18px] px-1 bg-vibe-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border border-dark-950 shadow-sm animate-pulse">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
