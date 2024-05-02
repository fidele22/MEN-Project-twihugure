const showpopup = document.querySelector('.login-btn');
const form = document.querySelector('.form-popup');
const flashmessage =document.querySelector('.login-flash');
const registerlink = document.querySelector('.register-link');
const loginlink = document.querySelector('.login-link');
const closeform = document.querySelector('.close-btn');

showpopup.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

closeform.addEventListener("click", () => {
    document.body.classList.remove("show-popup");
});

registerlink.addEventListener("click", () => {
    form.classList.add('active');
});

loginlink.addEventListener("click", () => {
    form.classList.remove('active');
});
// display flash message for login and registering credentials

flashmessage.addEventListener('click',()=>{

    document.body.classList.add('show-flash-message');
});

