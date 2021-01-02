import { updateContrast } from "./updateColors";

const ratioSwitch = document.querySelector(".results .switch");
const ratioColors = document.querySelectorAll('.results strong[id*="color"]');
const buddyFace = document.querySelector("#generator button svg");

const updateRatioIndicators = () => {
  const ratioIcons = document.querySelectorAll("[data-icon]");

  let ratios = [];
  ratioIcons.forEach((ratio) => {
    const icon = ratio.getAttribute("data-icon");
    ratios.push(icon);
  });

  const invalid = ratios.filter((ratio) => ratio === "🚫");
  const valid = ratios.filter((ratio) => ratio === "✅");

  buddyFace.setAttribute("class", "");

  if (!invalid.length) {
    buddyFace.classList.add("visible");
  } else if (invalid.length === 1) {
    buddyFace.classList.add("happy");
  } else {
    buddyFace.classList.add("frown");
  }

  const resultsSummary = document.querySelector("#results-summary");
  resultsSummary.innerText = `There are ${valid.length} passing ratios and ${invalid.length} invalid ratios.`;
};

buddyFace.addEventListener("animationend", () => {
  buddyFace.classList.remove("visible");
});

const updateRatio = (ratio) => {
  ratioColors.forEach((result) => {
    result.setAttribute("data-ratio", ratio);
    result.querySelector("small").innerText = `/${ratio}`;
  });

  const backgroundValue = document.getElementsByName("background")[0].value;
  const focusBackgroundValue = document.getElementsByName("focus-background")[0].value;

  updateContrast(backgroundValue, "background");
  updateContrast(focusBackgroundValue, "focus-background");

  updateRatioIndicators();
};

const updateRatios = (event) => {
  const ratioSwitch = event.target;

  if (ratioSwitch.checked) {
    updateRatio("3.0");
  } else {
    updateRatio("4.5");
  }
};

ratioSwitch.addEventListener("change", updateRatios, false);

export { updateRatioIndicators };
