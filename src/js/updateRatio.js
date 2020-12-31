import updateContrast from "./updateColors";

const ratioSwitch = document.querySelector(".results .switch");
const ratioColors = document.querySelectorAll('[id*="color"]');

const updateRatio = (ratio) => {
  ratioColors.forEach((result) => {
    result.setAttribute("data-ratio", ratio);
    result.querySelector("small").innerText = `/${ratio}`;
  });

  const backgroundValue = document.getElementsByName("background")[0].value;
  const focusBackgroundValue = document.getElementsByName("focus-background")[0].value;

  updateContrast(backgroundValue, "background");
  updateContrast(focusBackgroundValue, "focus-background");
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
