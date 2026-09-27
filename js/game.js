/* =========================================================
   PIXEL BUNNY
   Simple platform game
   3 hearts • 2 checkpoints • collect everything
========================================================= */

const canvas = document.querySelector("#game");
const ctx = canvas?.getContext("2d");

const startButton = document.querySelector("#start-game");
const gameMessage = document.querySelector("#game-message");
const scoreDisplay = document.querySelector("#game-score");

if (!canvas || !ctx) {
  throw new Error("Game canvas not found.");
}

/* =========================
   GAME SETTINGS
========================= */

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const WORLD_WIDTH = 2200;

const GRAVITY = 0.45;
const JUMP_FORCE = -8.8;
const MOVE_SPEED = 2.2;

const MAX_HEARTS = 3;
const INVULNERABILITY_TIME = 1200;

/* =========================
   GAME STATE
========================= */

let gameRunning = false;
let gameWon = false;

let score = 0;
let hearts = MAX_HEARTS;

let cameraX = 0;

let lastCheckpoint = 0;

let invulnerableUntil = 0;

let animationFrame = null;

const keys = {
  left: false,
  right: false
};

let jumpRequested = false;

/* =========================
   BUNNY
========================= */

const bunny = {
  x: 70,
  y: 235,

  width: 24,
  height: 30,

  velocityY: 0,

  grounded: false
};

/* =========================
   LEVEL DATA
========================= */

let platforms = [];
let stars = [];
let bugs = [];
let checkpoints = [];
let particles = [];

const finish = {
  x: 2135,
  y: 195,
  width: 30,
  height: 85
};

/* =========================
   CREATE LEVEL
========================= */

function createLevel() {

  platforms = [

    // START
    { x: 0, y: 280, width: 260, height: 40 },

    // SECOND PLATFORM
    { x: 300, y: 280, width: 240, height: 40 },

    // HIGH PLATFORM
    { x: 580, y: 230, width: 120, height: 15 },

    // CHECKPOINT 1
    { x: 740, y: 280, width: 230, height: 40 },

    // HIGH PLATFORM
    { x: 1010, y: 215, width: 120, height: 15 },

    // MIDDLE
    { x: 1160, y: 280, width: 210, height: 40 },

    // HIGH PLATFORM
    { x: 1410, y: 225, width: 130, height: 15 },

    // CHECKPOINT 2
    { x: 1570, y: 280, width: 220, height: 40 },

    // HIGH PLATFORM
    { x: 1830, y: 220, width: 130, height: 15 },

    // FINISH
    { x: 1980, y: 280, width: 220, height: 40 }
  ];

  /* =========================
     COLLECTIBLES
  ========================= */

  stars = [

    { x: 185, y: 235, collected: false },

    { x: 420, y: 235, collected: false },

    { x: 635, y: 185, collected: false },

    { x: 850, y: 235, collected: false },

    { x: 1055, y: 170, collected: false },

    { x: 1260, y: 235, collected: false },

    { x: 1475, y: 180, collected: false },

    { x: 1680, y: 235, collected: false },

    { x: 1895, y: 175, collected: false },

    { x: 2100, y: 235, collected: false }

  ];

  /* =========================
     BUGS
  ========================= */

  bugs = [

    {
      x: 360,
      y: 262,
      width: 22,
      height: 18,
      minX: 320,
      maxX: 500,
      speed: 0.35,
      direction: 1,
      alive: true
    },

    {
      x: 775,
      y: 262,
      width: 22,
      height: 18,
      minX: 760,
      maxX: 930,
      speed: 0.38,
      direction: 1,
      alive: true
    },

    {
      x: 1210,
      y: 262,
      width: 22,
      height: 18,
      minX: 1180,
      maxX: 1330,
      speed: 0.35,
      direction: 1,
      alive: true
    },

    {
      x: 1630,
      y: 262,
      width: 22,
      height: 18,
      minX: 1590,
      maxX: 1760,
      speed: 0.38,
      direction: 1,
      alive: true
    },

    {
      x: 2020,
      y: 262,
      width: 22,
      height: 18,
      minX: 2000,
      maxX: 2150,
      speed: 0.35,
      direction: 1,
      alive: true
    }

  ];

  /* =========================
     CHECKPOINTS
  ========================= */

  checkpoints = [

    {
      x: 740,
      spawnX: 755,
      spawnY: 250,
      reached: false
    },

    {
      x: 1570,
      spawnX: 1590,
      spawnY: 250,
      reached: false
    }

  ];

  particles = [];
}

