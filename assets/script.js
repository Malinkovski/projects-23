const button = document.querySelector(".navbar-toggle-button");
const navbar = document.querySelector(".navbar");
const logo = document.querySelector(".logo");

button.addEventListener("click", () => {
  button.classList.toggle("active");
  navbar.classList.toggle("active");
});

