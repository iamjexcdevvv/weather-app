const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search > button");
const cityNameElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const iconElement = document.querySelector(".icon");
const descriptionElement = document.querySelector(".description");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherDataElem = document.querySelector(".weather");

const weather = {
  apiKey: "b84459078c0bb3a4527cb234e6616f57",
  async fetchWeather() {
    try {
      const response = await fetch(`
        https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=metric&appid=${this.apiKey}`);
      const data = await response.json();
      displayData(data);
    } catch (error) {
      if (!weatherDataElem.classList.contains("loading"))
        weatherDataElem.classList.add("loading");

      alert("No weather found!");
    }
  },
};

function displayData({ name, main, weather, wind }) {
  document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;
  cityNameElement.textContent = `Weather in ${name}`;
  tempElement.textContent = `${main.temp}°C`;
  iconElement.src =
    "https://openweathermap.org/img/wn/" + weather[0].icon + ".png";
  descriptionElement.textContent = weather[0].description;
  humidityElement.textContent = `Humidity: ${main.humidity}%`;
  windElement.textContent = `Wind speed: ${wind.speed} km/h`;

  weatherDataElem.classList.remove("loading");
}

searchButton.addEventListener("click", () => {
  weather.fetchWeather();
  searchBar.value = "";
});

searchBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    weather.fetchWeather();
    searchBar.value = "";
  }
});
