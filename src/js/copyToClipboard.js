import copy from "clipboard-copy";

const copyButton = document.querySelector(".controls button");

copyButton.addEventListener("click", (event) => {
  copyButton.classList.add("copied");
  const colorCopy = document.querySelector("textarea").value;
  copy(colorCopy);

  setTimeout(() => {
    copyButton.classList.remove("copied");
  }, 1500);
});

// Hide copy button if the functionality won't work
if (!navigator.clipboard) {
  copyButton.style.display = "none";
}
