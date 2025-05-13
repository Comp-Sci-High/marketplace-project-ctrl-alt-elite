const gameContainer = document.getElementById('gameContainer');
    const ball = document.getElementById('ball');
    const paddleLeft = document.getElementById('paddleLeft');
    const paddleRight = document.getElementById('paddleRight');
    const scoreLeft = document.getElementById('scoreLeft');
    const scoreRight = document.getElementById('scoreRight');

    let ballX = 392, ballY = 192;
    let ballSpeedX = 4, ballSpeedY = 4;
    let gameInterval = null;
    let player1Score = 0, player2Score = 0;

    function moveBall() {
      const rect = gameContainer.getBoundingClientRect();
      const paddleLRect = paddleLeft.getBoundingClientRect();
      const paddleRRect = paddleRight.getBoundingClientRect();

      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce off top and bottom
      if (ballY <= 0 || ballY + 15 >= 400) {
        ballSpeedY = -ballSpeedY;
      }

      // Bounce off paddles
      if (ballX <= 20 &&
          ballY + 15 >= paddleLeft.offsetTop &&
          ballY <= paddleLeft.offsetTop + 80) {
        ballSpeedX = -ballSpeedX;
      }

      if (ballX + 15 >= 770 &&
          ballY + 15 >= paddleRight.offsetTop &&
          ballY <= paddleRight.offsetTop + 80) {
        ballSpeedX = -ballSpeedX;
      }

      // Scoring
      if (ballX < 0) {
        player2Score++;
        resetBall();
        updateScore();
      }

      if (ballX > 785) {
        player1Score++;
        resetBall();
        updateScore();
      }

      ball.style.left = ballX + "px";
      ball.style.top = ballY + "px";
    }

    function resetBall() {
      ballX = 392;
      ballY = 192;
      ballSpeedX = -ballSpeedX;
    }

    function updateScore() {
      scoreLeft.textContent = player1Score;
      scoreRight.textContent = player2Score;
    }

    function startGame() {
      if (!gameInterval) {
        gameInterval = setInterval(moveBall, 20);
      }
    }

    function stopGame() {
      clearInterval(gameInterval);
      gameInterval = null;
    }

    // Paddle control (W/S and ArrowUp/ArrowDown)
    document.addEventListener('keydown', function (e) {
      const step = 20;
      if (e.key === 'w' && paddleLeft.offsetTop > 0) {
        paddleLeft.style.top = paddleLeft.offsetTop - step + "px";
      } else if (e.key === 's' && paddleLeft.offsetTop < 320) {
        paddleLeft.style.top = paddleLeft.offsetTop + step + "px";
      }

      if (e.key === 'ArrowUp' && paddleRight.offsetTop > 0) {
        paddleRight.style.top = paddleRight.offsetTop - step + "px";
      } else if (e.key === 'ArrowDown' && paddleRight.offsetTop < 320) {
        paddleRight.style.top = paddleRight.offsetTop + step + "px";
      }
    });

    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('stopBtn').addEventListener('click', stopGame);