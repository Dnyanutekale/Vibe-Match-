import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { mockNearbyEvents } from '../../data/mockData';
import { MapPin, Calendar, Users, Sparkles, Check } from 'lucide-react';

export const NearbyEventsModal: React.FC = () => {
  const { isNearbyEventsOpen, setIsNearbyEventsOpen, showToast } = useApp();

  const handleRSVP = (eventTitle: string) => {
    showToast('RSVP Confirmed! 🎉', `You are marked interested in "${eventTitle}". Other matches going will be notified.`, 'vibe');
  };

  return (
    <Modal
      isOpen={isNearbyEventsOpen}
      onClose={() => setIsNearbyEventsOpen(false)}
      title="Nearby Social Vibes & Events 📍"
      subtitle="Discover local mixers, DJ sets, and activity sessions without revealing precise locations"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        {mockNearbyEvents.map(evt => (
          <div
            key={evt.id}
            className="p-4 rounded-3xl bg-dark-850 border border-white/10 space-y-3 shadow-lg hover:border-white/20 transition-all"
          >
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
              <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-dark-950/80 backdrop-blur-md text-neon-cyan text-[10px] font-bold border border-neon-cyan/30">
                {evt.category}
              </span>
              <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-dark-950/80 backdrop-blur-md text-white text-[10px] font-semibold">
                {evt.distanceApprox}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">{evt.title}</h4>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-vibe-400" />
                  {evt.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  {evt.attendeesCount} singles going
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {evt.tags.map(tag => (
                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-dark-900 text-slate-300 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleRSVP(evt.title)}
              className="w-full py-2.5 rounded-xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> RSVP & Match with Attendees
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};
