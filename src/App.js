import {
  useEffect,
  useState,
  useRef
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
  const auxRef = useRef(null);
  const bassRef = useRef(null);
  const bgvRef = useRef(null);
  const drumRef = useRef(null);
  const leadGuitarRef = useRef(null);
  const leadVocalRef = useRef(null);
  const rythmGuitarRef = useRef(null);
  const synthRef = useRef(null);

  const [audioContext, setAudioContext] = useState(null);

  const [auxTrack, setAuxTrack] = useState(null);
  const [bassTrack, setBassTrack] = useState(null);
  const [bgvTrack, setBGVTrack] = useState(null);
  const [drumTrack, setDrumTrack] = useState(null);
  const [leadGuitarTrack, setLeadGuitarTrack] = useState(null);
  const [leadVocalTrack, setLeadVocalTrack] = useState(null);
  const [rythmGuitarTrack, setRythmGuitarTrack] = useState(null);
  const [synthTrack, setSynthTrack] = useState(null);
  
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {

    if (auxRef.current) {
      const createdAudioContext = new AudioContext();

      const createdAuxTrack = createdAudioContext.createMediaElementSource(auxRef.current);
      createdAuxTrack.connect(createdAudioContext.destination);

      const createdBassTrack = createdAudioContext.createMediaElementSource(bassRef.current)
      createdBassTrack.connect(createdAudioContext.destination);

      const createdBGVTrack = createdAudioContext.createMediaElementSource(bgvRef.current)
      createdBGVTrack.connect(createdAudioContext.destination);

      const createdDrumTrack = createdAudioContext.createMediaElementSource(drumRef.current)
      createdDrumTrack.connect(createdAudioContext.destination);

      const createdLeadGuitarTrack = createdAudioContext.createMediaElementSource(leadGuitarRef.current)
      createdLeadGuitarTrack.connect(createdAudioContext.destination);

      const createdLeadVocalTrack = createdAudioContext.createMediaElementSource(leadVocalRef.current)
      createdLeadVocalTrack.connect(createdAudioContext.destination);

      const createdRythmGuitarTrack = createdAudioContext.createMediaElementSource(rythmGuitarRef.current)
      createdRythmGuitarTrack.connect(createdAudioContext.destination);

      const createdSynthTrack = createdAudioContext.createMediaElementSource(synthRef.current)
      createdSynthTrack.connect(createdAudioContext.destination);

      setAudioContext(createdAudioContext);
      setAuxTrack(createdAuxTrack);
      setBassTrack(createdBassTrack)
      setBGVTrack(createdBGVTrack) 
      setDrumTrack(createdDrumTrack) 
      setLeadGuitarTrack(createdLeadGuitarTrack) 
      setLeadVocalTrack(createdLeadVocalTrack) 
      setRythmGuitarTrack(createdRythmGuitarTrack)
      setSynthTrack(createdSynthTrack)
    }

  }, [])

  const playMusic = () => {
    // play or pause track depending on state
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (isPlaying) {
      toggleIsPlaying(false);
      auxRef.current.pause();
      bassRef.current.pause();
      bgvRef.current.pause();
      drumRef.current.pause();
      leadGuitarRef.current.pause();
      leadVocalRef.current.pause();
      rythmGuitarRef.current.pause();
      synthRef.current.pause();
    } else {
      toggleIsPlaying(true);
      auxRef.current.play();
      bassRef.current.play();
      bgvRef.current.play();
      drumRef.current.play();
      leadGuitarRef.current.play();
      leadVocalRef.current.play();
      rythmGuitarRef.current.play();
      synthRef.current.play();
    }
  }

  return (
    <div className="App" >
      <header className = "App-header" >
        <img src={logo} className = "App-logo" alt="logo" />
        <button onClick={playMusic}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <AudioTrack title="Drums" el={drumRef} src={drumAudio} />
        <AudioTrack title="Bass" el={bassRef} src={bassAudio} />
        <AudioTrack title="BGV" el={bgvRef} src={bgvAudio} />
        <AudioTrack title="Lead Guitar" el={leadGuitarRef} src={leadGuitarAudio} />
        <AudioTrack title="Lead Vocal" el={leadVocalRef} src={leadVocalAudio} />
        <AudioTrack title="Rythm Guitar" el={rythmGuitarRef} src={rythmGuitarAudio} />
        <AudioTrack title="Synth" el={synthRef} src={synthAudio} />
        <AudioTrack title="Aux" el={auxRef} src={auxAudio} />
      </header>
    </div>
  );
}

export default App;
