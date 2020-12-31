import copy from "clipboard-copy";

const copyButton = document.querySelector(".controls button");

copyButton.addEventListener("click", function () {
  const colorCopy = document.querySelector("textarea").value;
  copy(colorCopy);
});

// Hide copy button if the functionality won't work
if (!navigator.clipboard) {
  copyButton.style.display = "none";
}
