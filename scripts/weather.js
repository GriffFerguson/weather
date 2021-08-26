navigator.geolocation.getCurrentPosition(
    getWeather,
    error,
    {
        timeout: 30000,
        maximumAge: 0
})

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
    console.log('Encountered error, retrying to fetch location')
    navigator.geolocation.getCurrentPosition(
        getWeather,
        error,
        {
            timeout: 30000,
            maximumAge: 0
    })
}

function forecast(data) {
    var forecastData = data.properties.periods
    var forecast = [
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
    console.table(forecast)

    for(var i = 0; i < forecast.length; i++) {
        console.log(forecast[i])
        createCard(forecast[i])
    }
}

function createCard(forecast) {
    var time = forecast.name;
}