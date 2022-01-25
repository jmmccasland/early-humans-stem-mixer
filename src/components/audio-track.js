import { useState } from "react";

export default function AudioTrack({title, el, src}) {
  const [isMuted, toggleMuted] = useState();

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
      <div>{title}</div>
      <button onClick={() => muteTrack(el)}>
        {isMuted ? "Un-mute" : "Mute"}
      </button>
      <button>Solo</button>
      <audio src={src} controls ref={el}></audio>
    </div>
  );
}
