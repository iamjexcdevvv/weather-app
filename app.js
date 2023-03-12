const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector("button");
const cityNameElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const iconElement = document.querySelector(".icon");
const descriptionElement = document.querySelector(".description");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherDataElem = document.querySelector(".weather");

const weather = {
  apiKey: "b84459078c0bb3a4527cb234e6616f57",
  fetchWeather: async function () {
    const response = await fetch(`
        https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=metric&appid=${this.apiKey}`);
    const data = await response.json();

    try {
      displayData(
        data.name,
        data.main.temp,
        data.weather[0].description,
        data.main.humidity,
        data.wind.speed,
        data.weather[0].icon
      );
    } catch (error) {
      alert("No weather found!");
    }
  },
};

function displayData(
  cityName,
  temperature,
  description,
  humidity,
  windSpeed,
  icon
) {
  document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${cityName}")`;
  cityNameElement.textContent = `Weather in ${cityName}`;
  tempElement.textContent = `${temperature}°C`;
  iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
  descriptionElement.textContent = description;
  humidityElement.textContent = `Humidity: ${humidity}%`;
  windElement.textContent = `Wind speed: ${windSpeed} km/h`;
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
