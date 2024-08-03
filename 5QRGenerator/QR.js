const inputText = document.getElementById('inputText');
const sizes = document.getElementById('sizes');
const genBtn = document.getElementById('genBtn');
let loadBtn = document.getElementById('loadBtn');

const qrBody = document.querySelector('.qr-body');

let size = sizes.value;

genBtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    isEmptyInput();
});

loadBtn.addEventListener('click' , ()=>{
    let img = document.querySelector('.qr-body img');
    if(img !== NULL){
        let imgAttribute = img.getAttribute('src');
        loadBtn.setAttribute("href",imgAttribute);
        // By this we set our attribute in href
    }
    else{
        loadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
        // By this (canvas) we get a blank rectangle. Because if once download button is clicked , there must be downloading.
    }
})

sizes.addEventListener('change',(ele)=>{
    size = ele.target.value;
    isEmptyInput();
})

function isEmptyInput(){
    if(inputText.value.length>0){
        genQRcode();
    }
    else{
        alert("Please, enter your text or URL to generate QR code");
    }

    // inputText.value.length > 0 ? genQRcode() : alert("Please, enter your text or URL to generate QR code");
}


function genQRcode(){
    qrBody.innerHTML = "";
    new QRCode(qrBody,{
        text: inputText.value,
        height:size,
        width: size,
        colorLight: "#fff",
        colorDark: "#000",
    });
}

