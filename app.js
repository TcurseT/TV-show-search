const searchButton = document.querySelector(".search-button");
const searchBox = document.querySelector(".searchBox");
const showContainer = document.querySelector(".show-container");

const fetchTVSHOWS = async (query) => {
  const data = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const response = await data.json();

  showContainer.innerHTML = "";

  response.forEach((show) => {
    const showDiv = document.createElement("div");
    showDiv.classList.add("show");
    // trouble shoots for a show's name
    const showName = show.show.name ? show.show.name : "unkonown";
    const showCountry =
      show.show.network && show.show.network.country
        ? show.show.network.country.name
        : "Unknown";
    const showGenres = show.show.genres
      ? show.show.genres.join(", ")
      : "No genres listed";
    showDiv.innerHTML = `<img src="${
      show.show.image
        ? show.show.image.medium
        : "https://via.placeholder.com/210x295"
    }" alt="${showName}">
     <h3>${showName}</h3>
     <p><strong>Country:</strong> ${showCountry}</p>
     <p><strong>Genres:</strong> ${showGenres}</p>
    `;
    showContainer.appendChild(showDiv);
  });
  // console.log("heelo");
};

searchButton.addEventListener("click", (evt) => {
  evt.preventDefault(); //stops page from refreshing
  const searchInput = searchBox.value.trim(); // trim removes starting and leading spaces if any
  fetchTVSHOWS(searchInput);
  searchBox.value = "";
});
