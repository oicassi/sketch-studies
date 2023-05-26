const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 1,
  animate: true,
  frame: 0,
  lineCap: 'butt',
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = '#161d23';
    context.strokeStyle = '#44982d';

    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const marginx = (width - gridw) * 0.5;
    const marginy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame : params.frame;

      const variation = random.range(0.1, f / 40);

      // const n = random.noise2D(x + frame * 10 + variation, y, params.freq, 1 + variation * params.amp);
      const n = random.noise3D(x, y, f * 10, params.freq, 1 + variation * params.amp);
      const angle = n * Math.PI * 0.2;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(marginx, marginy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;
      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();
      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  const folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' } });
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

  const noiseFolder = pane.addFolder({ title: 'Noise' });
  noiseFolder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
  noiseFolder.addInput(params, 'amp', { min: 0, max: 2 });
  noiseFolder.addInput(params, 'animate');
  noiseFolder.addInput(params, 'frame', { min: 0, max: 9999 });
};

createPane();
canvasSketch(sketch, settings);
