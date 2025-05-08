
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 100, paddleWidth = 10;
const player = { x: 10, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const ai = { x: canvas.width - 20, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 5,
  dy: 5,
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y) {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(text, x, y);
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = (Math.random() * 4) - 2; // Randomize angle a bit
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black");

  drawText(`Player: ${player.score}`, 50, 50);
  drawText(`AI: ${ai.score}`, canvas.width - 150, 50);

  drawRect(player.x, player.y, paddleWidth, paddleHeight, "white");
  drawRect(ai.x, ai.y, paddleWidth, paddleHeight, "white");

  drawCircle(ball.x, ball.y, ball.radius, "white");
}

function update() {
  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Paddle collision (player)
  if (
    ball.x - ball.radius < player.x + paddleWidth &&
    ball.y > player.y &&
    ball.y < player.y + paddleHeight
  ) {
    ball.dx *= -1;
  }

  // Paddle collision (AI)
  if (
    ball.x + ball.radius > ai.x &&
    ball.y > ai.y &&
    ball.y < ai.y + paddleHeight
  ) {
    ball.dx *= -1;
  }

  // Score tracking
  if (ball.x < 0) {
    ai.score++;
    resetBall();
  } else if (ball.x > canvas.width) {
    player.score++;
    resetBall();
  }

  // AI paddle movement
  const aiCenter = ai.y + paddleHeight / 2;
  if (aiCenter < ball.y) ai.y += 4;
  else ai.y -= 4;
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Player controls (mouse)
canvas.addEventListener("mousemove", (evt) => {
  const rect = canvas.getBoundingClientRect();
  player.y = evt.clientY - rect.top - paddleHeight / 2;
});

gameLoop();






