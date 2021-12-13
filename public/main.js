// Foursquare API Info
const clientId = "PU3IY1PZEOOANTPSHKNMS5HFSMEGEQ1IAVJYGYM4YVZP3NGD";
const clientSecret = "0V21IXU0EETE3SZJGGCP4T4R13NUTBJ0LMI5WQY45IMDPEKY";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// OpenWeather Info
const openWeatherKey = "2b6d546ac75ba193d54e26e2c4d04d29";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// Page Elements
const limit = 10;
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=${limit}&client_id=${clientId}&client_secret=${clientSecret}&v=20211212`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      let venues = jsonResponse["response"].groups[0].items;
      venues = venues.map((item) => item.venue);
      return venues;
    }
    throw new Error("Request failed!");
  } catch (e) {
    console.log(e);
  }
};

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error("Request failed!");
  } catch (e) {
    console.log(e);
  }
};

// Render functions
const renderVenues = (venues) => {
  //random indexes array
  const indxs = [];
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:

    //Generate index between 0 and limit
    let rndIndx = Math.floor(Math.random() * limit);
    //Check if index is unique in indxs
    while (indxs.includes(rndIndx)) {
      rndIndx = Math.floor(Math.random() * limit);
    }
    indxs.push(rndIndx);

    const venue = venues[rndIndx];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  console.log(indxs);
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  // Add your code here:
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = (e) => {
  e.preventDefault();
  if ($input.val().trim() !== "") {
    $venueDivs.forEach((venue) => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues().then((venues) => renderVenues(venues));
    getForecast().then((forecast) => renderForecast(forecast));
  } else {
    alert("Please type in a city first!");
  }
};

$submit.click(executeSearch);
