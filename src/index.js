let now = new Date();
let currentTimeHour = now.getHours();
if (currentTimeHour < 10) {
  currentTimeHour = `0${currentTimeHour}`;
}
let currentTimeMinutes = now.getMinutes();
if (currentTimeMinutes < 10) {
  currentTimeMinutes = `0${currentTimeMinutes}`;
}
let currentDay = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function dispalyDayTime() {
  let dispalyDayTime = document.querySelector("#today");
  dispalyDayTime.innerHTML = `${days[currentDay]} ${currentTimeHour}:${currentTimeMinutes}`;
}

dispalyDayTime();

function search(city) {
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(getDefaultPosition);

  function getDefaultPosition(response) {
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    console.log(response);

    axios.get(apiUrl).then(displayDefaultweather);

    function displayDefaultweather(response) {
      let temprature = Math.round(response.data.main.temp);
      let weatherDescription = response.data.weather[0].description;

      let headingTemp = document.querySelector("#temp");
      let headingDescription = document.querySelector(
        "#current-weather-description"
      );

      headingTemp.innerHTML = `${temprature}°`;
      headingDescription.innerHTML = `${weatherDescription}`;
    }
  }
}

function handelSubmit(event) {
  event.preventDefault();
  let cityHeader = document.querySelector("#search-city");
  let cityInput = document.querySelector("#search-input");
  let city = `${cityInput.value}`;
  cityHeader.innerHTML = `${cityInput.value}`;
  search(city);
}

let citySearch = document.querySelector("#search-bar");

citySearch.addEventListener("submit", handelSubmit);

function showLocalWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayLocalWeather);

  function displayLocalWeather(response) {
    let temprature = Math.round(response.data.main.temp);
    let weatherDescription = response.data.weather[0].description;

    let headingTemp = document.querySelector("#temp");
    let headingDescription = document.querySelector(
      "#current-weather-description"
    );
    let headingCity = document.querySelector("#search-city");

    headingTemp.innerHTML = `${temprature}°`;
    headingDescription.innerHTML = `${weatherDescription}`;
    headingCity.innerHTML = `Outside it is`;
  }
}

function getLocalPosition() {
  navigator.geolocation.getCurrentPosition(showLocalWeather);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getLocalPosition);

search("copenhagen");
