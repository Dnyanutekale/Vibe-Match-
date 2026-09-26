import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { mockCompatibilityQuestions } from '../../data/mockData';
import { Sparkles, Check, ArrowRight, Award, Flame } from 'lucide-react';

export const CompatibilityQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, showToast } = useApp();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const question = mockCompatibilityQuestions[currentQIndex];

  const handleSelectOption = (optId: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: optId }));
    if (currentQIndex < mockCompatibilityQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      showToast('Compatibility Quiz Complete! 🧠', 'Your vibe alignment algorithm has been updated.', 'vibe');
    }
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setAnswers({});
    setIsCompleted(false);
  };

  return (
    <Modal
      isOpen={isQuizOpen}
      onClose={() => setIsQuizOpen(false)}
      title="Vibe Compatibility Quiz"
      subtitle="Discover your communication and connection wavelength"
    >
      <div className="space-y-4">
        {!isCompleted ? (
          <div className="space-y-4 animate-fadeIn">
            {/* Progress */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Question {currentQIndex + 1} of {mockCompatibilityQuestions.length}</span>
              <span className="text-vibe-400 font-bold">{Math.round(((currentQIndex + 1) / mockCompatibilityQuestions.length) * 100)}%</span>
            </div>

            <div className="w-full h-1.5 bg-dark-850 rounded-full overflow-hidden">
              <div
                className="h-full vibe-gradient-bg transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / mockCompatibilityQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Title */}
            <h3 className="text-sm font-bold text-white leading-relaxed">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {question.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className="w-full p-3.5 rounded-2xl bg-dark-850 border border-white/10 hover:border-vibe-500/50 hover:bg-dark-800 text-left text-xs text-slate-200 font-medium transition-all"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-vibe-500 to-electric-500 flex items-center justify-center mx-auto shadow-vibe-glow">
              <Sparkles className="w-8 h-8 text-white animate-spin-slow" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Your Archetype: Creative Adventurer</h3>
              <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1">
                You thrive on artistic curiosity, low-stakes spontaneous meetups, and deep intellectual banter.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 text-xs text-slate-300">
              <div className="font-semibold text-vibe-400 mb-1">Top Matching Vibes in your area:</div>
              <div>Elena (94%), Aria (96%), Zoe (91%)</div>
            </div>

            <button
              onClick={() => setIsQuizOpen(false)}
              className="w-full py-2.5 rounded-2xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow"
            >
              Back to VibeMate
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
