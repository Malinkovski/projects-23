const button = document.querySelector(".navbar-toggle-button");
const navbar = document.querySelector(".navbar");
const logo = document.querySelector(".logo");

button.addEventListener("click", () => {
  button.classList.toggle("active");
  navbar.classList.toggle("active");
});

//filters

const marketingFilter = document.querySelector("#radio1");
const codingFilter = document.querySelector("#radio2");
const designFilter = document.querySelector("#radio3");

marketingFilter.addEventListener("click", () => {
  hideCards();
  let cardsArray = document.querySelectorAll(".marketing");
  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].style.display = "inline-block";
  }
});
codingFilter.addEventListener("click", () => {
  hideCards();
  let cardsArray = document.querySelectorAll(".coding");
  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].style.display = "inline-block";
  }
});
designFilter.addEventListener("click", () => {
  hideCards();
  let cardsArray = document.querySelectorAll(".design");
  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].style.display = "inline-block";
  }
});

function hideCards() {
  let cardsArray = document.querySelectorAll(".card");

  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].style.display = "none";
  }
}

/* const loader = document.querySelector(".load");

loader.addEventListener("click", () => {
    let cardsCounter = document.querySelectorAll(".card"); 
  }); */


