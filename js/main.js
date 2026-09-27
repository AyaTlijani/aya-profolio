/* =========================================================
   MAIN INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     PLACEHOLDER LINKS
  ======================================================= */

  const toast =
    document.querySelector("#toast");


  function showToast(message) {

    if (!toast) {
      return;
    }


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(
      window.toastTimeout
    );


    window.toastTimeout =
      window.setTimeout(() => {

        toast.classList.remove("show");

      }, 2200);

  }


  document
    .querySelectorAll("[data-placeholder]")
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          event.preventDefault();


          const placeholder =
            link.dataset.placeholder ||
            "This";


          showToast(
            `${placeholder} link isn't configured yet.`
          );

        }
      );

    });


  /* =======================================================
     IMAGE FALLBACK
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(img => {


      /*
        If an image has already failed before this
        listener was attached, handle it immediately.
      */

      if (
        img.complete &&
        img.naturalWidth === 0 &&
        img.src
      ) {

        handleImageError(img);

      }


      img.addEventListener(
        "error",
        () => {

          handleImageError(img);

        }
      );

    });


  function handleImageError(img) {

    /*
      Prevent the fallback from being created more
      than once for the same image.
    */

    if (
      img.dataset.fallbackShown === "true"
    ) {

      return;

    }


    img.dataset.fallbackShown = "true";


    /*
      Hide the broken image.
    */

    img.style.display = "none";


    /*
      Do not create another fallback if one already
      exists next to the image.
    */

    if (
      img.parentElement &&
      img.parentElement.querySelector(
        ".image-fallback"
      )
    ) {

      return;

    }


    const fallback =
      document.createElement("div");


    fallback.className =
      "image-fallback";


    fallback.textContent =
      "image unavailable";


    fallback.style.cssText = `
      min-height: 220px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background: #e5e2f5;
      border: 2px solid var(--ink);
      color: #69677c;
      font: 10px var(--mono);
      text-align: center;
    `;


    if (img.parentElement) {

      img.parentElement.appendChild(
        fallback
      );

    }

  }

});