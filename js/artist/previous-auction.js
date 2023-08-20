//_________________________________________________
/* LAST AUCTION BY */

// Load the last auction information from localStorage
function loadPreviousAuctionFromLocalStorage() {
  const storedAuctionItem = localStorage.getItem("previousAuction");
  if (storedAuctionItem) {
    return JSON.parse(storedAuctionItem);
  }
  return null;
}

// Save the last auction information to localStorage
function savePreviousAuctionToLocalStorage(item) {
  localStorage.setItem("previousAuction", JSON.stringify(item));
}

// Clear the previous auction information from localStorage
function clearPreviousAuctionFromLocalStorage() {
  localStorage.removeItem("previousAuction");
}

function populatePreviousAuction() {
  const previousArtistName = document.querySelector(".previous-artist-name");
  const previousArt = document.querySelector(".previous-art");

  const previousAuctionItem = loadPreviousAuctionFromLocalStorage(); // Load the previous auction item from localStorage

  if (previousAuctionItem) {
    previousArtistName.textContent = previousAuctionItem.artist;
    previousArt.src = previousAuctionItem.image;
  } else {
    previousArtistName.textContent = "N/A";
    previousArt.src = "./img/empty.png";
  }
}

// Function to update and save the previous auction info
function updateAndSavePreviousAuction(item) {
  const previousAuctionItem = loadPreviousAuctionFromLocalStorage();

  if (previousAuctionItem) {
    previousAuctionItem.artist = item.artist;
    previousAuctionItem.image = item.image;
    previousAuctionItem.priceSold = item.priceSold;
    savePreviousAuctionToLocalStorage(previousAuctionItem);
  } else {
    const newPreviousAuctionItem = {
      artist: item.artist,
      image: item.image,
      priceSold: item.priceSold,
    };
    savePreviousAuctionToLocalStorage(newPreviousAuctionItem);
  }
}
