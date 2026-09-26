import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { HelpCircle, Send, Sparkles } from 'lucide-react';

export const DailyQuestionModal: React.FC = () => {
  const { isDailyQuestionOpen, setIsDailyQuestionOpen, currentUser, updateCurrentUser, showToast } = useApp();

  const [answer, setAnswer] = useState(currentUser.dailyAnswer?.answer || '');
  const question = "The best first date always involves...";

  const handleSave = () => {
    if (!answer.trim()) return;
    updateCurrentUser({
      dailyAnswer: {
        question,
        answer
      }
    });
    setIsDailyQuestionOpen(false);
    showToast('Daily Answer Updated! ✨', 'Displayed proudly on your profile card.', 'vibe');
  };

  return (
    <Modal
      isOpen={isDailyQuestionOpen}
      onClose={() => setIsDailyQuestionOpen(false)}
      title="Daily Question 💭"
      subtitle="Answer today's prompt to showcase your authentic personality"
    >
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-electric-500/20 to-vibe-500/20 border border-electric-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-electric-300">
            <HelpCircle className="w-4 h-4" />
            <span>Today's Prompt</span>
          </div>
          <h3 className="text-base font-bold text-white leading-snug">"{question}"</h3>
        </div>

        <textarea
          rows={3}
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Share your honest, spontaneous answer..."
          className="w-full bg-dark-850 border border-white/10 rounded-2xl p-3.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500 resize-none"
        />

        <button
          onClick={handleSave}
          className="w-full py-3 rounded-2xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5"
        >
          <Send className="w-4 h-4" /> Save to Profile
        </button>
      </div>
    </Modal>
  );
};
