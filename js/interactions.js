/* =========================================================
   INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /*
    Toast messages and broken-image fallbacks live in main.js.
  */


  /* =======================================================
     PROJECT VIEWER
  ======================================================== */

  const projectViewer = document.querySelector("#project-viewer");
  const viewerWindow = document.querySelector(".project-viewer-window");
  const viewerImage = document.querySelector("#viewer-image");
  const viewerTitle = document.querySelector("#viewer-title");
  const viewerProjectName = document.querySelector("#viewer-project-name");
  const viewerCurrent = document.querySelector("#viewer-current");
  const viewerTotal = document.querySelector("#viewer-total");
  const viewerPrev = document.querySelector(".viewer-prev");
  const viewerNext = document.querySelector(".viewer-next");
  const viewerClose = document.querySelector(".viewer-close");


  if (!projectViewer || !viewerImage) {
    console.warn("Project viewer HTML was not found.");
    return;
  }


  /* =======================================================
     PROJECT GALLERIES
  ======================================================== */

  const projectGalleries = {

    scilit: {
      name: "SCILIT",
      title: "SciLit",

      images: [
        {
          src: "assets/scilit-1.png",
          alt: "SciLit home page"
        },
        {
          src: "assets/scilit-2.png",
          alt: "SciLit retrieved papers"
        },
        {
          src: "assets/scilit-3.png",
          alt: "SciLit verified review with citations"
        },
        {
          src: "assets/scilit-4.png",
          alt: "SciLit comparison table"
        }
      ]
    },


    mimo: {
      name: "MIMO",
      title: "MIMO",

      images: [
        {
          src: "assets/mimo-1.jpg",
          alt: "MIMO home screen"
        },
        {
          src: "assets/mimo-2.jpg",
          alt: "MIMO focus mode at night"
        },
        {
          src: "assets/mimo-3.jpg",
          alt: "MIMO short break"
        },
        {
          src: "assets/mimo-4.jpg",
          alt: "MIMO moods and actions"
        },
        {
          src: "assets/mimo-5.jpg",
          alt: "MIMO floating companion playing music"
        }
      ]
    },


    querypilot: {
      name: "QUERYPILOT",
      title: "QueryPilot",

      images: [
        {
          src: "assets/querypilot-1.png",
          alt: "QueryPilot demo: agent trace and answer"
        },
        {
          src: "assets/querypilot-2.png",
          alt: "QueryPilot benchmark results"
        },
        {
          src: "assets/querypilot-3.png",
          alt: "QueryPilot upload your own data"
        }
      ]
    },


    esprim: {
      name: "LEARNING ANALYTICS",
      title: "Learning Analytics & Competency Assessment",

      images: [
        {
          src: "assets/esprim-1.png",
          alt: "Competency evidence overview"
        },
        {
          src: "assets/esprim-2.png",
          alt: "Human check labelling page"
        },
        {
          src: "assets/esprim-3.png",
          alt: "Live analyzer"
        }
      ]
    },


    smartroute: {
      name: "SMARTROUTE",
      title: "SmartRoute",

      images: [
        {
          src: "assets/smartroute-1.png",
          alt: "SmartRoute sign-in page"
        },
        {
          src: "assets/smartroute-2.png",
          alt: "SmartRoute overview dashboard"
        },
        {
          src: "assets/smartroute-3.png",
          alt: "SmartRoute Excel import"
        },
        {
          src: "assets/smartroute-4.png",
          alt: "SmartRoute dispatch and route map"
        },
        {
          src: "assets/smartroute-5.png",
          alt: "SmartRoute driver app"
        }
      ]
    },


    artisan: {
      name: "ARTISANCONNECT",
      title: "ArtisanConnect",

      images: [
        {
          src: "assets/artisanconnect-1.png",
          alt: "ArtisanConnect screenshot 1"
        },
        {
          src: "assets/artisanconnect-2.png",
          alt: "ArtisanConnect screenshot 2"
        },
        {
          src: "assets/artisanconnect-3.png",
          alt: "ArtisanConnect screenshot 3"
        }
      ]
    }

  };


  let currentGallery = null;
  let currentImageIndex = 0;


  /* =======================================================
     SHOW PROJECT IMAGE
  ======================================================== */

  function showProjectImage() {

    if (!currentGallery) return;

    if (!Array.isArray(currentGallery.images)) return;

    if (currentGallery.images.length === 0) return;


    if (currentImageIndex < 0) {
      currentImageIndex = currentGallery.images.length - 1;
    }

    if (currentImageIndex >= currentGallery.images.length) {
      currentImageIndex = 0;
    }


    const image = currentGallery.images[currentImageIndex];

    if (!image || !image.src) return;


    viewerImage.classList.remove("viewer-image-loaded");

    viewerImage.src = image.src;
    viewerImage.alt = image.alt || "";


    if (viewerTitle) {
      viewerTitle.textContent = currentGallery.title;
    }

    if (viewerProjectName) {
      viewerProjectName.textContent = currentGallery.name;
    }

    if (viewerCurrent) {
      viewerCurrent.textContent =
        String(currentImageIndex + 1).padStart(2, "0");
    }

    if (viewerTotal) {
      viewerTotal.textContent =
        String(currentGallery.images.length).padStart(2, "0");
    }


    const hasMultipleImages =
      currentGallery.images.length > 1;


    if (viewerPrev) {

      viewerPrev.disabled = !hasMultipleImages;

      viewerPrev.classList.toggle(
        "is-hidden",
        !hasMultipleImages
      );

      viewerPrev.setAttribute(
        "aria-hidden",
        String(!hasMultipleImages)
      );

    }


    if (viewerNext) {

      viewerNext.disabled = !hasMultipleImages;

      viewerNext.classList.toggle(
        "is-hidden",
        !hasMultipleImages
      );

      viewerNext.setAttribute(
        "aria-hidden",
        String(!hasMultipleImages)
      );

    }


    if (viewerImage.complete && viewerImage.naturalWidth > 0) {
      viewerImage.classList.add("viewer-image-loaded");
    }

  }


  /* =======================================================
     IMAGE LOAD
  ======================================================== */

  viewerImage.addEventListener("load", () => {
    viewerImage.classList.add("viewer-image-loaded");
  });


  viewerImage.addEventListener("error", () => {

    viewerImage.classList.remove("viewer-image-loaded");

    console.error(
      `Project image could not be loaded: ${viewerImage.src}`
    );

  });


  /* =======================================================
     OPEN VIEWER
  ======================================================== */

  function openProjectViewer(galleryName) {

    const gallery = projectGalleries[galleryName];

    if (!gallery) {
      console.error(`Gallery "${galleryName}" does not exist.`);
      return;
    }

    if (!gallery.images || gallery.images.length === 0) {
      console.error(`Gallery "${galleryName}" contains no images.`);
      return;
    }


    currentGallery = gallery;
    currentImageIndex = 0;

    showProjectImage();


    projectViewer.removeAttribute("hidden");

    projectViewer.classList.add("open");

    projectViewer.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "project-viewer-open"
    );

    projectViewer.style.display = "flex";


    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        projectViewer.classList.add("visible");

      });

    });

  }


  /* =======================================================
     CLOSE VIEWER
  ======================================================== */

  function closeProjectViewer() {

    projectViewer.classList.remove("visible");
    projectViewer.classList.remove("open");

    projectViewer.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "project-viewer-open"
    );


    window.setTimeout(() => {

      if (!projectViewer.classList.contains("open")) {
        projectViewer.style.display = "";
      }

    }, 200);


    currentGallery = null;
    currentImageIndex = 0;

    viewerImage.removeAttribute("src");
    viewerImage.alt = "";

    viewerImage.classList.remove(
      "viewer-image-loaded"
    );

  }


  /* =======================================================
     NEXT IMAGE
  ======================================================== */

  function nextProjectImage() {

    if (!currentGallery) return;

    if (
      !currentGallery.images ||
      currentGallery.images.length <= 1
    ) {
      return;
    }


    currentImageIndex += 1;


    if (
      currentImageIndex >=
      currentGallery.images.length
    ) {
      currentImageIndex = 0;
    }


    showProjectImage();

  }


  /* =======================================================
     PREVIOUS IMAGE
  ======================================================== */

  function previousProjectImage() {

    if (!currentGallery) return;

    if (
      !currentGallery.images ||
      currentGallery.images.length <= 1
    ) {
      return;
    }


    currentImageIndex -= 1;


    if (currentImageIndex < 0) {
      currentImageIndex =
        currentGallery.images.length - 1;
    }


    showProjectImage();

  }


  /* =======================================================
     PROJECT BUTTONS
  ======================================================== */

  document
  .querySelectorAll(".view-photos-button[data-gallery]")
    .forEach(button => {

      button.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        const galleryName =
          button.getAttribute("data-gallery") ||
          button.getAttribute("data-project");

        if (!galleryName) {

          console.error(
            "Project button is missing data-gallery/data-project."
          );

          return;

        }

        openProjectViewer(galleryName);

      });

    });


  /* =======================================================
     NEXT / PREVIOUS BUTTONS
  ======================================================== */

  if (viewerNext) {

    viewerNext.addEventListener("click", event => {

      event.preventDefault();
      event.stopPropagation();

      nextProjectImage();

    });

  }


  if (viewerPrev) {

    viewerPrev.addEventListener("click", event => {

      event.preventDefault();
      event.stopPropagation();

      previousProjectImage();

    });

  }


  /* =======================================================
     CLOSE BUTTON
  ======================================================== */

  if (viewerClose) {

    viewerClose.addEventListener("click", event => {

      event.preventDefault();
      event.stopPropagation();

      closeProjectViewer();

    });

  }


  /* =======================================================
     CLICK OUTSIDE WINDOW
  ======================================================== */

  projectViewer.addEventListener("click", event => {

    if (event.target === projectViewer) {
      closeProjectViewer();
    }

  });


  if (viewerWindow) {

    viewerWindow.addEventListener("click", event => {
      event.stopPropagation();
    });

  }


  /* =======================================================
     KEYBOARD CONTROLS
  ======================================================== */

  document.addEventListener("keydown", event => {

    if (!projectViewer.classList.contains("open")) {
      return;
    }


    if (event.key === "Escape") {

      event.preventDefault();

      closeProjectViewer();

      return;

    }


    if (event.key === "ArrowRight") {

      event.preventDefault();

      nextProjectImage();

      return;

    }


    if (event.key === "ArrowLeft") {

      event.preventDefault();

      previousProjectImage();

    }

  });


  /* =======================================================
     CLOSE ON TAB HIDDEN
  ======================================================== */

  document.addEventListener("visibilitychange", () => {

    if (
      document.hidden &&
      projectViewer.classList.contains("open")
    ) {
      closeProjectViewer();
    }

  });


  /* =======================================================
     CV CHOOSER
  ======================================================== */

  const cvChoiceButton =
    document.querySelector("#cv-choice-button");

  const cvChoice =
    document.querySelector("#cv-choice");

  const cvChoiceWindow =
    document.querySelector("#cv-choice-window");

  const cvChoiceClose =
    document.querySelector("#cv-choice-close");


  function openCVChoice() {

    if (!cvChoice) return;

    cvChoice.classList.add("open");

    cvChoice.setAttribute(
      "aria-hidden",
      "false"
    );

    if (cvChoiceButton) {

      cvChoiceButton.setAttribute(
        "aria-expanded",
        "true"
      );

    }

    document.body.classList.add(
      "cv-choice-open"
    );

  }


  function closeCVChoice() {

    if (!cvChoice) return;

    cvChoice.classList.remove("open");

    cvChoice.setAttribute(
      "aria-hidden",
      "true"
    );

    if (cvChoiceButton) {

      cvChoiceButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

    document.body.classList.remove(
      "cv-choice-open"
    );

  }


  if (cvChoiceButton) {

    cvChoiceButton.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openCVChoice();

      }
    );

  }


  if (cvChoiceClose) {

    cvChoiceClose.addEventListener(
      "click",
      event => {

        event.preventDefault();

        closeCVChoice();

      }
    );

  }


  if (cvChoice) {

    cvChoice.addEventListener(
      "click",
      event => {

        if (event.target === cvChoice) {
          closeCVChoice();
        }

      }
    );

  }


  if (cvChoiceWindow) {

    cvChoiceWindow.addEventListener(
      "click",
      event => {

        event.stopPropagation();

      }
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        cvChoice &&
        cvChoice.classList.contains("open")
      ) {

        closeCVChoice();

      }

    }
  );

});


