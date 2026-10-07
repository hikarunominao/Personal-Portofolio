// --- Mobile Menu Toggle ---
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// --- Scroll Reveal (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// --- Top Scroll Progress Bar ---
const progressBar = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
  }
});

// --- Dynamic Typewriter Effect ---
const typedTextSpan = document.querySelector(".typed-text");
const words = ["Designer", "Frontend Builder", "Problem Solver", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 110;
const erasingDelay = 65;
const newWordDelay = 1700;

function typeEffect() {
  if (!typedTextSpan) return;
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? erasingDelay : typingDelay;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = newWordDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(typeEffect, 600));
} else {
  setTimeout(typeEffect, 600);
}

// --- Active Nav Link Spy on Scroll ---
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let currentId = "";
  const scrollPosition = window.scrollY + 140;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      currentId = section.getAttribute("id");
    }
  });

  if (currentId) {
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }
});

// --- Custom Cursor Follower ---
const cursorDot = document.getElementById("cursorDot");
const cursorOutline = document.getElementById("cursorOutline");

if (cursorDot && cursorOutline && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll("a, button, .project-card, .skill");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => cursorOutline.classList.add("hovered"));
    el.addEventListener("mouseleave", () => cursorOutline.classList.remove("hovered"));
  });
}

// --- 3D Tilt Effect on Project Cards ---
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});
