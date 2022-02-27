import {
  useState,
  useRef
} from "react";
import AudioTrack from "./components/audio-track";
import art from "./bounces/art.jpeg";

import loadingAudio from "./bounces/loading-bus.mp3";

import drumAudio from "./bounces/drum-bus.mp3";
import bassAudio from "./bounces/bass-bus.mp3";
import rhythmGuitarAudio from "./bounces/rhythm-guitar-bus.mp3";
import leadGuitarAudio from "./bounces/lead-guitar-bus.mp3";
import leadVocalAudio from "./bounces/lead-vocal-bus.mp3";
import bgvAudio from "./bounces/bgv-bus.mp3";
import synthAudio from "./bounces/synth-bus.mp3";
import auxAudio from "./bounces/aux-bus.mp3";
import drumWebm from "./bounces/drum-bus.webm";
import bassWebm from "./bounces/bass-bus.webm";
import rhythmGuitarWebm from "./bounces/rhythm-guitar-bus.webm";
import leadGuitarWebm from "./bounces/lead-guitar-bus.webm";
import leadVocalWebm from "./bounces/lead-vocal-bus.webm";
import bgvWebm from "./bounces/bgv-bus.webm";
import synthWebm from "./bounces/synth-bus.webm";
import auxWebm from "./bounces/aux-bus.webm";
import drumOgg from "./bounces/drum-bus.ogg";
import bassOgg from "./bounces/bass-bus.ogg";
import rhythmGuitarOgg from "./bounces/rhythm-guitar-bus.ogg";
import leadGuitarOgg from "./bounces/lead-guitar-bus.ogg";
import leadVocalOgg from "./bounces/lead-vocal-bus.ogg";
import bgvOgg from "./bounces/bgv-bus.ogg";
import synthOgg from "./bounces/synth-bus.ogg";
import auxOgg from "./bounces/aux-bus.ogg";

const stems = [
  {
    trackName: "Drums",
    src: [drumWebm, drumAudio, drumOgg]
  },
  {
    trackName: "Bass",
    src: [bassWebm, bassAudio, bassOgg]
  },
  {
    trackName: "Rhythm Guitar",
    src: [rhythmGuitarWebm, rhythmGuitarAudio, rhythmGuitarOgg]
  },
  {
    trackName: "Lead Guitar",
    src: [leadGuitarWebm, leadGuitarAudio, leadGuitarOgg]
  },
  {
    trackName: "Lead Vocal",
    src: [leadVocalWebm, leadVocalAudio, leadVocalOgg]
  },
  {
    trackName: "BGVs",
    src: [bgvWebm, bgvAudio, bgvOgg]
  },
  {
    trackName: "Synth",
    src: [synthWebm, synthAudio, synthOgg]
  },
  {
    trackName: "Aux",
    src: [auxWebm, auxAudio, auxOgg]
  },
];

/* @TODO: 
  console functionality:
  ✅ - can play song
  ✅ - can pause song
  ✅ - can mute each individual track
  ✅ - can solo each individual track
  ✅ - can control the volume of each track 
  ✅ - can run on mobile
  - muting or soling a track removes the other status
  - can see current position in song
  - can slide to chosen position in song
  ✅ - tracks stay synced (perhaps wait til all stems download to begin playing?)
  ✅ - shows loading state of downloading mp3s
  ✅ - (iOS) once play button is exposed, audio should start right after action
  ✅ - volume fader's don't decrease weirdly when increasing initially (set initial state of volume on howl constructor)
  
  experience req:
  ⭐️ - more polished loading state
      - (perhaps w/ info on how to use app 
      - need to notate that user must NOT be in silent mode
      - and manual trigger to begin downloading stems)

  style/content:
  ✅ - is visually responsive on mobile
  ✅ - and desktop
  ✅ - shows album art
  - makes use of spotify canvas video
  - has follow links for early humans socials etc
  - add gtag

  stretch:
  - can visualize the loudness of each track in bubble next to title
  - can visualize the loudness of each track when modified
  - can paint it onto canvas in different ways for each track
  - can save the canvas painting and download image

  pre-launch:
  - cross browser test (chrome (+ios), safari (+ios), firefox)
  ✅ - Page title
  - Metadata and sharing information
*/

const Console = ({tracks, isPlaying, soloedTracks, trackLoadedCount, toggleTrackSolo, handleSetTrackLoadedCount}) => {
  return tracks.length ? (
    <div className="console flex-grow">
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
  ) : "";
}

function App() {
  const [isSetup, setIsSetup] = useState(true);
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

  const SetupPrompt = () => (
    <div className="console">
      setup time
    </div>
  )

  const Controls = () => (
    <div className="flex items-center">
      <button className="w-11 h-11 text-xs text-white border rounded border-gray-800 bg-gray-400"
        onClick={playSong}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      {/* <button className="w-11 h-11 text-xs text-white border rounded border-gray-800 bg-gray-400"
        onClick={stopSong}
      >
        Stop
      </button> */}
    </div>
  )

  return (
    <div className="flex flex-col w-full h-screen" style={{ backgroundImage: art, }}>
      <header className="flex justify-center p-8">
        <img className="w-48" src={art} alt="" />
      </header>
      <main className="flex flex-col flex-grow p-4">
        {/* <button className="h-11 px-2 text-xs text-white border rounded border-gray-800 bg-gray-400" onClick={downloadStems}>
          Download Stems
        </button> */}
        {tracks.length === trackLoadedCount ? (
          <Controls />
        ) : ""}
        {isSetup ? (
          <Console
            toggleTrackSolo={toggleTrackSolo}
            tracks={tracks}
            isPlaying={isPlaying}
            soloedTracks={soloedTracks}
            trackLoadedCount={trackLoadedCount}
            handleSetTrackLoadedCount={handleSetTrackLoadedCount}
          />
        ) : (
          <SetupPrompt loadingAudio={loadingAudio}/>
        )}
      </main>
      <footer className="p-8 text-white text-center">
        copyright &copy; {new Date().getFullYear()} early humans 
      </footer>
    </div>
  );
}

export default App;
