// Weather
let APP_ID = "f1cb380af3dd00c10dcc5dc356aa4051";
let cityName = "Ha Noi";
let weatherIcon = document.querySelector(".weather-icon");
let weatherState = document.querySelector(".weather-state");
let temperature = document.querySelector(".temperature");

window.addEventListener("load", (event) => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APP_ID}&units=metric`)
    .then(async res => {
        let dataWeather = await res.json();
        console.log(dataWeather);
        weatherState.innerHTML = dataWeather.weather[0].description;
        weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`)
        temperature.innerHTML = Math.round(dataWeather.main.temp)
    });
});    
