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
