const burgerNavButton = document.querySelector(".burger-nav-button");
const burgerNav = document.querySelector(".artist-dropdown");
const navOptions = document.querySelectorAll(".nav-option");

// get all artist sub-sections and hide them, except the activeted one
const subSections = document.querySelectorAll(".sub-section");
const defaultSection = document.querySelector("#home"); //!this is set to
subSections.forEach((section) => {                       //! #items/#auction
  if (section === defaultSection) {                      //! temporary, default: #home.
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
});

function handleNavRouting(event) {
  //event.preventDefault();
  const hash = event.target.getAttribute("href");
  subSections.forEach((section) => {
    if (hash === "#auction"){
      window.location.href = "#auction";
    }
    if ("#" + section.id === hash) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

//event listeners to to handle rounting for the artist pages
navOptions.forEach((option) => {
  option.addEventListener("click", (section) => {
    handleNavRouting(section);
    closeWindow(burgerNav);
  });
});

//artists burger navigation dropdown functionality
burgerNavButton.addEventListener("click", () => openWindow(burgerNav));

function populateArtistHeader() {
  const storedVariable = localStorage.getItem("selectedArtistName");
  if (storedVariable) {
    const dynamicHeading = document.querySelector(".artist-name");
    dynamicHeading.textContent = storedVariable;
  }
}
