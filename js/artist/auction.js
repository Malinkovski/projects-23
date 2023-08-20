//go back button to previous page for the auction page
const goBackBtn = document.querySelector(".go-back");
goBackBtn.addEventListener("click", goBack);

function goBack() {
  history.back();
}

//_______________________________________________________________________
// enable/disable bidding
const bidBtnContainer = document.querySelector(".auction-button-content");
const visitorBid = document.querySelectorAll(".visitor-bid");
const artistBid = document.querySelectorAll(".artist-bid");
const bidButton = document.querySelector(".confirm-bid .button");
const auctionPage = document.querySelector("#auction-page");
const noAuctionPage = document.querySelector("#previous-auction-page");

let timerElement = document.querySelector(".time");
const auctionImage = document.querySelector(".auction-image img");
const auctionArtistName = document.querySelector(".auction-artist-name");
const auctionTitleName = document.querySelector(".auction-title-name");
const auctionDescription = document.querySelector(".auction-description");
let currentBid = document.querySelector(".current-bid .bid-amount");
let totalBids = document.querySelector(".total-bids .total-amount-of-bids");
let minimumBid = document.querySelector(".place-amount .minimum-sum");

let bidCheck = 0;

// Function to check if there are items on auction
function hasAuctionItem(artistItems) {
  return artistItems.some((item) => item.isAuctioning === true);
}

// Function to set the display property and save it to localStorage
function setDisplayLocalStorage(element, displayBidBtnValue) {
  element.style.display = displayBidBtnValue;
  localStorage.setItem(element.id + "-display", displayBidBtnValue);
}

// Function to retrieve the display property from localStorage
function getDisplayBidBtnFromLocalStorage(element) {
  return localStorage.getItem(element.id + "-display");
}

// On page load, retrieve the saved display setting and apply it
window.addEventListener("DOMContentLoaded", () => {
  const savedDisplay = getDisplayBidBtnFromLocalStorage(bidBtnContainer);
  bidBtnContainer.style.display = savedDisplay;

  // Check if there are items on auction and show/hide the auction page accordingly
  const isItemOnAuction = hasAuctionItem(artistItems);
  if (isItemOnAuction) {
    auctionPage.style.display = "block";
    noAuctionPage.style.display = "none";
  } else {
    auctionPage.style.display = "none";
    noAuctionPage.style.display = "block";
  }
});

// Function to enable bidding (for visitors)
function enableBidding() {
  setDisplayLocalStorage(bidBtnContainer, "flex");
}

// Function to disable bidding (for artists)
function disableBidding() {
  setDisplayLocalStorage(bidBtnContainer, "none");
}

visitorBid.forEach((item) => {
  item.addEventListener("click", enableBidding);
});

artistBid.forEach((item) => {
  item.addEventListener("click", disableBidding);
});

//___________________________________________________________________
// auction page display status
function hasAuctionItem(artistItems) {
  return artistItems.some((item) => item.isAuctioning === true);
}

function updateAuctionPageStatus() {
  const isItemOnAuction = hasAuctionItem(artistItems);

  if (isItemOnAuction) {
    auctionPage.style.display = "block";
    noAuctionPage.style.display = "none";
  } else {
    auctionPage.style.display = "none";
    noAuctionPage.style.display = "block";
  }
}

//__________________________________________________________________________
// auction info

function saveAuctionItemToLocalStorage(item) {
  localStorage.setItem("auctionItem", JSON.stringify(item));
}

function loadAuctionItemFromLocalStorage() {
  const storedItem = localStorage.getItem("auctionItem");
  if (storedItem) {
    return JSON.parse(storedItem);
  }
  return null;
}

// Function to clear the auction item from localStorage
function clearAuctionItemFromLocalStorage() {
  localStorage.removeItem("auctionItem");
}

// Function to populate the auction page with the loaded item from localStorage
function populateAuctionPageFromLocalStorage() {
  auctionItem = loadAuctionItemFromLocalStorage();

  if (auctionItem) {
    populateAuction();
  } else {
    // If there is no auction item in localStorage, hide the auction page and show the "no auction" page
    removeAuction();
  }
}

// on load populate the auction page from localStorage
window.addEventListener(
  "DOMContentLoaded",
  populateAuctionPageFromLocalStorage
);

let countdownInterval;

function toggleAuctionStatus(itemId) {
  let isItemOnAuction = false;
  const item = artistItems.find((item) => item.id === itemId);

  // checking if other item from other artists item list has already isAuctioning = true status
  artistItems.forEach((otherItem) => {
    if (otherItem.isAuctioning && otherItem.id !== itemId) {
      isItemOnAuction = true;
    }
  });

  if (isItemOnAuction && !item.isAuctioning) {
    alert("There is already an item on auction.");
    return;
  }

  item.isAuctioning = !item.isAuctioning;
  saveToLocalStorage();

  if (item.isAuctioning) {
    saveAuctionItemToLocalStorage(item);
    populateAuction();
    countdownInterval = startCountdown();
  } else {
    clearAuctionItemFromLocalStorage();
    removeAuction();
    clearInterval(countdownInterval);
    localStorage.removeItem("countdownRemaining");
  }
  renderItems();
}

function checkAuctionStatus() {
  return artistItems.find((item) => item.isAuctioning);
}

// Ff there is an item on auction the localstorage timer starts running
window.onload = () => {
  const item = checkAuctionStatus();
  if (item) {
    countdownInterval = startCountdown();
  }
};

/* TIMER COUNTDOWN */
//_________________________
function startCountdown() {
  const timerElement = document.querySelector(".time");
  let secondsRemaining = localStorage.getItem("countdownRemaining") || 5; //!testing 10s
  //! Default 120s //testing 10s

  const interval = setInterval(() => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    timerElement.textContent = formattedTime;

    if (secondsRemaining <= 0) {
      clearInterval(interval);
      const item = checkAuctionStatus();
      if (item) {
        // Update the item properties
        item.isAuctioning = false;
        if (bidCheck > -1) {
          //set to -1 for testing, default 0,
          // if there are more bidders than 1 dateSold and priceSold are updated
          item.dateSold = new Date().toISOString();
          item.priceSold = +currentBid.textContent;
        }
        saveToLocalStorage();

        clearAuctionItemFromLocalStorage();
        removeAuction();
        clearInterval(countdownInterval);
        localStorage.removeItem("countdownRemaining");
      }
      renderItems();
    } else {
      localStorage.setItem("countdownRemaining", secondsRemaining);
      secondsRemaining--;
    }
  }, 1000);

  return interval;
}

function populateAuction() {
  let auctionItem = loadAuctionItemFromLocalStorage();

  auctionImage.src = auctionItem.image;
  auctionArtistName.textContent = auctionItem.artist;
  auctionTitleName.textContent = auctionItem.title;
  auctionDescription.textContent = auctionItem.description;
  currentBid.textContent = `${auctionItem.price / 2}`;
  bidCheck = auctionItem.price;
  totalBids.textContent = "0";
  minimumBid.textContent = `${+currentBid.textContent + 50}`;

  // Show the auction page and hide the "no auction" page
  auctionPage.style.display = "block";
  noAuctionPage.style.display = "none";
}
function removeAuction() {
  auctionPage.style.display = "none";
  noAuctionPage.style.display = "block";
}
//_________________________________________________
/* BIDDING FUNCTIONALITY */
