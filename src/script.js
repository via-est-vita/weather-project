function currentLocation() {
  navigator.geolocation.getCurrentPosition(locationInfo);
}

function locationInfo(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrlGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ce0c7105215e5edf62df68b7e027e804`;
  axios.get(apiUrlGeoLocation).then(watchWeather);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    ` 
            <div class="col-2">
              <div class="weather-forecast-date">WED</div>
              <img class="weather-forecast-icon" src="./img/01d.png.png" />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> 30° </span>
                <br />
                <span class="weather-forecast-temperature-min"> 16° </span>
              </div>
            </div>
          `;
          
          forecastHTML = forecastHTML + `</div>`;
          forecastElement.innerHTML = forecastHTML;
}

// function formatDay(timestamp) {
//   let date = new Date(timestamp * 1000);
//   let day = date.getDay();
//   let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//   return days[day];
// }
// function displayForecast(response) {
//   let forecast = response.data.daily;
//   let forecastElement = document.querySelector("#forecast");
//   let forecastHTML = `<div class="row">`;

//   forecast.forEach(function (forecastDay, index) {
//     if (index < 4) {
//       forecastHTML =
//         forecastHTML +
//         `
//             <div class="col-2">
//               <div class="weather-forecast-date">${formatDay(
//                 forecastDay.dt
//               )}</div>

//               // <img class="weather-forecast-icon"
//               // src="./img/01d.png.png" />

//               <div class="weather-forecast-temperatures">
//                 <span class="weather-forecast-temperature-max"> ${Math.round(
//                   forecastDay.temp.max
//                 )}° </span>
//                 <br />
//                 <span class="weather-forecast-temperature-min"> ${Math.round(
//                   forecastDay.temp.min
//                 )}° </span>
//               </div>
//             </div>
//         `;
//     }
//   });

//   forecastHTML = forecastHTML + `</div>`;
//   forecastElement.innerHTML = forecastHTML;
// }

// function getForecast(coordinates) {
//   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}}&units=metric&appid=ce0c7105215e5edf62df68b7e027e804`;
//   axios.get(apiUrl).then(displayForecast);
// }

function watchWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  celciusTemp = response.data.main.temp;

  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#precipitation").innerHTML = response.data.clouds.all;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = document.querySelector(".weather-icon");
  let imageNumber = response.data.weather[0].icon;
  icon.setAttribute("src", `./img/${imageNumber}.png.png`);

  // getForecast(response.data.coord);
}

function showDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let todayNow = new Date();
  let day = days[todayNow.getDay()];
  let hours = addZero(todayNow.getHours());
  let minutes = addZero(todayNow.getMinutes());

  return `${day} ${hours}:${minutes}`;
}
document.getElementById("current-date").innerHTML = showDate();

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let apiKey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ce0c7105215e5edf62df68b7e027e804`;
  axios.get(apiKey).then(watchWeather);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  convertUnitC.classList.remove("active");
  convertUnitF.classList.add("active");
  let convertUnits = document.querySelector("#temperature");
  convertUnits.innerHTML = Math.round(fahrenheitTemp);
}

function changeCelcius(event) {
  event.preventDefault();
  convertUnitC.classList.add("active");
  convertUnitF.classList.remove("active");
  let convertUnits = document.querySelector("#temperature");
  convertUnits.innerHTML = Math.round(celciusTemp);
}

let search = document.querySelector(".button");
search.addEventListener("click", showCity);

let celciusTemp = null;

let convertUnitF = document.querySelector("#fahrenheit-link");
convertUnitF.addEventListener("click", changeFahrenheit);

let convertUnitC = document.querySelector("#celcius-link");
convertUnitC.addEventListener("click", changeCelcius);

displayForecast();
