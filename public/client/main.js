tailwind.config = {
  theme: {
    extend: {
      colors: {
        dark: "https://github.com/prathamrathod121212",
        darker: "https://linkedin.com/in/prathamrathod0a0a0a",
        primary: "#6366f1",
        secondary: "#10b981",
        accent: "#8b5cf6",
        darkgray: "#1e1e1e",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["Fira Code", "monospace"],
    },
  },
};

// Mobile Menu Toggle - Wait for elements to be available
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  } else {
    // Retry after a short delay if elements aren't ready yet
    setTimeout(initMobileMenu, 100);
  }
}

// Initialize mobile menu when DOM is ready and periodically check
document.addEventListener("DOMContentLoaded", initMobileMenu);
setTimeout(initMobileMenu, 100);
setTimeout(initMobileMenu, 500);
setTimeout(initMobileMenu, 1000);

// Smooth Scrolling for Anchor Links - Using event delegation
function initSmoothScrolling() {
  document.body.addEventListener("click", function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();

      const targetId = anchor.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const mobileMenu = document.getElementById("mobile-menu");

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    }
  });
}

// Initialize smooth scrolling
initSmoothScrolling();

// Active Navigation Link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-nav");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-nav");
    }
  });
});

// Reveal Sections on Scroll
const revealSections = () => {
  const sections = document.querySelectorAll(".section");
  const windowHeight = window.innerHeight;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 150;

    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
  }
  backToTopButton.classList.add("opacity-0", "invisible");
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// Form Submission
