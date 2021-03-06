const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address || 'unknown'}</p>
    <p>${location.city || 'unknown'}</p>
    <p>${location.country || 'unknown'}</p>`;
};

const createWeatherHTML = (currentDay) => {
  const kelvinTemp = currentDay.main.temp;
  const Fahrenheit = kelvinToFahrenheit(kelvinTemp);
  const Celsius = kelvinToCelsius(kelvinTemp);
  const icon = `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`;
  const condition = currentDay.weather[0].description;
  return `<h2>${weekDays[new Date().getDay()]}</h2>
          <h2>Temperature: <span id="temp">${Celsius} </span><sup><span id="degC" class="selected" data-value="${Celsius}">&deg;C</span>|<span id="degF" data-value="${Fahrenheit}">&deg;F</span></sup></h2>
          <h2>Condition: ${condition}</h2>
          <div class="icon-container">
          <img src="${icon}">
          </div>`;
};

const kelvinToFahrenheit = (k) => (((k - 273.15) * 9) / 5 + 32).toFixed(0);
const kelvinToCelsius = (k) => (k - 273.15).toFixed(0);
