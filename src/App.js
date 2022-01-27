import {
  useEffect,
  useState
} from "react";
import logo from './logo.svg';
import AudioTrack from "./components/audio-track";
import drumAudio from "./bounces/drum-bus.mp3";
import bassAudio from "./bounces/bass-bus.mp3";
import rythmGuitarAudio from "./bounces/rythm-guitar-bus.mp3";
import leadGuitarAudio from "./bounces/lead-guitar-bus.mp3";
import leadVocalAudio from "./bounces/lead-vocal-bus.mp3";
import bgvAudio from "./bounces/bgv-bus.mp3";
import synthAudio from "./bounces/synth-bus.mp3";
import auxAudio from "./bounces/aux-bus.mp3";
import './App.css';

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
    <div className="App" >
      <header>
      </header>
      <main>
        <button onClick={playSong}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="w-full h-64 bg-gray-400">{/* waveform visualizer */}</div>
        <div className="flex justify-between">
          {tracks.map((track) => {
            return (
              <AudioTrack
                key={track.trackName}
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
      </main>
    </div>
  );
}

export default App;
