import colorContrast from "color-contrast";
import { updateRatioIndicators } from "./updateRatio";

const colorPickers = document.querySelectorAll('input[type="color"]');
const canvas = document.querySelector(".canvas");
const buddy = document.querySelector("#generator button");
let values = {};

const updateColorCopy = (value, name) => {
  values = { ...values, [`--${name}`]: value };

  const colorCopy = document.querySelector("textarea");
  const valuesArr = Object.entries(values);
  colorCopy.innerHTML = valuesArr
    .map((color) => {
      return `${color[0]}: ${color[1]};`;
    })
    .join("\n");
};

const updateContrastRatio = (results, color, altAttr) => {
  results.forEach((result) => {
    const alt = result.getAttribute(`data-${altAttr}`);
    const altColor = document.getElementsByName(alt)[0].value;
    const ratio = result.getAttribute("data-ratio");
    const contrast = colorContrast(color, altColor).toFixed(2);

    result.querySelector("span").innerHTML = contrast;

    const icon = contrast / 100 >= ratio / 100 ? "✅" : "🚫";
    const status = contrast / 100 >= ratio / 100 ? "- Passing" : "- Invalid";
    result.parentElement.setAttribute("data-icon", icon);
    result.parentElement.querySelector(".status").innerText = status;
  });
};

const updateContrast = (color, name) => {
  const foregrounds = document.querySelectorAll(`[data-foreground="${name}"]`);
  const backgrounds = document.querySelectorAll(`[data-background="${name}"]`);

  updateContrastRatio(foregrounds, color, "background");
  updateContrastRatio(backgrounds, color, "foreground");
};

const watchColorPicker = (event) => {
  const input = event.target;
  const value = input.value;
  const name = input.name;

  if (name === "surface") {
    canvas.style.setProperty("--surface", value);
  } else {
    buddy.style.setProperty(`--${name}`, value);
  }

  input.nextElementSibling.style.setProperty("--color", value);

  updateColorCopy(value, name);
  updateContrast(value, name);
  updateRatioIndicators();
};

colorPickers.forEach((picker) => {
  picker.addEventListener("input", watchColorPicker, false);

  const value = picker.value;
  const name = picker.name;
  picker.nextElementSibling.style.setProperty("--color", value);
  updateColorCopy(value, name);
});

updateContrast("#00a4b6", "background");
updateContrast("#ffffff", "focus-background");

export { updateContrast };
