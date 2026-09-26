import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Music, Play, Plus, Heart, Sparkles, Disc } from 'lucide-react';

export const SharedPlaylistModal: React.FC = () => {
  const { isSharedPlaylistOpen, setIsSharedPlaylistOpen, matches, showToast } = useApp();

  const [playlist, setPlaylist] = useState([
    { id: 't1', title: 'Bags', artist: 'Clairo', addedBy: 'Alex (You)', duration: '3:20' },
    { id: 't2', title: 'Chamber of Reflection', artist: 'Mac DeMarco', addedBy: 'Elena', duration: '3:51' },
    { id: 't3', title: 'Innerbloom', artist: 'RÜFÜS DU SOL', addedBy: 'Aria', duration: '9:38' },
    { id: 't4', title: 'San Luis', artist: 'Gregory Alan Isakov', addedBy: 'Julian', duration: '4:15' }
  ]);

  const [newSong, setNewSong] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const handleAddTrack = () => {
    if (!newSong.trim() || !newArtist.trim()) return;
    const item = {
      id: 't-' + Date.now(),
      title: newSong,
      artist: newArtist,
      addedBy: 'Alex (You)',
      duration: '3:30'
    };
    setPlaylist(prev => [item, ...prev]);
    setNewSong('');
    setNewArtist('');
    showToast('Track Added to Vibe Playlist 🎶', `Added "${item.title}" by ${item.artist}`, 'vibe');
  };

  return (
    <Modal
      isOpen={isSharedPlaylistOpen}
      onClose={() => setIsSharedPlaylistOpen(false)}
      title="Shared Vibe Playlist 🎧"
      subtitle="Collaborative soundtrack built by you and your matches"
    >
      <div className="space-y-4">
        {/* Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-vibe-500/20 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-emerald-400">
              <Disc className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">VibeMate Mixtape Vol. 1</div>
              <div className="text-[11px] text-slate-400">{playlist.length} songs • 21 mins</div>
            </div>
          </div>
        </div>

        {/* Add Song Input */}
        <div className="p-3 rounded-2xl bg-dark-850 border border-white/10 space-y-2">
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Add a Track</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={newSong}
              onChange={e => setNewSong(e.target.value)}
              placeholder="Song title..."
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
            />
            <input
              type="text"
              value={newArtist}
              onChange={e => setNewArtist(e.target.value)}
              placeholder="Artist..."
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
            />
          </div>
          <button
            onClick={handleAddTrack}
            className="w-full py-2 rounded-xl vibe-gradient-bg text-white font-bold text-xs shadow-vibe-glow flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Track
          </button>
        </div>

        {/* Playlist Tracks */}
        <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
          {playlist.map(track => (
            <div
              key={track.id}
              onClick={() => {
                setPlayingTrackId(playingTrackId === track.id ? null : track.id);
                showToast(`Playing ${track.title} 🎵`, undefined, 'info');
              }}
              className="p-3 rounded-2xl bg-dark-850 border border-white/5 hover:border-white/20 flex items-center justify-between text-xs cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-dark-900 border border-white/10 flex items-center justify-center text-slate-300">
                  <Play className={`w-3.5 h-3.5 ${playingTrackId === track.id ? 'text-vibe-400 fill-vibe-400' : ''}`} />
                </div>
                <div>
                  <div className="font-bold text-white">{track.title}</div>
                  <div className="text-[10px] text-slate-400">{track.artist} • <span className="text-vibe-400">{track.addedBy}</span></div>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
