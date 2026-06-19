/* ── Données de recherche ── */
const SEARCH_DATA = [
  /* ── Section-tags (petits titres en couleur) ── */
  { label: "Perspectives & Engagement", section: "home", tag: "Accueil" },
  { label: "Contexte & Constats", section: "impact", tag: "Contexte" },
  { label: "Nos Axes d'Intervention", section: "axes", tag: "Actions" },
  { label: "Notre histoire", section: "histoire", tag: "Origines" },
  { label: "L'Équipe", section: "membres", tag: "Équipe" },
  { label: "Nous Soutenir", section: "dons", tag: "Don" },
  { label: "L'Impact de votre soutien", section: "dons", tag: "Don" },
  { label: "Services de Proximité", section: "services", tag: "Services" },
  { label: "Entrer en contact", section: "contact", tag: "Contact" },

  /* ── Actions ── */
  {
    label: "Hébergement & Protection immédiate",
    section: "axes",
    tag: "Action",
  },
  { label: "Accompagnement juridique", section: "axes", tag: "Action" },
  { label: "Alphabétisation", section: "axes", tag: "Action" },
  { label: "Accompagnement des enfants", section: "axes", tag: "Action" },
  { label: "Prévention & sensibilisation", section: "axes", tag: "Action" },

  /* ── Impact & contexte ── */
  { label: "Contexte territoire Roubaix", section: "impact", tag: "Contexte" },
  /* ── HIstoire ── */
  { label: "Nos valeurs", section: "histoire", tag: "Origines" },
  { label: "Notre Futur", section: "histoire", tag: "Origines" },
  { label: "Origines", section: "histoire", tag: "Origines" },
  { label: "Notre passé", section: "histoire", tag: "Origines" },

  /* ── Dons ── */
  {
    label: "Soutenir Renaissance · Venir aux locaux",
    section: "dons",
    tag: "Don",
  },
  { label: "Faire un don", section: "dons", tag: "Don" },

  /* ── Équipe ── */
  { label: "Membres de l'équipe", section: "membres", tag: "Équipe" },
  { label: "Devenir bénévole", section: "membres", tag: "Bénévolat" },
  { label: "Rejoindre Renaissance", section: "membres", tag: "Bénévolat" },
  { label: "Bénévolat", section: "membres", tag: "Bénévolat" },
  {
    label: "S'engager dans l'association",
    section: "membres",
    tag: "Bénévolat",
  },
  { label: "Participer à l'association", section: "membres", tag: "Bénévolat" },

  /* ── Contact ── */
  { label: "Nous contacter", section: "contact", tag: "Contact" },
  { label: "Adresse Roubaix", section: "contact", tag: "Contact" },
  { label: "Email contact", section: "contact", tag: "Contact" },
  { label: "Réseaux sociaux", section: "contact", tag: "Contact" },

  /* ── Services ── */
  { label: "Services proches", section: "services", tag: "Services" },
];

/* ── Menu hamburger mobile ── */
function toggleMobileMenu() {
  const btn = document.getElementById("hamburger-btn");
  const menu = document.getElementById("mobile-menu");
  const isOpen = menu.classList.contains("open");
  if (isOpen) {
    closeMobileMenu();
  } else {
    btn.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    menu.classList.add("open");
  }
}
function closeMobileMenu() {
  const btn = document.getElementById("hamburger-btn");
  const menu = document.getElementById("mobile-menu");
  btn.classList.remove("open");
  btn.setAttribute("aria-expanded", "false");
  menu.classList.remove("open");
  closeSearch("mobile");
}

/* ── Activation du site (clic papillon) ── */
function activateSite() {
  const btn = document.getElementById("butterfly-btn");
  const overlay = document.getElementById("intro-overlay");
  const navbar = document.getElementById("navbar");
  const content = document.getElementById("main-content");

  btn.classList.remove("center");
  btn.classList.add("corner");
  overlay.classList.add("hidden");
  setTimeout(() => {
    navbar.classList.add("visible");
  }, 300);
  setTimeout(() => {
    content.classList.add("visible");
  }, 500);
  observeReveal();
}

