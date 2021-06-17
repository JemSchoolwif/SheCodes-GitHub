//⏰Feature #1 In your project, display the current date and time using JavaScript//
function formatDate(date) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day} ${hour}:${min}`;
}

let today = document.querySelector("#date");
let now = new Date();
today.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

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
    <div class="col-2">
   <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
 
    <img
    src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" 
    alt="" 
    width="42"
    />
    <div class="weather-forecast-temp">
    <span class ="weather-forecast-temp-max"> ${Math.round(
      forecastDay.temp.max
    )}°C / </span>
    <span class="weather-forecast-temp-min"> ${Math.round(
      forecastDay.temp.min
    )}°C</span>
        </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "67a5bb6ae9cb9e8aa9167aebe0cc2511";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let icon = response.data.weather[0].icon;
  let temperatureElement = document.querySelector("#todayTemp");
  let cityElement = document.querySelector("#cityLocation");
  let descriptionElement = document.querySelector("#Description");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let iconElement = document.querySelector("#todayIcon");
  let precipitationElement = document.querySelector("#precipitation");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  precipitationElement.innerHTML = Math.round(response.data);
  sanitise(precipitationElement);
  function sanitise(precipitationElement) {
    if (isNaN(precipitationElement)) {
      return (precipitationElement.innerHTML = `0`);
    } else {
      return (precipitationElement.innerHTML = Math.round(response.data));
    }
  }
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "67a5bb6ae9cb9e8aa9167aebe0cc2511";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "67a5bb6ae9cb9e8aa9167aebe0cc2511";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function celsiusTemp(event) {
  event.preventDefault();
  tempCelsius.classList.add("active");
  let temperatureNow = document.querySelector("#todayTemp");
  temperatureNow.innerHTML = Math.round(celsiusTemperature);
}
function farenheitTemp(event) {
  event.preventDefault();
  tempFarenheit.classList.add("active");
  tempCelsius.classList.remove("active");
  let temperatureNow = document.querySelector("#todayTemp");
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureNow.innerHTML = Math.round(FahrenheitTemperature);
}

let celsiusTemperature = null;

let tempFarenheit = document.querySelector("#Fahrenheit");
tempFarenheit.addEventListener("click", farenheitTemp);
let tempCelsius = document.querySelector("#Celsius");
tempCelsius.addEventListener("click", celsiusTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
