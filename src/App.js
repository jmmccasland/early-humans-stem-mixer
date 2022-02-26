import {
  useEffect,
  useState
} from "react";
import AudioTrack from "./components/audio-track";
import drumAudio from "./bounces/drum-bus.mp3";
import bassAudio from "./bounces/bass-bus.mp3";
import rythmGuitarAudio from "./bounces/rythm-guitar-bus.mp3";
import leadGuitarAudio from "./bounces/lead-guitar-bus.mp3";
import leadVocalAudio from "./bounces/lead-vocal-bus.mp3";
import bgvAudio from "./bounces/bgv-bus.mp3";
import synthAudio from "./bounces/synth-bus.mp3";
import auxAudio from "./bounces/aux-bus.mp3";
import art from "./bounces/art.jpeg";

/* @TODO: 
  - is visually responsive on mobile ✅
    - and desktop
  - can play song ✅
  - can pause song ✅
  - can mute each individual track ✅
  - can solo each individual track ✅
  - can control the volume of each track ✅ 
  - can visualize the loudness of each track
  - can visualize the loudness of each track when 
  - can run on mobile
  - can see current position in song
  - can slide to chosen position in song
  - tracks stay synced (perhaps wait til all stems download to begin playing?)
*/

const songTracks = [
  {
    trackName: "Drums",
    src: drumAudio
  },
  {
    trackName: "Bass",
    src: bassAudio
  },
  {
    trackName: "Rythm Guitar",
    src: rythmGuitarAudio
  },
  {
    trackName: "Lead Guitar",
    src: leadGuitarAudio
  },
  {
    trackName: "Lead Vocal",
    src: leadVocalAudio
  },
  {
    trackName: "BGVs",
    src: bgvAudio
  },
  {
    trackName: "Synth",
    src: synthAudio
  },
  {
    trackName: "Aux",
    src: auxAudio
  },
]

function App() {
  const [audioContext, setAudioContext] = useState(null);
  const [isPlaying, toggleIsPlaying] = useState(false);
  const [tracks, setTracks] = useState(songTracks);
  const [soloedTracks, setSoloedTracks] = useState([]);

  useEffect(() => {
    const createdAudioContext = new AudioContext();
    setAudioContext(createdAudioContext);
  }, []);

  const playSong = () => {
    if (isPlaying) {
      toggleIsPlaying(false)
    } else {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
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

  return (
    <div className="w-full" style={{ backgroundImage: art, }}>
      <header>
      </header>
      <main>
        
        <div className="w-fullbg-gray-400">
          {/* waveform visualizer */}
          {/* <img src={art} /> */}
        </div>
        <div className="p-4">
          <button className="w-11 h-11 text-xs text-white border rounded border-gray-800 bg-gray-400" onClick={playSong}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div className="console">
            {tracks.map((track, index) => {
              return (
                <AudioTrack
                  key={index}
                  trackNumber={index + 1}
                  numberOfTracks={tracks.length}
                  audioContext={audioContext}
                  title={track.trackName}
                  src={track.src}
                  isPlaying={isPlaying}
                  soloedTracks={soloedTracks}
                  toggleTrackSolo={toggleTrackSolo}
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
