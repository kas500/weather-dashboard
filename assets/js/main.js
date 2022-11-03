//HOOKS
var searchField = document.querySelector("#searchField");
var submitBtn = document.querySelector("#submitBtn");
var citiesOptions = document.querySelector("input");


var coordinates ="";
var state = "";

//current date
var today = moment();

//base API URL
var baseUrlWeatherForecast = "https://api.openweathermap.org/data/2.5/forecast?";
var baseUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q="
var baseUrlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?";

var limitCities = 1;
var units = "units=imperial";


// API key
var apiKey = "appid=81400ac056ac2215ad92e79b9c4185bb";

//get coordinates by city name
async function getCoordinates(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json() 
    .then(function(data){
        coordinates = "lat="+data[0].lat + "&lon=" + data[0].lon;
        state = data[0].state;
    });
};

//get weather Current
async function getWeatherCurrent(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json()
      .then(function (data) {
        document.querySelector("#currentCity").textContent = data.name+", "+state +"("+today.format("MM/DD/YYYY")+")";
        console.log(data);
        document.querySelector("#currentTemp").textContent = "Temp: " + data.main.temp + " ℉";
        document.querySelector("#currentWind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.querySelector("#currentHum").textContent = "Humidity: " + data.main.humidity + " %";
      });
}

//get weather Forecast
async function getWeatherForecast(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json()
      .then(function (data) {
        //cument.querySelector("#currentCity").textContent = data;
      });
}

submitBtn.addEventListener("click", async function(ev){
    ev.stopPropagation();
    ev.preventDefault();
    await getCoordinates(baseUrlCity+searchField.value+"&limit="+limitCities+"&"+apiKey);
    await getWeatherCurrent(baseUrlCurrentWeather+coordinates+"&"+apiKey+"&"+units);
    await getWeatherForecast(baseUrlWeatherForecast+coordinates+"&"+apiKey);


});