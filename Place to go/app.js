// Weather
let APP_ID = "f1cb380af3dd00c10dcc5dc356aa4051";
let cityName = "Ha Noi";
let weatherIcon = document.querySelector(".weather-icon");
let weatherState = document.querySelector(".weather-state");
let temperature = document.querySelector(".temperature");
let banner = document.querySelector("#banner")

//Fetch API Weather
window.addEventListener("load", (e) => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APP_ID}&units=metric`)
    .then(async res => {
        const dataWeather = await res.json();
        console.log(dataWeather);
        renderBanner(dataWeather)
    });
});    

//Render weather banner     
function renderBanner(dataWeather){
    weatherState.innerHTML = dataWeather.weather[0].description;
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`)
    temperature.innerHTML = Math.round(dataWeather.main.temp)

    if(dataWeather.weather[0].id < 800) {
      banner.style.background = "url(https://img4.thuthuatphanmem.vn/uploads/2020/08/27/anh-nen-ha-noi_054023089.jpg) no-repeat center";
  } else if(dataWeather.weather[0].id =800) {
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


//Show login modal
let loginBtn = document.getElementById('login-btn');
let loginForm = document.getElementById('login-form');
let cancelLoginBtn = document.getElementById('cancelLogin-btn');
let xLoginBtn = document.getElementById('xLogin-btn')
console.log(loginForm)

loginBtn.addEventListener('click', openLoginForm);
cancelLoginBtn.addEventListener('click', closeLoginForm);
xLoginBtn.addEventListener('click', closeLoginForm);
function openLoginForm() {
    loginForm.style.display = "flex";
};
function closeLoginForm() {
    loginForm.style.display = "none";
};

//Show sign up modal
let signUpBtn = document.getElementById('signUp-btn');
let signUpForm = document.getElementById('signUp-form');
let cancelSignUpBtn = document.getElementById('cancelSignUp-btn');
let xSignUpBtn = document.getElementById('xSignUp-btn')
console.log(signUpForm)

signUpBtn.addEventListener('click', openSignUpForm);
cancelSignUpBtn.addEventListener('click', closeSignUpForm);
xSignUpBtn.addEventListener('click', closeSignUpForm);
function openSignUpForm() {
    signUpForm.style.display = "flex";
};
function closeSignUpForm() {
    signUpForm.style.display = "none";
};
//Lưu user data vào mảng users khi ấn button Sign up
let users = [];
let submitUser = document.getElementById('submit-user');
let username = document.getElementById('username')
let password = document.getElementById('password')
let email = document.getElementById('email')
let notice = document.getElementById('login-notice')
let successBtn = document.getElementById('success-btn')
submitUser.addEventListener('click', validateForm);
function validateForm() {
    validateUsername();
    validatePassword();
    validateEmail();
    if (validateUsername() && validatePassword() && validateEmail()) {
        saveUserData();
    }
};

function saveUserData() {
    users.push({
        username: username.value,
        password: password.value,
        email: email.value
    })
    //Lưu vào local storage
    localStorage.setItem('users', JSON.stringify(users));
    closeSignUpForm();
    setTimeout(function () {
        notice.style.display = "block";
    }, 1000);
}
successBtn.addEventListener('click', function () {
    notice.style.display = "none";
});
console.log(users);

//Check login function in common.js
//Check login function
let loginUsers = [];
let submitLogin = document.getElementById('submit-login');
let usernameLogin = document.getElementById('login-username')
let passwordLogin = document.getElementById('login-password')
let noticeText = document.getElementById('notice-text')
submitLogin.addEventListener('click', validateLogin);
function validateLogin(){
    validateUserLogin();
    validateUserPW();
    if(validateUserLogin() && validateUserPW()) {
        checkLogin()
    }
}
function checkLogin() {
    let userStr = localStorage.getItem('users');
    let users = JSON.parse(userStr);
    console.log(users);
    if (users.some(user => user.username === usernameLogin.value && user.password === passwordLogin.value)) {

        closeLoginForm();
        setTimeout(function () {
            saveLoginUser()
            noticeText.innerHTML = "Login success";
            notice.style.display = "block";
            successBtn.addEventListener('click', redirectMypage)           
            //hideLoginBtn();
            //showLogoutBtn();
        }, 1000);

    } else {
        alert('Wrong username/password');
    }
}

function redirectMypage() {
    window.location.href = "../MyPage/index.html"
}
//save login user data
function saveLoginUser() {
    loginUsers.push({
        username: usernameLogin.value,
    })
    //Lưu vào local storage
    localStorage.setItem('loginUsers', JSON.stringify(loginUsers));
}
function hideLoginBtn() {
    signUpBtn.style.display = "none"
    loginBtn.style.display = "none";
}
let logoutBtn = document.getElementById('logout-btn');
let mypageBtn = document.getElementById('mypage-btn');
function showLogoutBtn() {
    logoutBtn.style.display = "block"
    mypageBtn.style.display = "block";
}
//Logout
logoutBtn.addEventListener('click', logout);
function logout() {
    setTimeout(function () {
        alert('Logout success');
        showLoginBtn()
        hideLogoutBtn()
        clearLoginUser()
    }, 1000);
}
function showLoginBtn() {
    signUpBtn.style.display = "block"
    loginBtn.style.display = "block";
}
function hideLogoutBtn() {
    logoutBtn.style.display = "none"
    mypageBtn.style.display = "none";
}
function clearLoginUser() {
    localStorage.removeItem('loginUsers');
};
//Check validate sign up
let usernameErr = document.getElementById('username-err');
let passwordErr = document.getElementById('password-err');
let emailErr = document.getElementById('email-err');
function validateEmail() {
    let emailValue = email.value;
    if (emailValue == "") {
        emailErr.innerHTML = "Please input email address!";
        return false;
    }
    let atposition = emailValue.indexOf("@");
    let dotposition = emailValue.lastIndexOf(".");
    if (atposition < 1 || dotposition < (atposition + 2) || (dotposition + 2) >= emailValue.length) {
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
let userLoginErr = document.getElementById('user-login-err');
let pwLoginErr = document.getElementById('pw-login-err');
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

//Check loginUser
let heartBtn = document.getElementById('heart-btn');
function checkLoginUser() {
    let loginUserStr = localStorage.getItem('loginUsers');
    let loginUsers = JSON.parse(loginUserStr);
    if (loginUsers === null) {
        loginBtn.style.display = "block";
        signUpBtn.style.display = "block";
        logoutBtn.style.display = "none";
        mypageBtn.style.display = "none";
        heartBtn.style.display = "none";
    } else {   
        loginBtn.style.display = "none";
        signUpBtn.style.display = "none";
        logoutBtn.style.display = "block";
        mypageBtn.style.display = "block";
        heartBtn.style.display = "block";

    }
}
checkLoginUser();
mypageBtn.addEventListener('click', redirectMypage);