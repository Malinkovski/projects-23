// JavaScript
const URL_API = "https://jsonplaceholder.typicode.com/users";
const LANDING_PAGE = "landing-page";
const PAGE_CLASS_NAME = ".page-section";
const loadingDiv = document.querySelector("#loading");
const error404Page = document.querySelector("#not-found");

// Loading page in case of slow network connection
const showLoading = () => (loadingDiv.style.display = "flex"); 
const hideLoading = () => (loadingDiv.style.display = "none");

function handleError404(flag) {
  if (!flag) {
    error404Page.style.display = "flex";
    document.title = "404 Error - ARTists";
  } else {
    error404Page.style.display = "none";
  }
}

function handleRouting() {
  const hash = window.location.hash;
  const sections = document.querySelectorAll(PAGE_CLASS_NAME);
  let pageFlag = false;

  sections.forEach((section) => {
    if ("#" + section.id === hash) {
      section.style.display = "block";
      // Changing title depending on the hash change of each page
      switch (hash) {
        case "#landing-page":
          document.title = "Home - ARTists";
          break;
        case "#artist/home":
          document.title = `${localStorage.getItem(
            "selectedArtistName"
          )} - ARTists`;
          break;
        case "#auction":
          document.title = "Auction - ARTists";
          break;
        case "#visitor-page":
          document.title = "Visitor - ARTists";
          break;
        case "#listing-page":
          document.title = "Art listing - ARTists";
          break;
        case "#listing-page":
          document.title = "Art listing - ARTists";
          break;

        default:
          console.log(hash); //!test
          document.title = "ARTists";
      }
      pageFlag = true;
    } else {
      section.style.display = "none";
    }
  });
  handleError404(pageFlag);
}

let reloadFlag = true;

window.addEventListener("hashchange", function () {
  if (
    (window.location.hash === "#visitor-page" ||
      window.location.hash === "#artist/home") &&
    reloadFlag
  ) {
    reloadFlag = false; // Set the flag to false to prevent reloads
    window.location.reload();
  } else {
    reloadFlag = true; // Reset the flag for other hash changes
    handleRouting();
  }
});

showLoading();

document.addEventListener("DOMContentLoaded", function () {
  hideLoading();
  handleRouting();
});

if (!window.location.hash || window.location.hash === "#") {
  window.location.hash = LANDING_PAGE;
}
