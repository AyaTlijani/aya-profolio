/* =========================================================
   Y2K CUSTOM CURSOR
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const y2kCursor =
    document.querySelector(".y2k-cursor");

  const gameArea =
    document.querySelector(".game-wrapper");


  /*
    If the cursor element does not exist, do nothing.
    This prevents cursor.js from breaking the rest of
    the website.
  */

  if (!y2kCursor) {
    console.warn(
      "Y2K cursor element (.y2k-cursor) was not found."
    );

    return;
  }


  /* =======================================================
     STATE
  ======================================================= */

  let cursorX = 0;
  let cursorY = 0;

  let currentX = 0;
  let currentY = 0;

  let cursorVisible = false;
  let cursorDisabled = false;


  /* =======================================================
     CHECK GAME AREA
  ======================================================= */

  function isInsideGame(x, y) {

    if (!gameArea) {
      return false;
    }

    const rect =
      gameArea.getBoundingClientRect();

    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );

  }


  /* =======================================================
     HIDE CUSTOM CURSOR
  ======================================================= */

  function hideCursor() {

    cursorVisible = false;

    y2kCursor.classList.remove(
      "visible",
      "hover"
    );

  }


  /* =======================================================
     SHOW CUSTOM CURSOR
  ======================================================= */

  function showCursor() {

    if (cursorDisabled) {
      return;
    }

    cursorVisible = true;

    y2kCursor.classList.add(
      "visible"
    );

  }


  /* =======================================================
     MOUSE MOVEMENT
  ======================================================= */

  document.addEventListener(
    "mousemove",
    event => {

      cursorX = event.clientX;
      cursorY = event.clientY;


      /*
        Never use the custom cursor inside
        the game area.
      */

      if (
        cursorDisabled ||
        isInsideGame(
          event.clientX,
          event.clientY
        )
      ) {

        hideCursor();

        return;

      }


      /*
        First movement starts exactly where
        the real mouse currently is.
      */

      if (!cursorVisible) {

        currentX = cursorX;
        currentY = cursorY;

      }


      showCursor();

    }
  );


  /* =======================================================
     LEAVE DOCUMENT
  ======================================================= */

  document.addEventListener(
    "mouseleave",
    () => {

      hideCursor();

    }
  );


  /* =======================================================
     RETURN TO DOCUMENT
  ======================================================= */

  document.addEventListener(
    "mouseenter",
    event => {

      cursorX = event.clientX;
      cursorY = event.clientY;


      if (
        cursorDisabled ||
        isInsideGame(
          event.clientX,
          event.clientY
        )
      ) {

        hideCursor();

        return;

      }


      /*
        Prevent the custom cursor from
        jumping from its previous position.
      */

      currentX = cursorX;
      currentY = cursorY;

      showCursor();

    }
  );


  /* =======================================================
     GAME AREA
  ======================================================= */

  if (gameArea) {

    gameArea.addEventListener(
      "mouseenter",
      () => {

        cursorDisabled = true;

        hideCursor();

      }
    );


    gameArea.addEventListener(
      "mouseleave",
      event => {

        cursorDisabled = false;

        cursorX = event.clientX;
        cursorY = event.clientY;

        currentX = cursorX;
        currentY = cursorY;

        hideCursor();

      }
    );

  }


  /* =======================================================
     SMOOTH CURSOR
  ======================================================= */

  function cursorLoop() {

    currentX +=
      (cursorX - currentX) * 0.22;

    currentY +=
      (cursorY - currentY) * 0.22;


    /*
      The cursor element itself is positioned
      using transform.

      CSS should NOT add another transform that
      moves it independently.
    */

    y2kCursor.style.transform =
      `translate3d(${currentX}px, ${currentY}px, 0)`;


    requestAnimationFrame(
      cursorLoop
    );

  }

  cursorLoop();


  /* =======================================================
     HOVER EFFECT
  ======================================================= */

  const hoverTargets =
    document.querySelectorAll(
      "a, button, summary, .project-card"
    );


  hoverTargets.forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {

        if (
          cursorDisabled ||
          (gameArea &&
           gameArea.contains(element))
        ) {

          return;

        }

        y2kCursor.classList.add(
          "hover"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        y2kCursor.classList.remove(
          "hover"
        );

      }
    );

  });


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  hideCursor();

});