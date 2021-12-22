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

  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    let venues = jsonResponse["response"].groups[0].items;
    venues = venues.map((item) => item.venue);
    return venues;
  }
  return false;
};


const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}`;

  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  return false;
};

// Render functions
const renderVenues = (venues) => {
  //random indexes array
  const indxs = [];
  $venueDivs.forEach(($venue) => {
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
  $destination.append(`<h2>${venues[0].location.city || $input.val()}</h2>`);
};

const renderForecast = (day) => {
  // Add your code here:
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = async e => {
  e.preventDefault();
  if ($input.val().trim() !== "") {

    beforeSubmit();
    //Get data
    const [weather, venues] = await Promise.all([getForecast(), getVenues()]);

    if (weather && venues) {
      afterSubmit();
      //Show main container
      $container.css("visibility", "visible");
      //Show weather and venues
      renderForecast(weather)
      renderVenues(venues)
    }
    else {
      afterSubmit();
      //Hide main container
      $container.css("visibility", "hidden");
      //Show message
      alert('No information found!');
    }

  } else {
    //Show message
    alert("Please type in a city first!");
  }
};

function beforeSubmit() {
  //Disable submit button
  $('#button').attr('disabled', true);
  //Reset weather/venues containers
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  //Hide main container
  $container.css("visibility", "hidden");
  $('.status').text('Loading...')
}

function afterSubmit() {
  //Enable submit button
  $('#button').attr('disabled', false);
  //Hide status message
  $('.status').text('')
  //Reset weather/venues containers
  $venueDivs.forEach((venue) => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
}

$submit.click(executeSearch);

//Switch between between °C|°F
$(document).on("click", "#degC", function (e) {
  switchTemp(e);
  $(this).addClass('selected');
  $('#degF').removeClass('selected');
});

$(document).on("click", "#degF", function (e) {
  switchTemp(e);
  $(this).addClass('selected');
  $('#degC').removeClass('selected');
});

const switchTemp = e => {
  const value = e.target.getAttribute('data-value') + ' ';
  $('#temp').text(value);
}
