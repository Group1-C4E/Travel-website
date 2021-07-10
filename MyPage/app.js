//Show username
let usernameMypage = document.getElementById('username-mypage')
let usernameMyaccount = document.getElementById('myaccount-username')
function getLoginUsers () {
    let loginUserStr = localStorage.getItem('loginUsers');
    let loginUsers = JSON.parse(loginUserStr);
    console.log(loginUsers);
}
async function showUsername(){
    let res = await fetch("https://webtravel-server.herokuapp.com/users");
    loginUsers = await res.json();
    console.log(loginUsers)
    usernameMypage.innerHTML = "Welcome back, " +loginUsers[0].username;
    usernameMyaccount.innerHTML = "Username: " + loginUsers[0].username;
}
showUsername();

//Show email address
//get loginUser, get user, tìm index của object user có username trùng với login user, hiển thị email address 
let emailMyaccount = document.getElementById('myaccount-email')
// function showEmail(){
//     let userStr = localStorage.getItem('users');
//     let users = JSON.parse(userStr);
//     let loginUserStr = localStorage.getItem('loginUsers');
//     let loginUsers = JSON.parse(loginUserStr);
//     let index = users.findIndex(x => x.username === loginUsers[0].username);
//     console.log(index);
//     emailMyaccount.innerHTML = "Email address: " + users[index].email;
// }
// showEmail();
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
    window.location.href = "../Homepage/index.html";
};
function clearLoginUser() {
    localStorage.removeItem('loginUsers');
};

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

//Show change username modal
let changeUserBtn = document.getElementById('change-username-btn');
let changeUserForm = document.getElementById('change username-form');
let closeBtn= document.getElementById('close-btn')
let cancelChangeBtn= document.getElementById('cancel-change-btn')
changeUserBtn.addEventListener('click', showChangeUserModal);
closeBtn.addEventListener('click', closeChangeUserModal);
cancelChangeBtn.addEventListener('click', closeChangeUserModal);
function showChangeUserModal(){
    changeUserForm.style.display = "flex";
};

function closeChangeUserModal(){
    changeUserForm.style.display = "none";
};


//Change user name
let newUsername = document.getElementById('change-username');
let cfUsername = document.getElementById('confirm-username');
let newUserErr = document.getElementById('new-username-err');
let confirmUserErr = document.getElementById('confirm-username-err');
function validateUsername() {
    if (newUsername.value == "") {
        newUserErr.innerHTML = 'Please input username';
        return false
    } else if (cfUsername.value == "") {
        confirmUserErr.innerHTML ='Please input confirm username';
        return false
    } else if (newUsername.value != cfUsername.value) {
        confirmUserErr.innerHTML = 'Wrong confirm username';
        return false
    } else {
        return true
    } 
}
function getUsers() {
    let userStr = localStorage.getItem('users');
    let users = JSON.parse(userStr);
    console.log(users);
}
function changeUsername() {
    //get users và loginUsers từ local storage
    let userStr = localStorage.getItem('users');
    let users = JSON.parse(userStr);
    let loginUserStr = localStorage.getItem('loginUsers');
    let loginUsers = JSON.parse(loginUserStr);

    let index = users.findIndex(x => x.username === loginUsers[0].username);
    console.log(index);
    users[index].username = newUsername.value;
    loginUsers[0].username = newUsername.value;
    //lưu vào local storage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loginUsers', JSON.stringify(loginUsers));
    showUsername();
    closeChangeUserModal();
}
function changeUser() {
    validateUsername();
    if(validateUsername()){
        changeUsername();
    }
}
let submitBtn = document.getElementById('submit-change');
submitBtn.addEventListener('click', changeUser);

//Show favorite places
function showFavoritePlaces() {
    let favoritePlacesStr = localStorage.getItem('favoritePlaces');
    let favoritePlaces = JSON.parse(favoritePlacesStr);
    let loginUserStr = localStorage.getItem('loginUsers');
    let loginUsers = JSON.parse(loginUserStr);
    if (favoritePlaces === null) {
        myPlace.insertAdjacentHTML('afterbegin', `<p>There is no favorite place to display</p>`);
    } else {
        let index = favoritePlaces.findIndex(x => x.username === loginUsers[0].username);
        console.log(index);
        myPlace.insertAdjacentHTML('afterbegin', 
        `<div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src=${favoritePlaces[index].image} alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="content" style="display: flex; justify-content:center">
                    <a href="#" style ="font-size: 20px">${favoritePlaces[index].location}</a> 
                </div>
            </div>
        </div>`);
    }    
}
showFavoritePlaces()

//loadingpage
let loading = document.getElementById("loading-page");
window.addEventListener("load",loadingPage)
function loadingPage(){
    loading.style.display = "none"
}