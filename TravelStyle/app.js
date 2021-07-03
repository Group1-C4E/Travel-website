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