/* =========================================================
   DRAWING
========================================================= */

/* =========================
   BUNNY
========================= */

function drawBunny() {

  // Blink while invulnerable
  if (
    invulnerableUntil > performance.now() &&
    Math.floor(performance.now() / 100) % 2 === 0
  ) {
    return;
  }

  const x = Math.round(bunny.x - cameraX);
  const y = Math.round(bunny.y);

  /* ears */

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(x + 3, y - 11, 6, 13);
  ctx.fillRect(x + 15, y - 11, 6, 13);

  /* body */

  ctx.fillRect(x + 1, y, 23, 18);
  ctx.fillRect(x + 3, y + 7, 19, 18);

  /* inner ears */

  ctx.fillStyle = "#efb4d0";

  ctx.fillRect(x + 5, y - 8, 2, 8);
  ctx.fillRect(x + 17, y - 8, 2, 8);

  /* eyes */

  ctx.fillStyle = "#17152a";

  ctx.fillRect(x + 6, y + 6, 3, 3);
  ctx.fillRect(x + 16, y + 6, 3, 3);

  /* nose */

  ctx.fillStyle = "#ef9fc4";

  ctx.fillRect(x + 11, y + 11, 4, 3);

  /* feet */

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(x - 2, y + 23, 9, 5);
  ctx.fillRect(x + 17, y + 23, 9, 5);
}

/* =========================
   BUG
========================= */

function drawBug(bug) {

  if (!bug.alive) return;

  const x = Math.round(bug.x - cameraX);
  const y = Math.round(bug.y);

  ctx.fillStyle = "#6855b2";

  ctx.fillRect(x + 4, y + 4, 14, 11);
  ctx.fillRect(x + 2, y + 6, 18, 8);

  ctx.fillStyle = "#17152a";

  ctx.fillRect(x, y + 7, 4, 2);
  ctx.fillRect(x + 18, y + 7, 4, 2);

  ctx.fillRect(x + 3, y + 14, 3, 4);
  ctx.fillRect(x + 15, y + 14, 3, 4);

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(x + 6, y + 6, 3, 3);
  ctx.fillRect(x + 13, y + 6, 3, 3);
}

/* =========================
   STAR
========================= */

function drawStar(star) {

  if (star.collected) return;

  const x = Math.round(star.x - cameraX);
  const y = Math.round(star.y);

  if (x < -20 || x > WIDTH + 20) return;

  ctx.fillStyle = "#fff7c9";

  ctx.fillRect(x + 4, y, 4, 12);
  ctx.fillRect(x, y + 4, 12, 4);
  ctx.fillRect(x + 3, y + 3, 6, 6);
}

/* =========================
   CHECKPOINT
========================= */

function drawCheckpoint(checkpoint, index) {

  const x = checkpoint.x - cameraX;

  ctx.fillStyle =
    checkpoint.reached
      ? "#ff7eb8"
      : "#aaa0e8";

  ctx.fillRect(x, 240, 4, 40);

  ctx.fillStyle =
    checkpoint.reached
      ? "#ff9ac8"
      : "#dcd3ff";

  ctx.fillRect(x + 4, 240, 18, 11);

  ctx.fillStyle = "#17152a";

  ctx.font = "7px monospace";

  ctx.fillText(
    `CP${index + 1}`,
    x + 5,
    248
  );
}

/* =========================
   FINISH FLAG
========================= */

function drawFinish() {

  const x = Math.round(finish.x - cameraX);

  ctx.fillStyle = "#17152a";

  ctx.fillRect(x + 3, finish.y, 4, 85);

  const ready =
    stars.every(star => star.collected);

  ctx.fillStyle =
    ready
      ? "#ff7eb8"
      : "#aaa0e8";

  ctx.fillRect(
    x + 7,
    finish.y + 3,
    24,
    17
  );

  ctx.fillStyle = "#ffffff";

  ctx.fillRect(
    x + 8,
    finish.y + 4,
    6,
    6
  );

  ctx.fillRect(
    x + 20,
    finish.y + 12,
    6,
    6
  );
}

