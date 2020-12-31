const inputSwitch = document.querySelector(".controls .switch");
const colorInputs = document.querySelectorAll(".color");

const changeInputType = (type) => {
  colorInputs.forEach((color) => {
    const input = color.querySelector("input");
    input.setAttribute("type", type);
  });
};

const changeInputs = (event) => {
  const inputControl = event.target;

  if (inputControl.checked) {
    changeInputType("text");
  } else {
    changeInputType("color");
  }
};

inputSwitch.addEventListener("change", changeInputs, false);
