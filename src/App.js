import {
  useEffect,
  useState
} from "react";
import AudioTrack from "./components/audio-track";
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

function App() {
  const [audioContext, setAudioContext] = useState(null);
  const [isPlaying, toggleIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
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

  const downloadStems = async () => {
    // async function importFile() {
      const drumAudio = await import("./bounces/drum-bus.mp3");
      const bassAudio = await import("./bounces/bass-bus.mp3");
      const rythmGuitarAudio = await import("./bounces/rythm-guitar-bus.mp3");
      const leadGuitarAudio = await import("./bounces/lead-guitar-bus.mp3");
      const leadVocalAudio = await import("./bounces/lead-vocal-bus.mp3");
      const bgvAudio = await import("./bounces/bgv-bus.mp3");
      const synthAudio = await import("./bounces/synth-bus.mp3");
      const auxAudio = await import("./bounces/aux-bus.mp3");
      setTracks([
        {
          trackName: "Drums",
          src: drumAudio.default
        },
        {
          trackName: "Bass",
          src: bassAudio.default
        },
        {
          trackName: "Rythm Guitar",
          src: rythmGuitarAudio.default
        },
        {
          trackName: "Lead Guitar",
          src: leadGuitarAudio.default
        },
        {
          trackName: "Lead Vocal",
          src: leadVocalAudio.default
        },
        {
          trackName: "BGVs",
          src: bgvAudio.default
        },
        {
          trackName: "Synth",
          src: synthAudio.default
        },
        {
          trackName: "Aux",
          src: auxAudio.default
        },
      ]); // <==========
    // }
    // importFile();
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
          <button className="h-11 px-2 text-xs text-white border rounded border-gray-800 bg-gray-400" onClick={downloadStems}>Download Stems</button>
          <button className="w-11 h-11 text-xs text-white border rounded border-gray-800 bg-gray-400" onClick={playSong}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div className="console">
            {tracks?.map((track, index) => {
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
