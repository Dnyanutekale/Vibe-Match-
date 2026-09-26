import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { ProfileAnalyzer } from './ProfileAnalyzer';
import { DatePlanner } from './DatePlanner';
import {
  Sparkles,
  HeartHandshake,
  Wand2,
  Calendar,
  MessageSquare,
  Flame,
  Send,
  UserCheck,
  Bot
} from 'lucide-react';

export const VibeAIHub: React.FC = () => {
  const { isVibeAIHubOpen, setIsVibeAIHubOpen, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'coach' | 'analyzer' | 'planner' | 'starters'>('coach');
  const [coachChatInput, setCoachChatInput] = useState('');
  const [coachMessages, setCoachMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Hey Alex! ⚡ I’m your Vibe AI dating wingman. Ask me anything from breaking the ice with a photographer match to building confidence for an upcoming coffee date!`,
      time: 'Just now'
    }
  ]);

  const icebreakerPrompts = [
    "What's your secret comfort food you'd defend in a courtroom?",
    "If you could teleport us anywhere for a 2-hour date right now, where are we heading?",
    "Tell me the story behind your favorite tattoo or piece of art.",
    "What is the most underrated album from the last 5 years?"
  ];

  const handleSendToCoach = () => {
    if (!coachChatInput.trim()) return;

    const userText = coachChatInput;
    const newMsg = { sender: 'user' as const, text: userText, time: 'Just now' };
    setCoachMessages(prev => [...prev, newMsg]);
    setCoachChatInput('');

    // Simulate smart AI wingman response
    setTimeout(() => {
      let aiReply = "That's a great question! For high-chemistry messaging, focus on emotional curiosity rather than resume interview questions. Reference a specific photo or detail in their bio!";
      if (userText.toLowerCase().includes('first date') || userText.toLowerCase().includes('nervous')) {
        aiReply = "First date jitters are totally natural! Keep the first spot low-stakes (like a cozy specialty coffee lounge or bookstore stroll). Focus on having fun discovering their unique quirks rather than trying to impress.";
      } else if (userText.toLowerCase().includes('flirt') || userText.toLowerCase().includes('compliment')) {
        aiReply = "Compliment their taste, energy, or aesthetic eye rather than just physical features. For instance: 'I love the music and vintage film energy on your profile — it has such a distinct vibe.'";
      }

      setCoachMessages(prev => [...prev, { sender: 'ai', text: aiReply, time: 'Just now' }]);
    }, 1000);
  };

  return (
    <Modal
      isOpen={isVibeAIHubOpen}
      onClose={() => setIsVibeAIHubOpen(false)}
      title="Vibe AI Wingman & Coach"
      subtitle="Intelligent assistance for dating confidence and authentic connections"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-dark-850 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab('coach')}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'coach'
                ? 'bg-vibe-500 text-white shadow-vibe-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="truncate">AI Coach</span>
          </button>

          <button
            onClick={() => setActiveTab('analyzer')}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'analyzer'
                ? 'bg-electric-500 text-white shadow-neon-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="truncate">Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'planner'
                ? 'bg-amber-500 text-dark-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="truncate">Date Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('starters')}
            className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeTab === 'starters'
                ? 'bg-neon-cyan text-dark-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span className="truncate">Starters</span>
          </button>
        </div>

        {/* Tab 1: AI Coach Chat */}
        {activeTab === 'coach' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="h-64 overflow-y-auto p-3 rounded-2xl bg-dark-850 border border-white/5 space-y-2.5 no-scrollbar">
              {coachMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'vibe-gradient-bg text-white'
                        : 'bg-dark-900 border border-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[10px] font-bold opacity-75 mb-0.5">
                      {msg.sender === 'ai' ? (
                        <>
                          <Sparkles className="w-3 h-3 text-electric-400" />
                          <span>Vibe AI Dating Coach</span>
                        </>
                      ) : (
                        <span>You</span>
                      )}
                    </div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coach Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={coachChatInput}
                onChange={e => setCoachChatInput(e.target.value)}
                placeholder="Ask advice: 'How do I ask her out on a date?'"
                className="flex-1 bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSendToCoach();
                }}
              />
              <button
                onClick={handleSendToCoach}
                className="px-4 rounded-xl vibe-gradient-bg text-white text-xs font-bold shadow-vibe-glow flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Profile Analyzer */}
        {activeTab === 'analyzer' && <ProfileAnalyzer />}

        {/* Tab 3: Date Planner */}
        {activeTab === 'planner' && <DatePlanner />}

        {/* Tab 4: Icebreaker Starters */}
        {activeTab === 'starters' && (
          <div className="space-y-3 animate-fadeIn">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Universal High-Conversion Icebreakers
            </h3>
            <div className="space-y-2">
              {icebreakerPrompts.map((prompt, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-dark-850 border border-white/10 text-xs text-slate-200 flex items-center justify-between gap-3"
                >
                  <p className="italic">"{prompt}"</p>
                  <button
                    onClick={() => {
                      showToast('Copied to Clipboard 📋', prompt, 'info');
                    }}
                    className="px-3 py-1 rounded-xl bg-dark-800 hover:bg-dark-700 text-vibe-400 font-bold text-[11px] shrink-0 border border-vibe-500/20"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
