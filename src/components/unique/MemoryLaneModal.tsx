import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Sparkles, Heart, Calendar, Image as ImageIcon, Award, MapPin } from 'lucide-react';

export const MemoryLaneModal: React.FC = () => {
  const { isMemoryLaneOpen, setIsMemoryLaneOpen } = useApp();

  const moments = [
    {
      title: 'First Match with Elena',
      date: 'September 24',
      snippet: 'Matched over 35mm analog cameras & A24 documentaries.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Bouldering Session Planned with Aria',
      date: 'September 25',
      snippet: 'Agreed on Dogpatch Boulders + Matcha flights.',
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'First Natural Wine Story Reaction',
      date: 'September 23',
      snippet: 'Zoe reacted with "🍷" to your North Beach rooftop post.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <Modal
      isOpen={isMemoryLaneOpen}
      onClose={() => setIsMemoryLaneOpen(false)}
      title="Memory Lane 📸"
      subtitle="A private scrapbook of your shared connections and dates"
    >
      <div className="space-y-3">
        {moments.map((m, i) => (
          <div
            key={i}
            className="p-3.5 rounded-2xl bg-dark-850 border border-white/10 flex items-center gap-3"
          >
            <img src={m.image} alt={m.title} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white truncate">{m.title}</h4>
                <span className="text-[10px] text-slate-500">{m.date}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{m.snippet}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
