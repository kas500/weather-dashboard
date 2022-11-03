//HOOKS
var searchField = document.querySelector("#searchField");
var submitBtn = document.querySelector("#submitBtn");

//base API URL
var baseUrlWeather = "https://api.openweathermap.org/data/2.5/forecast?";
var baseUrlCity = "http://api.openweathermap.org/geo/1.0/direct?"

// API key
var apiKey = "appid=81400ac056ac2215ad92e79b9c4185bb";

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        console.log(response.status);
        //  Conditional for the the response.status.
        if (response.status !== 200) {
          // Place the response.status on the page.
          responseText.textContent = response.status;
        }
        return response.json();
      })
      .then(function (data) {
        // Make sure to look at the response in the console and read how 404 response is structured.
        console.log(data);
      });
  }