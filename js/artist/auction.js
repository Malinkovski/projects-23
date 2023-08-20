// Go back button to previous page for the auction page
const goBackBtn = document.querySelector(".go-back");
goBackBtn.addEventListener("click", goBack);

function goBack() {
  history.back();
}

//_______________________________________________________________________
/* Enable/disable bidding */

const MINIMUM_UPBID = 50;

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
  populateAuctionPageFromLocalStorage();
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
/* Auction page display status */
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
/* Auction info */

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

let countdownInterval;

function toggleAuctionStatus(itemId) {
  let isItemOnAuction = false;
  const item = artistItems.find((item) => item.id === itemId);

  // Checking if other item from other artists item list has already isAuctioning = true status
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
    updateAndSavePreviousAuction(item);
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

// If there is an item on auction the localstorage timer starts running
window.onload = () => {
  const item = checkAuctionStatus();
  if (item) {
    countdownInterval = startCountdown();
  } else {
    localStorage.removeItem("bids");
  }
  populatePreviousAuction();
};

//__________________________________________________________
/* TIMER COUNTDOWN */
function startCountdown() {
  const timerElement = document.querySelector(".time");
  let secondsRemaining = localStorage.getItem("countdownRemaining") || 120;

  const interval = setInterval(() => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    timerElement.textContent = formattedTime;

    if (secondsRemaining <= 0) {
      clearInterval(interval);
      localStorage.removeItem("bids");
      const item = checkAuctionStatus();
      if (item) {
        // Update the item properties
        item.isAuctioning = false;
        if (bidCheck > 0) {
          item.dateSold = new Date().toISOString();
          item.priceSold = +currentBid.textContent;
          populatePreviousAuction();
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
function extendBiddingTimer() {
  const secondsRemaining =
    parseInt(localStorage.getItem("countdownRemaining")) || 120;
  const extendedTime = Math.min(secondsRemaining + 60, 180); // Extend by 1 minute, but not more than 3 minutes

  localStorage.setItem("countdownRemaining", extendedTime);
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
  minimumBid.textContent = `${+currentBid.textContent + MINIMUM_UPBID}`;

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
//TODO: back-end communication with the API

const BID_API = "https://projects.brainster.tech/bidding/api" //!not included

const currentBidsContainer = document.querySelector(".current-bids");

// Update current bid and minimum bid based on saved bids
function updateCurrentAndMinimumBid() {
  const storedBids = JSON.parse(localStorage.getItem("bids")) || [];

  if (storedBids.length > 0) {
    const latestBid = storedBids[storedBids.length - 1].bidAmount;
    currentBid.textContent = latestBid;
    minimumBid.textContent = latestBid + MINIMUM_UPBID;
  }

  totalBids.textContent = storedBids.length;
}

// Populate saved bids from local storage
function populateSavedBids() {
  const storedBids = JSON.parse(localStorage.getItem("bids")) || [];

  storedBids.forEach((bidInfo) => {
    const bidItem = document.createElement("div");
    bidItem.classList.add("bid-item");

    const bidItemContent = `
      <div class="current-bid-details">
        <div><i class="fas fa-gavel"></i></div>
        <div class="bid-item-info">
        <h4>Bidder</h4>
        <span class="bid-time">${bidInfo.bidTime}</span>
        </div>
        </div>
        <div class="bid-amount-price">
        <span>$${bidInfo.bidAmount}</span>
        </div>
        `;

    bidItem.innerHTML = bidItemContent;
    currentBidsContainer.appendChild(bidItem);
  });
}

// On page load update mininum bid and populate saved bids
window.addEventListener("DOMContentLoaded", () => {
  updateCurrentAndMinimumBid();
  populateSavedBids();
});

bidButton.addEventListener("click", () => {
  location.reload();
  const minimumBidValue = +document.querySelector("#bid-price-input").value;
  if (minimumBidValue < +minimumBid.textContent) {
    return alert(
      `The minimum bid for this auction is $${minimumBid.textContent}`
    );
  }

  liveAuctionItem.price = +currentBid.textContent;
  console.log(currentBid.textContent);

  // Increase the bidding count by one on each bid
  const currentTotalBids = +totalBids.textContent;
  totalBids.textContent = currentTotalBids + 1;

  // Update the minimum bid
  minimumBid.textContent = minimumBidValue + MINIMUM_UPBID;

  const currentBidValue = +currentBid.textContent;
  const newCurrentBidValue = Math.max(currentBidValue, minimumBidValue);
  currentBid.textContent = newCurrentBidValue;
  const bidTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  updateCurrentAndMinimumBid();

  // Save to local storage
  const bidInfo = {
    bidTime: bidTime,
    bidAmount: minimumBidValue,
  };
  const storedBids = JSON.parse(localStorage.getItem("bids")) || [];
  storedBids.push(bidInfo);
  localStorage.setItem("bids", JSON.stringify(storedBids));

  // Create and append bid item to the current bids container
  const bidItem = document.createElement("div");
  bidItem.classList.add("bid-item");

  const bidItemContent = `
    <div class="current-bid-details">
      <div><i class="fas fa-gavel"></i></div>
      <div class="bid-item-info">
        <h4>Bidder</h4>
        <span class="bid-time">${bidTime}</span>
      </div>
    </div>
    <div class="bid-amount-price">
      <span>$${minimumBidValue}</span>
    </div>
  `;

  bidItem.innerHTML = bidItemContent;
  currentBidsContainer.appendChild(bidItem);

  // Clear the bid input after submitting
  document.querySelector("#bid-price-input").value = "";
  extendBiddingTimer();
});