/* =========================
   HEART UI
========================= */

function drawHearts() {

  const x = 15;
  const y = 15;

  ctx.fillStyle = "rgba(255,255,255,.9)";

  ctx.fillRect(
    x - 7,
    y - 5,
    105,
    28
  );

  ctx.strokeStyle = "#17152a";
  ctx.lineWidth = 2;

  ctx.strokeRect(
    x - 7,
    y - 5,
    105,
    28
  );

  ctx.font = "16px Arial";

  for (let i = 0; i < MAX_HEARTS; i++) {

    ctx.fillStyle =
      i < hearts
        ? "#ff6fae"
        : "#d9d9e8";

    ctx.fillText(
      "♥",
      x + i * 28,
      y + 16
    );
  }
}

/* =========================
   DATA UI
========================= */

function drawDataCounter() {

  const collected =
    stars.filter(star => star.collected).length;

  ctx.fillStyle = "rgba(255,255,255,.9)";

  ctx.fillRect(
    125,
    10,
    105,
    28
  );

  ctx.strokeStyle = "#17152a";

  ctx.strokeRect(
    125,
    10,
    105,
    28
  );

  ctx.fillStyle = "#17152a";

  ctx.font = "9px monospace";

  ctx.fillText(
    `DATA ${collected}/${stars.length}`,
    136,
    28
  );
}

/* =========================
   CHECKPOINT UI
========================= */

function drawCheckpointUI() {

  ctx.fillStyle = "rgba(255,255,255,.9)";

  ctx.fillRect(
    245,
    10,
    125,
    28
  );

  ctx.strokeStyle = "#17152a";

  ctx.strokeRect(
    245,
    10,
    125,
    28
  );

  ctx.fillStyle = "#17152a";

  ctx.font = "9px monospace";

  ctx.fillText(
    `CHECKPOINT ${lastCheckpoint}/2`,
    255,
    28
  );
}

/* =========================
   WORLD
========================= */

function drawWorld() {

  ctx.clearRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  /* sky */

  ctx.fillStyle = "#b9d8ff";

  ctx.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  /* clouds */

  ctx.fillStyle = "#ffffff";

  const cloudPositions = [
    100,
    500,
    900,
    1400,
    1900
  ];

  cloudPositions.forEach(worldX => {

    const x =
      worldX - cameraX * 0.35;

    ctx.fillRect(
      x,
      55,
      50,
      15
    );

    ctx.fillRect(
      x + 10,
      47,
      25,
      23
    );

    ctx.fillRect(
      x + 28,
      51,
      25,
      19
    );
  });

  /* platforms */

  platforms.forEach(platform => {

    const x =
      platform.x - cameraX;

    if (
      x + platform.width < 0 ||
      x > WIDTH
    ) {
      return;
    }

    ctx.fillStyle = "#7867bd";

    ctx.fillRect(
      x,
      platform.y,
      platform.width,
      platform.height
    );

    ctx.fillStyle = "#dcd3ff";

    ctx.fillRect(
      x,
      platform.y,
      platform.width,
      5
    );

    ctx.fillStyle = "#aaa0e8";

    for (
      let tile = x;
      tile < x + platform.width;
      tile += 20
    ) {

      ctx.fillRect(
        tile,
        platform.y + 7,
        8,
        4
      );
    }
  });

  /* stars */

  stars.forEach(drawStar);

  /* checkpoints */

  checkpoints.forEach(
    drawCheckpoint
  );

  /* bugs */

  bugs.forEach(drawBug);

  /* flag */

  drawFinish();

  /* particles */

  particles.forEach(particle => {

    ctx.fillStyle = particle.color;

    ctx.fillRect(
      Math.round(
        particle.x - cameraX
      ),
      Math.round(particle.y),
      particle.size,
      particle.size
    );
  });

  /* bunny */

  drawBunny();

  /* UI */

  drawHearts();
  drawDataCounter();
  drawCheckpointUI();
}

/* =========================================================
   PHYSICS
========================================================= */

