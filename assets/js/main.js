//HOOKS
var searchField = document.querySelector("#searchField");
var submitBtn = document.querySelector("#submitBtn");
var citiesOptions = document.querySelector("input");
var coordinates ="";

//base API URL
var baseUrlWeather = "https://api.openweathermap.org/data/2.5/forecast?";
var baseUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q="

var limitCities = 1;


// API key
var apiKey = "appid=81400ac056ac2215ad92e79b9c4185bb";

//get coordinates by city name
function getCoordinates(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        console.log(response.status);
        //  Conditional for the the response.status.
        if (response.status !== 200) {
            console.log("not found")
        }
        return response.json();
      })
      .then(function (data) {
        // Make sure to look at the response in the console and read how 404 response is structured.
        coordinates = "lat="+data[0].lat+"&lon="+data[0].lon;
      });
  }

//get weather
function getWeather(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        console.log(response.status);
        //  Conditional for the the response.status.
        if (response.status !== 200) {
            console.log("not found")
        }
        return response.json();
      })
      .then(function (data) {
        // Make sure to look at the response in the console and read how 404 response is structured.
        console.log(data);
      });
}

submitBtn.addEventListener("click", function(ev){
    ev.stopPropagation();
    ev.preventDefault();
    var requestUrl = baseUrlCity+searchField.value+"&limit="+limitCities+"&"+apiKey;
    getCoordinates(requestUrl);
});