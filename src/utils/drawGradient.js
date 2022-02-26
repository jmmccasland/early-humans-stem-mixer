export default function drawGradient(analyser, canvas) {
  let WIDTH = 640;
  let HEIGHT = 100;
  const canvasCtx = canvas.current.getContext("2d");
  let drawVisual;

  analyser.current.fftSize = 1024;
  var bufferLength = analyser.current.frequencyBinCount;
  var dataArray = new Float32Array(bufferLength);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  drawVisual = requestAnimationFrame(() => drawGradient(analyser, canvas));

  analyser.current.getFloatTimeDomainData(dataArray);

  canvasCtx.fillStyle = 'cornflowerblue';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  var gradient = canvasCtx.createRadialGradient(30,90,30, 10,90,100);
  // Add three color stops
  console.log(dataArray)
  gradient.addColorStop(dataArray[0], 'blue');
  gradient.addColorStop(dataArray[100], 'cornflowerblue');
  gradient.addColorStop(dataArray[300], 'green');

  // Set the fill style and draw a rectangle
  canvasCtx.fillStyle = gradient;
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
}
