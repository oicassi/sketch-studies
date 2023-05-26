const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const AGENT_COUNT = 120;
const MAX_DIST = 350;

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < AGENT_COUNT; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return () => {
    context.strokeStyle = '#44982d';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      context.fillStyle = ``;
      const source = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        const destination = agents[j];

        const dist = source.pos.getDistance(destination.pos);

        if (dist > MAX_DIST) continue;

        context.lineWidth = math.mapRange(dist, 0, MAX_DIST, 6, 1);
        const alpha =
          dist > MAX_DIST * 0.5
            ? Math.floor(math.mapRange(dist, 0, MAX_DIST, 255, 1)).toString(16).padStart(2, '0')
            : 'ff';
        context.strokeStyle = `#44982d${alpha}`;
        context.beginPath();
        context.moveTo(source.pos.x, source.pos.y);
        context.lineTo(destination.pos.x, destination.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
      // agent.wrap(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance = (v) => {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
}

class Agent {
  constructor(x, y, radius = random.range(4, 12)) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = radius;
  }

  bounce = (width, height) => {
    const { x, y } = this.pos;
    if (x <= 0 || x >= width) this.vel.x *= -1;
    if (y <= 0 || y >= height) this.vel.y *= -1;
  };

  wrap = (width, height) => {
    const { x, y } = this.pos;
    if (x <= 0) this.pos.x = width;
    if (x >= width) this.pos.x = 0;
    if (y <= 0) this.pos.y = height;
    if (y >= height) this.pos.y = 0;
  };

  update = () => {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };

  draw = (context) => {
    // context.strokeStyle = '#44982d';
    context.fillStyle = '#161d23';
    context.lineWidth = 4;

    context.save();
    const { x, y } = this.pos;
    context.translate(x, y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  };
}
