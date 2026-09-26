import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, Sparkles, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map(toast => {
        let icon = <Sparkles className="w-5 h-5 text-vibe-400 shrink-0" />;
        let borderClass = 'border-vibe-500/30';
        let bgClass = 'bg-dark-900/90';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          borderClass = 'border-emerald-500/30';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-neon-cyan shrink-0" />;
          borderClass = 'border-neon-cyan/30';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
          borderClass = 'border-amber-500/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl ${bgClass} ${borderClass} border shadow-2xl backdrop-blur-xl animate-float-gentle text-slate-100 transition-all duration-300`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-white tracking-wide">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed break-words">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
