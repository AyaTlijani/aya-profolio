document.addEventListener("DOMContentLoaded", () => {

  const translations = {

    /* ========================================================= */
    /* ========================= ENGLISH ======================= */
    /* ========================================================= */

    en: {

      /* NAV */

      "nav.home": "home",
      "nav.about": "about",
      "nav.experience": "experience",
      "nav.projects": "projects",
      "nav.skills": "skills",
      "nav.education": "education",
      "nav.contact": "contact",
      "nav.openMenu": "Open menu",
      "nav.closeMenu": "Close menu",

      /* INTERFACE */

      "ui.backToTop": "Back to top",
      "ui.theme": "Switch light / dark mode",
      "ui.reopen": "reopen",
      "ui.minimize": "Minimize window",
      "ui.maximize": "Maximize window",
      "ui.closeWindow": "Close window",
      "terminal.hint": "type <b>help</b> + enter",
      "terminal.inputLabel": "Terminal command",
      "projects.openGallery": "Open screenshots",

      /* HERO */

      "hero.eyebrow": "DATA SCIENCE & AI ENGINEERING",

      "hero.description":
        "Computer Science engineering student specializing in Data Science and Artificial Intelligence, interested in machine learning, data, research and software engineering.",

      "hero.explore":
        "explore my work ↘",

      "hero.downloadCV":
        "download CV",

      "hero.scroll":
        "↓ scroll to enter",

      "hero.online":
        "online",

      /* TERMINAL */

      "terminal.welcome":
        "Welcome to Aya's little corner of the internet ♡",

      "terminal.system":
        "SYSTEM",

      "terminal.online":
        "ONLINE",

      "terminal.available":
        "AVAILABLE",

      "terminal.field":
        "field",

      "terminal.location":
        "location",

      /* SECTIONS */

      "sections.about":
        "ABOUT",

      "sections.experience":
        "EXPERIENCE",

      "sections.projects":
        "PROJECTS",

      "sections.skills":
        "SKILLS",

      "sections.education":
        "EDUCATION",

      "sections.contact":
        "CONTACT",

      /* ABOUT */

      "about.title":
        "A little bit about me.",

      "about.hello":
        "Hi! I'm Aya ✦",

      "about.paragraph1":
        "Aya is an engineering student in Computer Science, specializing in Data Science and Artificial Intelligence, with experience in data analysis, machine learning, research and software development.",

      "about.paragraph2":
        "Her work moves between research, applied AI and practical engineering — from graph-based optimization to educational data and deep learning projects.",

      "about.ds":
        "Data Science",

      "about.ai":
        "Artificial Intelligence",

      "about.ml":
        "Machine Learning",

      "about.dev":
        "Software Development",

      "about.location":
        "MONASTIR / TUNISIA",

      /* EXPERIENCE */

      "experience.title":
        "Where I've been building.",

      "experience.uel.lab":
        "/ Research Laboratory",

      "experience.uel.role":
        "Junior Research Assistant · Remote",

      "experience.uel.description":
        "Working on applying artificial intelligence to project management and resource-constrained scheduling optimization.",

      "experience.uel.bullet1":
        "Developing a solution for the Resource-Constrained Project Scheduling Problem (RCPSP).",

      "experience.uel.bullet2":
        "Implementing a Graph Isomorphism Network (GIN) with Proximal Policy Optimization (PPO) using PyTorch and PyTorch Geometric.",

      "experience.amsys.role":
        "Artificial Intelligence Intern",

      "experience.amsys.bullet1":
        "Contributed to the design and development of AI pipelines as part of a confidential project.",

      "experience.amsys.bullet2":
        "Designed and evaluated AI workflows for intelligent analysis solutions.",

      "experience.esprim.role":
        "Data Science Intern",

      "experience.esprim.description":
        "Contributed to the design of a five-competency framework and associated evaluation grids within the I5-Assist project.",

      "experience.esprim.bullet1":
        "Developed a pipeline for extraction and feature engineering, transforming learning data into measurable competency indicators.",

      "experience.esprim.bullet2":
        "Applied data analysis and NLP techniques to structured and unstructured educational data.",

      "experience.gct.role":
        "Introductory Internship",

      "experience.gct.description":
        "IT support, exploration of network infrastructure, and participation in the development of an e-commerce platform with PrestaShop.",

      /* PROJECTS */

      "projects.title":
        "Things I've made.",

      "projects.techStack":
        "TECH STACK",

      "projects.viewScreenshots":
        "VIEW SCREENSHOTS",

      "projects.viewScreenshot":
        "VIEW SCREENSHOT",

      "projects.query.type":
        "LLM AGENTS / TEXT-TO-SQL",

      "projects.query.sub":
        "Self-Correcting Text-to-SQL Agent.",

      "projects.query.description1":
        "Built a LangGraph-based LLM agent that generates SQL from natural-language questions, executes queries, and automatically diagnoses and repairs failures.",

      "projects.query.description2":
        "Evaluated on 200 BIRD Mini-Dev questions across 11 databases using Qwen2.5-Coder 7B and Gemini API; improved execution accuracy from 47% to 51% with Qwen and from 62.5% to 64% with Gemini.",

      "projects.query.description3":
        "Implemented a read-only SQL sandbox, tested against 16 write and injection attacks, and exposed database tools to other AI assistants through an MCP server.",

      "projects.smart.type":
        "FULL-STACK / ROUTE OPTIMIZATION",

      "projects.smart.sub":
        "Delivery Management &amp; Route Optimization.",

      "projects.smart.description1":
        "Developed a full-stack delivery dispatch platform featuring VRPTW route optimization, automated driver assignment, Excel data validation, real-time delivery tracking, and cash reconciliation.",

      "projects.smart.description2":
        "Built REST APIs, role-based authentication, interactive dashboards, and delivery analytics with automated end-to-end testing.",

      "projects.artisan.type":
        "FULL-STACK DEVELOPMENT / E-COMMERCE",

      "projects.artisan.sub":
        "E-commerce Platform for Artisans.",

      "projects.artisan.description":
        "Developed a desktop (JavaFX) and web (Symfony/PHP) e-commerce application integrating a product catalog, shopping cart, and user management.",

      "terminal.helloCommand":
        "hello",

      "terminal.city":
        "Monastir, Tunisia",

      "terminal.status":
        "STATUS",

      "education.arabic":
        "Arabic",

      "education.native":
        "Native",

      "education.english":
        "English",

      "education.french":
        "French",

      "education.spanish":
        "Spanish",

      "education.basic":
        "Basic",

      "date.ueljul":
        "JUL 2026 — SEP 2026",

      "date.amsys":
        "AUG 2026 — SEP 2026",

      "date.esprim":
        "JUL 2026 — AUG 2026",

      "date.gct":
        "JUL 2025 — AUG 2025",

      "viewer.preview":
        "PROJECT PREVIEW",

      "cv.window":
        "Choose a CV",

      /* VIEWER */

      "viewer.close":
        "Close",

      "viewer.previous":
        "Previous image",

      "viewer.next":
        "Next image",

      "viewer.instructions":
        "← → browse · ESC close",

      /* SKILLS */

      "skills.title":
        "My little toolbox.",

      "skills.programming":
        "Programming",

      "skills.dataAI":
        "Data & AI",

      "skills.web":
        "Web",

      "skills.frameworks":
        "Frameworks",

      "skills.tools":
        "Tools",

      /* EDUCATION */

      "education.title":
        "Learning log.",

      "education.esprim":
        "Engineering Degree in Computer Science — Data Science & Artificial Intelligence.",

      "education.ipeim":
        "Preparatory Institute for Engineering Studies of Monastir.",

      "education.certification":
        "CERTIFICATION",

      "education.deepLearning":
        "Deep Learning Fundamentals.",

      "education.languages":
        "LANGUAGES",

      "education.present":
        "PRESENT",

      /* CONTACT */

      "contact.title":
        "Let's talk.",

      "contact.description":
        "Open to conversations around data science, AI, software development and research opportunities.",

      "contact.email":
        "EMAIL",

      "contact.phone":
        "PHONE",

      "contact.linkedin":
        "LINKEDIN",

      "contact.github":
        "GITHUB",

      "contact.visit":
        "visit profile ↗",

      "contact.englishCV":
        "English CV ↓",

      "contact.frenchCV":
        "CV français ↓",

      /* GAME */

      "game.bonus":
        "BONUS AREA",

      "game.title":
        "You've reached<br>the end of the internet.",

      "game.description":
        "So... here's a tiny game instead.",

      "game.pixelBunny":
        "Pixel bunny mini game",

      "game.instructions":
        "Collect the stars.<br>Don't fall.",

      "game.start":
        "START GAME",

      "game.controls":
        "← → / A D to move · SPACE to jump",

      "game.pressSpace":
        "PRESS SPACE",

      /* CV */

      "cv.label":
        "CV / RESUME",

      "cv.title":
        "Which CV would you like?",

      "cv.description":
        "Choose the language you want to download.",

      "cv.close":
        "Close CV chooser",

      /* FOOTER */

      "footer.built":
        "BUILT WITH HTML / CSS / JS"

    },


    /* ========================================================= */
    /* ========================== FRENCH ======================= */
    /* ========================================================= */

    fr: {

      /* NAV */

      "nav.home":
        "accueil",

      "nav.about":
        "à propos",

      "nav.experience":
        "expérience",

      "nav.projects":
        "projets",

      "nav.skills":
        "compétences",

      "nav.education":
        "formation",

      "nav.contact":
        "contact",

      "nav.openMenu":
        "Ouvrir le menu",
      "nav.closeMenu": "Fermer le menu",

      /* INTERFACE */

      "ui.backToTop": "Retour en haut",
      "ui.theme": "Basculer mode clair / sombre",
      "ui.reopen": "rouvrir",
      "ui.minimize": "Réduire la fenêtre",
      "ui.maximize": "Agrandir la fenêtre",
      "ui.closeWindow": "Fermer la fenêtre",
      "terminal.hint": "tapez <b>help</b> + entrée",
      "terminal.inputLabel": "Commande du terminal",
      "projects.openGallery": "Voir les captures",

      /* HERO */

      "hero.eyebrow":
        "DATA SCIENCE & INTELLIGENCE ARTIFICIELLE",

      "hero.description":
        "Étudiante en cycle ingénieur en informatique, spécialisée en science des données et en intelligence artificielle, avec un intérêt pour l’apprentissage automatique, l’analyse de données, la recherche et le développement logiciel.",

      "hero.explore":
        "découvrir mes projets ↘",

      "hero.downloadCV":
        "télécharger mon CV",

      "hero.scroll":
        "↓ faites défiler pour découvrir",

      "hero.online":
        "en ligne",

      /* TERMINAL */

      "terminal.welcome":
        "Bienvenue dans le petit coin d’Aya sur Internet ♡",

      "terminal.system":
        "SYSTÈME",

      "terminal.online":
        "EN LIGNE",

      "terminal.available":
        "DISPONIBLE",

      "terminal.field":
        "domaine",

      "terminal.location":
        "localisation",

      /* SECTIONS */

      "sections.about":
        "À PROPOS",

      "sections.experience":
        "EXPÉRIENCE",

      "sections.projects":
        "PROJETS",

      "sections.skills":
        "COMPÉTENCES",

      "sections.education":
        "FORMATION",

      "sections.contact":
        "CONTACT",

      /* ABOUT */

      "about.title":
        "Quelques mots sur moi.",

      "about.hello":
        "Bonjour ! Je suis Aya ✦",

      "about.paragraph1":
        "Aya est étudiante en cycle ingénieur en informatique, spécialisée en science des données et en intelligence artificielle, avec une expérience en analyse de données, apprentissage automatique, recherche et développement logiciel.",

      "about.paragraph2":
        "Son travail se situe entre la recherche, l’IA appliquée et l’ingénierie logicielle, allant de l’optimisation basée sur les graphes aux données éducatives et aux projets de deep learning.",

      "about.ds":
        "Science des données",

      "about.ai":
        "Intelligence artificielle",

      "about.ml":
        "Apprentissage automatique",

      "about.dev":
        "Développement logiciel",

      "about.location":
        "MONASTIR / TUNISIE",

      /* EXPERIENCE */

      "experience.title":
        "Mon expérience professionnelle.",

      "experience.uel.lab":
        "/ Laboratoire de recherche",

      "experience.uel.role":
        "Assistante de recherche junior · Télétravail",

      "experience.uel.description":
        "Travail sur l’application de l’intelligence artificielle à la gestion de projet et à l’optimisation de la planification des ressources.",

      "experience.uel.bullet1":
        "Implémentation d’une solution pour le Resource-Constrained Project Scheduling Problem (RCPSP).",

      "experience.uel.bullet2":
        "Mise en œuvre d’un Graph Isomorphism Network (GIN) avec Proximal Policy Optimization (PPO) en utilisant PyTorch et PyTorch Geometric.",

      "experience.amsys.role":
        "Stagiaire en Intelligence Artificielle",

      "experience.amsys.bullet1":
        "Contribution à la conception et au développement de pipelines d’IA dans le cadre d’un projet confidentiel.",

      "experience.amsys.bullet2":
        "Conception et évaluation de workflows d’IA pour des solutions d’analyse intelligentes.",

      "experience.esprim.role":
        "Stagiaire en science des données",

      "experience.esprim.description":
        "Contribution à la conception d’un référentiel de cinq compétences et des grilles d’évaluation associées dans le cadre du projet industriel I5-Assist.",

      "experience.esprim.bullet1":
        "Développement d’un pipeline d’extraction et de feature engineering pour transformer des données d’apprentissage en indicateurs de compétences mesurables.",

      "experience.esprim.bullet2":
        "Application de techniques d’analyse de données et de NLP pour extraire des indicateurs de compétences à partir de données éducatives structurées et non structurées.",

      "experience.gct.role":
        "Stage d’initiation",

      "experience.gct.description":
        "Support informatique, découverte des infrastructures réseau de l’entreprise et participation au développement d’une plateforme e-commerce avec PrestaShop.",

      /* PROJECTS */

      "projects.title":
        "Mes projets.",

      "projects.techStack":
        "STACK TECHNIQUE",

      "projects.viewScreenshots":
        "VOIR LES CAPTURES",

      "projects.viewScreenshot":
        "VOIR LA CAPTURE",

      "projects.query.type":
        "AGENTS LLM / TEXT-TO-SQL",

      "projects.query.sub":
        "Agent Text-to-SQL auto-correctif.",

      "projects.query.description1":
        "Développement d’un agent LLM basé sur LangGraph qui génère du SQL à partir de questions en langage naturel, exécute les requêtes, puis diagnostique et corrige automatiquement les échecs.",

      "projects.query.description2":
        "Évaluation sur 200 questions de BIRD Mini-Dev couvrant 11 bases de données avec Qwen2.5-Coder 7B et l’API Gemini ; exactitude d’exécution améliorée de 47 % à 51 % avec Qwen et de 62,5 % à 64 % avec Gemini.",

      "projects.query.description3":
        "Mise en place d’un bac à sable SQL en lecture seule, testé contre 16 attaques d’écriture et d’injection, et exposition des outils de base de données à d’autres assistants IA via un serveur MCP.",

      "projects.smart.type":
        "FULL-STACK / OPTIMISATION DE TOURNÉES",

      "projects.smart.sub":
        "Gestion des livraisons et optimisation de tournées.",

      "projects.smart.description1":
        "Développement d’une plateforme full-stack de gestion des livraisons intégrant l’optimisation de tournées VRPTW, l’affectation automatique des livreurs, la validation des données Excel, le suivi des livraisons en temps réel et le rapprochement des encaissements.",

      "projects.smart.description2":
        "Conception d’API REST, d’une authentification par rôles, de tableaux de bord interactifs et d’analyses de livraison, avec des tests de bout en bout automatisés.",

      "projects.artisan.type":
        "DÉVELOPPEMENT FULL-STACK / E-COMMERCE",

      "projects.artisan.sub":
        "Plateforme e-commerce pour artisans.",

      "projects.artisan.description":
        "Développement d’une application e-commerce desktop (JavaFX) et web (Symfony/PHP), intégrant un catalogue de produits, un panier d’achat et la gestion des utilisateurs.",

      "terminal.helloCommand":
        "hello",

      "terminal.city":
        "Monastir, Tunisie",

      "terminal.status":
        "STATUT",

      "education.arabic":
        "Arabe",

      "education.native":
        "Langue maternelle",

      "education.english":
        "Anglais",

      "education.french":
        "Français",

      "education.spanish":
        "Espagnol",

      "education.basic":
        "Notions",

      "date.ueljul":
        "JUIL. 2026 — SEPT. 2026",

      "date.amsys":
        "AOÛT 2026 — SEPT. 2026",

      "date.esprim":
        "JUIL. 2026 — AOÛT 2026",

      "date.gct":
        "JUIL. 2025 — AOÛT 2025",

      "viewer.preview":
        "APERÇU DU PROJET",

      "cv.window":
        "Choisir un CV",

      /* VIEWER */

      "viewer.close":
        "Fermer",

      "viewer.previous":
        "Image précédente",

      "viewer.next":
        "Image suivante",

      "viewer.instructions":
        "← → parcourir · ÉCHAP fermer",

      /* SKILLS */

      "skills.title":
        "Ma boîte à outils.",

      "skills.programming":
        "Langages de programmation",

      "skills.dataAI":
        "Données & IA",

      "skills.web":
        "Développement web",

      "skills.frameworks":
        "Frameworks",

      "skills.tools":
        "Outils",

      /* EDUCATION */

      "education.title":
        "Formation.",

      "education.esprim":
        "Cycle ingénieur en informatique — Data Science & Intelligence Artificielle.",

      "education.ipeim":
        "Institut Préparatoire aux Études d’Ingénieurs de Monastir.",

      "education.certification":
        "CERTIFICATION",

      "education.deepLearning":
        "Fondamentaux de l’apprentissage profond.",

      "education.languages":
        "LANGUES",

      "education.present":
        "PRÉSENT",

      /* CONTACT */

      "contact.title":
        "Échangeons.",

      "contact.description":
        "Ouverte aux échanges autour de la science des données, de l’IA, du développement logiciel et des opportunités de recherche.",

      "contact.email":
        "EMAIL",

      "contact.phone":
        "TÉLÉPHONE",

      "contact.linkedin":
        "LINKEDIN",

      "contact.github":
        "GITHUB",

      "contact.visit":
        "voir le profil ↗",

      "contact.englishCV":
        "CV anglais ↓",

      "contact.frenchCV":
        "CV français ↓",

      /* GAME */

      "game.bonus":
        "ZONE BONUS",

      "game.title":
        "Vous avez atteint<br>le bout d’Internet.",

      "game.description":
        "Alors... voici plutôt un petit jeu.",

      "game.pixelBunny":
        "Mini-jeu Pixel Bunny",

      "game.instructions":
        "Récupérez les étoiles.<br>Ne tombez pas.",

      "game.start":
        "DÉMARRER",

      "game.controls":
        "← → / A D pour se déplacer · ESPACE pour sauter",

      "game.pressSpace":
        "APPUYEZ SUR ESPACE",

      /* CV */

      "cv.label":
        "CV / CURRICULUM",

      "cv.title":
        "Quel CV souhaitez-vous télécharger ?",

      "cv.description":
        "Choisissez la langue du CV à télécharger.",

      "cv.close":
        "Fermer le choix du CV",

      /* FOOTER */

      "footer.built":
        "CONÇU AVEC HTML / CSS / JS"

    }

  };


  /* ========================================================= */
  /* ======================= PAGE META ======================= */
  /* ========================================================= */

  window.siteTranslations = translations;


  const pageMeta = {

    en: {
      title: "Aya Tlijani — Data Science & AI",

      description:
        "Portfolio of Aya Tlijani, Computer Science engineering student specializing in Data Science and Artificial Intelligence."
    },

    fr: {
      title:
        "Aya Tlijani — Data Science & Intelligence Artificielle",

      description:
        "Portfolio d’Aya Tlijani, étudiante en cycle ingénieur en informatique spécialisée en science des données et en intelligence artificielle."
    }

  };


  /* ========================================================= */
  /* ===================== LANGUAGE SWITCH =================== */
  /* ========================================================= */

  const languageButtons =
    document.querySelectorAll("[data-language]");


  function applyLanguage(language) {

    if (!translations[language]) {
      language = "en";
    }


    /* Normal text */

    document
      .querySelectorAll("[data-i18n]")
      .forEach(element => {

        const key =
          element.dataset.i18n;

        const translation =
          translations[language][key];

        if (translation !== undefined) {

          element.innerHTML =
            translation;

        }

      });


    /* ARIA labels */

    document
      .querySelectorAll("[data-i18n-aria]")
      .forEach(element => {

        const key =
          element.dataset.i18nAria;

        const translation =
          translations[language][key];

        if (translation !== undefined) {

          element.setAttribute(
            "aria-label",
            translation
          );

        }

      });


    /* Online badge */

    const onlineBadge =
      document.querySelector(".online-badge");

    if (onlineBadge) {

      const textNode =
        Array.from(onlineBadge.childNodes)
          .find(
            node =>
              node.nodeType === Node.TEXT_NODE &&
              node.textContent.trim()
          );

      if (textNode) {

        textNode.textContent =
          translations[language]["hero.online"];

      }

    }


    /* HTML language */

    document.documentElement.lang =
      language;


    /* Page title */

    document.title =
      pageMeta[language].title;


    /* Meta description */

    const description =
      document.querySelector(
        'meta[name="description"]'
      );

    if (description) {

      description.setAttribute(
        "content",
        pageMeta[language].description
      );

    }


    /* Active language */

    languageButtons.forEach(button => {

      const isActive =
        button.dataset.language === language;

      button.classList.toggle(
        "active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        isActive
          ? "true"
          : "false"
      );

    });


    /* Save preference */

    try {
      localStorage.setItem(
        "site-language",
        language
      );
    } catch (error) {
      /* Storage can be blocked; the switch still works. */
    }


    /* Let other scripts react (terminal, window labels…) */

    document.dispatchEvent(
      new CustomEvent("site:language", {
        detail: { language }
      })
    );

  }


  /* ========================================================= */
  /* ===================== BUTTON EVENTS ==================== */
  /* ========================================================= */

  languageButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        applyLanguage(
          button.dataset.language
        );

      }
    );

  });


  /* ========================================================= */
  /* ================= INITIAL LANGUAGE ===================== */
  /* ========================================================= */

  let savedLanguage = null;

  try {
    savedLanguage =
      localStorage.getItem("site-language");
  } catch (error) {
    savedLanguage = null;
  }

  const browserLanguage =
    navigator.language
      ? navigator.language.toLowerCase()
      : "en";

  let initialLanguage =
    "en";


  if (
    savedLanguage === "fr" ||
    savedLanguage === "en"
  ) {

    initialLanguage =
      savedLanguage;

  } else if (
    browserLanguage.startsWith("fr")
  ) {

    initialLanguage =
      "fr";

  }


  applyLanguage(initialLanguage);

});