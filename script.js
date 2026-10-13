document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  siteNav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);

document.querySelectorAll(".project-card").forEach((card) => {
  const repositoryUrl = card.dataset.repoUrl.trim();
  const demoUrl = card.dataset.demoUrl.trim();
  const codeLink = card.querySelector('[data-project-link="code"]');
  const demoLink = card.querySelector('[data-project-link="demo"]');
  const placeholder = card.querySelector(".project-link-note");

  if (repositoryUrl) {
    codeLink.href = repositoryUrl;
    codeLink.hidden = false;
    placeholder.hidden = true;
  }

  if (demoUrl) {
    demoLink.href = demoUrl;
    demoLink.hidden = false;
  }
});

document.querySelector("#copyright-year").textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}