let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");

sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', ()=>{
    sliderValue.textContent = inputSlider.value;
})

let passBox = document.getElementById("passBox");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let lowerCase = document.getElementById("lowerCase");
let upperCase = document.getElementById("upperCase");
let genButton = document.getElementById("genButton");
let copyIcon = document.getElementById("copyIcon");

genButton.addEventListener('click' , ()=>{
    // if(passBox.value != ""){
    //     passBox.value = "";
    // }
    passBox.value = generatePassword();

})

// Now we make a function to generate password
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*";

function generatePassword(){
    let genPassword = "";
    let allChars = "";

    allChars += lowerCase.checked ? lowerChars : "";
    allChars += upperCase.checked ? upperChars : "";
    allChars += numbers.checked ? allNumbers : "";
    allChars += symbols.checked ? allSymbols : "";
    
    if(allChars == "" || allChars.length == 0){
        return genPassword;
    }

    let i = 1;
    while(i<=inputSlider.value){
        genPassword += allChars.charAt(Math.floor(Math.random()*allChars.length));
        i++;
    }
    return genPassword;
}

copyIcon.addEventListener('click' , ()=>{
    if(passBox.value != "" || passBox.value.length>=1){
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied";
        
        setTimeout( ()=>{
            copyIcon.innerHTML = "content_copy";
        } , 1100);

    }
})