function updateBunny() {

  /* horizontal movement */

  if (keys.left) {
    bunny.x -= MOVE_SPEED;
  }

  if (keys.right) {
    bunny.x += MOVE_SPEED;
  }

  bunny.x = Math.max(
    0,
    Math.min(
      WORLD_WIDTH - bunny.width,
      bunny.x
    )
  );

  /* jump */

  if (
    jumpRequested &&
    bunny.grounded
  ) {

    bunny.velocityY = JUMP_FORCE;

    bunny.grounded = false;
  }

  jumpRequested = false;

  /* gravity */

  bunny.velocityY += GRAVITY;

  const previousY = bunny.y;

  bunny.y += bunny.velocityY;

  bunny.grounded = false;

  /* platform landing */

  for (const platform of platforms) {

    const previousBottom =
      previousY + bunny.height;

    const currentBottom =
      bunny.y + bunny.height;

    const horizontallyInside =
      bunny.x + bunny.width >
        platform.x &&
      bunny.x <
        platform.x + platform.width;

    const landing =
      previousBottom <= platform.y &&
      currentBottom >= platform.y &&
      bunny.velocityY >= 0;

    if (
      horizontallyInside &&
      landing
    ) {

      bunny.y =
        platform.y - bunny.height;

      bunny.velocityY = 0;

      bunny.grounded = true;

      break;
    }
  }

  /* fell into a gap */

  if (
    bunny.y >
    HEIGHT + 60
  ) {

    loseHeart();

    return;
  }
}

/* =========================================================
   STARS
========================================================= */

function collectStars() {

  for (const star of stars) {

    if (star.collected) {
      continue;
    }

    const bunnyCenterX =
      bunny.x +
      bunny.width / 2;

    const bunnyCenterY =
      bunny.y +
      bunny.height / 2;

    const distance =
      Math.hypot(
        bunnyCenterX - star.x,
        bunnyCenterY - star.y
      );

    if (distance < 25) {

      star.collected = true;

      score += 100;

      createParticles(
        star.x,
        star.y,
        "#ff9ac8",
        10
      );

      updateScore();

      showToast(
        "✦ DATA COLLECTED!"
      );
    }
  }
}

/* =========================================================
   BUGS
========================================================= */

function updateBugs() {

  for (const bug of bugs) {

    if (!bug.alive) {
      continue;
    }

    bug.x +=
      bug.speed *
      bug.direction;

    if (
      bug.x <= bug.minX
    ) {

      bug.x = bug.minX;

      bug.direction = 1;
    }

    if (
      bug.x >= bug.maxX
    ) {

      bug.x = bug.maxX;

      bug.direction = -1;
    }
  }
}

function rectanglesOverlap(a, b) {

  return (
    a.x <
      b.x + b.width &&
    a.x + a.width >
      b.x &&
    a.y <
      b.y + b.height &&
    a.y + a.height >
      b.y
  );
}

function checkBugCollisions() {

  if (
    invulnerableUntil >
    performance.now()
  ) {
    return;
  }

  for (const bug of bugs) {

    if (!bug.alive) {
      continue;
    }

    if (
      !rectanglesOverlap(
        bunny,
        bug
      )
    ) {
      continue;
    }

    /*
      If bunny is falling onto bug,
      squash it instead of losing a heart.
    */

    const bunnyBottom =
      bunny.y + bunny.height;

    const wasAboveBug =
      bunnyBottom <=
      bug.y + 8;

    if (
      bunny.velocityY > 0 &&
      wasAboveBug
    ) {

      bug.alive = false;

      bunny.velocityY =
        JUMP_FORCE * 0.55;

      score += 150;

      createParticles(
        bug.x,
        bug.y,
        "#806ed0",
        12
      );

      updateScore();

      showToast(
        "✦ BUG FIXED!"
      );

      continue;
    }

    /* normal hit */

    loseHeart();

    return;
  }
}

/* =========================================================
   CHECKPOINTS
========================================================= */

