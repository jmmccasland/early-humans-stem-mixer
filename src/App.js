import {
  useEffect,
  useRef,
  useState
} from "react";
import AudioTrack from "./components/audio-track";
import Header from "./components/header";
import Footer from "./components/footer";

import { Howl } from "howler";
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
  ✅ - muting or soling a track removes the other status
  - can see current position in song
  - has stop button
  - can slide to chosen position in song
  ✅ - tracks stay synced (perhaps wait til all stems download to begin playing?)
  ✅ - shows loading state of downloading mp3s
  ✅ - (iOS) once play button is exposed, audio should start right after action
  ✅ - volume fader's don't decrease weirdly when increasing initially (set initial state of volume on howl constructor)
  
  experience req:
  ✅ - more polished loading state
      - (perhaps w/ info on how to use app 
    ✅  - need to notate that user must NOT be in silent mode
    ✅  - and manual trigger to begin downloading stems)

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
  - add extra formats for loading audio
*/

const SetupPrompt = ({ handleSetup }) => {
  return (
    <>
      <div className="controls w-full justify-center mx-auto max-w-xl p-4 bg-silver desktop:max-w-4xl">
        <p className="text-center">Confirm your device is not in silent mode to download stems</p>
        <button className="block mx-auto mt-2 h-11 px-2 text-xs text-white border rounded border-gray-800 bg-gray-400"
          onClick={() => handleSetup()}
        >
          Confirm to Rock
        </button>
      </div>
      <Console disabled tracks={stems} soloedTracks={[]} handleSetTrackLoadedCount={() => {}} />
      {/* Check if user on ios or android */}
    </>
  )
}

const Console = ({disabled, tracks, isPlaying, soloedTracks, trackLoadedCount, toggleTrackSolo, handleSetTrackLoadedCount}) => {
  return tracks.length ? (
    <div className={`console ${disabled ? 'opacity-30 pointer-events-none cursor-not-allowed' : ''}`}>
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

const Controls = ({disabled, isPlaying, playSong, playerStatus}) => (
  <div className="controls flex justify-between items-center">
    <span className="text-xs">Status: {playerStatus}</span>
    <button disabled={disabled} className="w-11 h-11 text-2xs uppercase text-white border rounded border-gray-800 bg-gray-400"
      onClick={disabled ? () => console.log("not yet") : playSong}
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

function App() {
  const [playerStatus, setPlayerStatus] = useState("Loading. . .");
  const [isSetup, setIsSetup] = useState(false);
  const [isPlaying, toggleIsPlaying] = useState(false);
  const [tracks, setTracks] = useState(stems);
  const [soloedTracks, setSoloedTracks] = useState([]);
  const [trackLoadedCount, setTrackLoadedCount] = useState(0);
  const currentCount = useRef(0);
  const soundRef = useRef(null);

  useEffect(() => {
    const sound = new Howl({
      src: loadingAudio,
      // masterGain: true,
      volume: 0,
      loop: true,
      format: ["mp3"],
      onplay: function() {
        console.log(`playing loading`)
      },
      onplayerror: function() {
        alert(`there was an error playing the loading stem`)
      },
      // html5: true, // streaming gets shit out of sync
      onload: function() {
        // setTrackLoadedCount()
      },
      onend: function() {},
      onpause: function() {},
      onstop: function() {},
      onseek: function() {},
      onloaderror: function(id, err) {
        // handleLoadError()
        console.log("error in track", "loading track")
        console.log(err)
        setPlayerStatus("Error loading test sample");
      }
    });
    soundRef.current = sound;
  }, [])

  const playSong = () => {
    if (isPlaying) {
      toggleIsPlaying(false)
      setPlayerStatus("Paused")
    } else {
      toggleIsPlaying(true)
      if (soundRef.current) {
        soundRef.current.fade(1, 0.25, 2000);
        window.setTimeout(() => {
          soundRef.current.stop()
        }, 2000);
      }
      setPlayerStatus("Playing. . .")
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
      soundRef.current.fade(1, 0.25, 4000);
      setPlayerStatus("Stems downloaded - start mixing!")
    }
  }

  const handleSetup = () => {
    soundRef.current.play();
    soundRef.current.fade(0, 1, 4000);
    setIsSetup(true)
    setPlayerStatus("Fetching stems. . .")
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex flex-col flex-grow p-4">
        {isSetup ? (
          <>
            <Controls disabled={tracks.length !== trackLoadedCount} isPlaying={isPlaying} playSong={playSong} playerStatus={playerStatus} />
            <Console
              toggleTrackSolo={toggleTrackSolo}
              tracks={tracks}
              isPlaying={isPlaying}
              soloedTracks={soloedTracks}
              trackLoadedCount={trackLoadedCount}
              handleSetTrackLoadedCount={handleSetTrackLoadedCount}
            />
          </>
        ) : (
          <SetupPrompt loadingAudio={loadingAudio} handleSetup={handleSetup} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
