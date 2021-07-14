//Show username
let loginUserStr = localStorage.getItem('username');
let emailStr = localStorage.getItem('email');
let userId = localStorage.getItem('id');
let usernameMypage = document.getElementById('username-mypage')
let usernameMyaccount = document.getElementById('myaccount-username')
let emailMyaccount = document.getElementById('myaccount-email')
function showUsername(){
    console.log(loginUserStr);
    console.log(typeof loginUserStr);
    usernameMypage.innerHTML = "Welcome back, " + loginUserStr;
    usernameMyaccount.innerHTML = "Username: " + loginUserStr;
    emailMyaccount.innerHTML = "Email address: " + emailStr;
}
showUsername();

//Logout
let logoutBtn = document.getElementById('logout-btn');
let logoutNotice = document.getElementById('logout-notice');
let successBtn = document.getElementById('success-btn');
logoutBtn.addEventListener('click', logout);

function logout() {
    setTimeout(function(){ 
        logoutNotice.style.display = "block"; 
        successBtn.addEventListener('click', redirectHomepage);
        clearLoginUser() 
    }, 1000);    
}
function redirectHomepage() {
    window.location.href = "/index.html";
};

function clearLoginUser() {
  localStorage.clear()
}

//Show my account
let myAccountBtn = document.getElementById('myAccount-btn');
let myPlaceBtn = document.getElementById('myPlace-btn');
let myAccount = document.getElementById('myAccount');
let myPlace = document.getElementById('myPlace');
myAccountBtn.addEventListener('click', showMyAccount);
function showMyAccount() {
    hideMyPlace() 
    myAccount.style.display = "block";
}
function hideMyAccount() {
    myAccount.style.display = "none";
}

//Show my places
myPlaceBtn.addEventListener('click', showMyPlace);
function showMyPlace() {
    hideMyAccount();
    myPlace.style.display = "flex";
}
function hideMyPlace() {
    myPlace.style.display = "none";
}

//Show change pw modal
let changePWBtn = document.getElementById('change-pw-btn');
console.log(changePWBtn);
let changePWForm = document.getElementById('change pw-form');
console.log(changePWForm);
let closeBtn= document.getElementById('close-btn')
let cancelChangeBtn= document.getElementById('cancel-change-btn')
changePWBtn.addEventListener('click', showChangePWModal);
closeBtn.addEventListener('click', closeChangePWModal);
cancelChangeBtn.addEventListener('click', closeChangePWModal);
function showChangePWModal(){
    changePWForm.style.display = "flex";
};

function closeChangePWModal(){
    changePWForm.style.display = "none";
};


//Change pw
let newPW = document.getElementById('change-pw');
let confirmPW = document.getElementById('confirm-pw');
let newPWErr = document.getElementById('new-pw-err');
let confirmPWErr = document.getElementById('confirm-pw-err');
function validatePW() {
    if (newPW.value == "") {
        newPWErr.innerHTML = 'Please input password';
        return false
    } else if (confirmPW.value == "") {
        confirmPWErr.innerHTML ='Please input confirm username';
        return false
    } else if (newPW.value != confirmPW.value) {
        confirmPWErr.innerHTML = 'Wrong confirm username';
        return false
    } else {
        return true
    } 
}
let submitBtn = document.getElementById('submit-change');
submitBtn.addEventListener('click', changeUserPW);
async function changeUserPW() {
    validatePW();
    if(validatePW()){
        changePW();
    }
}
let notice =document.getElementById('notice-text');
async function changePW() {
    getUser();
    postPW();
    getUser();
    closeChangePWModal();
    notice.innerHTML = "Change password success!"
    logoutNotice.style.display = "block"; 
    successBtn.addEventListener('click', function closeNotice() {
        logoutNotice.style.display = "none";
    });
}
async function getUser() {
    let res = await fetch("https://webtravel-server.herokuapp.com/users");
    let users = await res.json();
    console.log(users);
}
async function postPW() {
    let res = await fetch(`https://webtravel-server.herokuapp.com/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: loginUserStr,
            password : newPW.value,
            email: emailStr
        })
    });
}

      


//Show favorite places
async function showFavoritePlaces() {
    const favPosts = await fetch('https://webtravel-server.herokuapp.com/fav_posts');
    const jsonFavPosts = await favPosts.json();
    console.log(jsonFavPosts);
    let loginUserId = localStorage.getItem('id');
    console.log(loginUserId);
    let myFavPosts = jsonFavPosts.filter(function(item){
         return (item.userId === loginUserId);
    });
    console.log(myFavPosts);
    if (myFavPosts.length === 0) {
        myPlace.insertAdjacentHTML('afterbegin', `<p>There is no favorite place to display</p>`);
    } else {   
        for (let i = 0; i<myFavPosts.length; i++) {
        myPlace.insertAdjacentHTML('afterbegin', 
        `<div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src=${myFavPosts[i].image} alt="Placeholder image">
                    <a href="../Placetogo/index.html?location=${myFavPosts[i].location}">
                        <div class="middle">
                            <div class="text">More</div>
                        </div>
                    </a>
                </figure>
            </div>
            <div class="card-content">
                <div class="content" style="display: flex; justify-content:center">
                    <a href="../Placetogo/index.html?location=${myFavPosts[i].location}" style ="font-size: 20px">${myFavPosts[i].location}</a> 
                </div>
            </div>
        </div>`);
        } 
    }    
}
showFavoritePlaces()

//loadingpage
let loading = document.getElementById("loading-page");
window.addEventListener("load",loadingPage)
function loadingPage(){
    loading.style.display = "none"
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

//render avatar
let avatars = [
    {
        image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
        image:"https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
        image:"https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        image:"https://images.unsplash.com/photo-1555703473-5601538f3fd8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=962&q=80"
    },
    {
        image:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        image:"https://images.unsplash.com/photo-1522039553440-46d3e1e61e4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80"
    },
    {
        image:"https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1094&q=80"
    },
    {
        image:"https://images.unsplash.com/photo-1559582930-bb01987cf4dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=994&q=80"
    }
]
