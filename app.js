const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  let player, blocks, score, gameOver, speed;

  function resetGame() {
    player = { x: 175, y: 460, width: 50, height: 20 };
    blocks = [];
    score = 0;
    speed = 2;
    gameOver = false;
  }

  function startGame() {
    resetGame();
    document.addEventListener("keydown", movePlayer);
    requestAnimationFrame(updateGame);
  }

  function movePlayer(e) {
    if (e.key === "ArrowLeft" && player.x > 0) {
      player.x -= 20;
    } else if (e.key === "ArrowRight" && player.x < canvas.width - player.width) {
      player.x += 20;
    }
  }

  function createBlock() {
    let x = Math.random() * (canvas.width - 30);
    blocks.push({ x: x, y: 0, width: 30, height: 30 });
  }

  function updateGame() {
    if (gameOver) {
      ctx.fillStyle = "black";
      ctx.font = "24px Arial";
      ctx.fillText("Game Over! Skor: " + score, 90, 250);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Create block secara berkala
    if (Math.random() < 0.03) {
      createBlock();
    }

    // Update blocks
    ctx.fillStyle = "red";
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].y += speed;
      ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);

      // Collision detection
      if (
        blocks[i].x < player.x + player.width &&
        blocks[i].x + blocks[i].width > player.x &&
        blocks[i].y < player.y + player.height &&
        blocks[i].y + blocks[i].height > player.y
      ) {
        gameOver = true;
      }
    }

    // Remove blocks yang lewat bawah
    blocks = blocks.filter(b => b.y < canvas.height);

    // Update score
    score++;
    speed = 2 + score / 300;
    document.getElementById("scoreDisplay").innerText = "Skor: " + score;

    requestAnimationFrame(updateGame);
  }