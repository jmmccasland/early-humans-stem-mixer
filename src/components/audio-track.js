import { useEffect, useRef, useState } from "react";

export default function AudioTrack({ audioContext, title, src, isPlaying }) {
  const [audioTrack, setAudioTrack] = useState(null);
  const [isMuted, toggleMuted] = useState();
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
  }, [isPlaying])

  const muteTrack = (track) => {
    if (isMuted) {
      toggleMuted(false);
      track.current.muted = false;
    } else {
      toggleMuted(true);
      track.current.muted = true;
    }
  }

  return (
    <div>
      <button onClick={() => muteTrack(elRef)}>
        {isMuted ? "Un-mute" : "Mute"}
      </button>
      <button>Solo</button>
      <div>{title}</div>
      <audio src={src} ref={elRef} controls></audio>
    </div>
  );
}
