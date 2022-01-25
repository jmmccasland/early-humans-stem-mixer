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
    <div>
      <button onClick={() => muteTrack(elRef)}>
        {isMuted ? "Un-mute" : "Mute"}
      </button>
      <button onClick={()=> soloTrack(title)}>
        {/* {isMuted ? "Un-solo" : "Solo"} */}
        solo
      </button>
      <div>{title}</div>
      <audio src={src} ref={elRef} controls></audio>
    </div>
  );
}
