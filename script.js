
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE NAVIGATION MENU
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();

      navItems.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 2. FILTER PROJECTS BY CATEGORY
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const matches =
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory;

        card.hidden = !matches;
      });
    });
  });

  // 3. UPDATE THE CURRENT YEAR AUTOMATICALLY
  const currentYear = document.getElementById("current-year");
  currentYear.textContent = new Date().getFullYear();

  // 4. SHOW THE BACK-TO-TOP BUTTON WHEN SCROLLING
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  });

  // 5. CONTACT FORM VALIDATION AND EMAIL DRAFT
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2 || message.length < 10) {
      formStatus.textContent =
        "Please enter a name of at least 2 characters and a message of at least 10 characters.";
      return;
    }

    // Replace this address with your real email before publishing.
    const recipient = "your-email@example.com";

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formStatus.textContent =
      "Your email draft is being prepared. If your email app does not open, check your browser settings.";

    window.location.href =
      `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
  });
});
