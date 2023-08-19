//toggling animation on dropdowm buttons
const filterButton = document.querySelector(".filter-button");
const vertical_L = document.querySelectorAll(".vertical-line");
const horizontal_L = document.querySelectorAll(".horizontal-line");
const closeButton = document.querySelector(".close-button");
const filteringSection = document.querySelector("#filtering-section");
let confirmButtonOn = false;

filterButton.addEventListener("click", () => openWindow(filteringSection));
closeButton.addEventListener("click", () => closeWindow(filteringSection));

function animateButton() {
  let n = 1;
  vertical_L.forEach((line) => {
    line.classList.toggle("vl-" + n);
    n++;
  });
  n = 1;
  horizontal_L.forEach((line) => {
    line.classList.toggle("hl-" + n);
    n++;
  });
}

function closeWindow(section) {
  animateButton();
  confirmButtonOn = false;
  section.classList.remove("open");
}

function openWindow(section) {
  animateButton();
  if (confirmButtonOn) {
    confirmButtonOn = false;
    section.classList.remove("open");
  } else {
    confirmButtonOn = true;
    section.classList.add("open");
  }
}

//____________________________________________________________________
