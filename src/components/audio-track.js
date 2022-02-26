import { useEffect, useRef, useState } from "react";
import {Howl} from "howler";

export default function AudioTrack({
  title,
  src,
  isPlaying,
  soloedTracks,
  toggleTrackSolo,
  muted,
  numberOfTracks,
  trackNumber,
  setTrackLoadedCount
}) {
  const [currentVolume, setCurrentVolume] = useState(1);
  const [isMuted, toggleMuted] = useState(muted);
  const [isSoloed, toggleSoloed] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    if (src) {
      const sound = new Howl({
        src: [src],
        // html5: true, // streaming gets shit out of sync
        onload: function() {
          setTrackLoadedCount()
        },
        onend: function() {},
        onpause: function() {},
        onstop: function() {},
        onseek: function() {},
        onloaderror: function() {
          // handleLoadError()
        }
      });
      soundRef.current = sound;
    }
  }, [src]);

  useEffect(() => {
    if (isPlaying) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if(soloedTracks.length) {
      // console.log(soloedTracks);
      if (soloedTracks.indexOf(title) !== -1) {
        // elRef.current.muted = false
        toggleSoloed(true);
      } else {
        // elRef.current.muted = true
        toggleSoloed(false);
      }
    } else {
      // elRef.current.muted = false;
      toggleSoloed(false);
    }
  }, [soloedTracks, title]);

  const muteTrack = (track) => {
    if (isMuted) {
      toggleMuted(false);
      soundRef.current.mute(false);
    } else {
      toggleMuted(true);
      soundRef.current.mute(true);
    }
  }

  const soloTrack = () => {
    toggleTrackSolo(title);
  }

  const handleVolumeChange = (e) => {
    setCurrentVolume(e.target.value);
    // gainRef.current.gain.value = e.target.value;
  }

  return (
    <div className={`audio-track ${trackNumber === numberOfTracks ? 'border-r': ''}`}>
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
            onClick={() => muteTrack()}
          >
            MUTE
          </button>
        </div>
        <div className="h-4 w-full flex-grow mt-2 mx-4 mb-4">
          <input className="w-full" type="range" onChange={handleVolumeChange} min="0" max="2" value={currentVolume} step="0.01" />
        </div>
      </div>
      {/* <canvas ref={canvasRef} width="75" height="75"></canvas> */}
    </div>
  );
}
