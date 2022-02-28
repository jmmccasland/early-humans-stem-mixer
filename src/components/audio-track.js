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
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [isMuted, toggleMuted] = useState(muted);
  const [isSoloed, toggleSoloed] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    if (src) {
      const sound = new Howl({
        src: src,
        volume: currentVolume,
        format: ["webm", "mp3", "ogg"],
        onplay: function() {
          console.log(`playing ${title}`)
        },
        onplayerror: function() {
          alert(`there was an error playing the ${title} stem`)
        },
        // html5: true, // streaming gets shit out of sync
        onload: function() {
          setTrackLoadedCount()
          // console.log(this.duration())
        },
        onend: function() {},
        onpause: function() {},
        onstop: function() {},
        onseek: function() {
          console.log("onseek", title)
          // Start updating the progress of the track.
          // requestAnimationFrame(self.step.bind(self));
        },
        onloaderror: function(id, err) {
          // handleLoadError()
          console.log("error in track", title)
          console.log(err)
        }
      });
      soundRef.current = sound;
    }
  }, [src, title]);

  useEffect(() => {
    if (isPlaying) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if(soloedTracks.length) {
      if (soloedTracks.indexOf(title) !== -1) {
        soundRef.current.mute(false);
        toggleSoloed(true);
        toggleMuted(false);
      } else {
        soundRef.current.mute(true);
        toggleSoloed(false);
      }
    } else {
      soundRef.current.mute(false);
      toggleSoloed(false);
    }
  }, [soloedTracks, title]);

  const muteTrack = (track) => {
    if (isMuted) {
      toggleMuted(false);
      soundRef.current.mute(false);
    } else {
      toggleMuted(true);
      toggleSoloed(false);
      soundRef.current.mute(true);
    }
  }

  const soloTrack = () => {
    toggleTrackSolo(title);
  }

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setCurrentVolume(value);
    if (value > 1) {
      soundRef.current.volume(1);
      console.log(soundRef.current);
    } else {
      soundRef.current.volume(value);
    }
  }

  return (
    <div className={`audio-track ${trackNumber === numberOfTracks ? 'border-r': ''}`}>
      <div className="flex flex-grow justify-between items-center w-full flex-wrap desktop:flex-col desktop:justify-center desktop:flex-nowrap">
        <div className="track-tape desktop:mt-2 desktop:order-3">{title}</div>
        <div className="flex items-center gap-1 desktop:mb-2">
          <button
            className={`py-2 px-1 text-2xs text-white border rounded border-gray-800 ${isSoloed ? 'bg-yellow-400' : 'bg-gray-400'}`}
            onClick={()=> soloTrack(title)}
            type="button"
          >
            SOLO
          </button>
          <button
            className={`py-2 px-1 text-2xs text-white border rounded border-gray-800 ${isMuted ? 'bg-orange-400' : 'bg-gray-400'}`}
            onClick={() => muteTrack()}
          >
            MUTE
          </button>
        </div>
        <div className="relative w-full flex-grow my-4 desktop:order-2">
          <input className="w-full desktop:absolute desktop:-rotate-90 desktop:top-1/2 desktop:left-1/2 desktop:transform desktop:-translate-x-1/2 desktop:-translate-y-1/2"
            type="range"
            onChange={handleVolumeChange}
            min="0"
            max="1"
            value={currentVolume}
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
}
