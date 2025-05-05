const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 200;

const hearts = [];

function createHeart() {
  const heart = {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: Math.random() * 10 + 10,
    speed: Math.random() * 1 + 0.5,
    alpha: 1
  };
  hearts.push(heart);
}

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 30, size / 30);
  ctx.beginPath();
  ctx.globalAlpha = alpha;
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
  ctx.bezierCurveTo(-35, -15, -35, 10, -35, 10);
  ctx.bezierCurveTo(-35, 25, -20, 40, 0, 50);
  ctx.bezierCurveTo(20, 40, 35, 25, 35, 10);
  ctx.bezierCurveTo(35, 10, 35, -15, 15, -15);
  ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
  ctx.closePath();
  ctx.fillStyle = '#e91e63';
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createHeart();

  for (let i = 0; i < hearts.length; i++) {
    const h = hearts[i];
    h.y -= h.speed;
    h.alpha -= 0.005;
    drawHeart(h.x, h.y, h.size, h.alpha);

    // Remove hearts that have disappeared off the screen
    if (h.alpha <= 0 || h.y + h.size < 0) {
      hearts.splice(i, 1);
      i--; // Adjust index after removal
    }
  }

  requestAnimationFrame(animate);
}

animate();
