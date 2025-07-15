// Performance optimization: Preload critical resources
document.addEventListener("DOMContentLoaded", function () {
  // Preload hero image
  const heroImageLink = document.createElement("link");
  heroImageLink.rel = "preload";
  heroImageLink.as = "image";
  heroImageLink.href = "./assets/img/material/cream.png";
  document.head.appendChild(heroImageLink);

  // Update hamburger button accessibility
  const hamburgerBtn = document.querySelector(".hamburger");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
    });
  }
});

// Add loading performance tracking
window.addEventListener("load", function () {
  // Track page load time for analytics
  const loadTime =
    performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log("Page load time:", loadTime + "ms");

  // Add schema.org markup for page load time
  const performanceMeta = document.createElement("meta");
  performanceMeta.name = "page-load-time";
  performanceMeta.content = loadTime + "ms";
  document.head.appendChild(performanceMeta);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu?.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

// Observe all elements that should be revealed
document.addEventListener("DOMContentLoaded", () => {
  const elementsToReveal = document.querySelectorAll(
    ".about-card, .business-card, .benefit-card, .platform-stats"
  );
  elementsToReveal.forEach((el) => {
    el.classList.add("scroll-reveal");
    observer.observe(el);
  });
});

// Enhanced parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-bg");
  if (heroBackground) {
    const speed = scrolled * 0.5;
    heroBackground.style.transform = `translateY(${speed}px)`;
  }
});

// Dynamic counter animation for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Trigger counter animations when statistics section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const text = stat.textContent;
          const number = parseInt(text.replace(/\D/g, ""));
          if (number > 0) {
            stat.textContent = "0";
            setTimeout(() => {
              animateCounter(stat, number);
            }, 500);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".statistics");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});

// Interactive hover effects for business cards
document.addEventListener("DOMContentLoaded", () => {
  const businessCards = document.querySelectorAll(".business-card");

  businessCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect on page load
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".title-part1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1000);
  }
});

// Enhanced scroll-triggered animations
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Add staggered animation delay for cards in a grid
        if (
          element.parentElement.classList.contains("about-grid") ||
          element.parentElement.classList.contains("business-grid")
        ) {
          const cards = Array.from(element.parentElement.children);
          const index = cards.indexOf(element);
          element.style.animationDelay = `${index * 0.2}s`;
        }

        element.classList.add("fade-in-up");
        animationObserver.unobserve(element);
      }
    });
  },
  { threshold: 0.3 }
);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".about-card, .business-card, .benefit-card"
  );
  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });
});

// Interactive tube rotation on mouse move
document.addEventListener("DOMContentLoaded", () => {
  const productTubes = document.querySelectorAll(
    ".product-tube, .product-tube-large"
  );

  productTubes.forEach((tube) => {
    const container = tube.closest(
      ".product-showcase, .product-showcase-large"
    );

    container?.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / rect.height) * 10;
      const rotateY = -(mouseX / rect.width) * 10;

      tube.style.transform = `rotate(-15deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container?.addEventListener("mouseleave", () => {
      tube.style.transform = "rotate(-15deg) rotateX(0deg) rotateY(0deg)";
    });
  });
});

// Smooth navbar active link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add loading screen
window.addEventListener("load", () => {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = `
        <div class="loader-content">
            <img src="./assets/img/logo/white.png" alt="Loading..." class="loader-icon">
            <div class="loader-text">Dr. Naftalan</div>
            <div class="loader-spinner"></div>
        </div>
    `;

  document.body.appendChild(loader);

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, 2000);
});

// Enhanced QR code hover effects
document.addEventListener("DOMContentLoaded", () => {
  const qrCodes = document.querySelectorAll(".qr-placeholder");

  qrCodes.forEach((qr) => {
    qr.addEventListener("mouseenter", () => {
      qr.style.transform = "scale(1.1) rotate(5deg)";
      qr.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.5)";
    });

    qr.addEventListener("mouseleave", () => {
      qr.style.transform = "scale(1) rotate(0deg)";
      qr.style.boxShadow = "none";
    });
  });
});

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
window.addEventListener(
  "scroll",
  debounce(() => {
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  }, 10)
);

// Add smooth page transitions
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Modal functionality
document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements
  const privacyModal = document.getElementById("privacyModal");
  const termsModal = document.getElementById("termsModal");
  const privacyLink = document.getElementById("privacyLink");
  const termsLink = document.getElementById("termsLink");
  const closeButtons = document.querySelectorAll(".close");

  // Open modals
  privacyLink?.addEventListener("click", (e) => {
    e.preventDefault();
    privacyModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  });

  termsLink?.addEventListener("click", (e) => {
    e.preventDefault();
    termsModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  });

  // Close modals
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openModal = document.querySelector('.modal[style*="block"]');
      if (openModal) {
        openModal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
      }
    }
  });
});
