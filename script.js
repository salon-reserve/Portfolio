/* =========================================================
   01. MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    menuButton.classList.toggle("is-open", isOpen);

    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}


/* =========================================================
   02. CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!nav || !menuButton) return;

    nav.classList.remove("is-open");
    menuButton.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");
  });
});


/* =========================================================
   03. WORKS FILTER
========================================================= */

const filterButtons = document.querySelectorAll(".filter-button");
const workCards = document.querySelectorAll(".work-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    /* active切り替え */
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");


    /* 作品表示切り替え */
    workCards.forEach((card) => {
      const category = card.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
  });
});


/* =========================================================
   04. FADE-UP TARGETS
========================================================= */

const fadeTargets = document.querySelectorAll(
  `
  .section-heading,
  .about-title,
  .about-text,
  .work-card,
  .skill-item,
  .experience-box,
  .contact-content
  `
);


/* fade-upクラス付与 */
fadeTargets.forEach((target) => {
  target.classList.add("fade-up");
});


/* =========================================================
   05. INTERSECTION OBSERVER
========================================================= */

const observerOptions = {
  root: null,
  rootMargin: "0px 0px -80px 0px",
  threshold: 0.12
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);


/* 監視開始 */
fadeTargets.forEach((target) => {
  fadeObserver.observe(target);
});


/* =========================================================
   06. HEADER SHADOW ON SCROLL
========================================================= */

const header = document.querySelector(".header");

function updateHeader() {
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   07. SMOOTH SCROLL
========================================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});


/* =========================================================
   08. CLOSE MENU WHEN WINDOW SIZE CHANGES
========================================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 700 && nav && menuButton) {
    nav.classList.remove("is-open");
    menuButton.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");
  }
});