function updateCheckpoints() {

  checkpoints.forEach(
    (checkpoint, index) => {

      if (
        checkpoint.reached
      ) {
        return;
      }

      if (
        bunny.x >= checkpoint.x
      ) {

        checkpoint.reached = true;

        /*
          IMPORTANT:
          index 0 = checkpoint 1
          index 1 = checkpoint 2

          We store 1 or 2 for the UI,
          NOT an array index.
        */

        lastCheckpoint =
          index + 1;

        showToast(
          `✦ CHECKPOINT ${lastCheckpoint} REACHED!`
        );

        createParticles(
          checkpoint.x,
          checkpoint.y || 240,
          "#ff7eb8",
          15
        );
      }
    }
  );
}

/* =========================================================
   DAMAGE / RESPAWN
========================================================= */

function loseHeart() {

  if (!gameRunning) {
    return;
  }

  if (
    invulnerableUntil >
    performance.now()
  ) {
    return;
  }

  hearts--;

  createParticles(
    bunny.x,
    bunny.y,
    "#ff6fae",
    18
  );

  if (hearts <= 0) {

    hearts = 0;

    updateScore();

    endGame();

    return;
  }

  /*
    Respawn at the latest checkpoint.

    lastCheckpoint:
      0 = beginning
      1 = checkpoint 1
      2 = checkpoint 2
  */

  respawnBunny();

  showToast(
    `♥ OOPS! ${hearts} HEARTS LEFT`
  );
}

function respawnBunny() {

  let spawnX = 70;
  let spawnY = 250;

  if (
    lastCheckpoint === 1
  ) {

    spawnX =
      checkpoints[0].spawnX;

    spawnY =
      checkpoints[0].spawnY;
  }

  if (
    lastCheckpoint === 2
  ) {

    spawnX =
      checkpoints[1].spawnX;

    spawnY =
      checkpoints[1].spawnY;
  }

  bunny.x = spawnX;
  bunny.y = spawnY;

  bunny.velocityY = 0;

  bunny.grounded = true;

  /*
    Keep all collected stars.
    Keep all reached checkpoints.
  */

  invulnerableUntil =
    performance.now() +
    INVULNERABILITY_TIME;

  updateCamera();
}

/* =========================================================
   FINISH
========================================================= */

function checkFinish() {

  if (
    bunny.x + bunny.width <
    finish.x
  ) {
    return;
  }

  const everythingCollected =
    stars.every(
      star => star.collected
    );

  if (!everythingCollected) {

    bunny.x =
      finish.x -
      bunny.width -
      20;

    showToast(
      "✦ COLLECT ALL 10 DATA!"
    );

    return;
  }

  winGame();
}

/* =========================================================
   CAMERA
========================================================= */

function updateCamera() {

  const target =
    bunny.x -
    WIDTH * 0.35;

  cameraX +=
    (target - cameraX) *
    0.08;

  cameraX = Math.max(
    0,
    Math.min(
      WORLD_WIDTH - WIDTH,
      cameraX
    )
  );
}

/* =========================================================
   PARTICLES
========================================================= */

function createParticles(
  x,
  y,
  color,
  amount
) {

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    particles.push({

      x,
      y,

      velocityX:
        (Math.random() - 0.5) * 3,

      velocityY:
        (Math.random() - 0.5) * 3,

      size:
        2 + Math.random() * 2,

      life: 35,

      color
    });
  }
}

function updateParticles() {

  for (const particle of particles) {

    particle.x +=
      particle.velocityX;

    particle.y +=
      particle.velocityY;

    particle.velocityY +=
      0.07;

    particle.life--;
  }

  particles =
    particles.filter(
      particle =>
        particle.life > 0
    );
}

/* =========================================================
   SCORE
========================================================= */

