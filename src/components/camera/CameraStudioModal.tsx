import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Camera,
  RefreshCw,
  Zap,
  Sparkles,
  Type,
  Smile,
  Send,
  Download,
  Flame,
  Radio
} from 'lucide-react';

export const CameraStudioModal: React.FC = () => {
  const { isCameraOpen, setIsCameraOpen, addNewStory, showToast } = useApp();

  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [filter, setFilter] = useState<'none' | 'vintage' | 'neon' | 'cyberpunk'>('neon');
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [overlayText, setOverlayText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const sampleSnapShots = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  ];

  const handleSnap = () => {
    const randomSnap = sampleSnapShots[Math.floor(Math.random() * sampleSnapShots.length)];
    setCapturedPhoto(randomSnap);
    showToast('Snapshot Captured! 📸', 'Apply filters or share to your 24h story.', 'vibe');
  };

  const handlePostToStory = () => {
    if (!capturedPhoto) return;
    addNewStory(capturedPhoto, overlayText || 'Spontaneous Snap ✨', filter);
    setCapturedPhoto(null);
    setIsCameraOpen(false);
  };

  const getFilterStyle = () => {
    switch (filter) {
      case 'neon':
        return 'contrast-125 saturate-150 hue-rotate-15';
      case 'vintage':
        return 'sepia-50 contrast-110 brightness-95';
      case 'cyberpunk':
        return 'contrast-150 saturate-200 hue-rotate-180';
      default:
        return '';
    }
  };

  if (!isCameraOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-dark-950 flex flex-col justify-between p-4 max-w-md mx-auto animate-fadeIn">
      {/* Top Floating Controls */}
      <div className="flex items-center justify-between text-white z-20">
        <button
          onClick={() => {
            setIsCameraOpen(false);
            setCapturedPhoto(null);
          }}
          className="p-2.5 rounded-full bg-dark-900/80 backdrop-blur-md border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlashOn(!flashOn)}
            className={`p-2.5 rounded-full border border-white/10 transition-colors ${
              flashOn ? 'bg-amber-400 text-dark-950 font-bold' : 'bg-dark-900/80 text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
          </button>
          <button
            onClick={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}
            className="p-2.5 rounded-full bg-dark-900/80 text-white border border-white/10"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Viewfinder Canvas */}
      <div className="relative flex-1 my-3 rounded-3xl overflow-hidden border border-white/15 bg-dark-900 shadow-2xl flex flex-col justify-between p-4">
        {capturedPhoto ? (
          <img
            src={capturedPhoto}
            alt="Snap"
            className={`absolute inset-0 w-full h-full object-cover ${getFilterStyle()}`}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-gradient-to-b from-dark-900 to-dark-950">
            <div className={`w-28 h-28 rounded-full border-2 border-dashed border-vibe-500/50 flex items-center justify-center ${getFilterStyle()}`}>
              <Camera className="w-12 h-12 text-vibe-400 animate-pulse" />
            </div>
            <div className="text-xs font-semibold text-slate-400">
              Camera Viewfinder Active ({facingMode === 'user' ? 'Front Portrait' : 'Back Ultra-Wide'})
            </div>
          </div>
        )}

        {/* Text Overlay */}
        {overlayText && (
          <div className="relative z-10 mx-auto px-4 py-2 rounded-2xl bg-dark-950/80 backdrop-blur-md text-white font-extrabold text-sm border border-white/20 animate-float-gentle">
            {overlayText}
          </div>
        )}

        {/* Filter Selection Chips */}
        <div className="relative z-10 mt-auto flex justify-center gap-2 pb-2">
          {(['none', 'vintage', 'neon', 'cyberpunk'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold capitalize border transition-all ${
                filter === f
                  ? 'bg-vibe-500 text-white border-vibe-400 shadow-vibe-glow'
                  : 'bg-dark-950/70 text-slate-300 border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Shutter / Action Controls */}
      <div className="flex items-center justify-around py-3 z-20">
        {capturedPhoto ? (
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setCapturedPhoto(null)}
              className="px-4 py-3 rounded-2xl bg-dark-850 hover:bg-dark-800 text-slate-300 font-bold text-xs border border-white/10 flex-1"
            >
              Retake
            </button>
            <button
              onClick={handlePostToStory}
              className="px-5 py-3 rounded-2xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5 flex-2"
            >
              <Radio className="w-4 h-4" /> Share to 24h Story
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                const text = prompt('Enter overlay caption:');
                if (text) setOverlayText(text);
              }}
              className="p-3 rounded-full bg-dark-850 text-slate-300 border border-white/10"
            >
              <Type className="w-5 h-5" />
            </button>

            {/* Shutter Button */}
            <button
              onClick={handleSnap}
              className="w-20 h-20 rounded-full border-4 border-white p-1 flex items-center justify-center transition-transform active:scale-90 shadow-2xl hover:scale-105"
            >
              <div className="w-full h-full rounded-full vibe-gradient-bg shadow-vibe-glow" />
            </button>

            <button
              onClick={() => {
                showToast('Sticker Drawer 🦄', 'Selected sparkle sticker!', 'vibe');
                setOverlayText('✨ Pure Vibe ✨');
              }}
              className="p-3 rounded-full bg-dark-850 text-slate-300 border border-white/10"
            >
              <Smile className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
