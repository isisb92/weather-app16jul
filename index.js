function formatDate(timestamp) {
  let now = new Date(timestamp * 1000);

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
  let dayIndex = days[now.getDay()];
  let monthIndex = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${dayIndex}, ${monthIndex} ${now.getDate()}, ${now.getFullYear()} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 daily-forecast" >
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          width="60"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "8347db1ca3b38e46f3cca5o408t75e50";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response);
  let tempElement = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#result-city");
  let descriptionElement = document.querySelector(
    "#current-weather-description"
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  let celsiusTemperature = response.data.temperature.current;
  console.log(response.data.temperature.current);

  tempElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.time);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}
function showCurrentCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiKey = "8347db1ca3b38e46f3cca5o408t75e50";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemp);
    console.log(apiUrl);
  }
}

function search(city) {
  let units = "metric";
  let apiKey = "8347db1ca3b38e46f3cca5o408t75e50";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?query=";
  let apiUrl = `${apiEndpoint}${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#new-city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

let myPlace = document.querySelector("#current-place");
myPlace.addEventListener("click", showCurrentCity);

search("Paris");
