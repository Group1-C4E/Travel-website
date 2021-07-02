//Show username
let usernameMypage = document.getElementById('username-mypage')
let usernameMyaccount = document.getElementById('myaccount-username')
function getLoginUsers () {
    let loginUserStr = localStorage.getItem('loginUsers');
    let loginUsers = JSON.parse(loginUserStr);
    console.log(loginUsers);
}
function showUsername(){
    getLoginUsers()
    usernameMypage.innerHTML = loginUsers[0].username;
    usernameMyaccount.innerHTML = "Username: " + loginUsers[0].username;
}
showUsername();

//Logout
let logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', logout);
function logout() {
    setTimeout(function(){ 
        alert('Logout success'); 
        redirectHomepage();
        clearLoginUser() 
    }, 1000);    
}
function redirectHomepage() {
    window.location.href = "/Homepage/index.html";
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
function validateUsername() {
    if (newUsername.value == "") {
        alert('Please input username');
        return false
    }
    if (cfUsername.value == "") {
        alert('Please input confirm username');
        return false
    } 
    if (newUsername.value != cfUsername.value) {
        alert('Wrong confirm username');
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
    //get users từ local storage
    getUsers()
    getLoginUsers();
    let index = users.findIndex(x => x.username === loginUsers[0].username);
    users[index].username = newUsername.value;
    loginUsers[0].username = newUsername.value;
    showUsername();
}
function changeUser() {
    validateUsername();
    if(validateUsername()){
        changeUsername();
    }
}
let submitBtn = document.getElementById('submit-change');
submitBtn.addEventListener('click', changeUser);