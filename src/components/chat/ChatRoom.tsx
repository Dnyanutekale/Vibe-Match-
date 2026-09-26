import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AISuggestModal } from './AISuggestModal';
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Send,
  Sparkles,
  Mic,
  Image as ImageIcon,
  Smile,
  ShieldCheck,
  Clock,
  Pin,
  Trash2,
  Play,
  Pause,
  CheckCheck,
  Calendar,
  Zap,
  Flame,
  X
} from 'lucide-react';

export const ChatRoom: React.FC<{ convId: string; onBack: () => void }> = ({ convId, onBack }) => {
  const {
    conversations,
    currentUser,
    sendMessage,
    reactToMessage,
    deleteMessage,
    pinMessage,
    setDisappearingTime,
    setPreviewProfile,
    showToast
  } = useApp();

  const conv = conversations[convId];
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showTimerMenu, setShowTimerMenu] = useState(false);
  const [isAISuggestOpen, setIsAISuggestOpen] = useState(false);
  const [showEmojiDrawer, setShowEmojiDrawer] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [selectedMessageActionId, setSelectedMessageActionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conv?.messages]);

  if (!conv) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Conversation not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-dark-800 rounded-xl text-white text-xs">
          Go Back
        </button>
      </div>
    );
  }

  const partner = conv.user;
  const lastPartnerMessage = [...conv.messages].reverse().find(m => m.senderId !== 'me');

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(convId, inputText, 'text');
    setInputText('');
  };

  const handleSendVoiceNote = () => {
    setIsRecordingVoice(true);
    showToast('Recording Voice Note 🎙️', 'Hold on, generating acoustic waveform...', 'vibe');
    setTimeout(() => {
      setIsRecordingVoice(false);
      sendMessage(convId, 'Voice Message (0:14)', 'voice');
      showToast('Voice Note Sent! 🎵', undefined, 'success');
    }, 1500);
  };

  const handleSendPhotoMock = () => {
    const samplePhoto = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80';
    sendMessage(convId, 'Check out this aesthetic spot! ✨', 'image', samplePhoto);
    showToast('Photo Sent 📸', undefined, 'success');
  };

  const toggleVoicePlay = (msgId: string) => {
    if (playingVoiceId === msgId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(msgId);
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-dark-950 flex flex-col justify-between max-w-md mx-auto">
      {/* Chat Top Header */}
      <div className="glass-panel border-b border-white/10 px-4 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Partner Avatar & Status */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setPreviewProfile(partner)}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-vibe-500/40 shrink-0">
              <img src={partner.photos[0]} alt={partner.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-dark-950" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">{partner.name.split(' ')[0]}</span>
                {partner.verified && <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />}
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <span>{conv.lastSeen}</span>
                {conv.disappearingTimeOption !== 'off' && (
                  <span className="text-amber-400 flex items-center gap-0.5">
                    • <Clock className="w-2.5 h-2.5" /> {conv.disappearingTimeOption}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => showToast('Audio Call 📞', `Calling ${partner.name}... (Secure WebRTC placeholder)`, 'info')}
            className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/5"
            title="Audio Call"
          >
            <Phone className="w-4 h-4" />
          </button>

          <button
            onClick={() => showToast('Video Call 📹', `Starting encrypted video vibe session with ${partner.name}...`, 'info')}
            className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/5"
            title="Video Call"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* Chat options menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/5"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-11 w-52 bg-dark-900 border border-white/15 rounded-2xl shadow-2xl p-2 z-50 space-y-1 text-xs">
                <button
                  onClick={() => {
                    setShowTimerMenu(!showTimerMenu);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-dark-800 text-slate-200 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Disappearing Timer
                  </span>
                  <span className="text-[10px] text-vibe-400 font-bold">{conv.disappearingTimeOption}</span>
                </button>

                {showTimerMenu && (
                  <div className="pl-4 py-1 space-y-1 bg-dark-850 rounded-xl">
                    {(['off', '10s', '1m', '1h', '24h'] as const).map(opt => (
                      <button
                        key={opt}
                        onClick={() => {
                          setDisappearingTime(convId, opt);
                          setShowTimerMenu(false);
                          setShowMenu(false);
                        }}
                        className={`w-full text-left text-[11px] py-1 px-2 rounded-lg ${
                          conv.disappearingTimeOption === opt ? 'text-vibe-400 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt === 'off' ? 'Off' : `${opt} vanish`}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    setPreviewProfile(partner);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-dark-800 text-slate-200"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    showToast('Date Invitation Created 📅', 'Sent romantic coffee & vinyl date invite to chat!', 'vibe');
                    sendMessage(convId, 'Hey! Would love to invite you to: Secret Vinyl Listening Lounge & Natural Wine this Saturday at 7 PM ✨', 'date_invite');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-dark-800 text-emerald-300 flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" /> Plan a Date Invite
                </button>
                <button
                  onClick={() => {
                    showToast('Chat Cleared', undefined, 'info');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-dark-800 text-rose-400"
                >
                  Clear Chat History
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {/* Match celebration badge inside chat */}
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-900 border border-white/10 text-[10px] text-slate-400">
            <Flame className="w-3 h-3 text-vibe-400" />
            <span>You matched with {partner.name} • End-to-end encrypted vibe</span>
          </div>
        </div>

        {conv.messages.map(msg => {
          const isMe = msg.senderId === 'me';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group relative`}
            >
              <div
                onClick={() => setSelectedMessageActionId(selectedMessageActionId === msg.id ? null : msg.id)}
                className={`max-w-[78%] rounded-3xl p-3.5 text-xs leading-relaxed shadow-md transition-all cursor-pointer ${
                  isMe
                    ? 'bg-gradient-to-tr from-vibe-600 via-vibe-500 to-electric-600 text-white rounded-br-sm'
                    : 'bg-dark-850 border border-white/10 text-slate-100 rounded-bl-sm'
                }`}
              >
                {/* Pinned Indicator */}
                {msg.isPinned && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold mb-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </div>
                )}

                {/* Media Image */}
                {msg.mediaUrl && (
                  <div className="rounded-2xl overflow-hidden mb-2 border border-white/10">
                    <img src={msg.mediaUrl} alt="Attachment" className="w-full h-auto object-cover max-h-48" />
                  </div>
                )}

                {/* Voice Note Waveform Simulator */}
                {msg.messageType === 'voice' && (
                  <div className="flex items-center gap-3 py-1 min-w-[180px]">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleVoicePlay(msg.id);
                      }}
                      className="w-8 h-8 rounded-full bg-white text-dark-950 flex items-center justify-center shadow-md shrink-0"
                    >
                      {playingVoiceId === msg.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="flex-1 flex items-center gap-0.5 h-6">
                      {[40, 70, 25, 90, 50, 80, 60, 30, 95, 45, 75, 55].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`w-1 rounded-full ${
                            playingVoiceId === msg.id ? 'bg-amber-300 animate-pulse' : isMe ? 'bg-white/70' : 'bg-vibe-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono opacity-80">0:14</span>
                  </div>
                )}

                {/* Date Invite Card */}
                {msg.messageType === 'date_invite' && (
                  <div className="p-2.5 rounded-2xl bg-dark-950/60 border border-emerald-500/40 my-1 space-y-1.5 text-white">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                      <Calendar className="w-3.5 h-3.5" /> Date Invitation
                    </div>
                    <p className="text-[11px] leading-relaxed">{msg.text}</p>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        showToast('Date Accepted! 🎉', 'Added to your Vibe calendar and shared moments.', 'success');
                      }}
                      className="w-full py-1.5 rounded-xl bg-emerald-500 text-dark-950 font-bold text-[11px]"
                    >
                      Accept Date ✨
                    </button>
                  </div>
                )}

                {/* Regular Message Text */}
                {msg.messageType !== 'voice' && msg.messageType !== 'date_invite' && (
                  <p className="break-words">{msg.text}</p>
                )}

                {/* Time & Read Receipts */}
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] opacity-75">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-neon-cyan" />}
                </div>

                {/* Reaction Badge */}
                {msg.reaction && (
                  <span className="absolute -bottom-2 right-2 bg-dark-900 border border-white/20 rounded-full px-1.5 py-0.2 text-[11px] shadow-md">
                    {msg.reaction}
                  </span>
                )}
              </div>

              {/* Message Quick Action Menu Bar */}
              {selectedMessageActionId === msg.id && (
                <div className="flex items-center gap-1 bg-dark-900/95 border border-white/15 px-2 py-1 rounded-2xl shadow-xl mt-1 z-30 animate-fadeIn">
                  {['❤️', '🔥', '😂', '✨'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => {
                        reactToMessage(convId, msg.id, emoji);
                        setSelectedMessageActionId(null);
                      }}
                      className="p-1 text-sm hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                  <div className="w-[1px] h-4 bg-white/20 mx-1" />
                  <button
                    onClick={() => {
                      pinMessage(convId, msg.id);
                      setSelectedMessageActionId(null);
                    }}
                    className="p-1 text-slate-300 hover:text-amber-300"
                    title="Pin"
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      deleteMessage(convId, msg.id);
                      setSelectedMessageActionId(null);
                    }}
                    className="p-1 text-slate-300 hover:text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Vibe AI Reply Shortcut Prompt */}
      {lastPartnerMessage && (
        <div className="px-4 py-1.5 bg-dark-900/80 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-electric-300 font-semibold truncate max-w-[240px]">
            <Sparkles className="w-3.5 h-3.5 text-electric-400 shrink-0 animate-spin-slow" />
            <span className="truncate">Need witty reply to "{lastPartnerMessage.text?.slice(0, 20)}..."?</span>
          </div>
          <button
            onClick={() => setIsAISuggestOpen(true)}
            className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-electric-500/20 to-neon-violet/20 hover:from-electric-500/30 text-electric-300 border border-electric-500/30 text-[11px] font-bold shrink-0 flex items-center gap-1"
          >
            <span>Vibe AI Reply</span>
          </button>
        </div>
      )}

      {/* Emoji Drawer */}
      {showEmojiDrawer && (
        <div className="p-3 bg-dark-900 border-t border-white/10 flex gap-3 overflow-x-auto no-scrollbar">
          {['❤️', '🔥', '✨', '☕', '🍷', '🧗‍♀️', '🎧', '🎬', '🥐', '🍕', '🚀', '😍', '😂', '🥺'].map(emoji => (
            <button
              key={emoji}
              onClick={() => {
                setInputText(prev => prev + emoji);
              }}
              className="text-xl hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <div className="glass-bottom-bar p-3 border-t border-white/10 flex items-center gap-2">
        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiDrawer(!showEmojiDrawer)}
          className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Photo Share Button */}
        <button
          onClick={handleSendPhotoMock}
          className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white"
          title="Share Photo"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Voice Note Button */}
        <button
          onClick={handleSendVoiceNote}
          className={`p-2 rounded-xl transition-all ${
            isRecordingVoice ? 'bg-vibe-500 text-white animate-pulse' : 'bg-dark-850 hover:bg-dark-800 text-slate-300'
          }`}
          title="Voice Note"
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={`Message ${partner.name.split(' ')[0]}...`}
          className="flex-1 bg-dark-850 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
          onKeyDown={e => {
            if (e.key === 'Enter') handleSend();
          }}
        />

        {/* Send Action */}
        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className="p-2.5 rounded-2xl vibe-gradient-bg text-white shadow-vibe-glow disabled:opacity-40 hover:opacity-90 transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* AI Suggest Reply Modal */}
      <AISuggestModal
        isOpen={isAISuggestOpen}
        onClose={() => setIsAISuggestOpen(false)}
        lastPartnerMessageText={lastPartnerMessage?.text}
        partnerName={partner.name}
        onSelectSuggestion={text => {
          setInputText(text);
          showToast('Vibe AI Suggestion Applied ✨', 'Review and edit before sending!', 'vibe');
        }}
      />
    </div>
  );
};
