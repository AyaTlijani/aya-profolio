/* =========================================================
   ENHANCEMENTS
   Mobile menu · active nav · scroll reveals · back to top ·
   dark mode · working window buttons · live terminal ·
   project thumbnails
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const root = document.documentElement;

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =======================================================
     TRANSLATION HELPERS
  ======================================================= */

  const fallbackText = {
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "ui.reopen": "reopen",
    "ui.minimize": "Minimize window",
    "ui.maximize": "Maximize window",
    "ui.closeWindow": "Close window"
  };

  function currentLanguage() {
    return root.lang === "fr" ? "fr" : "en";
  }

  function t(key) {
    const table = window.siteTranslations;
    const lang = currentLanguage();

    if (table && table[lang] && table[lang][key] !== undefined) {
      return table[lang][key];
    }

    return fallbackText[key] || key;
  }

  function safeStore(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      /* Storage blocked — feature still works for this visit. */
    }
  }

  function toast(message) {
    if (typeof window.showToast === "function") {
      window.showToast(message);
    }
  }


  /* =======================================================
     1. MOBILE MENU
  ======================================================= */

  const nav = document.querySelector("#main-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const taskbar = document.querySelector(".taskbar");

  function setMenu(open) {
    if (!nav || !navToggle) return;

    nav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.textContent = open ? "✕" : "☰";
    navToggle.setAttribute(
      "aria-label",
      t(open ? "nav.closeMenu" : "nav.openMenu")
    );
    document.body.classList.toggle("menu-open", open);
  }

  if (nav && navToggle) {

    navToggle.addEventListener("click", event => {
      event.stopPropagation();
      setMenu(!nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("click", event => {
      if (
        nav.classList.contains("open") &&
        taskbar &&
        !taskbar.contains(event.target)
      ) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        navToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 850 && nav.classList.contains("open")) {
        setMenu(false);
      }
    });
  }


  /* =======================================================
     2. ACTIVE NAV LINK (scroll spy)
  ======================================================= */

  const navLinks = nav
    ? Array.from(nav.querySelectorAll('a[href^="#"]'))
    : [];

  const spySections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach(link => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveLink() {
    /* The section crossing a line 35% down the screen wins. */
    const line = window.innerHeight * 0.35;
    let current = spySections[0];

    spySections.forEach(section => {
      if (section.getBoundingClientRect().top <= line) {
        current = section;
      }
    });

    /* At the very bottom, the last section is the active one. */
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4
    ) {
      current = spySections[spySections.length - 1];
    }

    if (current) setActiveLink(current.id);
  }


  /* =======================================================
     3. BACK TO TOP
  ======================================================= */

  const backToTop = document.querySelector("#back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }

  let scrollTicking = false;

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;

    requestAnimationFrame(() => {
      updateActiveLink();

      if (backToTop) {
        backToTop.classList.toggle("show", window.scrollY > 700);
      }

      scrollTicking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();


  /* =======================================================
     4. SCROLL REVEALS
  ======================================================= */

  const revealGroups = [
    ".section-heading",
    ".about-grid > *",
    ".experience-card",
    ".project-card",
    ".skill-box",
    ".education-card",
    ".contact-window",
    ".arcade-window"
  ];

  const revealItems = document.querySelectorAll(revealGroups.join(","));

  if (!reduceMotion && "IntersectionObserver" in window) {

    root.classList.add("js-reveal");

    revealItems.forEach(item => {
      item.classList.add("reveal");

      /* Small stagger between siblings in the same grid. */
      const siblings = Array.from(item.parentElement.children)
        .filter(child => child.matches(revealGroups.join(",")));
      const index = Math.max(0, siblings.indexOf(item));

      item.style.setProperty(
        "--reveal-delay",
        `${Math.min(index, 4) * 70}ms`
      );
    });

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(item => revealObserver.observe(item));

    /*
      Anything jumped to via a link, or already on screen,
      should never stay hidden.
    */
    window.setTimeout(() => {
      revealItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          item.classList.add("in-view");
        }
      });
    }, 60);
  }


  /* =======================================================
     5. DARK MODE
  ======================================================= */

  const themeToggle = document.querySelector("#theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-pressed",
        String(theme === "dark")
      );
    }
  }

  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";

      applyTheme(next);
      safeStore("site-theme", next);
    });
  }


  /* =======================================================
     6. WORKING WINDOW BUTTONS  ( _  □  × )
  ======================================================= */

  let maximizedWindow = null;

  function windowTitle(win) {
    const header = win.querySelector(
      ".window-header, .arcade-header"
    );
    const label = header
      ? Array.from(header.children).filter(el => el.tagName === "SPAN").pop()
      : null;

    return label ? label.textContent.trim() : "window";
  }

  function labelControls() {
    document.querySelectorAll(".window-controls").forEach(group => {
      const [min, max, close] = group.querySelectorAll("button");
      if (min) min.setAttribute("aria-label", t("ui.minimize"));
      if (max) max.setAttribute("aria-label", t("ui.maximize"));
      if (close) close.setAttribute("aria-label", t("ui.closeWindow"));
    });

    document.querySelectorAll(".window-chip").forEach(chip => {
      const verb = chip.querySelector(".window-chip-verb");
      if (verb) verb.textContent = t("ui.reopen");
    });
  }

  function setMaximized(win, on) {
    if (on && maximizedWindow && maximizedWindow !== win) {
      setMaximized(maximizedWindow, false);
    }

    win.classList.toggle("is-maximized", on);
    document.body.classList.toggle("window-maximized", on);
    maximizedWindow = on ? win : null;

    const max = win.querySelector(".window-controls button:nth-child(2)");
    if (max) max.setAttribute("aria-pressed", String(on));

    if (on) {
      win.classList.remove("is-minimized");
      win.scrollTop = 0;
    }
  }

  function closeWindow(win) {
    if (win === maximizedWindow) setMaximized(win, false);

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "window-chip";
    chip.innerHTML =
      `<span aria-hidden="true">▢</span> ` +
      `<span class="window-chip-name"></span> · ` +
      `<span class="window-chip-verb"></span>`;
    chip.querySelector(".window-chip-name").textContent = windowTitle(win);
    chip.querySelector(".window-chip-verb").textContent = t("ui.reopen");

    const finish = () => {
      win.classList.add("is-closed");
      win.classList.remove("is-closing");
      win.parentNode.insertBefore(chip, win);
      chip.focus({ preventScroll: true });
    };

    if (reduceMotion) {
      finish();
    } else {
      win.classList.add("is-closing");
      window.setTimeout(finish, 220);
    }

    chip.addEventListener("click", () => {
      chip.remove();
      win.classList.remove("is-closed", "is-minimized");
      win.classList.add("is-reopening");
      window.setTimeout(() => win.classList.remove("is-reopening"), 320);
      const first = win.querySelector(".window-controls button");
      if (first) first.focus({ preventScroll: true });
    });
  }

  document.querySelectorAll(".window-controls").forEach(group => {
    const win = group.closest(".retro-window, .arcade-window");
    if (!win) return;

    const [min, max, close] = group.querySelectorAll("button");

    [min, max, close].forEach(button => {
      if (button) button.type = "button";
    });

    if (min) {
      min.setAttribute("aria-pressed", "false");
      min.addEventListener("click", () => {
        if (win === maximizedWindow) setMaximized(win, false);
        const on = !win.classList.contains("is-minimized");
        win.classList.toggle("is-minimized", on);
        min.setAttribute("aria-pressed", String(on));
      });
    }

    if (max) {
      max.setAttribute("aria-pressed", "false");
      max.addEventListener("click", () => {
        setMaximized(win, !win.classList.contains("is-maximized"));
      });
    }

    if (close) {
      close.addEventListener("click", () => closeWindow(win));
    }

    /* Double-clicking a title bar maximizes, like a real desktop. */
    const header = group.parentElement;
    if (header) {
      header.addEventListener("dblclick", event => {
        if (event.target.closest("button")) return;
        setMaximized(win, !win.classList.contains("is-maximized"));
      });
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && maximizedWindow) {
      setMaximized(maximizedWindow, false);
    }
  });

  labelControls();


  /* =======================================================
     7. PROJECT THUMBNAILS → open the existing viewer
  ======================================================= */

  document.querySelectorAll(".project-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const card = thumb.closest(".project-card");
      const viewButton = card && card.querySelector(".view-photos-button");
      if (viewButton) viewButton.click();
    });
  });


  /* =======================================================
     8. LIVE TERMINAL
  ======================================================= */

  const terminal = document.querySelector(".hero-window .terminal");
  const form = document.querySelector("#terminal-form");
  const input = document.querySelector("#terminal-command");
  const output = document.querySelector("#terminal-output");

  const terminalText = {
    en: {
      help:
        "commands: <b>about</b> · <b>experience</b> · <b>projects</b> · " +
        "<b>skills</b> · <b>education</b> · <b>contact</b> · <b>cv</b> · " +
        "<b>github</b> · <b>linkedin</b> · <b>play</b> · <b>theme</b> · " +
        "<b>lang en|fr</b> · <b>clear</b>",
      goto: name => `opening ${name}…`,
      whoami: "guest — welcome! ♡",
      cv: "choose a language for the CV ↓",
      theme: mode => `switched to ${mode} mode`,
      lang: "language switched",
      langUsage: "usage: lang en | lang fr",
      opening: name => `opening ${name} in a new tab ↗`,
      unknown: cmd =>
        `command not found: ${cmd} — try <b>help</b>`,
      sudo: "nice try ✦ permission denied"
    },
    fr: {
      help:
        "commandes : <b>about</b> · <b>experience</b> · <b>projects</b> · " +
        "<b>skills</b> · <b>education</b> · <b>contact</b> · <b>cv</b> · " +
        "<b>github</b> · <b>linkedin</b> · <b>play</b> · <b>theme</b> · " +
        "<b>lang en|fr</b> · <b>clear</b>",
      goto: name => `ouverture de ${name}…`,
      whoami: "invité — bienvenue ! ♡",
      cv: "choisissez la langue du CV ↓",
      theme: mode => `mode ${mode === "dark" ? "sombre" : "clair"} activé`,
      lang: "langue changée",
      langUsage: "usage : lang en | lang fr",
      opening: name => `ouverture de ${name} dans un nouvel onglet ↗`,
      unknown: cmd =>
        `commande introuvable : ${cmd} — essayez <b>help</b>`,
      sudo: "bien essayé ✦ permission refusée"
    }
  };

  function escapeHTML(text) {
    return text.replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[ch]);
  }

  function printLine(command, responseHTML) {
    if (!output) return;

    const line = document.createElement("div");
    line.className = "terminal-line";
    line.innerHTML =
      `<p><b>guest@aya</b>:~$ ${escapeHTML(command)}</p>` +
      (responseHTML ? `<div class="terminal-value">${responseHTML}</div>` : "");

    output.appendChild(line);

    /* Keep only the last few exchanges so the window stays tidy. */
    while (output.children.length > 3) {
      output.firstElementChild.remove();
    }

    output.scrollTop = output.scrollHeight;
  }

  function jumpTo(id) {
    const target = document.querySelector(`#${id}`);
    if (!target) return;

    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth"
      });
    }, 350);
  }

  const sectionCommands = {
    about: "about",
    experience: "experience",
    exp: "experience",
    projects: "projects",
    work: "projects",
    skills: "skills",
    education: "education",
    contact: "contact"
  };

  function runCommand(raw) {
    const command = raw.trim();
    const lower = command.toLowerCase();
    const [name, arg] = lower.split(/\s+/);
    const text = terminalText[currentLanguage()];

    if (!command) return;

    if (name === "clear" || name === "cls") {
      if (output) output.innerHTML = "";
      return;
    }

    if (name === "help" || name === "ls" || name === "?") {
      printLine(command, text.help);
      return;
    }

    if (sectionCommands[name]) {
      printLine(command, text.goto(sectionCommands[name]));
      jumpTo(sectionCommands[name]);
      return;
    }

    if (name === "whoami") {
      printLine(command, text.whoami);
      return;
    }

    if (name === "cv" || name === "resume") {
      printLine(command, text.cv);
      const cvButton = document.querySelector("#cv-choice-button");
      if (cvButton) window.setTimeout(() => cvButton.click(), 300);
      return;
    }

    if (name === "github" || name === "linkedin") {
      const links = {
        github: "https://github.com/AyaTlijani",
        linkedin: "https://www.linkedin.com/in/aya-tlijani-19489a317/"
      };
      printLine(command, text.opening(name));
      window.open(links[name], "_blank", "noopener");
      return;
    }

    if (name === "play" || name === "game") {
      printLine(command, text.goto("arcade"));
      const arcade = document.querySelector(".arcade");
      if (arcade) {
        window.setTimeout(() => {
          arcade.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth"
          });
        }, 350);
      }
      return;
    }

    if (name === "theme" || name === "dark" || name === "light") {
      let next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (name === "dark" || arg === "dark") next = "dark";
      if (name === "light" || arg === "light") next = "light";
      applyTheme(next);
      safeStore("site-theme", next);
      printLine(command, text.theme(next));
      return;
    }

    if (name === "lang" || name === "language") {
      const button = document.querySelector(
        `.language-button[data-language="${arg}"]`
      );
      if (button) {
        button.click();
        printLine(command, terminalText[arg].lang);
      } else {
        printLine(command, text.langUsage);
      }
      return;
    }

    if (name === "sudo") {
      printLine(command, text.sudo);
      return;
    }

    printLine(command, text.unknown(escapeHTML(name)));
  }

  const history = [];
  let historyIndex = 0;

  if (form && input) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const value = input.value;
      if (value.trim()) {
        history.push(value);
        historyIndex = history.length;
      }
      runCommand(value);
      input.value = "";
      form.classList.add("used");
    });

    input.addEventListener("keydown", event => {
      if (event.key === "ArrowUp" && history.length) {
        event.preventDefault();
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex];
      }
      if (event.key === "ArrowDown" && history.length) {
        event.preventDefault();
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = history[historyIndex] || "";
      }
    });

    /* Clicking anywhere in the terminal focuses the prompt. */
    if (terminal) {
      terminal.addEventListener("click", event => {
        if (event.target.closest("a, button, input")) return;
        if (window.getSelection && String(window.getSelection())) return;
        input.focus({ preventScroll: true });
      });
    }
  }


  /* ---------- Boot-up typing animation ---------- */

  let typingStarted = false;
  let typingDone = false;
  const typingTimers = [];

  function finishTyping() {
    typingDone = true;
    typingTimers.forEach(id => window.clearTimeout(id));
    if (terminal) {
      terminal.classList.remove("is-booting");
      terminal
        .querySelectorAll(".boot-hidden")
        .forEach(el => el.classList.remove("boot-hidden"));
      terminal
        .querySelectorAll("[data-full-text]")
        .forEach(el => {
          el.textContent = el.dataset.fullText;
          el.removeAttribute("data-full-text");
          el.classList.remove("typing-caret");
        });
    }
  }

  function bootTerminal() {
    if (!terminal || reduceMotion) return;

    const steps = Array.from(terminal.children).filter(
      el => !el.matches(".terminal-top")
    );

    terminal.classList.add("is-booting");
    steps.forEach(el => el.classList.add("boot-hidden"));

    let delay = 350;

    steps.forEach(el => {
      const command = el.matches("p")
        ? el.querySelector("span[data-i18n]")
        : null;

      typingTimers.push(window.setTimeout(() => {
        if (typingDone) return;
        typingStarted = true;

        if (!command) {
          el.classList.remove("boot-hidden");
          return;
        }

        const full = command.textContent.trim();
        command.dataset.fullText = full;
        command.textContent = "";
        command.classList.add("typing-caret");
        el.classList.remove("boot-hidden");

        full.split("").forEach((ch, i) => {
          typingTimers.push(window.setTimeout(() => {
            if (typingDone) return;
            command.textContent = full.slice(0, i + 1);
            if (i === full.length - 1) {
              command.classList.remove("typing-caret");
              command.removeAttribute("data-full-text");
            }
          }, i * 55));
        });
      }, delay));

      delay += command
        ? command.textContent.trim().length * 55 + 260
        : 170;
    });

    typingTimers.push(window.setTimeout(finishTyping, delay + 100));
  }

  /* Start once the translated text is in place. */
  window.setTimeout(bootTerminal, 0);


  /* =======================================================
     LANGUAGE CHANGES
  ======================================================= */

  document.addEventListener("site:language", () => {
    /*
      If the visitor switches language mid-animation, show the
      finished terminal right away so nothing gets overwritten.
    */
    if (typingStarted && !typingDone) {
      typingTimers.forEach(id => window.clearTimeout(id));
      typingDone = true;
      if (terminal) {
        terminal.classList.remove("is-booting");
        terminal
          .querySelectorAll(".boot-hidden")
          .forEach(el => el.classList.remove("boot-hidden"));
        terminal
          .querySelectorAll(".typing-caret")
          .forEach(el => el.classList.remove("typing-caret"));
      }
    }

    labelControls();

    if (nav && navToggle) {
      navToggle.setAttribute(
        "aria-label",
        t(nav.classList.contains("open") ? "nav.closeMenu" : "nav.openMenu")
      );
    }
  });

});
