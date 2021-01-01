const sections = document.querySelectorAll("section");

if ("IntersectionObserver" in window && sections) {
  const windowHeight = document.documentElement.clientHeight;
  const threshold = windowHeight < 800 ? 0.25 : 0.65;

  const sectionsObserver = new IntersectionObserver(
    (sections) => {
      const section = sections[0];
      const target = section.target;
      const speech = target.querySelector("blockquote");
      const svg = target.querySelector("svg");

      if (section.intersectionRatio >= threshold) {
        speech.classList.add("visible");
        svg.classList.add("visible");
      } else {
        svg.classList.remove("visible");
      }
    },
    {
      threshold: threshold,
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
