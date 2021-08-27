navigator.geolocation.getCurrentPosition(
    getWeather,
    error,
    {
        timeout: 30000,
        maximumAge: 0
})

var data = {
    meta: null,
    time: null,
    city: null,
    forecast: [],
    time: null,
    time: null,
    time: null,
    time: null,
    time: null,
    time: null,
    time: null,
    time: null
}

function getWeather(loc) {
    const pos = {
        lat: loc.coords.latitude,
        long: loc.coords.longitude
    }

    console.log(`https://api.weather.gov/points/${pos.lat},${pos.long}`)
    fetch(`https://api.weather.gov/points/${pos.lat},${pos.long}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        data.meta = json.properties
        fetch(json.properties.forecast)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            forecast(json)
        })
    })
}

function error() {
    console.log('Encountered error, retrying to get location')
    navigator.geolocation.getCurrentPosition(
        getWeather,
        error,
        {
            timeout: 30000,
            maximumAge: 0
    })
}

async function forecast(forecastJSON) {
    data.city = `${data.meta.relativeLocation.properties.city}, ${data.meta.relativeLocation.properties.state}`
    document.getElementById('location').innerText = data.city;

    var forecastData = forecastJSON.properties.periods;
    data.forecast = [
        forecastData[0],
        forecastData[1],
        forecastData[2],
        forecastData[3],
        forecastData[4],
        forecastData[5],
        forecastData[6],
        forecastData[7],
        forecastData[8],
        forecastData[9],
        forecastData[10],
        forecastData[11],
        forecastData[12],
        forecastData[13]
    ]

    for(var i = 0; i < data.forecast.length; i++) {
        createCard(data.forecast[i])
        if(i == data.forecast.length - 1) {
            loadPage()
        }
    }

    return data
}

function createCard(forecast) {
    var order = forecast.number;
    // console.log(`card${order}` + '\r\n' + document.getElementById(`card${order}`).innerHTML)
    document.getElementById(`card${order}`).innerText = order
    console.log(forecast)
    var time = forecast.name;
}

function loadPage() {
    var loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() =>
        loading.style.display = 'none'
    ,1500)
}