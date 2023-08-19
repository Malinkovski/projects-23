// Custom select
function fetchArtistNamesForFilters() {
  fetch(URL_API)
    .then((response) => response.json())
    .then((data) => {
      // Populate the select options with fetched data
      const artistSelect = document.querySelector("#artist-select");
      data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.name;
        option.textContent = user.name;
        artistSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Item listing
function populateTypeOptions() {
  const typeSelect = document.getElementById("type-select");

  // Get unique item types from artistItems and add them as options
  const uniqueItemTypes = [...new Set(artistItems.map((item) => item.type))];
  uniqueItemTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
  });
}

function renderVisitorItems(items) {
  const itemsListContainer = document.querySelector(
    "#all-listing-item-container"
  );
  itemsListContainer.innerHTML = "";

  items.forEach((item) => {
    if (item.isPublished) {
      const ItemHtml = `
      <li class="listing-item-container">
        <div class="listing-image-container">
          <img src="${item.image}" alt="art by: ${item.artist}" />
        </div>
        <div class="listing-content">
          <div class="badge price">$${item.price}</div>
          <h2>${item.artist}</h2>
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      </li>
      `;

      itemsListContainer.innerHTML += ItemHtml;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  fetchArtistNamesForFilters();
  populateTypeOptions();
  renderVisitorItems(artistItems);
});

function handleFiltering() {
  const itemTitle = document.querySelector("#title-select").value.trim().toLowerCase();
  const artistName = document.querySelector("#artist-select").value.trim().toLowerCase();
  const minPrice = +document.querySelector("#min-price").value;
  const maxPrice = +document.querySelector("#max-price").value;
  const itemType = document.querySelector("#type-select").value.trim().toLowerCase();

  let filteredItems = artistItems;

  if (itemTitle !== "") {
    filteredItems = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(itemTitle)
    );
  }

  if (artistName !== "") {
    filteredItems = filteredItems.filter((item) =>
      item.artist.toLowerCase().includes(artistName)
    );
  }

  if (itemType !== "") {
    filteredItems = filteredItems.filter((item) =>
      item.type.toLowerCase().includes(itemType)
    );
  }

  if (minPrice !== 0) {
    filteredItems = filteredItems.filter((item) => item.price >= minPrice);
  }

  if (maxPrice !== 0) {
    filteredItems = filteredItems.filter((item) => item.price <= maxPrice);
  }

  // If no filters were applied, display all items
  if (itemTitle === "" && artistName === "" && itemType === "" && minPrice === 0 && maxPrice === 0) {
    filteredItems = artistItems;
  }

  renderVisitorItems(filteredItems);
}

// Add event listener to the confirm button (.filter-button) to trigger filtering
const filterBtn = document.querySelector(".filter-button");

filterBtn.addEventListener("click", function () {
  if (!confirmButtonOn) {
    handleFiltering();
  }
});
