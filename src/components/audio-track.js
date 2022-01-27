import { useEffect, useRef, useState } from "react";

export default function AudioTrack({ audioContext, title, src, isPlaying, soloedTracks, toggleTrackSolo, muted }) {
  const [audioTrack, setAudioTrack] = useState(null);
  const [isMuted, toggleMuted] = useState(muted);
  // const [isSoloed, toggleSoloed] = useState(false);
  const elRef = useRef(null);

  useEffect(() => {
    if (elRef && audioContext) {
      const createdTrack = audioContext.createMediaElementSource(elRef.current);
      createdTrack.connect(audioContext.destination);
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
      } else {
        elRef.current.muted = true
      }
    } else {
      elRef.current.muted = false;
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

  return (
    <div className="relative flex flex-col justify-between items-center">
      <audio src={src} ref={elRef}></audio>
      <div className="flex items-center gap-1">
        <button
          className={`w-11 h-11 text-xs text-white border border-gray-800 ${isMuted ? 'bg-yellow-400' : 'bg-gray-400'}`}
          onClick={()=> soloTrack(title)}
        >
          SOLO
        </button>
        <button
          className={`w-11 h-11 text-xs text-white border border-gray-800 ${isMuted ? 'bg-orange-400' : 'bg-gray-400'}`}
          onClick={() => muteTrack(elRef)}
        >
          MUTE
        </button>
      </div>
      <div className="bg-gray-400 rounded w-2 h-96">{/* fader slot */}</div>
      <div>{title}</div>
    </div>
  );
}