/* Hero: rotate the "currently working on" word every few seconds. */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#rotate-word");
  if (!el) {
    return;
  }

  let index = 0;

  function words() {
    const table = window.siteTranslations || {};
    const lang = document.documentElement.lang === "fr" ? "fr" : "en";
    const list = table[lang] && table[lang]["hero.rotate"];
    return list ? list.split("|") : [el.textContent];
  }

  function show() {
    const list = words();
    el.classList.remove("in");
    setTimeout(() => {
      el.textContent = list[index % list.length];
      el.classList.add("in");
    }, 250);
  }

  show();

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => {
      index += 1;
      show();
    }, 2600);
  }

  document.addEventListener("site:language", show);
});


/* Mini pixel Aya: a scripted guide. Each part of the page has a planned
   reaction (a line, a small move, or nothing), shown once, in reading order.
   Clicking her repeats the line for what is on screen. */
document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector("#mascot");
  const body = document.querySelector("#mascot-body");
  const bubble = document.querySelector("#mascot-bubble");
  const closer = document.querySelector("#mascot-close");

  if (!box || !body || !bubble || !closer) {
    return;
  }

  try { localStorage.removeItem("mascot-hidden"); } catch (error) {}

  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const exp = document.querySelectorAll(".experience-card");
  const proj = document.querySelectorAll(".project-card");

  /* The plan: element, what she says (translation key), what she does,
     an optional click target for her bubble, and where she stands. */
  const plan = [
    { el: document.querySelector("#home"), line: "mascot.s.hello", move: "wave", side: "left" },
    { el: document.querySelector("#about"), line: "mascot.s.about", move: "hop" },
    { el: exp[0], line: "mascot.s.uel", move: "sparkle" },
    { el: exp[1], line: "mascot.s.amsys", move: "hop" },
    { el: exp[2], move: "hop" },
    { el: exp[3] },
    { el: proj[0], line: "mascot.s.scilit", move: "sparkle", side: "right" },
    { el: proj[1], line: "mascot.s.mimo", move: "dance", link: "assets/mimo-demo.mp4" },
    { el: proj[2], line: "mascot.s.querypilot", move: "hop" },
    { el: proj[3], line: "mascot.s.surgisight", move: "hop" },
    { el: proj[4], move: "hop" },
    { el: proj[5] },
    { el: document.querySelector("#skills"), line: "mascot.s.skills", move: "dance", side: "left" },
    { el: document.querySelector("#education"), line: "mascot.s.education", move: "hop" },
    { el: document.querySelector("#contact"), line: "mascot.s.contact", move: "sparkle", link: "cv" }
  ].filter((step) => step.el);

  let bubbleTimer = null;
  let bubbleLink = null;
  let lastTalk = 0;
  let current = plan[0];
  const queue = [];
  let running = false;

  function t(key) {
    const table = window.siteTranslations || {};
    const lang = document.documentElement.lang === "fr" ? "fr" : "en";
    return (table[lang] && table[lang][key]) || "";
  }

  function onScreen(el) {
    const r = el.getBoundingClientRect();
    return r.bottom > 80 && r.top < window.innerHeight - 80;
  }

  function say(text, link) {
    if (!text) return;
    bubble.textContent = text;
    bubbleLink = link || null;
    bubble.classList.toggle("is-link", Boolean(link));
    bubble.classList.add("show");
    lastTalk = Date.now();
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
      bubble.classList.remove("show");
      bubbleLink = null;
    }, link ? 5500 : 4000);
  }

  bubble.addEventListener("click", () => {
    if (bubbleLink === "cv") {
      const button = document.querySelector("#cv-choice-button");
      if (button) button.click();
    } else if (bubbleLink) {
      window.open(bubbleLink, "_blank", "noopener");
    }
  });

  function burst(symbol, count) {
    for (let i = 0; i < count; i += 1) {
      const bit = document.createElement("span");
      bit.className = "mascot-bit";
      bit.textContent = symbol;
      bit.style.left = `${30 + Math.random() * 40}%`;
      bit.style.animationDelay = `${i * 0.18}s`;
      box.appendChild(bit);
      setTimeout(() => bit.remove(), 2200 + i * 180);
    }
  }

  function play(move) {
    if (!move || calm) return;
    const map = { wave: ["wave", 1400], hop: ["hop", 700], dance: ["dance", 1800], sparkle: ["kiss", 1200] };
    const [cls, ms] = map[move];
    body.classList.add(cls);
    setTimeout(() => body.classList.remove(cls), ms);
    if (move === "dance") burst("♪", 4);
    if (move === "sparkle") burst("✦", 4);
  }

  function goTo(side) {
    if (!side || calm) return;
    const x = side === "right" ? Math.max(14, window.innerWidth - 190) : 14;
    const now = box.getBoundingClientRect().left;
    if (Math.abs(now - x) < 20) return;
    box.classList.toggle("facing-left", x < now);
    box.classList.add("walking");
    box.style.left = `${x}px`;
    setTimeout(() => {
      box.classList.remove("walking");
      box.classList.toggle("on-right", side === "right");
    }, 2300);
  }

  function perform(step) {
    current = step;
    goTo(step.side);
    play(step.move);
    if (step.line) say(t(step.line), step.link);
  }

  /* Play reactions one at a time, in page order, spaced out. */
  function next() {
    if (!queue.length) { running = false; return; }
    running = true;
    const step = queue.shift();
    if (!onScreen(step.el)) { next(); return; }
    const gap = step.line ? Math.max(0, 3200 - (Date.now() - lastTalk)) : 0;
    setTimeout(() => {
      if (onScreen(step.el)) perform(step);
      setTimeout(next, step.line ? 2600 : 900);
    }, gap);
  }

  const done = new Set();
  const watcher = new IntersectionObserver((entries) => {
    entries
      .filter((e) => e.isIntersecting)
      .map((e) => plan.find((s) => s.el === e.target))
      .filter((s) => s && !done.has(s))
      .sort((a, b) => plan.indexOf(a) - plan.indexOf(b))
      .forEach((s) => { done.add(s); queue.push(s); });
    if (!running) next();
  }, { threshold: 0.45 });

  plan.forEach((s) => watcher.observe(s.el));

  /* Clicking her: repeat what fits the part on screen, or a short pitch. */
  body.addEventListener("click", () => {
    const visible = plan.filter((s) => s.line && onScreen(s.el));
    const step = visible[0] || current;
    if (step && step.line) {
      play(step.move || "hop");
      say(t(step.line), step.link);
    } else {
      play("hop");
      say(t("mascot.s.pitch"), "cv");
    }
  });

  closer.addEventListener("click", () => box.remove());

  window.addEventListener("resize", () => {
    if (box.classList.contains("on-right")) {
      box.style.left = `${Math.max(14, window.innerWidth - 190)}px`;
    }
  });
});
