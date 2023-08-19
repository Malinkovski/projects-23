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

function updateAuctionPageStatus (){
  
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

//
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

  const auctionItem = loadAuctionItemFromLocalStorage();

  if (auctionItem) {
    const auctionImage = document.querySelector(".auction-image img");
    const auctionArtistName = document.querySelector(".auction-artist-name");
    const auctionTitleName = document.querySelector(".auction-title-name");
    const auctionDescription = document.querySelector(".auction-description");
    const currentBid = document.querySelector(".current-bid .bid-amount");
    const totalBids = document.querySelector(".total-bids .total-amount-of-bids");
    const minimumBid = document.querySelector(".place-amount .minimum-sum");

    auctionImage.src = auctionItem.image;
    auctionArtistName.textContent = auctionItem.artist;
    auctionTitleName.textContent = auctionItem.title;
    auctionDescription.textContent = auctionItem.description;
    currentBid.textContent = `${auctionItem.price / 2}`;
    totalBids.textContent = "0"; // You might need to update this with actual bid count
    minimumBid.textContent = `$${auctionItem.price / 2}`; // You can set this to the minimum bid value

    // Show the auction page and hide the "no auction" page
    auctionPage.style.display = "block";
    noAuctionPage.style.display = "none";
  } else {
    // If there is no auction item in localStorage, hide the auction page and show the "no auction" page
    auctionPage.style.display = "none";
    noAuctionPage.style.display = "block";
  }
}

// on load populate the auction page from localStorage
window.addEventListener("DOMContentLoaded", populateAuctionPageFromLocalStorage);

function toggleAuctionStatus(itemId) {
  let isItemOnAuction = false;
  const item = artistItems.find((item) => item.id === itemId);

  // checking if other item from other artists item list has already isAuctioning = true status
  artistItems.forEach((otherItem) => {
    if (otherItem.isAuctioning && otherItem.id !== itemId) {
      isItemOnAuction = true;
    }
  });

  if (isItemOnAuction && !item.isAuctioning) {     // if there is
    alert("There is already an item on auction.");
    return;
  }

  item.isAuctioning = !item.isAuctioning; // change status
  saveToLocalStorage();

  if (item.isAuctioning) {
    saveAuctionItemToLocalStorage(item); 
  } else {
    clearAuctionItemFromLocalStorage(); 
  }
  if (item.isAuctioning) {
    // if true populate the auction page
    const auctionImage = document.querySelector(".auction-image img");
    const auctionArtistName = document.querySelector(".auction-artist-name");
    const auctionTitleName = document.querySelector(".auction-title-name");
    const auctionDescription = document.querySelector(".auction-description");
    const currentBid = document.querySelector(".current-bid .bid-amount");
    const totalBids = document.querySelector(".total-bids .total-amount-of-bids");
    const minimumBid = document.querySelector(".place-amount .minimum-sum");

    auctionImage.src = item.image;
    auctionArtistName.textContent = item.artist;
    auctionTitleName.textContent = item.title;
    auctionDescription.textContent = item.description;
    currentBid.textContent = `$${item.price / 2}`;
    totalBids.textContent = "0"; // You might need to update this with actual bid count
    minimumBid.textContent = `${item.price / 2}`; // You can set this to the minimum bid value

    // Show the auction page and hide the "no auction" page
    auctionPage.style.display = "block";
    noAuctionPage.style.display = "none";
  } else {
    // If the item is removed from auction, hide the auction page and show the "no auction" page
    auctionPage.style.display = "none";
    noAuctionPage.style.display = "block";
  }

  renderItems(); // Update the items list with the latest status
}