const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/weather",
};

// Add an event listener to search-box
//keypress...call a method... setQuery

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  console.log(e);
  if (e.keyCode === 13) {
    getWeatherInfo(searchBox.value);
  }
}

function getWeatherInfo(cityName) {
  const url = `${api.base}?q=${cityName}&units=metric&appid=${api.key}`;
  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((weatherInfo) => {
      console.log(weatherInfo);
      if (weatherInfo.cod === 200) {
        displayResults(weatherInfo);
      } else {
        alert(weatherInfo.message);
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
}

function displayResults(weatherInfo) {
  console.log("Display to be updated");
  // city=> weatherInfo.name & weatherInfo.sys.coutry
  // temp => weatherInfo.main.temp

  // weather => weatherInfo.weather[0].main
  // hi-low => min& max temp to be displayed
  let city = document.querySelector(".city");
  city.innerText = `${weatherInfo.name}, ${weatherInfo.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weatherInfo.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weatherInfo.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weatherInfo.main.temp_min)}°c / ${Math.round(
    weatherInfo.main.temp_max
  )}°c`;
}

function dateBuilder(d){
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  // return `${day}, ${date} ${month} ${year}`;

  const formatOptions = {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  };
  return d.toLocaleDateString("en-US",formatOptions);
}