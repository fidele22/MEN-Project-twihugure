
// registration form validation
  document.getElementById('registrationForm').addEventListener('submit', function(event) {
   
const username = document.getElementById('username').value.trim();
const telephone = document.getElementById('telephone').value.trim();
const password = document.getElementById('password').value.trim();


    let isValid = true;

    if (username === '') {
        document.getElementById('usernameError').innerText = 'Please enter your username';
        isValid = false;
    } else {
        document.getElementById('usernameError').innerText = '';
    }

    if (telephone === '') {
        document.getElementById('telephoneError').innerText = 'Please enter your telephone number';
        isValid = false;
    } else {
        document.getElementById('telephoneError').innerText = '';
    }

    if (password === '') {
        document.getElementById('passwordError').innerText = 'Please enter your password';
        isValid = false;
    } else {
        document.getElementById('passwordError').innerText = '';
    }

    if (!isValid) {
        event.preventDefault();
    }
});

// login form validation 

document.getElementById('loginform').addEventListener('submit', function(event) {

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    

    let isValid=true;

    if(username ===''){
        document.getElementById('usernameErrormsg').innerText = 'Enter your username';
        isValid = false;
    }
    else{
        document.getElementById('usernameErrormsg').innerText = '';
    }
    if(password===''){
        document.getElementById('passwordErrormsg').innerText = 'Enter your password';
        isValid = false;
    }
    else{
        document.getElementById('passwordErrormsg').innerText = '';
    }
    if (!isValid) {
        event.preventDefault();
    }
});