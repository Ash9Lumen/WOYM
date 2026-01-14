// Disable user scrolling
document.body.classList.add("locked");

// Sections to scroll to (in order)
const sections = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5"
];

let index = 0;

function scrollToNextSection() {
  if (index >= sections.length) return;

  const el = document.getElementById(sections[index]);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  index++;

  // Time between scrolls (adjust for pacing)
  setTimeout(scrollToNextSection, 6000);
}

// Start after short delay
  setTimeout(scrollToNextSection, 1000);

