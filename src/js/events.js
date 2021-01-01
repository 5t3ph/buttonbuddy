const isProd = window.location.host.includes("buttonbuddy");

if ("IntersectionObserver" in window) {
  const generatorObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].intersectionRatio <= 0.3) return;
      generatorObserver.unobserve(entries[0].target);

      if (isProd) plausible("Viewed Generator");
    },
    {
      threshold: 0.3,
    },
  );
  generatorObserver.observe(document.getElementById("generator"));

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].intersectionRatio <= 0.6) return;
      aboutObserver.unobserve(entries[0].target);
      if (isProd) plausible("End of Article");
    },
    {
      threshold: 0.6,
    },
  );
  aboutObserver.observe(document.getElementById("about"));

  const clickEvents = {
    ".controls button": "Copied",
  };
  const changeEvents = {
    "#text-inputs": "Text Inputs",
    ".results input": "Large Text",
  };

  const triggerEvent = (element, label, type) => {
    element.addEventListener(
      type,
      () => {
        if (isProd) plausible(label);
      },
      { once: true },
    );
  };

  document
    .querySelectorAll(".color-input")
    .forEach((e) => triggerEvent(e, "Color Change", "change"));

  Object.entries(changeEvents).forEach((event) => {
    const element = event[0];
    const label = event[1];
    const trigger = document.querySelector(element);
    triggerEvent(trigger, label, "change");
  });

  Object.entries(clickEvents).forEach((event) => {
    const element = event[0];
    const label = event[1];
    const trigger = document.querySelector(element);
    triggerEvent(trigger, label, "click");
  });
}
