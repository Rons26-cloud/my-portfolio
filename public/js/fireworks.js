// Simple fireworks animation adapted from common canvas fireworks examples
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

let cw, ch;
function resize() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const fireworks = [];
const particles = [];

class Firework {
  constructor(sx, sy, tx, ty) {
    this.x = sx;
    this.y = sy;
    this.sx = sx;
    this.sy = sy;
    this.tx = tx;
    this.ty = ty;
    this.distanceToTarget = dist(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    this.coordinates = [];

    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 3;
    this.brightness = random(50, 70);
    this.targetRadius = 2;

    while (this.coordinates.length < 3) {
      this.coordinates.push([this.x, this.y]);
    }
  }

  update(index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.distanceTraveled = dist(this.sx, this.sy, this.x + vx, this.y + vy);

    if (this.distanceTraveled >= this.distanceToTarget) {
      createParticles(this.tx, this.ty);
      fireworks.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(
      this.coordinates[this.coordinates.length - 1][0],
      this.coordinates[this.coordinates.length - 1][1]
    );
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsl(120, 100%, ${this.brightness}%)`;
    ctx.stroke();
  }
}

function createParticles(x, y) {
  let count = 30;
  while (count--) {
    particles.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 5 + 1,
      brightness: random(50, 80),
      alpha: 1
    });
  }
}

function dist(aX, aY, bX, bY) {
  return Math.sqrt((bX - aX) ** 2 + (bY - aY) ** 2);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function loop() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = 'lighter';

  if (Math.random() < 0.03) {
    fireworks.push(
      new Firework(
        cw / 2,
        ch,
        Math.random() * cw,
        Math.random() * (ch / 2)
      )
    );
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].draw();
    fireworks[i].update(i);
  }

  requestAnimationFrame(loop);
}

loop();
