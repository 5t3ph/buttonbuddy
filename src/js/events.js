const isProd = window.location.host.includes("buttonbuddy");
let clickEvents = {
  ".controls button": "Copied",
};
const changeEvents = {
  "#text-inputs": "Text Inputs",
  ".results input": "Large Text",
};
document.querySelectorAll(".color-input").forEach((e) => {
  clickEvents = { ...clickEvents, [`#${e.id}`]: "Change Color" };
});

const triggerEvent = (element, label, type) => {
  element.addEventListener(
    type,
    () => {
      if (isProd) {
        if (label === "Change Color") {
          plausible(label, {
            props: { Color: element.id, Type: element.type },
          });
        } else {
          plausible(label);
        }
      }
    },
    { once: true },
  );
};

const addEvents = (events, type) => {
  Object.entries(events).forEach((event) => {
    const element = event[0];
    const label = event[1];
    const trigger = document.querySelector(element);
    triggerEvent(trigger, label, type);
  });
};

addEvents(clickEvents, "click");
addEvents(changeEvents, "change");

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
      if (!entries[0].intersectionRatio > 0) return;
      aboutObserver.unobserve(entries[0].target);

      if (isProd) plausible("End of Article");
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -70% 0px",
      root: null,
    },
  );
  aboutObserver.observe(document.getElementById("about"));
}
