let slideShowIndex = 1;
showSlides(slideShowIndex);

function plusSlides(n) {
  showSlides((slideShowIndex += n));
}

function currentSlide(n) {
  showSlides((slideShowIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideShowIndex = 1;
  }
  if (n < 1) {
    slideShowIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideShowIndex - 1].style.display = "block";
  dots[slideShowIndex - 1].className += " active";
}

// getSlide

window.addEventListener("load", getSlide());
function getSlide() {
  if (window.location.hash === "#north-vn") {
    currentSlide(1);
  } else if (window.location.hash === "#center-vn") {
    currentSlide(2);
  } else if (window.location.hash === "#south-vn") {
    currentSlide(3);
  }
}

//Feedback slideshow
let slideIndexFeedback = 1;
showSlideFeedback(slideIndexFeedback);

function showSlideFeedback() {
  var i;
  var slides = document.getElementsByClassName("feedback-user");
  var dots = document.getElementsByClassName("dot-feedback");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndexFeedback++;
  if (slideIndexFeedback > slides.length) {
    slideIndexFeedback = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexFeedback - 1].style.display = "block";
  dots[slideIndexFeedback - 1].className += " active";
  setTimeout(showSlideFeedback, 4000); // Change image every 4 seconds
}

//Show login modal
let loginBtn = document.getElementById("login-btn");
let loginForm = document.getElementById("login-form");
let cancelLoginBtn = document.getElementById("cancelLogin-btn");
let xLoginBtn = document.getElementById("xLogin-btn");
console.log(loginForm);

loginBtn.addEventListener("click", openLoginForm);
cancelLoginBtn.addEventListener("click", closeLoginForm);
xLoginBtn.addEventListener("click", closeLoginForm);
function openLoginForm() {
  loginForm.style.display = "flex";
}
function closeLoginForm() {
  loginForm.style.display = "none";
}

//Show sign up modal
let signUpBtn = document.getElementById("signUp-btn");
let signUpForm = document.getElementById("signUp-form");
let cancelSignUpBtn = document.getElementById("cancelSignUp-btn");
let xSignUpBtn = document.getElementById("xSignUp-btn");
console.log(signUpForm);

signUpBtn.addEventListener("click", openSignUpForm);
cancelSignUpBtn.addEventListener("click", closeSignUpForm);
xSignUpBtn.addEventListener("click", closeSignUpForm);
function openSignUpForm() {
  signUpForm.style.display = "flex";
}
function closeSignUpForm() {
  signUpForm.style.display = "none";
}
//Lưu user data vào mảng users khi ấn button Sign up
let users = [];
let submitUser = document.getElementById("submit-user");
let username = document.getElementById("username");
let password = document.getElementById("password");
let email = document.getElementById("email");
let notice = document.getElementById("login-notice");
let successBtn = document.getElementById("success-btn");
submitUser.addEventListener("click", validateForm);
function validateForm() {
  validateUsername();
  validatePassword();
  validateEmail();
  if (validateUsername() && validatePassword() && validateEmail()) {
    saveUserData();
  }
}

function createUser(data) {
  let options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch("https://webtravel-server.herokuapp.com/users", options)
    .then(function (response) {
      response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

function saveUserData() {
  let newUser = {     
    username: username.value,
    password: password.value,
    email: email.value,
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8JyScJ3XAm0g9mNMQ1Ws7EI6LoVgs7_HDXg&usqp=CAU"
  };
  createUser(newUser);
  closeSignUpForm();
  setTimeout(function () {
    notice.style.display = "block";
  }, 1000);
}

successBtn.addEventListener("click", function () {
  notice.style.display = "none";
});
console.log(users);

//Check login function in common.js
//Check login function
let submitLogin = document.getElementById("submit-login");
let usernameLogin = document.getElementById("login-username");
let passwordLogin = document.getElementById("login-password");
let noticeText = document.getElementById("notice-text");
submitLogin.addEventListener("click", validateLogin);
function validateLogin() {
  validateUserLogin();
  validateUserPW();
  if (validateUserLogin() && validateUserPW()) {
    checkLogin();
  }
}

async function checkLogin() {

  let res = await fetch("https://webtravel-server.herokuapp.com/users");
  users = await res.json();

  if (
    users.some((user) =>
      user.username === usernameLogin.value &&
      user.password === passwordLogin.value)) {
    console.log(users)
    let loginUser = users.find((user) =>
      user.username === usernameLogin.value &&
      user.password === passwordLogin.value)
    console.log(loginUser);

    addLoginUser(loginUser.id, loginUser.username, loginUser.password, loginUser.email)
    closeLoginForm();
    noticeText.innerHTML = "Login success";
    notice.style.display = "block";
    showLogoutBtn();
    hideLoginBtn();
    successBtn.addEventListener("click", redirectMypage);
  } else {
    alert("Wrong username/password");
  }
}

function addLoginUser(id, username, password, email) {
  localStorage.setItem('id', id)
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  localStorage.setItem('email', email)
}

function redirectMypage() {
  window.location.href = "../MyPage/index.html";
}

function hideLoginBtn() {
  signUpBtn.style.display = "none";
  loginBtn.style.display = "none";
}

let logoutBtn = document.getElementById("logout-btn");
let mypageBtn = document.getElementById("mypage-btn");

function showLogoutBtn() {
  logoutBtn.style.display = "block";
  mypageBtn.style.display = "block";
}
//Logout
logoutBtn.addEventListener("click", logout);
function logout() {
  setTimeout(function () {  
    noticeText.innerHTML = "Logout success";
    notice.style.display = "block" 
    successBtn.addEventListener('click', redirectHomepage);
    showLoginBtn();
    hideLogoutBtn();
    clearLoginUser();
  }, 1000);
}
function redirectHomepage() {
  window.location.href = "../Homepage/index.html";
}

function showLoginBtn() {
  signUpBtn.style.display = "block";
  loginBtn.style.display = "block";
}
function hideLogoutBtn() {
  logoutBtn.style.display = "none";
  mypageBtn.style.display = "none";
}

function clearLoginUser() {
  localStorage.clear()
}
//Check validate sign up
let usernameErr = document.getElementById("username-err");
let passwordErr = document.getElementById("password-err");
let emailErr = document.getElementById("email-err");
function validateEmail() {
  let emailValue = email.value;
  if (emailValue == "") {
    emailErr.innerHTML = "Please input email address!";
    return false;
  }
  let atposition = emailValue.indexOf("@");
  let dotposition = emailValue.lastIndexOf(".");
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= emailValue.length
  ) {
    emailErr.innerHTML = "Please enter a valid e-mail address!";
    return false;
  } else {
    return true;
  }
}
function validateUsername() {
  //check empty password field
  if (username.value == "") {
    usernameErr.innerHTML = "Please input username!";
    return false;
  } else {
    return true;
  }
}
function validatePassword() {
  //check empty password field
  if (password.value == "") {
    passwordErr.innerHTML = "Please input password!";
    return false;
  }

  //minimum password length validation
  if (password.value.length < 8) {
    passwordErr.innerHTML = "Password length must be at least 8 characters";
    return false;
  }

  //maximum length of password validation
  if (password.value.length > 15) {
    passwordErr.innerHTML = "Password length must not exceed 15 characters";
    return false;
  } else {
    return true;
  }
}
//Check validate login
let userLoginErr = document.getElementById("user-login-err");
let pwLoginErr = document.getElementById("pw-login-err");
function validateUserLogin() {
  if (usernameLogin.value == "") {
    userLoginErr.innerHTML = "Please input username!";
    return false;
  } else {
    return true;
  }
}
function validateUserPW() {
  if (passwordLogin.value == "") {
    pwLoginErr.innerHTML = "Please input password!";
    return false;
  } else {
    return true;
  }
}

// Search function section start
const locationsList = document.getElementById("locationsList");
const searchBar = document.getElementById("searchBar");
const locationModal = document.getElementById("locationModal");

let locationsVi = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredLocations = locationsVi.filter((location) => {
    return (
      location.location_name.toLowerCase().includes(searchString) ||
      location.region.toLowerCase().includes(searchString)
    );
  });
  console.log(location);
  if (searchString && filteredLocations.length != 0) {
    displayLocations(filteredLocations);
    locationModal.classList.add("is-active");
  } else {
    locationModal.classList.remove("is-active");
  }
});

const loadLocations = async () => {
  try {
    const res = await fetch("https://travel-website-search-fuction.herokuapp.com/travel");
    locationsVi = await res.json();
  } catch (err) {
    console.error(err);
  }
};

const displayLocations = (locations) => {
  const htmlString = locations
    .map((location) => {
      return `
           <a href="${location.url}">
            <li class="location">
                <h2>${location.location_name}</h2>
                <p>Region: ${location.region}</p>
            </li>
            </a>
        `;
    })
    .join("");
  locationsList.innerHTML = htmlString;
};
loadLocations();

// Search function section end

//Check login
async function checkLoginUser() {
  console.log(localStorage)
  if (localStorage.length === 0) {
    loginBtn.style.display = "block";
    signUpBtn.style.display = "block";
    logoutBtn.style.display = "none";
    mypageBtn.style.display = "none";
  } else {
    loginBtn.style.display = "none";
    signUpBtn.style.display = "none";
    logoutBtn.style.display = "block";
    mypageBtn.style.display = "block";
  }
}

checkLoginUser();
mypageBtn.addEventListener("click", redirectMypage);

//loadingpage
let loading = document.getElementById("loading-page");
window.addEventListener("load", loadingPage);
function loadingPage() {
  loading.style.display = "none";
}

window.addEventListener("load", getSlide());
function getSlide() {
  if (window.location.hash === "#north-vn") {
    currentSlide(1);
    console.log("1");
  } else if (window.location.hash === "#center-vn") {
    currentSlide(2);
    console.log("2");
  } else if (window.location.hash === "#south-vn") {
    currentSlide(3);
    console.log("3");
  }
}
// Feedback section
const feedback1 = document.getElementById("feedback-1");
const feedback2 = document.getElementById("feedback-2");
const feedback3 = document.getElementById("feedback-3");

let jsonComment = [];

const loadFeedback = async () => {
  try {
    const res = await fetch("https://webtravel-server.herokuapp.com/feedbacks");
    jsonComment = await res.json();
    jsonComment = jsonComment.map((comment => comment.content));
    console.log(jsonComment);
  } catch (err) {
    console.error(err);
  }
  function randomFeed() {
    let randomNum1 = Math.floor(Math.random() * jsonComment.length);
    let randomNum2 = Math.floor(Math.random() * jsonComment.length);
    let randomNum3 = Math.floor(Math.random() * jsonComment.length);
    if (randomNum1 == randomNum2 || randomNum3 == randomNum1 || randomNum2 == randomNum3) {
      return randomFeed()
    }
    else {
  
      let randomFeedback1 = jsonComment[randomNum1];
      let randomFeedback2 = jsonComment[randomNum2];
      let randomFeedback3 = jsonComment[randomNum3];
  
      feedback1.innerHTML = "<p>" + (randomFeedback1) + "</p>";
      feedback2.innerHTML = "<p>" + (randomFeedback2) + "</p>";
      feedback3.innerHTML = "<p>" + (randomFeedback3) + "</p>"
    }
  }
  randomFeed()
};
loadFeedback();
// End section
