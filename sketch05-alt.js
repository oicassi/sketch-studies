const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

let manager;

const params = {
  text: 'b',
  fontFamily: 'serif',
  cell: 20,
  variation: 1.2,
};

const glyphParams = {
  low: '',
  lowSplitter: '',
  midLow: '.,:',
  midLowSplitter: '',
  mid: '- = 182',
  midSplitter: ' ',
  midHigh: '+ # blink',
  midHighSplitter: ' ',
  high: '_= < >& $? /',
  highSplitter: '',
};

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  return () => {
    const { cell, variation, fontFamily, text } = params;
    const cols = Math.floor(width / cell);
    const rows = Math.floor(height / cell);
    const numCells = cols * rows;

    typeCanvas.width = cols;
    typeCanvas.height = rows;
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    const den = text.length === 1 ? 1 : 1 / (text.length * 0.55);
    const fontSize = cols * den * variation;

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = '#161d23';
    context.fillRect(0, 0, width, height);
    // context.drawImage(typeCanvas, 0, 0);

    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillStyle = '#44982d';
    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];

      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) {
        context.font = `${cell * (1 + 5 / text.length)}px ${fontFamily}`;
      }

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      context.fillText(glyph, 0, 0);
      context.restore();
    }
  };
};

const getGlyph = (value) => {
  const { low, lowSplitter, midLow, midLowSplitter, mid, midSplitter, midHigh, midHighSplitter, high, highSplitter } =
    glyphParams;

  if (value < 50) return random.pick(low.split(lowSplitter)) ?? '';
  if (value < 100) return random.pick(midLow.split(midLowSplitter)) ?? '.';
  if (value < 150) return random.pick(mid.split(midSplitter)) ?? '-';
  if (value < 200) return random.pick(midHigh.split(midHighSplitter)) ?? '+';
  return random.pick(high.split(highSplitter)) ?? '>';
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  const folder = pane.addFolder({ title: 'General params' });
  folder.addInput(params, 'text');
  folder.addInput(params, 'fontFamily', {
    options: {
      serif: 'serif',
      sans: 'sans-serif',
      arial: 'arial',
      helvetica: 'helvetica',
      times: 'times new roman',
    },
  });
  folder.addInput(params, 'cell', { min: 8, max: 50, step: 1 });
  folder.addInput(params, 'variation', { min: 0.2, max: 8, step: 0.1 });

  const glyphFolder = pane.addFolder({ title: 'Glyphs' });
  glyphFolder.addInput(glyphParams, 'low');
  glyphFolder.addInput(glyphParams, 'lowSplitter');
  glyphFolder.addInput(glyphParams, 'midLow');
  glyphFolder.addInput(glyphParams, 'midLowSplitter');
  glyphFolder.addInput(glyphParams, 'mid');
  glyphFolder.addInput(glyphParams, 'midSplitter');
  glyphFolder.addInput(glyphParams, 'midHigh');
  glyphFolder.addInput(glyphParams, 'midHighSplitter');
  glyphFolder.addInput(glyphParams, 'high');
  glyphFolder.addInput(glyphParams, 'highSplitter');
};

createPane();
canvasSketch(sketch, settings);
