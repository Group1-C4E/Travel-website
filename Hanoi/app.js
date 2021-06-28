// Weather
let APP_ID = "f1cb380af3dd00c10dcc5dc356aa4051";
let cityName = "Ha Noi";
let weatherIcon = document.querySelector(".weather-icon");
let weatherState = document.querySelector(".weather-state");
let temperature = document.querySelector(".temperature");

window.addEventListener("load", (e) => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APP_ID}&units=metric`)
    .then(async res => {
        let dataWeather = await res.json();
        console.log(dataWeather);
        weatherState.innerHTML = dataWeather.weather[0].description;
        weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`)
        temperature.innerHTML = Math.round(dataWeather.main.temp)
    });
});    

//Change nav-2
let gallery = document.getElementById("gallery");
let overview = document.getElementById("overview");
let feedback = document.getElementById("feedback");

let galleryContent = document.getElementById("gallery-content");
let overviewContent = document.getElementById("overview-content");
let feedbackContent = document.getElementById("feedback-content");

gallery.addEventListener("click", (e) => {
    feedback.classList.remove("is-active");
    overview.classList.remove("is-active");
    gallery.classList.add("is-active");
    galleryContent.style.display = "block"
    overviewContent.style.display = "none"
    feedbackContent.style.display = "none"
});

overview.addEventListener("click", (e) => {
    feedback.classList.remove("is-active");
    overview.classList.add("is-active");
    gallery.classList.remove("is-active");
    galleryContent.style.display = "none"
    overviewContent.style.display = "block"
    feedbackContent.style.display = "none"
});

feedback.addEventListener("click", (e) => {
    feedback.classList.add("is-active");
    overview.classList.remove("is-active");
    gallery.classList.remove("is-active");
    galleryContent.style.display = "none"
    overviewContent.style.display = "none"
    feedbackContent.style.display = "block"
})





