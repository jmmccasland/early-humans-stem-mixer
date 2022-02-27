import {
  useState,
  useRef
} from "react";
import AudioTrack from "./components/audio-track";
import art from "./bounces/art.jpeg";

import drumAudio from "./bounces/drum-bus.mp3";
import bassAudio from "./bounces/bass-bus.mp3";
import rythmGuitarAudio from "./bounces/rythm-guitar-bus.mp3";
import leadGuitarAudio from "./bounces/lead-guitar-bus.mp3";
import leadVocalAudio from "./bounces/lead-vocal-bus.mp3";
import bgvAudio from "./bounces/bgv-bus.mp3";
import synthAudio from "./bounces/synth-bus.mp3";
import auxAudio from "./bounces/aux-bus.mp3";
import drumWebm from "./bounces/drum-bus.webm";
import bassWebm from "./bounces/bass-bus.webm";
import rythmGuitarWebm from "./bounces/rythm-guitar-bus.webm";
import leadGuitarWebm from "./bounces/lead-guitar-bus.webm";
import leadVocalWebm from "./bounces/lead-vocal-bus.webm";
import bgvWebm from "./bounces/bgv-bus.webm";
import synthWebm from "./bounces/synth-bus.webm";
import auxWebm from "./bounces/aux-bus.webm";

const stems = [
  {
    trackName: "Drums",
    src: [drumWebm]
  },
  {
    trackName: "Bass",
    src: [bassWebm]
  },
  {
    trackName: "Rythm Guitar",
    src: [rythmGuitarWebm]
  },
  {
    trackName: "Lead Guitar",
    src: [leadGuitarWebm]
  },
  {
    trackName: "Lead Vocal",
    src: [leadVocalWebm]
  },
  {
    trackName: "BGVs",
    src: [bgvWebm]
  },
  {
    trackName: "Synth",
    src: [synthWebm]
  },
  {
    trackName: "Aux",
    src: [auxWebm]
  },
];

/* @TODO: 
  functionality:
  ✅ - can play song
  ✅ - can pause song
  ✅ - can mute each individual track
  ✅ - can solo each individual track
  ✅ - can control the volume of each track 
  ✅ - can run on mobile
  - can see current position in song
  - can slide to chosen position in song
  ✅ - tracks stay synced (perhaps wait til all stems download to begin playing?)
  ✅ - shows loading state of downloading mp3s
  - more polished loading state
    - (perhaps w/ info on how to use app 
    - and manual trigger to begin downloading stems)
  - (iOS) once play button is exposed, audio should start right after action
  ✅ - volume fader's don't decrease weirdly when increasing initially (set initial state of volume on howl constructor)

  style/content:
  ✅ - is visually responsive on mobile
  - and desktop
  - shows album art
  - makes use of spotify canvas video
  - has follow links for early humans socials etc
  - add gtag

  stretch:
  - can visualize the loudness of each track
  - can visualize the loudness of each track when modified
  - can paint it onto canvas in different ways for each track
  - can save the canvas painting and download image

  pre-launch:
  - cross browser test (chrome (+ios), safari (+ios), firefox)
  - Page title
  - Metadata and sharing information
*/

function App() {
  const [isPlaying, toggleIsPlaying] = useState(false);
  const [tracks, setTracks] = useState(stems);
  const [soloedTracks, setSoloedTracks] = useState([]);
  const [trackLoadedCount, setTrackLoadedCount] = useState(0);
  const currentCount = useRef(0);

  const playSong = () => {
    if (isPlaying) {
      toggleIsPlaying(false)
    } else {
      toggleIsPlaying(true)
    }
  }

  const toggleTrackSolo = (trackTitle) => {
    if (soloedTracks.indexOf(trackTitle) === -1) {
      setSoloedTracks([...soloedTracks, trackTitle]);
    } else {
      const newSoloedTracks = soloedTracks.filter(item => item !== trackTitle);
      setSoloedTracks(newSoloedTracks);
    }
  }

  const handleSetTrackLoadedCount = (title) => {
    console.log(`${title} loaded`);
    currentCount.current += 1;
    console.log(currentCount.current)

    if (currentCount.current === tracks.length) {
      setTrackLoadedCount(8);
    }
  }

  return (
    <div className="w-full" style={{ backgroundImage: art, }}>
      <header>
        {/* early humans */}
      </header>
      <main>
        
        <div className="w-fullbg-gray-400">
          {/* waveform visualizer */}
          {/* <img src={art} /> */}
        </div>
        <div className="p-4">
          {/* <button className="h-11 px-2 text-xs text-white border rounded border-gray-800 bg-gray-400" onClick={downloadStems}>
            Download Stems
          </button> */}

          {tracks.length === trackLoadedCount ? (
            <button className="w-11 h-11 text-xs text-white border rounded border-gray-800 bg-gray-400"
              onClick={playSong}
            >
              {isPlaying ? "Pause" : "Play"}
            </button> 
          ) : "Loading stems. . . this may take a minute or two"}

          <div className="console">
            {tracks.map((track, index) => {
              return (
                <AudioTrack
                  key={index}
                  trackNumber={index + 1}
                  numberOfTracks={tracks.length}
                  title={track.trackName}
                  src={track.src}
                  isPlaying={isPlaying}
                  soloedTracks={soloedTracks}
                  toggleTrackSolo={toggleTrackSolo}
                  trackLoaded={trackLoadedCount}
                  setTrackLoadedCount={() => handleSetTrackLoadedCount(track.trackName)}
                  />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
