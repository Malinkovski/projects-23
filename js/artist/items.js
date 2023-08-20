const itemsSection = document.querySelector("#adding-item-by-artist");
const snapshotSection = document.querySelector("#take-snapshot-window");
const addNewItemBtn = document.querySelector(".add-new-item");
const confirmItemBtn = document.querySelector(".submit-buttons .add-btn");
const closeItemBtn = document.querySelector(".submit-buttons .cancel-btn");
const snapshotBtn = document.querySelector(".snapshot-button");
const takepictureBtn = document.querySelector(".take-picture");
const addItemForm = document.querySelector("#filter-form");
const captureImageBtn = document.getElementById('captureImageBtn');
const imageInput = document.getElementById('imageInput');
const capturedImageImg = document.getElementById('capturedImage');

addItemForm.addEventListener("submit", handleFormSubmit);
addNewItemBtn.addEventListener("click", () => {
  openWindow(itemsSection);
  addItemForm.reset();
});
closeItemBtn.addEventListener("click", () => closeWindow(itemsSection));
takepictureBtn.addEventListener("click", () => openWindow(snapshotSection));
snapshotBtn.addEventListener("click", () => closeWindow(snapshotSection));

let artistItems = [...items];
let currentAuctionItemId = null;
let capturedImageData = null;

imageInput.addEventListener('change', (event) => {
  const selectedImage = event.target.files[0];

  if (selectedImage) {
    // Display the selected image as a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      capturedImageImg.src = e.target.result;
      capturedImageData = e.target.result; // Store the captured image data
    };
    reader.readAsDataURL(selectedImage);
  }
});

// save artistItems array to local storage
function saveToLocalStorage() {
  localStorage.setItem("artistItems", JSON.stringify(artistItems));
}
// load artistItems array from local storage
function loadFromLocalStorage() {
  const storedItems = localStorage.getItem("artistItems");
  if (storedItems) {
    artistItems = JSON.parse(storedItems);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderItems();
});

// Function to render the items as cards in the cards-section
function renderItems() {
  const selectedArtistName = localStorage.getItem("selectedArtistName");
  const cardsList = document.querySelector("#cards-list");
  cardsList.innerHTML = "";

  const filteredItems = artistItems.filter(
    (item) => item.artist === selectedArtistName
  );

  filteredItems.forEach((item) => {
    const dateCreated = new Date(item.dateCreated);
    const cardItemHtml = `
    <li class="listing-item-container">
    <div class="listing-image-container">
    <img src="${item.image}" alt="painting" />
    </div>
    <div class="listing-content">
      <div class="badge price item-price">$${item.price}</div>
      <h4 class="title">${item.title}</h4>
      <p class="date">${dateCreated.toLocaleDateString()}</p>
      <p class="description">
        ${item.description}
      </p>
    </div>
    <div class="item-buttons">
    <div class="send-btn button" onclick="toggleAuctionStatus(${item.id})">
      ${item.isAuctioning ? "On Auction" : "Send to Auction"}
    </div>
    ${
      item.isPublished
        ? `<div class="unpublish-btn button" data-item-id="${item.id}">Unpublish</div>`
        : `<div class="publish-btn button" data-item-id="${item.id}">Publish</div>`
    }
    <div class="remove-btn button" data-item-id="${item.id}">Remove</div>
    <div class="edit-btn button" data-item-id="${item.id}">Edit</div>
  </div>
  </li>
  `;

    cardsList.innerHTML += cardItemHtml;
  });
  editItemBtn();
  removeItemBtn();
  publishUnpublishBtn();
}

// handle the form for add/edit an item
function handleFormSubmit(event) {
  event.preventDefault();
  const addItemForm = document.querySelector("#filter-form");
  const formData = new FormData(addItemForm);

  const isPublishedCheckbox = document.querySelector(
    "#is-published-checkbox"
  ).checked;

  const newItem = {
    id: Date.now(),
    title: formData.get("add-title"),
    description: formData.get("add-description"),
    type: formData.get("add-type"),
    image: capturedImageData || formData.get("add-image-url"),
    price: parseFloat(formData.get("add-price")),
    artist: localStorage.getItem("selectedArtistName"),
    dateCreated: new Date().toISOString(), //dd/mm/yyyy
    isPublished: isPublishedCheckbox,
    isAuctioning: false,
    dateSold: null,
    priceSold: null,
  };

  const editingItemId = parseInt(formData.get("editing-item-id"));
  // if editing an existing item
  if (editingItemId) {
    const editingItemIndex = artistItems.findIndex(
      (item) => item.id === editingItemId
    );
    if (editingItemIndex !== -1) {
      artistItems[editingItemIndex] = newItem;
    }
  } else {
    // if adding a new item to the array
    artistItems.push(newItem);
  }
  capturedImageData = null;
  saveToLocalStorage();
  addItemForm.reset();
  closeWindow(itemsSection);
  renderItems();
}

//_______________________________________________________________
// function to remove an item
function removeItemBtn() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = parseInt(btn.dataset.itemId);
      const confirmation = window.confirm(
        `Are you sure you want to delete the item from the list?`
      );
      if (confirmation) {
        removeItem(itemId);
      }
    });
  });
}
function removeItem(itemId) {
  const itemIndex = artistItems.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    artistItems.splice(itemIndex, 1);
    saveToLocalStorage();
    // rerender the cards after removing one
    renderItems();
  }
}
//_______________________________________________________________
// function to edit an item
function editItemBtn() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      //confirmItemBtn.innerHTML = "Confirm edit";
      const itemId = parseInt(btn.dataset.itemId);
      editItem(itemId);
    });
  });
}
function editItem(itemId) {
  const itemToEdit = artistItems.find((item) => item.id === itemId);
  if (itemToEdit) {
    const addItemForm = document.querySelector("#filter-form");
    addItemForm["add-title"].value = itemToEdit.title;
    addItemForm["add-description"].value = itemToEdit.description;
    addItemForm["add-type"].value = itemToEdit.type;
    addItemForm["add-price"].value = itemToEdit.price;
    addItemForm["add-image-url"].value = itemToEdit.image;

    // Set the hidden input for editing item ID
    addItemForm["editing-item-id"].value = itemToEdit.id;
    openWindow(itemsSection);
  }
}
//_______________________________________________________________
// function to publish/unpublish an item
function publishUnpublishBtn() {
  document
    .querySelectorAll(
      ".item-buttons .publish-btn, .item-buttons .unpublish-btn"
    )
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = parseInt(btn.dataset.itemId);
        togglePublishStatus(itemId);
      });
    });
}

//_____________________________________________________________
// toggle the publish status for an item
function togglePublishStatus(itemId) {
  const item = artistItems.find((item) => item.id === itemId);
  item.isPublished = !item.isPublished; // Change publish status
  saveToLocalStorage();
  renderItems(); // Update the items list with the latest status
}


//_____________________________________________________________
/* SNAPSHOT METHOD */

captureImageBtn.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', (event) => {
  const selectedImage = event.target.files[0];

  if (selectedImage) {
    const reader = new FileReader();
    reader.onload = (e) => {
      capturedImageImg.src = e.target.result;

      const imageContainer = document.querySelector('.take-picture');
      imageContainer.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(selectedImage);
  }
});
