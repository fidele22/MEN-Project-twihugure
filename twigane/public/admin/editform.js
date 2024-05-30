const showpopup = document.querySelector('.edit-btn');
const form = document.querySelector('.editandupdate');
const flashmessage =document.querySelector('.login-flash');
const closeform = document.querySelector('.close-btn');

showpopup.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

closeform.addEventListener("click", () => {
    document.body.classList.remove("show-popup");
});


// display flash message for login and registering credentials

flashmessage.addEventListener('click',()=>{

    document.body.classList.add('show-flash-message');
});

