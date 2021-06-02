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
  document.querySelector("#cityLocation").innerHTML = response.data.name;
  document.querySelector("#todayTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "67a5bb6ae9cb9e8aa9167aebe0cc2511";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
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
  let temperatureNow = document.querySelector("#todayTemp");
  temperatureNow.innerHTML = `30°C /12°C`;
}
function farenheitTemp(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#todayTemp");
  temperatureNow.innerHTML = `86°F /54°F`;
}

let tempCelsius = document.querySelector("#Fahrenheit");
tempCelsius.addEventListener("click", farenheitTemp);
let tempFarenheit = document.querySelector("#Celsius");
tempFarenheit.addEventListener("click", celsiusTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Paris");
