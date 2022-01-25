import {
  useEffect,
  useState
} from "react";
import logo from './logo.svg';
import AudioTrack from "./components/audio-track";
import auxAudio from "./bounces/aux-bus.mp3";
import bassAudio from "./bounces/bass-bus.mp3";
import bgvAudio from "./bounces/bgv-bus.mp3";
import drumAudio from "./bounces/drum-bus.mp3";
import leadGuitarAudio from "./bounces/lead-guitar-bus.mp3";
import leadVocalAudio from "./bounces/lead-vocal-bus.mp3";
import rythmGuitarAudio from "./bounces/rythm-guitar-bus.mp3";
import synthAudio from "./bounces/synth-bus.mp3";
import './App.css';

function App() {
  const [audioContext, setAudioContext] = useState(null);
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    const createdAudioContext = new AudioContext();
    setAudioContext(createdAudioContext);
  }, []);

  return (
    <div className="App" >
      <header className = "App-header" >
        <img src={logo} className = "App-logo" alt="logo" />
        <button onClick={() => toggleIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <AudioTrack audioContext={audioContext} title="Drums" src={drumAudio} isPlaying={isPlaying} />
        <AudioTrack audioContext={audioContext} title="Bass" src={bassAudio} isPlaying={isPlaying} />
        <AudioTrack audioContext={audioContext} title="BGV" src={bgvAudio} isPlaying={isPlaying} />
        <AudioTrack audioContext={audioContext} title="Lead Guitar" src={leadGuitarAudio} isPlaying={isPlaying} />
        <AudioTrack audioContext={audioContext} title="Lead Vocal" src={leadVocalAudio} isPlaying={isPlaying} />
        <AudioTrack audioContext={audioContext} title="Rythm Guitar" src={rythmGuitarAudio} isPlaying={isPlaying} />
        <AudioTrack audioContext={audioContext} title="Synth" src={synthAudio} isPlaying={isPlaying} />
        <AudioTrack audioContext={audioContext} title="Aux" src={auxAudio} isPlaying={isPlaying} />
      </header>
    </div>
  );
}

export default App;
