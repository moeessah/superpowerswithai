const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector("[data-back-to-top]");
const carousel = document.querySelector("[data-carousel]");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(body.classList.contains("nav-open")));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  });
});

if (carousel) {
  const words = carousel.dataset.words.split(",");
  let index = 0;
  setInterval(() => {
    index = (index + 1) % words.length;
    carousel.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(8px)" },
      ],
      { duration: 180, easing: "ease-out" }
    ).onfinish = () => {
      carousel.textContent = words[index].trim();
      carousel.animate(
        [
          { opacity: 0, transform: "translateY(-8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 240, easing: "ease-out" }
      );
    };
  }, 1900);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal, .keyword").forEach((item) => revealObserver.observe(item));

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  backToTop.classList.toggle("visible", window.scrollY > 520);
});

if (backToTop) {
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

document.querySelectorAll("[data-mail-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [];
    data.forEach((value, key) => {
      if (String(value).trim()) lines.push(`${key}: ${value}`);
    });
    const subject = form.dataset.subject || "Superpowers With AI inquiry";
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:info@superpowerswithai.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
});
