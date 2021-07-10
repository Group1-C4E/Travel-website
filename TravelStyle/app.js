

function getStyleName(){
    const urlParams = new URLSearchParams(window.location.search);
    const style = urlParams.get('style');
    return style;
}

//Detail Post
async function getDetailPost(location){
    let res = await fetch(`https://webtravel-server.herokuapp.com/styles?location=${location}`)
    let posts = await res.json()
    return posts[0]
}
 
async function renderPost(){
    const post= await getDetailPost(getStyleName());

    //render name style 
    let nameStyle = post.name;
    document.getElementById("name-style").innerHTML = nameStyle;

    //render title
    document.title = nameStyle;
    
    //render sub name
    let subNameStyle = post.subName;
    document.getElementById("sub-name-style").innerHTML = subNameStyle; 
    
    //render banner
    let imgBanner = post.banner;
    document.getElementById("banner").style.background = `url(${imgBanner}) no-repeat center`;

    //render overview 
    let overview = post.overview;
    let overviewhtml = JSON.parse(overview);
    document.getElementById("overview-content").innerHTML = overviewhtml;
     
    // render gallery 
    let gallery = post.gallery;
    let galleryhtml = JSON.parse(gallery);
    document.getElementById("gallery-content").innerHTML = galleryhtml;

    //render places
    let places = post.places;
    let placeshtml = JSON.parse(places)
    document.getElementById("places-content").innerHTML = placeshtml; 
  


}
renderPost();


//Render navbar-2
let gallery = document.getElementById("gallery");
let overview = document.getElementById("overview");
let places = document.getElementById("places");

let galleryContent = document.getElementById("gallery-content");
let overviewContent = document.getElementById("overview-content");
let placesContent = document.getElementById("places-content");

gallery.addEventListener("click", (e) => {
    places.classList.remove("is-active");
    overview.classList.remove("is-active");
    gallery.classList.add("is-active");
    galleryContent.style.display = "block"
    overviewContent.style.display = "none"
    placesContent.style.display = "none"
});

overview.addEventListener("click", (e) => {
    places.classList.remove("is-active");
    overview.classList.add("is-active");
    gallery.classList.remove("is-active");
    galleryContent.style.display = "none"
    overviewContent.style.display = "block"
    placesContent.style.display = "none"
});

places.addEventListener("click", (e) => {
    places.classList.add("is-active");
    overview.classList.remove("is-active");
    gallery.classList.remove("is-active");
    galleryContent.style.display = "none"
    overviewContent.style.display = "none"
    placesContent.style.display = "block"
})

//loadingpage
let loading = document.getElementById("loading-page");
window.addEventListener("load",loadingPage)
function loadingPage(){
    loading.style.display = "none"
}