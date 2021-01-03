const sections = document.querySelectorAll("section");

if ("IntersectionObserver" in window && sections) {
  const sectionsObserver = new IntersectionObserver(
    (sections) => {
      const section = sections[0];
      const target = section.target;
      const speech = target.querySelector("blockquote");
      const svg = target.querySelector("svg");

      if (section.intersectionRatio >= 0) {
        speech.classList.add("visible");
        svg.classList.add("visible");
      } else {
        svg.classList.remove("visible");
      }
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -70% 0px",
    },
  );
  sections.forEach((section) => {
    sectionsObserver.observe(section);
  });
} else {
  sections.forEach((section) => {
    const speech = section.querySelector("blockquote");
    speech.classList = "visible";
  });
}