function updateScore() {

  if (!scoreDisplay) {
    return;
  }

  scoreDisplay.textContent =
    `SCORE ${
      String(
        Math.floor(score)
      ).padStart(4, "0")
    }`;
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

  const toast =
    document.querySelector("#toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 1000);
}

/* =========================================================
   GAME LOOP
========================================================= */

function gameLoop() {

  if (!gameRunning) {
    return;
  }

  updateBunny();

  updateBugs();

  collectStars();

  checkBugCollisions();

  updateCheckpoints();

  updateParticles();

  checkFinish();

  updateCamera();

  score += 0.01;

  updateScore();

  drawWorld();

  animationFrame =
    requestAnimationFrame(
      gameLoop
    );
}

/* =========================================================
   START
========================================================= */

function startGame() {

  cancelAnimationFrame(
    animationFrame
  );

  createLevel();

  bunny.x = 70;
  bunny.y = 250;

  bunny.velocityY = 0;

  bunny.grounded = true;

  cameraX = 0;

  hearts = MAX_HEARTS;

  score = 0;

  lastCheckpoint = 0;

  invulnerableUntil = 0;

  gameWon = false;

  gameRunning = true;

  if (gameMessage) {
    gameMessage.style.display =
      "none";
  }

  updateScore();

  drawWorld();

  animationFrame =
    requestAnimationFrame(
      gameLoop
    );
}

/* =========================================================
   GAME OVER
========================================================= */

function endGame() {

  gameRunning = false;

  cancelAnimationFrame(
    animationFrame
  );

  if (!gameMessage) {
    return;
  }

  gameMessage.innerHTML = `

    <div class="game-title">
      GAME OVER ✦
    </div>

    <p>
      The bunny used all 3 hearts.
      <br><br>
      But don't worry...
      <br>
      bugs are temporary.
      ✦
    </p>

    <button id="restart-game">
      TRY AGAIN
    </button>

    <small>
      ← → / A D to move · SPACE to jump
    </small>

  `;

  gameMessage.style.display =
    "flex";

  document
    .querySelector(
      "#restart-game"
    )
    ?.addEventListener(
      "click",
      startGame
    );
}

/* =========================================================
   WIN
========================================================= */

function winGame() {

  if (
    !gameRunning ||
    gameWon
  ) {
    return;
  }

  gameWon = true;

  gameRunning = false;

  cancelAnimationFrame(
    animationFrame
  );

  createParticles(
    finish.x,
    finish.y,
    "#ff7eb8",
    40
  );

  drawWorld();

  const finalScore =
    String(
      Math.floor(score)
    ).padStart(4, "0");

  gameMessage.innerHTML = `

    <div class="game-title">
      🎉 CONGRATULATIONS! 🎉
    </div>

    <p class="win-score">
      YOU WON!
      <br>
      ALL DATA COLLECTED.
      <br>
      SCORE ${finalScore}
    </p>

    <p class="game-joke">
      The princess?
      <br>
      <strong>
        404: NOT FOUND.
      </strong>
      💀

      <br><br>

      But hey...

      <br>

      <strong>
        LET'S CONNECT? 🐰
      </strong>
    </p>

    <div class="game-win-buttons">

      <button id="connect-game">
        LET'S CONNECT →
      </button>

      <button id="restart-game">
        PLAY AGAIN
      </button>

    </div>

    <small>
      Mission complete ✦ bunny survived ✦
      internet conquered
    </small>

  `;

  gameMessage.style.display =
    "flex";

  document
    .querySelector(
      "#connect-game"
    )
    ?.addEventListener(
      "click",
      () => {

        document
          .querySelector("#contact")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  document
    .querySelector(
      "#restart-game"
    )
    ?.addEventListener(
      "click",
      startGame
    );
}

/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key ===
      "ArrowLeft"
    ) {
      keys.left = true;
      event.preventDefault();
    }

    if (
      event.key ===
      "ArrowRight"
    ) {
      keys.right = true;
      event.preventDefault();
    }

    if (
      event.key.toLowerCase() === "a"
    ) {
      keys.left = true;
    }

    if (
      event.key.toLowerCase() === "d"
    ) {
      keys.right = true;
    }

    if (
      event.code === "Space"
    ) {

      event.preventDefault();

      if (!event.repeat) {
        jumpRequested = true;
      }
    }

  }
);

document.addEventListener(
  "keyup",
  event => {

    if (
      event.key ===
      "ArrowLeft" ||
      event.key.toLowerCase() ===
      "a"
    ) {
      keys.left = false;
    }

    if (
      event.key ===
      "ArrowRight" ||
      event.key.toLowerCase() ===
      "d"
    ) {
      keys.right = false;
    }

  }
);

/* =========================================================
   START BUTTON
========================================================= */

startButton?.addEventListener(
  "click",
  startGame
);

/* =========================================================
   INITIAL DRAW
========================================================= */

createLevel();

drawWorld();