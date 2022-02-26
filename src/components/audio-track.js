import { useEffect, useRef, useState } from "react";

export default function AudioTrack({ audioContext, title, src, isPlaying, soloedTracks, toggleTrackSolo, muted, numberOfTracks, trackNumber }) {
  const [audioTrack, setAudioTrack] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(1);
  const [isMuted, toggleMuted] = useState(muted);
  const [isSoloed, toggleSoloed] = useState(false);
  
  const elRef = useRef(null);
  const gainRef = useRef(null)

  useEffect(() => {
    if (elRef && audioContext) {
      const createdTrack = audioContext.createMediaElementSource(elRef.current);
      const gainNode = audioContext.createGain();
      gainRef.current = gainNode;

      console.log(gainRef)

      createdTrack.connect(gainNode).connect(audioContext.destination);
      setAudioTrack(createdTrack);
    }
  }, [audioContext]);

  useEffect(() => {
    if (isPlaying) {
      elRef.current.play();
    } else {
      elRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if(soloedTracks.length) {
      if (soloedTracks.indexOf(title) !== -1) {
        elRef.current.muted = false
        toggleSoloed(true);
      } else {
        elRef.current.muted = true
        toggleSoloed(false);
      }
    } else {
      elRef.current.muted = false;
      toggleSoloed(false);
    }
  }, [soloedTracks, title]);

  const muteTrack = (track) => {
    if (isMuted) {
      toggleMuted(false);
      track.current.muted = false;
    } else {
      toggleMuted(true);
      track.current.muted = true;
    }
  }

  const soloTrack = () => {
    toggleTrackSolo(title);
  }

  const handleVolumeChange = (e) => {
    setCurrentVolume(e.target.value);
    gainRef.current.gain.value = e.target.value;
  }

  return (
    <div className={`audio-track ${trackNumber === numberOfTracks ? 'border-r': ''}`}>
      <audio src={src} ref={elRef}></audio>
      <div className="track-info flex justify-between items-center w-full flex-wrap">
        <div className="track-tape">{title}</div>
        <div className="flex items-center gap-1">
          <button
            className={`w-11 h-11 text-xs text-white border rounded border-gray-800 ${isSoloed ? 'bg-yellow-400' : 'bg-gray-400'}`}
            onClick={()=> soloTrack(title)}
          >
            SOLO
          </button>
          <button
            className={`w-11 h-11 text-xs text-white border rounded border-gray-800 ${isMuted ? 'bg-orange-400' : 'bg-gray-400'}`}
            onClick={() => muteTrack(elRef)}
          >
            MUTE
          </button>
        </div>
        <div className="h-4 w-full flex-grow mt-2 mx-4 mb-4">
          <input className="w-full" type="range" onChange={handleVolumeChange} min="0" max="2" value={currentVolume} step="0.01" />
        </div>
      </div>

    </div>
  );
}
