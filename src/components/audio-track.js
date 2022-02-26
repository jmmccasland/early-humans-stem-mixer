import { useEffect, useRef, useState } from "react";

export default function AudioTrack({ audioContext, title, src, isPlaying, soloedTracks, toggleTrackSolo, muted, numberOfTracks, trackNumber }) {
  const [audioTrack, setAudioTrack] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(1);
  const [isMuted, toggleMuted] = useState(muted);
  const [isSoloed, toggleSoloed] = useState(false);
  
  const elRef = useRef(null);
  const gainRef = useRef(null)
  const analyserRef = useRef(null)
  // const canvasRef = useRef(null)

  // function drawLine(analyser, canvas) {
  //   let WIDTH = 640;
  //   let HEIGHT = 100;
  //   const canvasCtx = canvas.current.getContext("2d");
  //   let drawVisual;
  
  //   analyser.current.fftSize = 1024;
  //   var bufferLength = analyser.current.fftSize;
  //   var dataArray = new Float32Array(bufferLength);
  
  //   canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  //   drawVisual = requestAnimationFrame(() => drawLine(analyser, canvas));
  
  //   analyser.current.getFloatTimeDomainData(dataArray);
  
  //   canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  //   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
  //   canvasCtx.lineWidth = 2;
  //   canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  
  //   canvasCtx.beginPath();
  
  //   var sliceWidth = WIDTH * 1.0 / bufferLength;
  //   var x = 0;
  
  //   for(var i = 0; i < bufferLength; i++) {
  
  //     var v = dataArray[i] * 10.0;
  //     var y = HEIGHT/2 + v;
  
  //     if(i === 0) {
  //       canvasCtx.moveTo(x, y);
  //     } else {
  //       canvasCtx.lineTo(x, y);
  //     }
  
  //     x += sliceWidth;
  //   }
  
  //   canvasCtx.lineTo(canvas.current.width, canvas.current.height/2);
  //   canvasCtx.stroke();
  // };
  
  // function drawBars(analyser, canvas) {
  //   let WIDTH = 640;
  //   let HEIGHT = 100;
  //   const canvasCtx = canvas.current.getContext("2d");
  //   let drawVisual;
  
  //   analyser.current.fftSize = 1024;
  //   var bufferLength = analyser.current.fftSize;
  //   var dataArray = new Float32Array(bufferLength);
  
  //   canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  //   drawVisual = requestAnimationFrame(() => drawBars(analyser, canvas));
  
  //   analyser.current.getFloatFrequencyData(dataArray);
  
  //   canvasCtx.fillStyle = '#fff';
  //   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
  //   var barWidth = (WIDTH / bufferLength) * 2.5;
  //   var barHeight;
  //   var x = 0;
  
  //   for(var i = 0; i < bufferLength; i++) {
  //     barHeight = (dataArray[i] + 140)*2;
      
  //     canvasCtx.fillStyle = 'rgb(' + Math.floor(0+10) + ',0,0)';
  //     canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
  
  //     x += barWidth + 1;
  //   }
  // }

  // function drawGradient(analyser, canvas) {
  //   let WIDTH = 640;
  //   let HEIGHT = 100;
  //   const canvasCtx = canvas.current.getContext("2d");
  //   let drawVisual;
  
  //   analyser.current.fftSize = 1024;
  //   var bufferLength = analyser.current.frequencyBinCount;
  //   var dataArray = new Float32Array(bufferLength);
  
  //   canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  //   drawVisual = requestAnimationFrame(() => drawGradient(analyser, canvas));
  
  //   analyser.current.getFloatTimeDomainData(dataArray);
  
  //   canvasCtx.fillStyle = 'cornflowerblue';
  //   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  //   var gradient = canvasCtx.createRadialGradient(30,90,30, 10,90,100);
  //   // Add three color stops
  //   console.log(dataArray)
  //   gradient.addColorStop(dataArray[0], 'blue');
  //   gradient.addColorStop(dataArray[100], 'cornflowerblue');
  //   gradient.addColorStop(dataArray[300], 'green');

  //   // Set the fill style and draw a rectangle
  //   canvasCtx.fillStyle = gradient;
  //   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  // }

  useEffect(() => {
    if (elRef && audioContext) {
      const createdTrack = audioContext.createMediaElementSource(elRef.current);
      const gainNode = audioContext.createGain();
      gainRef.current = gainNode;

      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;
      
      analyser.fftSize = 2048;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      analyser.getByteTimeDomainData(dataArray)

      analyserRef.current = analyser;

      createdTrack.connect(gainNode).connect(analyser).connect(audioContext.destination);
      setAudioTrack(createdTrack);

      // if (canvasRef.current && analyserRef.current) {
      //   switch (title) {
      //     case 'Drums':
      //       drawBars(analyserRef, canvasRef);
      //       break;
      //     case 'Lead Guitar':
      //       drawGradient(analyserRef, canvasRef);
      //       break;
      //     case 'Lead Vocal':
      //       drawLine(analyserRef, canvasRef);
      //       break;
      //     case 'BGVs':
      //       drawLine(analyserRef, canvasRef);
      //       break;      
      //     default:
      //       drawBars(analyserRef, canvasRef);
      //       break;
      //   }
      // }
    }
  }, [audioContext]);

  useEffect(() => {
    if (isPlaying) {
      elRef.current.play();
    } else {
      elRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if(soloedTracks.length) {
      if (soloedTracks.indexOf(title) !== -1) {
        elRef.current.muted = false
        toggleSoloed(true);
      } else {
        elRef.current.muted = true
        toggleSoloed(false);
      }
    } else {
      elRef.current.muted = false;
      toggleSoloed(false);
    }
  }, [soloedTracks, title]);

  const muteTrack = (track) => {
    if (isMuted) {
      toggleMuted(false);
      track.current.muted = false;
    } else {
      toggleMuted(true);
      track.current.muted = true;
    }
  }

  const soloTrack = () => {
    toggleTrackSolo(title);
  }

  const handleVolumeChange = (e) => {
    setCurrentVolume(e.target.value);
    gainRef.current.gain.value = e.target.value;
  }

  return (
    <div className={`audio-track ${trackNumber === numberOfTracks ? 'border-r': ''}`}>
      <audio src={src} ref={elRef}></audio>
      <div className="track-info flex justify-between items-center w-full flex-wrap">
        <div className="track-tape">{title}</div>
        <div className="flex items-center gap-1">
          <button
            className={`w-11 h-11 text-xs text-white border rounded border-gray-800 ${isSoloed ? 'bg-yellow-400' : 'bg-gray-400'}`}
            onClick={()=> soloTrack(title)}
          >
            SOLO
          </button>
          <button
            className={`w-11 h-11 text-xs text-white border rounded border-gray-800 ${isMuted ? 'bg-orange-400' : 'bg-gray-400'}`}
            onClick={() => muteTrack(elRef)}
          >
            MUTE
          </button>
        </div>
        <div className="h-4 w-full flex-grow mt-2 mx-4 mb-4">
          <input className="w-full" type="range" onChange={handleVolumeChange} min="0" max="2" value={currentVolume} step="0.01" />
        </div>
      </div>
      {/* <canvas ref={canvasRef} width="75" height="75"></canvas> */}
    </div>
  );
}
