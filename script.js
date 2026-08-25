// JourneyWithRiko - lightweight, dependency-free interactions
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // Reveal sections as they enter the viewport.
  // Content will still work if IntersectionObserver isn't supported.
  var sections = document.querySelectorAll(
    ".content-section, .quote-section, .socials-section, .community-banner, .services-section"
  );

  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (section) {
      section.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
});