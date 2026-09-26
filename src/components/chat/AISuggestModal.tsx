import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Sparkles, Send, Edit3, Wand2, Smile, Flame, MessageSquare, Zap, Heart } from 'lucide-react';

interface AISuggestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastPartnerMessageText?: string;
  partnerName: string;
  onSelectSuggestion: (text: string) => void;
}

export const AISuggestModal: React.FC<AISuggestModalProps> = ({
  isOpen,
  onClose,
  lastPartnerMessageText,
  partnerName,
  onSelectSuggestion
}) => {
  const [activeTone, setActiveTone] = useState<'flirty' | 'funny' | 'casual' | 'interesting' | 'short'>('flirty');
  const [selectedText, setSelectedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Generate dynamic vibe replies based on partner context
  const getSuggestions = () => {
    const p = partnerName.split(' ')[0];
    switch (activeTone) {
      case 'flirty':
        return [
          `I was just thinking about that, but having you around would make it 10x better 😉`,
          `Are you always this good at sparking great conversations or did I just get lucky? ✨`,
          `Careful ${p}, you're making it way too easy for me to ask you out this weekend.`
        ];
      case 'funny':
        return [
          `I'd give that a solid 10/10, but only if snacks are guaranteed 🍕`,
          `My calendar just cleared itself mysteriously... what a coincidence! 😂`,
          `Plot twist: what if we skip the small talk and debate why cereal is technically a cold soup?`
        ];
      case 'interesting':
        return [
          `That actually reminds me of an architectural documentary I watched recently about creative spaces. What drew you into it initially?`,
          `I love that perspective! Do you find yourself leaning more towards spontaneous adventures or carefully curated experiences?`,
          `That's super unique. If you could relive any moment related to that, which one would it be?`
        ];
      case 'casual':
        return [
          `Totally! Sounds like a super relaxing vibe. How has the rest of your week been treating you?`,
          `Nice! I usually grab coffee and explore new neighborhood spots around then.`,
          `Sounds like a solid plan. Have you checked out that new spot on 4th street yet?`
        ];
      case 'short':
        return [
          `Count me in! ☕✨`,
          `Love this energy! 🙌`,
          `100% down for this.`
        ];
    }
  };

  const tones = [
    { id: 'flirty' as const, label: 'Flirty & Charming', icon: Flame, color: 'text-vibe-400' },
    { id: 'funny' as const, label: 'Funny & Witty', icon: Smile, color: 'text-amber-400' },
    { id: 'interesting' as const, label: 'Deep & Curious', icon: Sparkles, color: 'text-electric-400' },
    { id: 'casual' as const, label: 'Casual & Chill', icon: MessageSquare, color: 'text-neon-cyan' },
    { id: 'short' as const, label: 'Short & Punchy', icon: Zap, color: 'text-emerald-400' }
  ];

  const currentList = getSuggestions();

  const handleConfirm = (text: string) => {
    onSelectSuggestion(text);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Vibe AI Reply Assistant"
      subtitle={`AI suggestions tailored to ${partnerName}'s message`}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Context snippet */}
        {lastPartnerMessageText && (
          <div className="p-3 rounded-2xl bg-dark-850 border border-white/5 text-xs text-slate-300">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              Replying to {partnerName}:
            </span>
            <p className="italic text-white">"{lastPartnerMessageText}"</p>
          </div>
        )}

        {/* Tone Selection Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {tones.map(t => {
            const Icon = t.icon;
            const isSelected = activeTone === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTone(t.id);
                  setSelectedText('');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-1.5 border transition-all ${
                  isSelected
                    ? 'bg-dark-800 border-vibe-500/50 text-white shadow-md'
                    : 'bg-dark-850 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${t.color}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Suggestions List */}
        <div className="space-y-2">
          {currentList.map((suggestion, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-xs leading-relaxed transition-all cursor-pointer ${
                selectedText === suggestion
                  ? 'bg-gradient-to-r from-vibe-500/20 to-electric-500/20 border-vibe-400 text-white shadow-vibe-glow'
                  : 'bg-dark-850/80 border-white/10 text-slate-200 hover:border-white/20'
              }`}
              onClick={() => setSelectedText(suggestion)}
            >
              <p className="mb-2">"{suggestion}"</p>
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-[10px] text-slate-400 font-medium">Click to select & review</span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleConfirm(suggestion);
                  }}
                  className="px-3 py-1 rounded-lg vibe-gradient-bg text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
                >
                  <Send className="w-3 h-3" /> Use Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Editable preview if selected */}
        {selectedText && (
          <div className="p-3.5 rounded-2xl bg-dark-900 border border-white/15 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <Edit3 className="w-3 h-3 text-vibe-400" /> Edit before sending
              </span>
              <span>AI never sends automatically</span>
            </div>
            <textarea
              rows={2}
              value={selectedText}
              onChange={e => setSelectedText(e.target.value)}
              className="w-full bg-dark-850 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-vibe-500"
            />
            <button
              onClick={() => handleConfirm(selectedText)}
              className="w-full py-2.5 rounded-xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Send to {partnerName}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
