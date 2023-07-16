let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weatherDate = document.querySelector("#weatherCurrentDate");
let dayIndex = now.getDay();
let monthIndex = now.getMonth();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

weatherDate.innerHTML = `${days[dayIndex]} ${
  months[monthIndex]
} ${now.getDate()}, ${now.getFullYear()} ${hours}:${minutes}`;

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let newTempCity = document.querySelector("#currentTemp");
  newTempCity.innerHTML = `${temp}`;
  let searchCityWeatherDescription = response.data.weather[0].description;
  let weatherDescription = document.querySelector(
    "#current-weather-description"
  );
  weatherDescription.innerHTML = `${searchCityWeatherDescription}`;
  console.log(response.data.name);
}

function searchBtn(event) {
  event.preventDefault();
  let newSearchedCity = document.querySelector("#new-city-input");
  let currentCity = document.querySelector("#result-city");
  currentCity.innerHTML = `${newSearchedCity.value}`;
  let units = "metric";
  let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${newSearchedCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

let newCity = document.querySelector("#search-city-form");
newCity.addEventListener("submit", searchBtn);

function changeF() {
  let newTempF = document.querySelector("#currentTemp");
  newTempF.innerHTML = "88";
}
let fTemp = document.querySelector("#f-unit");
fTemp.addEventListener("click", changeF);

function showTempCurrent(response) {
  let tempCurrent = Math.round(response.data.main.temp);
  let currentTempCity = document.querySelector("#currentTemp");
  currentTempCity.innerHTML = `${tempCurrent}`;
  let currentCityName = document.querySelector("#result-city");
  currentCityName.innerHTML = response.data.name;
  let currentWeatherDescription = response.data.weather[0].description;
  let weatherDescriptionCurrent = document.querySelector(
    "#current-weather-description"
  );
  weatherDescriptionCurrent.innerHTML = `${currentWeatherDescription}`;

  console.log(response.data.name);
}

function showCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units2 = "metric";
    let apiKey2 = "5aac6d0188c6f17d6d2bbe6591b6fef0";
    let apiEndpoint2 = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl2 = `${apiEndpoint2}&lat=${lat}&lon=${lon}&appid=${apiKey2}&units=${units2}`;
    axios.get(apiUrl2).then(showTempCurrent);
  }
}
let myPlace = document.querySelector("#current-place");
myPlace.addEventListener("click", showCurrentCity);
