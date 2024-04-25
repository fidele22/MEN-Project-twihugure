const showpopup =document.querySelector('.login-btn')
const form = document.querySelector('.form-popup')
const registerlink = document.querySelector('.register-link')
const loginlink = document.querySelector('.login-link')
const closeform = document.querySelector('.close-btn')

showpopup.addEventListener ("click",() =>{
    
    document.body.classList.toggle("show-popup");
   
});
closeform.addEventListener("click",()=>showpopup.click());

registerlink.addEventListener("click",()=>{
    form.classList.add('active')
});
loginlink.addEventListener("click",()=>{
    form.classList.remove('active')
})




function showPopup() {
    alert('Popup message from login.js');
}
/*
function closePopup() {
    document.getElementById("popup").style.display = "none";
}
**showing registration successfull message  
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const formData = new FormData(this);

    fetch("/signup", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to object
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(successfull)
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
});
*/
