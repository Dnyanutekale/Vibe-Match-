import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import {
  BarChart3,
  Users,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
  Radio,
  Crown,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';

export const AdminDashboardModal: React.FC = () => {
  const { isAdminDashboardOpen, setIsAdminDashboardOpen, adminAnalytics, showToast } = useApp();

  const [reports, setReports] = useState([
    { id: 'rep-1', reportedUser: 'SpamBot99', reason: 'Automated crypto links in bio', status: 'Pending' },
    { id: 'rep-2', reportedUser: 'GhostUser_22', reason: 'Impersonation / fake photos', status: 'Pending' }
  ]);

  const handleResolveReport = (id: string, action: 'ban' | 'dismiss') => {
    setReports(prev => prev.filter(r => r.id !== id));
    showToast(
      action === 'ban' ? 'User Banned 🚫' : 'Report Dismissed',
      'Moderation queue updated in real-time.',
      action === 'ban' ? 'warning' : 'info'
    );
  };

  return (
    <Modal
      isOpen={isAdminDashboardOpen}
      onClose={() => setIsAdminDashboardOpen(false)}
      title="VibeMate Admin & Moderation"
      subtitle="Live metrics, safety moderation, and platform insights"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
              <span>Total Members</span>
              <Users className="w-3.5 h-3.5 text-vibe-400" />
            </div>
            <div className="text-xl font-display font-black text-white">{adminAnalytics.totalUsers.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">+14.2% this month</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
              <span>Active Today</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-display font-black text-white">{adminAnalytics.activeToday.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400 font-semibold">25.4% engagement</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
              <span>Total Matches</span>
              <span className="text-xs">⚡</span>
            </div>
            <div className="text-xl font-display font-black text-white">{adminAnalytics.totalMatches.toLocaleString()}</div>
            <div className="text-[10px] text-vibe-400 font-semibold">3.8 msgs / match</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
              <span>24H Stories Live</span>
              <Radio className="w-3.5 h-3.5 text-electric-400" />
            </div>
            <div className="text-xl font-display font-black text-white">{adminAnalytics.activeStories.toLocaleString()}</div>
            <div className="text-[10px] text-electric-400 font-semibold">Ephemeral content</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
              <span>Premium Subs</span>
              <Crown className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-display font-black text-white">{adminAnalytics.premiumSubscribers.toLocaleString()}</div>
            <div className="text-[10px] text-amber-400 font-semibold">14.0% conversion</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
              <span>Safety Health</span>
              <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
            </div>
            <div className="text-xl font-display font-black text-white">{adminAnalytics.satisfactionRate}%</div>
            <div className="text-[10px] text-emerald-400 font-semibold">Zero critical breaches</div>
          </div>
        </div>

        {/* Live Moderation Queue */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Live Safety & Moderation Queue ({reports.length})
            </h3>
          </div>

          {reports.length === 0 ? (
            <div className="p-4 rounded-2xl bg-dark-850 border border-white/5 text-center text-xs text-slate-400">
              Moderation queue is clean. All reported items resolved! 🎉
            </div>
          ) : (
            <div className="space-y-2">
              {reports.map(rep => (
                <div
                  key={rep.id}
                  className="p-3.5 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{rep.reportedUser}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{rep.reason}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleResolveReport(rep.id, 'ban')}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 font-bold text-xs flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Ban User
                    </button>
                    <button
                      onClick={() => handleResolveReport(rep.id, 'dismiss')}
                      className="px-3 py-1.5 rounded-xl bg-dark-800 text-slate-300 hover:text-white border border-white/10 font-bold text-xs"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
