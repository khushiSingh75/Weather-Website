document.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.querySelector('.input-box');
  const searchBtn = document.querySelector('#searchBtn');
  const weather_img = document.querySelector('.weather-img');
  const temperature = document.querySelector('.temperature');
  const description = document.querySelector('.description');
  const humidity = document.getElementById('humidity');
  const wind_speed = document.getElementById('wind-speed');
  const location_not_found = document.querySelector('.location-not-found');
  const weather_body = document.querySelector('.weather-body');

  const api_key = "2b39824df88c0cfc278c7aeb978f5bae";

  async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === '404') {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
      }

      location_not_found.style.display = "none";
      weather_body.style.display = "flex";

      temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
      description.innerHTML = data.weather[0].description;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind_speed.innerHTML = `${data.wind.speed} Km/H`;

      let condition = data.weather[0].main.toLowerCase();

      switch (condition) {
        case 'clear':
          weather_img.src = "/assets/clearr.png";
          break;
        case 'clouds':
          weather_img.src = "/assets/cloudyy.png";
          break;
        case 'rain':
          weather_img.src = "/assets/rain.png";
          break;
        case 'snow':
          weather_img.src = "/assets/snow.png";
          break;
        case 'mist':
        case 'haze':
        case 'smoke':
          weather_img.src = "/assets/haze.png";
          break;
        case 'drizzle':
          weather_img.src = "/assets/drizzle.png";
          break;
        default:
          weather_img.src = "/assets/default.png";
          break;
      }

    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  }

  searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city !== "") {
      checkWeather(city);
    }
  });
});
