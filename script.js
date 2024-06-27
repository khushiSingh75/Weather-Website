document.addEventListener('DOMContentLoaded' ,()=>{
const inputBox =document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
// const searchBtn =document.querySelector('.searchBtn');
const weather_img =document.querySelector('.weather-img');
const temperature =document.querySelector('.temperature');
const description =document.querySelector('.description');
const humidity =document.getElementById('humidity');
const wind_speed =document.getElementById('wind-speed');
const location_not_found =document.querySelector('.location-not-found');
const weather_body =document.querySelector('.weather-body');
async function checkWeather(city){
    const api_key="2b39824df88c0cfc278c7aeb978f5bae";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
    try{
        const response=await fetch(url);
        const weather_data=await response.json();
   // const weather_data = await fetch('${url}').then(response=>response.json());

    if(weather_data.cod==='404'){
        location_not_found.style.display="flex";
        weather_body.style.display="none";
        console.log("City not found");
        return;
    }
    //   console.log("Weather date:", weather_data);
    //  console.log("run");
    location_not_found.style.display="none";
    weather_body.style.display="flex";
    temperature.innerHTML =`${Math.round (weather_data.main.temp -273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;

    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML=`${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src="/assets/sunCloud.png";
            break;
        case 'Clear':
            weather_img.src="/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src="/assets/rain.png";
            break;
        case 'Haze':
            weather_img.src="/assets/haze.png";
            break;
        case 'Snow':
            weather_img.src="/assets/snow.png";
            break;
        case 'Drizzle':
            weather_img.src="/assets/drizzle.png";
            break;

        // default:
        //     weather_img.src="/assets/default.png";    
        //     break;
    }
    // console.log(weather_data);
}catch(error){
    console.log("Error fetchin weather data:",error);
} 
}
searchBtn.addEventListener('click' , ()=>{
    checkWeather(inputBox.value);
    const city=inputBox.value.trim();
    if(city){
    checkWeather(city);
    }
 });
});