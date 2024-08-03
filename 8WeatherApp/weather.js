
const input = document.querySelector('.inputBox');
const btn = document.getElementById('searchBtn');
let img = document.querySelector('.weatherImage');
const temp = document.querySelector('.temp');
const result = document.querySelector('.summary');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('windspeed');
const notFound = document.querySelector('.notFound');
const weatherBody = document.querySelector('.weatherBody');


btn.addEventListener('click' , ()=>{
    checkWeather(input.value);
})

async function checkWeather(city){
    const apiKey = "bb183d8e7b66390fb5b3cad1211b21c3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await fetch(`${url}`) .then(response => response.json());
    
    console.log(weatherData);

    if(weatherData.cod==='404'){
        notFound.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return;
    }

    notFound.style.display = "none";
    weatherBody.style.display = "flex";

    temp.innerHTML = `${Math.round(weatherData.main.temp-273.15)}°C`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    result.innerHTML = `${weatherData.weather[0].description}`;
    wind.innerHTML = `${weatherData.wind.speed}km/hr`;

    switch (weatherData.weather[0].main) {
        case "Clouds":
            img.src = "./Assets/cloud.png";
            break;
        case "Clear":
            img.src = "./Assets/clear.png";
            break;
        case "Rain":
            img.src = "./Assets/rain.png";
            break;
        case "Snow":
            img.src = "./Assets/snow.png";
            break;
    }
        
}