const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#161d23';
    context.lineWidth = width * 0.007;
    context.strokeStyle = '#44982d';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const w = width * 0.11;
        const h = height * 0.11;
        const gap = width * 0.03;
        const ix = width * 0.17;
        const iy = height * 0.17;
        const x = ix + (w + gap) * i;
        const y = iy + (h + gap) * j;

        const off = width * 0.02;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
