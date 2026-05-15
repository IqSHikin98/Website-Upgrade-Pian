document.addEventListener("DOMContentLoaded", async function () {
  await loadSharedLayout();
  initializeNavigation();
  initializeFaq();
  initializeTestimonials();
  initializeFadeInAnimations();
});

async function loadSharedLayout() {
  const components = [
    { selector: "#header-placeholder", file: "components/header.html" },
    { selector: "#footer-placeholder", file: "components/footer.html" },
  ];

  await Promise.all(
    components.map(async ({ selector, file }) => {
      const element = document.querySelector(selector);
      if (!element) return;

      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Unable to load ${file}`);
        element.innerHTML = await response.text();
      } catch (error) {
        console.error(error);
      }
    })
  );

  setActiveNavigationLink();
}

function setActiveNavigationLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".main-nav a[href]");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }

    if (currentPage === "faq.html" && href === "#") {
      link.classList.add("active");
    }
  });
}

function initializeNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
      navToggle.classList.toggle("open");
    });
  }
}

function initializeFaq() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (button) {
      button.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    }
  });
}

function initializeTestimonials() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;

    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
    currentSlide = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  if (slides.length > 1) {
    showSlide(0);
    setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }, 5000);
  }
}

function initializeFadeInAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");

  if (!fadeElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => observer.observe(el));
}
