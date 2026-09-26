import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import {
  Shield,
  PhoneCall,
  Clock,
  Share2,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Plus,
  BookOpen
} from 'lucide-react';

export const SafetyCenterModal: React.FC = () => {
  const { isSafetyCenterOpen, setIsSafetyCenterOpen, currentUser, updateCurrentUser, showToast } = useApp();

  const [dateTimerHours, setDateTimerHours] = useState('2');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);

  const handleStartCheckIn = () => {
    setIsTimerActive(true);
    showToast('Date Check-In Activated 🛡️', `We will ping your phone in ${dateTimerHours} hours. If unconfirmed, an SMS alert is sent to your emergency contact.`, 'vibe');
  };

  const handleShareDateDetails = () => {
    showToast('Date Details Shared 📍', 'Sent encrypted live location & match profile snippet to your trusted contact Maya Lin.', 'success');
  };

  const handleAddContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    const newContact = {
      id: 'ec-' + Date.now(),
      name: newContactName,
      phone: newContactPhone,
      relation: 'Emergency Contact'
    };
    updateCurrentUser({
      emergencyContacts: [...currentUser.emergencyContacts, newContact]
    });
    setNewContactName('');
    setNewContactPhone('');
    setShowAddContact(false);
  };

  return (
    <Modal
      isOpen={isSafetyCenterOpen}
      onClose={() => setIsSafetyCenterOpen(false)}
      title="VibeMate Safety Center"
      subtitle="Your safety, privacy, and well-being come first"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {/* Date Check-In Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-neon-cyan/15 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <h4 className="text-xs font-bold text-white">Date Safety Check-In</h4>
            </div>
            {isTimerActive && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-dark-950 font-bold text-[10px] animate-pulse">
                Active ({dateTimerHours}h remaining)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Going on a first date? Set a check-in timer. If you don't respond to our gentle ping, your emergency contact will automatically receive a safety notification.
          </p>

          <div className="flex gap-2">
            <select
              value={dateTimerHours}
              onChange={e => setDateTimerHours(e.target.value)}
              className="bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
              <option value="4">4 Hours</option>
            </select>

            <button
              onClick={handleStartCheckIn}
              className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-all"
            >
              {isTimerActive ? 'Update Check-In Timer' : 'Start Check-In Timer'}
            </button>
          </div>
        </div>

        {/* Share Date Details */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-white">Share Date Details</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Send meetup location, time, and match name to trusted contacts in one tap.
            </p>
          </div>
          <button
            onClick={handleShareDateDetails}
            className="px-3 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 shrink-0"
          >
            <Share2 className="w-3.5 h-3.5 text-neon-cyan" />
            <span>Share</span>
          </button>
        </div>

        {/* Emergency Contacts */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-vibe-400" />
              Emergency Contacts ({currentUser.emergencyContacts.length})
            </h4>
            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="text-xs text-vibe-400 font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="space-y-2">
            {currentUser.emergencyContacts.map(ec => (
              <div
                key={ec.id}
                className="p-2.5 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{ec.name}</div>
                  <div className="text-[11px] text-slate-400">{ec.phone} • {ec.relation}</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            ))}
          </div>

          {showAddContact && (
            <div className="p-3 rounded-xl bg-dark-900 border border-vibe-500/30 space-y-2 animate-fadeIn">
              <input
                type="text"
                value={newContactName}
                onChange={e => setNewContactName(e.target.value)}
                placeholder="Contact Name (e.g. Maya Lin)"
                className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <input
                type="tel"
                value={newContactPhone}
                onChange={e => setNewContactPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <button
                onClick={handleAddContact}
                className="w-full py-1.5 rounded-xl vibe-gradient-bg text-white font-bold text-xs"
              >
                Save Contact
              </button>
            </div>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-2">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Community Shield & Anti-Harassment
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            VibeMate enforces a strict zero-tolerance policy against hate speech, harassment, impersonation, or non-consensual sharing. Our AI automated moderation flags suspicious accounts instantly.
          </p>
        </div>
      </div>
    </Modal>
  );
};
