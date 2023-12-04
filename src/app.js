function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
     let timeElement = document.querySelector("#time");
     let date = new Date(response.data.time * 1000);
     let iconElement = document.querySelector("#icon");
     
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    
    getForecast(response.data.city);



}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Fridy", "Saturday"];

    let day = days [date.getDay()];


    if (minutes <10){
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}



function searchCity(city){
    let apiKey = "90fb196obc3c9904fadt680fa8296a72";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);


}



function handlesearchsubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
   
    searchCity(searchInput.value);
}


function getForecast(city){
    let apiKey = "90fb196obc3c9904fadt680fa8296a72";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}$units=matric`;
    axios(apiUrl).then(displayForecast);
}



function displayForecast(response){

    let forecastHtml = "";

    response.data.daily.forEach(function (day) {
      forecastHtml =  
        forecastHtml +
        `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">Tue</div>
            <div class="weather-forecast-icon">🌤️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}º</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
            </div>
          </div>
          `;
        
    });
     let forecastElement = document.querySelector("#forecast");

    forecastElement.innerHTML = forecastHtml;

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handlesearchsubmit);

searchCity("Dubai");
displayForecast();

