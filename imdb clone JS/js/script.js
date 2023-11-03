// Setting up the base API, API: TMDB API
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzk3ZjQ5MGQ4ZWI2Y2ZhMmE3YTgyM2IxMjZmOTg4ZiIsInN1YiI6IjY0Mzg5ZjcxODFhN2ZjMDBiZTQ1Y2E5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JwDjOiVHOBOFCe-dF0eZXIebg-Fb50RU-0Ed-JyJy-o";

const headers = {
  Authorization: "Bearer " + TMDB_TOKEN,
};

const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    return err;
  }
};

let configuration = {};

const fetchedData = {};

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// Fetching configuration data which will be helpfull while integrating our api
fetchDataFromApi("/configuration").then((res) => {
  configuration.posterUrl = res.images.secure_base_url + "original";
  renderWatchlist();
});

// Top 10 movies and tv shows data
fetchDataFromApi("/trending/all/week").then((res) => {
  topTenOfTheWeek.innerHTML = "";
  fetchedData.topTenOfTheWeek = res.results.slice(10);
  fetchedData.topTenOfTheWeek.forEach((data, i) => {
    renderItem(data, i, topTenOfTheWeek, "topTenOfTheWeek");
  });
});

// Top Picks
Promise.all([
  fetchDataFromApi("/movie/top_rated"),
  fetchDataFromApi("/tv/top_rated"),
]).then((res) => {
  topPicks.innerHTML = "";
  const topRatedMovieAndTV = res[0].results
    .slice(0, 12)
    .concat(res[1].results.slice(0, 12));
  fetchedData.topPicks = topRatedMovieAndTV;
  fetchedData.topPicks.forEach((data, i) => {
    renderItem(data, i, topPicks, "topPicks");
  });
});

// Now Playing
fetchDataFromApi("/movie/now_playing").then((res) => {
  nowPlaying.innerHTML = "";
  fetchedData.nowPlaying = res.results;
  fetchedData.nowPlaying.forEach((data, i) => {
    renderItem(data, i, nowPlaying, "nowPlaying");
  });
});

const topTenOfTheWeek = document.getElementById("topTenOfTheWeek");
const topPicks = document.getElementById("topPicks");
const nowPlaying = document.getElementById("nowPlaying");
const carouselItems = document.querySelectorAll(".carousel-items");
const arrLeft = document.querySelectorAll(".arrow-left");
const arrRight = document.querySelectorAll(".arrow-right");

const navigation = (dir, element) => {
  const scrollAmount =
    dir === "left"
      ? element.scrollLeft - (element.offsetWidth + 20)
      : element.scrollLeft + (element.offsetWidth + 20);
  element.scrollTo({
    left: scrollAmount,
    behavior: "smooth",
  });
};

arrLeft.forEach((arr) => {
  arr.addEventListener("click", function (e) {
    const element = e.currentTarget.parentNode.querySelector(".carousel-items");
    navigation("left", element);
  });
});

arrRight.forEach((arr) => {
  arr.addEventListener("click", function (e) {
    const element = e.currentTarget.parentNode.querySelector(".carousel-items");
    navigation("right", element);
  });
});

const skeletonTemplate = `
<div class="skeleton-item">
  <div class="poster-block skeleton"></div>
  <div class="rating-block skeleton"></div>
  <div class="title-block skeleton"></div>
  <div class="watchlist-block skeleton"></div>
  <div class="trailer-block skeleton"></div>
</div>
          `;

carouselItems.forEach((item) => {
  for (let i = 0; i < 6; i++) {
    item.insertAdjacentHTML("beforeend", skeletonTemplate);
  }
});

