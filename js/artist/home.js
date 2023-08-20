//const artistHomeSection = document.querySelector("#artist/home");
const totalItemsSold = document.querySelector(".total-items-sold span");
const totalIncome = document.querySelector(".total-income");
const liveAuctionWidget = document.querySelector(
  ".earnings-content.bg-contrast"
);

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  populateEarningsData();
  renderChart();
});

function populateEarningsData() {
  const selectedArtistName = localStorage.getItem("selectedArtistName");
  const selectedArtistData = artistItems.find(
    (item) => item.artist === selectedArtistName
  );

  if (selectedArtistData) {
    const totalItemsCount = artistItems.filter(
      (item) => item.artist === selectedArtistName
    ).length;
    const soldItemsCount = artistItems.filter(
      (item) => item.artist === selectedArtistName && item.dateSold !== null
    ).length;
    let totalIncomeCount = 0;
    artistItems.forEach((item) => {
      if (item.artist === selectedArtistName && item.dateSold !== null) {
        totalIncomeCount += item.priceSold;
      }
    });

    totalItemsSold.textContent = `${soldItemsCount}/${totalItemsCount}`;
    totalIncome.textContent = `$${totalIncomeCount}`;

    const liveAuctionItem = artistItems.find(
      (item) => item.artist === selectedArtistName && item.isAuctioning
    );
    if (liveAuctionItem) {
      const liveAuctionWidget = document.querySelector("#live-auction-widget");
      liveAuctionWidget.style.display = "block";
      liveAuctionWidget.querySelector(
        ".total-items-sold"
      ).textContent = `$${liveAuctionItem.price}`;

      // rerouting to auction on click if theres any item on auction
      liveAuctionWidget.addEventListener("click", () => {
        subSections.forEach((section) => {
          section.style.display = "none";
        });
        const auctionSection = document.querySelector("#auction");
        auctionSection.style.display = "block";
      });
    } else {
      liveAuctionWidget.style.display = "none";
    }
  } else {
    totalItemsSold.textContent = "0/0";
    totalIncome.textContent = "$0";
    liveAuctionWidget.style.display = "none";
  }
}

//____________________________________________________________________
//Chart method
let myChart = null;

const selectedArtistName = localStorage.getItem("selectedArtistName");
const dateSoldArray = getDateSoldByArtist(artistItems, selectedArtistName);

function getDateSoldByArtist(array, selectedArtistName) {
  const dateSoldArray = array
    .filter((item) => item.artist === selectedArtistName)
    .map((item) => item.dateSold); // getting all the dates that matches the local storage key artist
  return dateSoldArray.map((dateSold) => dateSold.slice(0, 10)); // formating ther data to yyyy-mm-dd
}



const buttons = document.querySelectorAll(".income-days .button");
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

//________________________________________________
//button functionality
let dateRange = 14; // default date range

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
  const clickedButton = event.target;
  dateRange = +clickedButton.textContent.split(" ")[0]; // Update dateRange based on the button clicked
  if (isNaN(dateRange)) {
    dateRange = 12;
  }

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  clickedButton.classList.add("active");

  // destroy previous chart
  if (myChart) {
    myChart.destroy();
  }

  // update and render the chart
  renderChart();
}

// rendering the chart
function renderChart() {
  const ctx = document.getElementById("myChart").getContext("2d");

  // creating array labels for the x: based on dateRange
  const filteredDateSoldArray = dateSoldArray.slice(0, dateRange);

  let dateLabels = [];
  let data = [];

  // creating the dates for the yearly option
  if (dateRange === 12) {
    const monthlyCounts = Array(12).fill(0); //empty array for the months
    dateSoldArray.forEach((dateSold) => {
      const [_, month] = dateSold.split("-");
      const monthIndex = parseInt(month) - 1;
      monthlyCounts[monthIndex]++;
    });
    data = [...monthlyCounts];

    // formatin the dates for the yaerly option
    const currentYear = new Date().getFullYear();
    for (let month = 0; month < 12; month++) {
      const monthName = new Date(currentYear, month).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long" } // yyyy mmmmmm
      );
      dateLabels.push(monthName);
    }
  } else {
    for (let dayOffset = dateRange - 1; dayOffset >= 0; dayOffset--) {
      const currentDate = new Date(); //!TESTING DATE ONLY// // new Date();
      currentDate.setDate(currentDate.getDate() - dayOffset); // ajdusting the date to current day with offset
      dateLabels.push(currentDate.toISOString().slice(0, 10)); // format to yyyy-mm-dd
    }
    data = dateLabels.map(
      (label) =>
        filteredDateSoldArray.filter((dateSold) => dateSold === label).length
    );
  }

  //_________________________________________
  // chart configs
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dateLabels,
      datasets: [
        {
          label: "# Amount",
          data: data,
          backgroundColor: ["#A16A5E"],
          hoverBackgroundColor: ["#D44C2E"],
          borderWidth: 0,
          barPercentage: 0.6,
          categoryPercentage: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            precision: 0,
            autoSkip: true,
            callback: function (value, index, values) {
              return value;
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            precision: 0,
            autoSkip: false,
            callback: function (value, index, values) {
              return value + 1;
            },
          },
        },
      },
      indexAxis: "y",
    },
  });
}
