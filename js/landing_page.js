const selectArtist = document.querySelector("#artist-link");
const selectArtistButton = document.querySelector("#join-as .button");
const selectArtistDropdown = document.getElementById("select-artist");

const dropDownButton = () => {
  selectArtist.addEventListener("click", function () {
    selectArtistButton.classList.toggle("darken");
    if (selectArtistDropdown.style.display === "block") {
      selectArtistDropdown.style.display = "none";
    } else {
      selectArtistDropdown.style.display = "block";
    }
  });
  fetchArtistNames();
};

//Fetching names for dropdown menu
const fetchArtistNames = () => {
  fetch(URL_API)
    .then((res) => res.json())
    .then((data) => {
      showLoading();
      const userList = document.querySelector(".user-list");
      data.forEach((user) => {
        const li = document.createElement("li");
        li.addEventListener("click", function () {
          const selectedArtistName = user.name;
          localStorage.setItem("selectedArtistName", selectedArtistName);
          selectArtistDropdown.style.display = "none";
          selectArtistButton.classList.remove("darken");
          populateArtistHeader();
          window.location.hash = "artist/home";
        });
        li.textContent = user.name;
        userList.appendChild(li);

        hideLoading();
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      hideLoading();
    });
};

//hovering effect
const landingPageHoverEffect = () => {
  const artistButton = document.querySelector(".artist");
  const visitorButton = document.querySelector(".visitor");
  const header = document.querySelector(".header-text");

  artistButton.addEventListener("mouseenter", handleMouseEnter);
  artistButton.addEventListener("mouseleave", handleMouseLeave);
  visitorButton.addEventListener("mouseenter", handleMouseEnter);
  visitorButton.addEventListener("mouseleave", handleMouseLeave);

  function handleMouseEnter(event) {
    const isArtistButton = event.currentTarget === artistButton;
    if (isArtistButton) {
      $(header).fadeOut(100, function () {
        header.textContent = "street Artists";
        $(header).fadeIn(100);
      });
    }
  }

  function handleMouseLeave(event) {
    const isArtistButton = event.currentTarget === artistButton;
    if (isArtistButton) {
      $(header).fadeOut(100, function () {
        header.textContent = "Street ARTists";

        $(header).fadeIn(100);
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  dropDownButton();
  landingPageHoverEffect();
  populateArtistHeader();
});
