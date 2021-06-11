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

// 🕵️‍♀️Feature #2 - Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form. //

function showTemp(response) {
  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#todayIcon");
  let windElement = document.querySelector("#Wind");
  let humidityElement = document.querySelector("#Humidity");
  let cityElement = document.querySelector("#cityLocation");
  let temperatureElement = document.querySelector("#todayTemp");
  let descriptionElement = document.querySelector("#Description");
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
      return `0`;
    }
    return (precipitationElement.innerHTML = Math.round(response.data));
  }
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