function renderItem(data, ind, parentEle, sectionName) {
  const template = `
  <div class="carousel-item bg-carousel rounded-md relative">
  <!-- POSTER IMG -->
  <div class="w-full mb-4 cursor-pointer">
    <a href="#">
    <img
      src=${configuration.posterUrl + data.poster_path}
      alt="Movie or TV poster"
      class="w-full"
    />
  </a>
  </div>
  <!-- POSTER RATING -->
  <div class="w-full mb-4 px-2 flex items-center gap-1">
    <img class="w-3" src="images/star-fill.svg" alt="star icon" />
    <span class="text-grey">${Number(data.vote_average).toFixed(1)}</span>
    <button class="px-4 py-2 hover:bg-darkGrey rounded-md ml-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4 text-blue-400"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </button>
  </div>
  <!-- POSTER TITLE -->
  <a
    href="#"
    class="text-white hover:underline mb-3 px-2 w-full ellipsis h-12"
    >${ind + 1}. ${data.title || data.name}
  </a>
  <!-- operations button -->
  <div class="px-2">
    <button
    data-section-name=${sectionName}
    data-id=${data.id}
    onclick=addToWatchlist(this)
      class="w-full flex items-center py-2 bg-darkGrey rounded-md hover:bg-[#191e25] text-blue-500 justify-center mb-2 transition-colors "
    >
    ${
      watchlist.find((item) => item.id === data.id) !== undefined
        ? `<img src="images/check2.svg" alt="plus icon" class="w-6 h-6 mr-1" />`
        : `<img src="images/plus.svg" alt="plus icon" class="w-6 h-6" />`
    }
      <span class="font-bold">Watchlist</span>
    </button>
    <button class="flex items-center gap-2 py-2 px-4 mx-auto w-max hover:bg-darkGrey rounded-md mb-2">
      <img src="images/play-fill.svg" alt="plus icon" class="w-6 h-6" />
      <span class="text-white text-sm font-bold">Trailer</span>
    </button>
  </div>
  <!-- Add to watchlist hover button -->
  <div onclick=addToWatchlist(this) data-section-name=${sectionName} data-id=${
    data.id
  } class="absolute z-10 top-[-4.5px] left-[-6px] cursor-pointer addToWatchlistBtn">
    ${
      watchlist.find((item) => item.id === data.id) !== undefined
        ? `<img class="w-12 h-12" src="images/bookmark-check-fill.svg" alt="bookmark check icon">`
        : `<img class="w-12 h-12" src="images/bookmark-plus-fill.svg" alt="bookmark plus icon">`
    }
  </div>
</div>
  `;
  parentEle.insertAdjacentHTML("beforeend", template);
}

// Login & Watchlist
const signInBtnHeader = document.getElementById("header-sign-btn");
const signInBtnWatchlist = document.getElementById("watchlist-sign-btn");
const watchlistText1 = document.getElementById("watchlist-text1");
const watchlistText2 = document.getElementById("watchlist-text2");
const watchlistItems = document.getElementById("watchlist-items");
const watchlistSection = document.getElementById("watchlist-section");

const welcomeText = `
<button
onclick=logout()
class="inline-block rounded-md px-4 py-2 text-sm font-semibold  text-white hover:bg-darkGrey"
>Logout</button>
`;

function checkIfLoggedIn() {
  if (!localStorage.getItem("loggedIn")) return;

  signInBtnHeader.insertAdjacentHTML("afterend", welcomeText);
  signInBtnHeader.remove();
  watchlistText1.innerHTML = "No available releases";
  watchlistText2.innerHTML =
    "Add more shows and movies to keep track of what you want to watch.";
  signInBtnWatchlist.innerHTML = "Browse popular movies";
  signInBtnWatchlist.href = "#top10";
}

checkIfLoggedIn();

// carouselItems.forEach((item) => {
//   item.addEventListener("click", function (e) {
//     if (!e.target.closest(".addToWatchlistBtn")) return;
//     addToWatchlist(e.target.closest(".addToWatchlistBtn"));
//   });
// });

function addToWatchlist(elementDataToAdd) {
  if (!localStorage.getItem("loggedIn")) {
    window.location.replace("/login.html");
    return;
  }

  const sectionName = elementDataToAdd.getAttribute("data-section-name");
  const id = Number(elementDataToAdd.getAttribute("data-id"));

  if (sectionName === "watchlist") {
    watchlist = watchlist.filter((item) => item.id !== id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    renderWatchlist();
    return;
  }

  const data = fetchedData[sectionName].find((data) => data.id === id);
  if (watchlist.find((item) => item.id === data.id)) {
    watchlist = watchlist.filter((item) => item.id !== data.id);
  } else {
    watchlist.push(data);
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  const sectionEle = elementDataToAdd.closest(`#${sectionName}`);
  console.log(sectionEle);
  sectionEle.innerHTML = "";
  fetchedData[sectionName].forEach((data, i) => {
    renderItem(data, i, sectionEle, sectionName);
  });
  renderWatchlist();
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("watchlist");
  watchlist = [];
  location.reload();
}

function renderWatchlist() {
  if (!watchlist.length) {
    if (!watchlistSection.contains(watchlistItems)) {
      window.location.reload();
    }
    return;
  }

  if (watchlistSection.contains(watchlistItems)) {
    const carouselContainer = `
    <div class="arrow arrow-left">
          <img src="images/left-arrow.svg" alt="left arrow" />
    </div>
       <div class="arrow arrow-right">
          <img src="images/right-arrow.svg" alt="right arrow" />
    </div>
  <div id="watchlist" class="carousel-items mb-16 flex gap-5">
  <!-- Skeleton Template will be inserted here -->
  </div>
  `;
    const watchlistText = `<h3 class="mb-5 mt-[-24px] text-grey">Movies and TV shows that you have watchlisted</h3>`;

    watchlistItems.insertAdjacentHTML("beforebegin", watchlistText);
    watchlistItems.insertAdjacentHTML("afterend", carouselContainer);
    watchlistItems.remove();
  }
  const watchlistContainer = document.getElementById("watchlist");
  watchlistContainer.innerHTML = "";
  watchlist.forEach((data, i) => {
    renderItem(data, i, watchlistContainer, "watchlist");
  });
}
