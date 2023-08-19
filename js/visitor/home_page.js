function cloneRow(rowContainer, rows) {
  const copy = document.querySelector(rowContainer).cloneNode(true);
  document.querySelector(rows).appendChild(copy);
}

cloneRow("#first-row", "#first-image-rows");
cloneRow("#second-row", "#second-image-rows");

document.querySelectorAll(".image").forEach((image) => {
  image.addEventListener("click", () => {
    window.location.href = "#listing-page";
  });
});

//_______________________________________________________________________
// Carousel method
const carouselSection = document.querySelector("#carousel-section");
const carouselTrack = document.querySelector(".carousel-track");
const nextButton = document.querySelector("#nextButton");
const prevButton = document.querySelector("#prevButton");
const carouselNav = document.querySelector(".carousel-nav");
let carouselItems = 0;
let carouselButtons = 0;
let itemsWidth = 0;
let itemCounter = 0;
let intervalId = 0;
let allArtists = [];

nextButton.addEventListener("click", moveToNextItem);
prevButton.addEventListener("click", moveToPrevItem);
//___________________________________________________________
//Helper functions
const SellectAllCarouselItems =() => carouselItems = document.querySelectorAll(".carousel-track .items"); 
const getWidth = () => itemsWidth = carouselItems[0].offsetWidth;
const setOffSetForEachItem = () =>{
  carouselItems.forEach((item, index) => {
    item.style.left = itemsWidth * index + "px";
  });
}

// creating and populating items with artists for the carousel
fetch(URL_API)
  .then((res) => res.json())
  .then((data) => {
    allArtists = data;
    renderCarouselItemForEachArtist();
    updateNavButtons();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
  
function renderCarouselItemForEachArtist() {
  allArtists.forEach((artist) => {
    const newCarouselItem = document.createElement("li");
    newCarouselItem.classList.add("items");
    newCarouselItem.innerHTML = `
      <div class="carousel-item">
        <div class="w50 inner-carousel-content">
          <div class="carousel-image">
            <img src="./img/artists/artist${artist.id}.jpg" alt="${artist.name}" />
          </div>
          <p>
            ${artist.name}
            <br><br>
            Street: ${artist.address.street}
          </p>
        </div>
        <div class="separator"></div>
        <div class="w50 inner-carousel-content">
          <p>
            ${artist.company.name}
            <br><br>
            ${artist.company.catchPhrase}
            ${artist.company.bs}
            <br><br>
            ${artist.phone}
            <br>
            ${artist.email}
          </p>
        </div>
      </div>
    `;
    carouselTrack.appendChild(newCarouselItem);
  });

  SellectAllCarouselItems();
  getWidth(); // getting the width of the first item
  setOffSetForEachItem();
  createNavButtons();
  navigateWithButton();
  startInterval();
}
// create nav buttons
function createNavButtons() {
  const buttons = [];
  carouselItems.forEach(() => {
    const newNavButton = document.createElement("div");
    newNavButton.classList.add("c-nav-button");
    carouselNav.appendChild(newNavButton);
    buttons.push(newNavButton);
  });
  carouselButtons = buttons;
}

// move the carousel to the next item
function moveToNextItem() {
  if (itemCounter === carouselItems.length - 1) {
    itemCounter = 0;
  } else {
    itemCounter = itemCounter + 1;
  }
  updateCarouselPosition();
  updateNavButtons();
}

// move the carousel to the previous item
function moveToPrevItem() {
  if (itemCounter === 0) {
    itemCounter = carouselItems.length - 1;
  } else {
    itemCounter = itemCounter - 1;
  }
  updateCarouselPosition();
  updateNavButtons();
}
  // add event listeners to the buttons
  function navigateWithButton(){
    carouselButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        itemCounter = index;
        updateCarouselPosition();
        updateNavButtons();
      });
    });
  }

function updateCarouselPosition() {
  const newPosition = -itemsWidth * itemCounter;
  carouselTrack.style.transform = `translateX(${newPosition}px)`;
}

// update the active nav button
function updateNavButtons() {
  carouselButtons = document.querySelectorAll(".c-nav-button");
  carouselButtons.forEach((button, index) => {
    if (itemCounter === index) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

//___________________________________________________________
// start/pause on hover
const startInterval = () => intervalId = setInterval(moveToNextItem, 2000);
const pauseInterval =() => clearInterval(intervalId);

carouselSection.addEventListener("click", pauseInterval);
carouselSection.addEventListener("mouseover", pauseInterval);
carouselSection.addEventListener("mouseout", startInterval);

//_________________________________________________________________
// mobile swipe support for carousel
let start = 0;
let end = 0;
let swipe = 0;

const touchStart = (event) => start = event.touches[0].clientX;
const touchMove = (event) =>  end = event.touches[0].clientX;

carouselTrack.addEventListener("touchstart", touchStart);
carouselTrack.addEventListener("touchmove", touchMove);
carouselTrack.addEventListener("touchend", touchEnd);

function touchEnd() {
  swipe = start - end;
  if (swipe > 100) {
    moveToNextItem();
  } else if (swipe < 100) {
    moveToPrevItem();
  }
}