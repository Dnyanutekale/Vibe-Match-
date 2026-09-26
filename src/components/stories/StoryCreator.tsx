import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Camera,
  Music,
  HelpCircle,
  Type,
  Sparkles,
  Check,
  Send,
  Image as ImageIcon
} from 'lucide-react';

const SAMPLE_STORY_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
];

export const StoryCreator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addNewStory } = useApp();

  const [selectedBg, setSelectedBg] = useState(SAMPLE_STORY_BACKGROUNDS[0]);
  const [caption, setCaption] = useState('');
  const [overlayText, setOverlayText] = useState('Midnight Rooftop Vibes ✨');
  const [selectedMusic, setSelectedMusic] = useState('Innerbloom • RÜFÜS DU SOL');
  const [hasPoll, setHasPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('Coffee or Matcha for our first date?');
  const [pollA, setPollA] = useState('Pour-over ☕');
  const [pollB, setPollB] = useState('Ceremonial Matcha 🍵');

  const handlePublish = () => {
    addNewStory(
      selectedBg,
      caption,
      'Neon Glow',
      selectedMusic,
      hasPoll ? { question: pollQuestion, optionA: pollA, optionB: pollB } : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-2xl flex flex-col justify-between p-4 max-w-md mx-auto animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-dark-850 hover:bg-dark-800 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold">New Vibe Story</span>
        <button
          onClick={handlePublish}
          className="px-4 py-1.5 rounded-full vibe-gradient-bg text-white text-xs font-bold shadow-vibe-glow flex items-center gap-1"
        >
          <span>Share</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Story Canvas Preview */}
      <div className="relative flex-1 my-3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between p-5">
        <img
          src={selectedBg}
          alt="Preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-950/30" />

        {/* Top Stickers inside Canvas */}
        <div className="relative z-10 space-y-2">
          {selectedMusic && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/70 backdrop-blur-md text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
              <Music className="w-3.5 h-3.5" />
              <span>{selectedMusic}</span>
            </div>
          )}
        </div>

        {/* Center Overlay Text & Poll */}
        <div className="relative z-10 text-center space-y-3">
          {overlayText && (
            <div className="inline-block px-4 py-2 rounded-2xl bg-dark-950/80 backdrop-blur-md text-white font-extrabold text-base border border-white/20 shadow-xl">
              {overlayText}
            </div>
          )}

          {hasPoll && (
            <div className="p-3 rounded-2xl bg-dark-950/90 backdrop-blur-md border border-electric-500/40 max-w-[240px] mx-auto text-left space-y-2">
              <div className="text-[11px] font-bold text-white">{pollQuestion}</div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                <div className="p-2 rounded-xl bg-vibe-500/30 border border-vibe-500/50 text-white text-center">
                  {pollA}
                </div>
                <div className="p-2 rounded-xl bg-electric-500/30 border border-electric-500/50 text-white text-center">
                  {pollB}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Caption bottom preview */}
        <div className="relative z-10">
          {caption && (
            <p className="text-xs text-white bg-dark-950/70 backdrop-blur-md p-2 rounded-xl border border-white/10 text-center">
              {caption}
            </p>
          )}
        </div>
      </div>

      {/* Editing Controls & Background Selector */}
      <div className="space-y-3">
        {/* Background Selector */}
        <div className="flex gap-2 justify-center">
          {SAMPLE_STORY_BACKGROUNDS.map((bg, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedBg(bg)}
              className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                selectedBg === bg ? 'border-vibe-500 scale-105 shadow-vibe-glow' : 'border-transparent opacity-70'
              }`}
            >
              <img src={bg} alt="Bg" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Text Caption Input */}
        <input
          type="text"
          value={overlayText}
          onChange={e => setOverlayText(e.target.value)}
          placeholder="Add overlay text..."
          className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-vibe-500"
        />

        {/* Poll Toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-dark-850 border border-white/5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-electric-400" />
            <span>Add Interactive Poll</span>
          </div>
          <input
            type="checkbox"
            checked={hasPoll}
            onChange={e => setHasPoll(e.target.checked)}
            className="w-4 h-4 accent-electric-500 rounded"
          />
        </div>
      </div>
    </div>
  );
};
