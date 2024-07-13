
let slider = document.getElementById("slider");
let sliderValue = document.getElementById("sliderValue");

sliderValue.textContent = slider.value;
slider.addEventListener('input', ()=>{
    sliderValue.textContent = slider.value;
})

let uCase = document.getElementById('uCase');
let lCase = document.getElementById('lCase');
let numbers = document.getElementById('numbers');
let symbols = document.getElementById('symbols');
let btn = document.getElementById('btn');
let copyIcon = document.getElementById('copyIcon');
let inputBox = document.getElementById('inputBox');

btn.addEventListener('click' , ()=>{
    inputBox.value = genPass();
})

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*";

function genPass(){
    let allChars = "";
    let genPass = "";

    allChars += lCase.checked ? lowerChars : "";
    allChars += uCase.checked ? upperChars : "";
    allChars += numbers.checked ? allNumbers : "";
    allChars += symbols.checked ? allSymbols : "";

    if(allChars=="" || allChars.length==0){
        return genPass;
    }

    let i = 1;
    while(i<=slider.value){
        genPass += allChars.charAt(Math.floor(Math.random()*allChars.length))
        i++;
    }
    return genPass;
    
}

copyIcon.addEventListener('click' , ()=>{
    if(inputBox.value != "" || inputBox.value.length >=1){
        navigator.clipboard.writeText(inputBox.value);
        copyIcon.innerText = 'check';
        copyIcon.title = "Copied";

        setTimeout( ()=> {
            copyIcon.innerHTML = "content_copy";
        },1000);
    }
})

