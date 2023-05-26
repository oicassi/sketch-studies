const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = '#161d23';
    context.strokeStyle = '#44982d';
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
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

      const variation = random.range(0.1, frame / 40);

      const n = random.noise2D(x + frame * 10 + variation, y, 0.001, 1 + variation);
      const angle = n * Math.PI * 0.2;
      const scale = math.mapRange(n, -1, 1, 1, 30);

      context.save();
      context.translate(x, y);
      context.translate(marginx, marginy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
