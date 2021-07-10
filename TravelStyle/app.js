

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
    email: email.value
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
        user.password === passwordLogin.value)) 
      {
      console.log(users)
      let loginUser =  users.find((user) =>
      user.username === usernameLogin.value &&
      user.password === passwordLogin.value)
      console.log(loginUser);

      addLoginUser(loginUser.id,loginUser.username,loginUser.password, loginUser.email)
      closeLoginForm();
      noticeText.innerHTML = "Login success";
      notice.style.display = "block";
      showLogoutBtn();
      hideLoginBtn();
      // successBtn.addEventListener("click", redirectMypage);
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
    alert("Logout success");
    showLoginBtn();
    hideLogoutBtn();
    clearLoginUser();
  }, 1000);
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

const loadLocations = async () => {
  try {
    const res = await fetch(
      "https://travel-website-search-fuction.herokuapp.com/travel"
    );
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
window.addEventListener("load",loadingPage)
function loadingPage(){
    loading.style.display = "none"
}