/* ── Bouton papillon (coin) devient l'onglet actif ── */
document.getElementById("butterfly-btn").addEventListener("click", function () {
  if (this.classList.contains("corner")) showSection("home");
});

/* ── Navigation sections ── */
function showSection(name) {
  document
    .querySelectorAll(".page-section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".nav-link, .mobile-nav-link")
    .forEach((b) => b.classList.remove("active"));

  const sec = document.getElementById("section-" + name);
  if (sec) {
    sec.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const map = {
    home: "Accueil",
    impact: "Notre Impact",
    axes: "Nos Actions",
    histoire: "Notre Histoire",
    membres: "L'Équipe",
    services: "Services Proches",
    dons: "Faire un Don",
    contact: "Nous Contacter",
  };
  document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((b) => {
    if (b.textContent.trim() === map[name]) b.classList.add("active");
  });

  setTimeout(observeReveal, 100);
}

/* ── Dark mode ── */
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  // Desktop icons
  document.getElementById("icon-moon").style.display = isDark
    ? "block"
    : "none";
  document.getElementById("icon-sun").style.display = isDark ? "none" : "block";
  // Mobile icons
  document.getElementById("mobile-icon-moon").style.display = isDark
    ? "block"
    : "none";
  document.getElementById("mobile-icon-sun").style.display = isDark
    ? "none"
    : "block";
}

/* ── Recherche avec auto-complétion ── */
let searchTimeout;
function handleSearch(val, context) {
  clearTimeout(searchTimeout);
  const dropId =
    context === "mobile" ? "mobile-search-dropdown" : "search-dropdown";
  const drop = document.getElementById(dropId);
  if (!val.trim()) {
    drop.innerHTML = "";
    drop.classList.remove("open");
    return;
  }

  searchTimeout = setTimeout(() => {
    const q = val.toLowerCase();

    const staticResults = SEARCH_DATA.filter((d) =>
      d.label.toLowerCase().includes(q),
    );

    const domResults = [];
    document.querySelectorAll(".section-tag").forEach((el) => {
      const text = el.textContent.trim();
      if (text.toLowerCase().includes(q)) {
        const section = el.closest(".page-section");
        if (section) {
          const sectionId = section.id.replace("section-", "");
          const alreadyIn = staticResults.some(
            (r) => r.label === text && r.section === sectionId,
          );
          if (!alreadyIn) {
            domResults.push({
              label: text,
              section: sectionId,
              tag: "Section",
              fromDom: true,
            });
          }
        }
      }
    });

    const results = [...staticResults, ...domResults];
    const closeCall =
      context === "mobile" ? "closeMobileMenu()" : "closeSearch()";

    if (results.length === 0) {
      drop.innerHTML =
        '<div class="search-empty">Aucun résultat pour ' + val + "</div>";
    } else {
      drop.innerHTML = results
        .slice(0, 8)
        .map((r) => {
          const domBadge = r.fromDom ? " dom-tag" : "";
          return `<div class="search-item" onclick="showSection('${r.section}');${closeCall}">
          ${r.label}<span class="tag${domBadge}">${r.tag}</span>
        </div>`;
        })
        .join("");
    }
    drop.classList.add("open");
  }, 150);
}
function openSearch(context) {
  const inputId = context === "mobile" ? "mobile-search-input" : "search-input";
  const dropId =
    context === "mobile" ? "mobile-search-dropdown" : "search-dropdown";
  if (document.getElementById(inputId).value)
    document.getElementById(dropId).classList.add("open");
}
function closeSearchDelayed(context) {
  setTimeout(() => closeSearch(context), 200);
}
function closeSearch(context) {
  const dropId =
    context === "mobile" ? "mobile-search-dropdown" : "search-dropdown";
  const el = document.getElementById(dropId);
  if (el) el.classList.remove("open");
}

/* ── Scroll reveal ── */
function observeReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal:not(.visible)")
    .forEach((el) => obs.observe(el));
}

/* ── Init keyboard search shortcut ── */
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    document.getElementById("search-input").focus();
  }
});
