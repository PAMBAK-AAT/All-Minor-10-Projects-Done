const title = document.getElementById('title');
const nameField = document.getElementById('namefield');
const loginBtn = document.getElementById('btn');
const signUpBtn = document.getElementById('sign');

signUpBtn.onclick = function(){
    title.innerHTML = "Sign Up";
    nameField.style.display = "block";
    loginBtn.value = "Sign Up";
}

loginBtn.onclick = function(){
    title.innerHTML = "Login";
    nameField.style.display = "none";
    loginBtn.value = "Login";
}