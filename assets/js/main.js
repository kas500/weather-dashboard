//HOOKS
var searchField = document.querySelector("#searchField");
var submitBtn = document.querySelector("#submitBtn");
var citiesOptions = document.querySelector("input");
var listOfSavedCities = document.querySelector("ul");


var coordinates ="";
var state = "";

//array of cities for search history
var citiesArr = [];

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
        document.querySelector("#currentCity").innerHTML = data.name+", "+state 
        +" ("+today.format("YYYY-MM-DD h:mm:ss a")+") <img src='http://openweathermap.org/img/w/"
        + data.weather[0].icon + ".png' alt='"+data.weather[0].description+"'>";
        document.querySelector("#currentTemp").textContent = "Temp: " + Math.floor(data.main.temp) + " ℉";
        document.querySelector("#currentWind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.querySelector("#currentHum").textContent = "Humidity: " + data.main.humidity + " %";
      });
}

//get weather Forecast
async function getWeatherForecast(requestUrl) {
    const responce = await fetch(requestUrl);
    return await responce.json()
      .then(function (data) {
        console.log(data);
        //day1
        document.querySelector("#card1 img").setAttribute("src","http://openweathermap.org/img/w/"+ data.list[3].weather[0].icon + ".png");
        document.querySelector(".card-title1").textContent=data.list[3].dt_txt;
        document.querySelector("#card1 li:nth-child(1)").textContent = "Temp: " + Math.floor(data.list[3].main.temp)+ " ℉";
        document.querySelector("#card1 li:nth-child(2)").textContent = "Wind: " + data.list[3].wind.speed + " MPH";
        document.querySelector("#card1 li:nth-child(3)").textContent = "Humidity: " + data.list[3].main.humidity + " %";
        //day2
        document.querySelector("#card2 img").setAttribute("src","http://openweathermap.org/img/w/"+ data.list[11].weather[0].icon + ".png");
        document.querySelector(".card-title2").textContent=data.list[11].dt_txt;
        document.querySelector("#card2 li:nth-child(1)").textContent = "Temp: " + Math.floor(data.list[11].main.temp)+ " ℉";
        document.querySelector("#card2 li:nth-child(2)").textContent = "Wind: " + data.list[11].wind.speed + " MPH";
        document.querySelector("#card2 li:nth-child(3)").textContent = "Humidity: " + data.list[11].main.humidity + " %";
        //day3
        document.querySelector("#card3 img").setAttribute("src","http://openweathermap.org/img/w/"+ data.list[19].weather[0].icon + ".png");
        document.querySelector(".card-title3").textContent=data.list[19].dt_txt;
        document.querySelector("#card3 li:nth-child(1)").textContent = "Temp: " + Math.floor(data.list[19].main.temp)+ " ℉";
        document.querySelector("#card3 li:nth-child(2)").textContent = "Wind: " + data.list[19].wind.speed + " MPH";
        document.querySelector("#card3 li:nth-child(3)").textContent = "Humidity: " + data.list[19].main.humidity + " %";
        //day4
        document.querySelector("#card4 img").setAttribute("src","http://openweathermap.org/img/w/"+ data.list[27].weather[0].icon + ".png");
        document.querySelector(".card-title4").textContent=data.list[27].dt_txt;
        document.querySelector("#card4 li:nth-child(1)").textContent = "Temp: " + Math.floor(data.list[27].main.temp)+ " ℉";
        document.querySelector("#card4 li:nth-child(2)").textContent = "Wind: " + data.list[27].wind.speed + " MPH";
        document.querySelector("#card4 li:nth-child(3)").textContent = "Humidity: " + data.list[27].main.humidity + " %";
        //day5
        document.querySelector("#card5 img").setAttribute("src","http://openweathermap.org/img/w/"+ data.list[35].weather[0].icon + ".png");
        document.querySelector(".card-title5").textContent=data.list[35].dt_txt;
        document.querySelector("#card5 li:nth-child(1)").textContent = "Temp: " + Math.floor(data.list[35].main.temp)+ " ℉";
        document.querySelector("#card5 li:nth-child(2)").textContent = "Wind: " + data.list[35].wind.speed + " MPH";
        document.querySelector("#card5 li:nth-child(3)").textContent = "Humidity: " + data.list[35].main.humidity + " %";
      });
}

submitBtn.addEventListener("click", async function(ev){
    ev.stopPropagation();
    ev.preventDefault();
    await getCoordinates(baseUrlCity+searchField.value+"&limit="+limitCities+"&"+apiKey);
    await getWeatherCurrent(baseUrlCurrentWeather+coordinates+"&"+apiKey+"&"+units);
    await getWeatherForecast(baseUrlWeatherForecast+coordinates+"&"+apiKey+"&"+units);
    addToLocalStorage(searchField.value);
    searchField.value = "";
});

async function init(){
    await getCoordinates(baseUrlCity+"Seattle"+"&limit="+limitCities+"&"+apiKey);
    await getWeatherCurrent(baseUrlCurrentWeather+coordinates+"&"+apiKey+"&"+units);
    await getWeatherForecast(baseUrlWeatherForecast+coordinates+"&"+apiKey+"&"+units);
    
    citiesArr = (JSON.parse(localStorage.getItem("cities")) != null) ? JSON.parse(localStorage.getItem("cities")):[];
    citiesArr.forEach(element => {
      var liEl = document.createElement("li");
      liEl.textContent = element;
      liEl.setAttribute("class", " text-center my-3 btn btn-secondary btn-block");
      listOfSavedCities.appendChild(liEl);
    });
}


//add data to local storage
function addToLocalStorage(city){
  citiesArr = (JSON.parse(localStorage.getItem("cities")) != null) ? JSON.parse(localStorage.getItem("cities")):[];
  if(!(citiesArr.some(element => element  === city))){
      citiesArr.push(city);
   }
  localStorage.setItem("cities",JSON.stringify(citiesArr));
}

function removeFromLocalStorage(city){
  var citiesArr = JSON.parse(localStorage.getItem("cities"));
  return citiesArr.filter(function(el){
    return el !=city;
  });
}

init();