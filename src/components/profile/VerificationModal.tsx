import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { ShieldCheck, Camera, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export const VerificationModal: React.FC = () => {
  const { isVerificationModalOpen, setIsVerificationModalOpen, currentUser, updateCurrentUser, showToast } = useApp();

  const [step, setStep] = useState<'options' | 'pose' | 'review' | 'success'>('options');
  const [selectedMethod, setSelectedMethod] = useState<'photo' | 'phone' | 'email'>('photo');

  const handleStartPose = () => {
    setStep('pose');
  };

  const handleCapturePose = () => {
    setStep('review');
    setTimeout(() => {
      setStep('success');
      updateCurrentUser({ verified: true });
      showToast('Verified Badge Granted! 🛡️', 'Your profile now features the official VibeMate Verified Shield.', 'success');
    }, 1800);
  };

  return (
    <Modal
      isOpen={isVerificationModalOpen}
      onClose={() => {
        setIsVerificationModalOpen(false);
        setStep('options');
      }}
      title="Profile Verification"
      subtitle="Gain the verified badge and increase match trust"
    >
      <div className="space-y-4">
        {step === 'options' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-dark-850 border border-neon-cyan/30 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/15 border border-neon-cyan/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Vibe Verified Badge</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Verified profiles receive up to 3x more interactions and unlock higher discovery priority.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleStartPose}
                className="w-full p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-vibe-500/50 flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-vibe-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Photo Pose Verification</div>
                    <div className="text-[10px] text-slate-400">Match a fun gesture selfie in 5 seconds</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-vibe-400">Start →</span>
              </button>

              <button
                onClick={() => {
                  updateCurrentUser({ verified: true });
                  showToast('Phone Verified ✅', undefined, 'success');
                  setIsVerificationModalOpen(false);
                }}
                className="w-full p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-white/20 flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Phone SMS Verification</div>
                    <div className="text-[10px] text-slate-400">{currentUser.phone || '+1 (555) 382-9014'}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">Verified</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-dark-950 border border-white/5 text-[10px] text-slate-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Note: This is a frontend verification preview interface. Production requires biometric server check.</span>
            </div>
          </div>
        )}

        {step === 'pose' && (
          <div className="space-y-4 text-center animate-fadeIn">
            <div className="relative aspect-[3/4] max-w-[240px] mx-auto rounded-3xl overflow-hidden bg-dark-950 border-2 border-dashed border-vibe-500/60 flex flex-col items-center justify-center p-4">
              <div className="text-4xl mb-2 animate-bounce">✌️</div>
              <h4 className="text-xs font-bold text-white">Match This Pose: Peace Sign</h4>
              <p className="text-[10px] text-slate-400 mt-1">
                Hold up two fingers next to your cheek and smile!
              </p>
            </div>

            <button
              onClick={handleCapturePose}
              className="w-full py-3 rounded-2xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5"
            >
              <Camera className="w-4 h-4" /> Snap Pose & Verify
            </button>
          </div>
        )}

        {step === 'review' && (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full border-2 border-vibe-500 border-t-transparent animate-spin mx-auto" />
            <h4 className="text-sm font-bold text-white">Analyzing Facial Geometry...</h4>
            <p className="text-xs text-slate-400">Matching with your profile photos</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-6 text-center space-y-3 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h4 className="text-base font-bold text-white">You Are Now Vibe Verified!</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Your profile badge is now live for all prospective matches.
            </p>
            <button
              onClick={() => setIsVerificationModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-dark-800 text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
