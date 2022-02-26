export default function drawLine(analyser, canvas) {
  // let WIDTH = 640;
  // let HEIGHT = 100;
  // const canvasCtx = canvas.current.getContext("2d");
  // let drawVisual;

  // analyser.current.fftSize = 1024;
  // var bufferLength = analyser.current.fftSize;
  // var dataArray = new Float32Array(bufferLength);

  // canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  // drawVisual = requestAnimationFrame(() => drawLine(analyser, canvas));

  // analyser.current.getFloatTimeDomainData(dataArray);

  // canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  // canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  // canvasCtx.lineWidth = 2;
  // canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  // canvasCtx.beginPath();

  // var sliceWidth = WIDTH * 1.0 / bufferLength;
  // var x = 0;

  // for(var i = 0; i < bufferLength; i++) {

  //   var v = dataArray[i] * 10.0;
  //   var y = HEIGHT/2 + v;

  //   if(i === 0) {
  //     canvasCtx.moveTo(x, y);
  //   } else {
  //     canvasCtx.lineTo(x, y);
  //   }

  //   x += sliceWidth;
  // }

  // canvasCtx.lineTo(canvas.current.width, canvas.current.height/2);
  // canvasCtx.stroke();
}
