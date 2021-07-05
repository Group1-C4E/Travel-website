
// Weather
function getCityName(){
const urlParams = new URLSearchParams(window.location.search);
const location = urlParams.get('location')
return location;
}

let APP_ID = "f1cb380af3dd00c10dcc5dc356aa4051";
let locationName = getCityName();
let weatherIcon = document.querySelector(".weather-icon");
let weatherState = document.querySelector(".weather-state");
let temperature = document.querySelector(".temperature");
let banner = document.querySelector("#banner");
let cityName = document.querySelector(".city-name");
let subCityName = document.querySelector(".sub-city-name")

//Fetch API Weather
window.addEventListener("load", (e) => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${APP_ID}&units=metric`)
    .then(async res => {
        const dataWeather = await res.json();
        console.log(dataWeather);
        renderBanner(dataWeather)
    });
});    

// render LocationName 

let realLocation;
if(locationName == "Thành Phố Hồ Chí Minh"){
    realLocation = "Sài Gòn" 
} else if(locationName == "Con Son"){
    realLocation = "Côn đảo"
} else if(locationName == "Phan Thiet"){
    realLocation = "Mũi Né"
} else if(locationName == "Cho Dok"){
    realLocation = "Châu Đốc"
} else if(locationName == "Duong Gjong"){
    realLocation ="Phú Quốc"
} else if(locationName =="Đồng Hới"){
    realLocation ="Phong Nha"
} else {
    realLocation = locationName;
};

//Render weather banner     
function renderBanner(dataWeather){
    weatherState.innerHTML = dataWeather.weather[0].description;
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`)
    temperature.innerHTML = Math.round(dataWeather.main.temp)
    cityName.innerHTML = realLocation;
    
    if(dataWeather.weather[0].id < 800) {
      banner.style.background = "url(https://img4.thuthuatphanmem.vn/uploads/2020/08/27/anh-nen-ha-noi_054023089.jpg) no-repeat center";
  } else if(dataWeather.weather[0].id = 800) {
      banner.style.background = "url(https://i.pinimg.com/originals/d0/5c/d9/d05cd9d63181f1c311bdd6ea41bb346c.jpg) no-repeat center";
  } else {
       banner.style.background = "url(https://img4.thuthuatphanmem.vn/uploads/2020/08/27/anh-nen-dep-ve-ha-noi_054022808.jpg) no-repeat center";
  }
};

//Render navbar-2
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

//Render Feedback 
let feedbackSection = document.getElementById("feedback-section");
let inputFeedback = document.getElementById("input-fb");
let btnFeedback = document.getElementById("btn-fb")
inputFeedback.addEventListener("click",(e) => {
    btnFeedback.style.display = "block";
});

inputFeedback.addEventListener("input",(e) => {
    btnFeedback.removeAttribute("disabled")
})

let feedbackEl;
btnFeedback.addEventListener("click",(e) => {
    feedbackEl = `
    <div class = "cmt">
        <div class="user-cmt">
        <figure class="image">
        <img class="is-rounded avatar" src="https://2sao.vietnamnetjsc.vn/images/2020/07/07/15/13/Rose.jpg">
            </figure>
            <h2><strong>Rose</strong></h2>
        </div>
        <div>
            <p>${inputFeedback.value}</p>
        </div>
    </div>`
    feedbackSection .insertAdjacentHTML("afterbegin", feedbackEl)
    btnFeedback.style.display = "none";
    inputFeedback.value = "";
});

//Detail Post
async function getDetailPost(location){
    let res = await fetch(`https://webtravel-server.herokuapp.com/posts?location=${location}`);
    let posts = await res.json();
    return posts[0];
}

async function renderPost(){
    const post = await getDetailPost(realLocation);
    //render Location-Name
    cityName.innerHTML = realLocation;

    //render Sub-location-Name
    let subCityName = post.subname; 
    let subCityNamehtml = JSON.parse(subCityName);
    console.log(subCityNamehtml);
    document.querySelector(".sub-city-name").innerHTML = subCityNamehtml; 

    // render overview
    let overview = post.overview;
    let overviewhtml = JSON.parse(overview);
    console.log(overviewhtml);
    document.getElementById("overview-content").innerHTML = overviewhtml;

    // render gallery 
    let gallery = post.gallery;
    let galleryhtml = JSON.parse(gallery);
    document.getElementById("gallery-content").innerHTML = galleryhtml;
}
renderPost();
