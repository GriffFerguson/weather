console.log("Getting location")
navigator.geolocation.getCurrentPosition(
    getWeather,
    error,
    {
        timeout: 30000,
        maximumAge: 0
})

var data = {
    meta: null,
    forecast: [],
}

function getWeather(loc) {
    console.log("Processing location")
    const pos = {
        lat: loc.coords.latitude,
        long: loc.coords.longitude
    }

    fetch(`https://api.weather.gov/points/${pos.lat},${pos.long}`)
    .then(function(response) {
        console.log(`Fetching data from: https://api.weather.gov/points/${pos.lat},${pos.long}`)
        return response.json()
    })
    .then(function(json) {
        data.meta = json.properties
        fetch(json.properties.forecast)
        .then(function(response) {
            console.log(`Fetching weather data`)
            return response.json()
        })
        .then(function(json) {
            forecast(json)
        })
        .catch(function(error) {
            console.log(`Experienced error, reloading page.\r\nError message: ${error}`)
            document.getElementById("loading_text-wrapper").innerHTML +=
            "<p>Whoops! An error was encountered!<br>We'll reload the page!</p>"
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        })
    })
    .catch(function(error) {
        console.log(`Experienced error, reloading page.\r\nError message: ${error}`)
        document.getElementById("loading_text-wrapper").innerHTML +=
        "<p>Whoops! An error was encountered!<br>We'll reload the page!</p>"
        setTimeout(() => {
            window.location.reload();
        }, 2000)
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
    console.log(`Processing data`)
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
        console.log(`Creating card ${i + 1}`)
        if(i == data.forecast.length - 1) {
            loadPage()
        }
    }

    return data
}

function createCard(forecast) {
    var cardID = 'card' + forecast.number;

    // Forecast time
    var name = document.createElement('h2')
    name.innerText = forecast.name;

    // Temperature
    var temp = document.createElement('p')
    temp.classList.add('temperature')

    if (forecast.temperature >= '70') {
        temp.classList.add('hot-temp')
    } else if (forecast.temperature < 70) {
        temp.classList.add('cold-temp')
    } else if (forecast.temperature < 32) {
        temp.classList.add('freezing-temp')
    }

    temp.innerText = `${forecast.temperature}\u00B0${forecast.temperatureUnit}`;
    
    // Wind
    var windCont = document.createElement('div');
    windCont.classList.add('wind-container');
    var windSpeed = document.createElement('p');
    windSpeed.classList.add('windSpeed');
    windSpeed.innerText = forecast.windSpeed;
    var windDir = document.createElement('p');
    windDir.classList.add('windDir');
    windDir.innerText = forecast.windDirection;

    var imgWindSpeed = document.createElement('img');
    imgWindSpeed.src = './images/windSpeed.svg';
    windCont.appendChild(imgWindSpeed);
    windCont.appendChild(windSpeed);
    var imgWindDir = document.createElement('img');
    imgWindDir.classList.add(`windDir-${forecast.windDirection}`)
    imgWindDir.src = './images/windDir.svg';
    windCont.appendChild(imgWindDir);
    windCont.appendChild(windDir);

    document.getElementById(cardID).appendChild(name);
    document.getElementById(cardID).appendChild(temp);
    document.getElementById(cardID).appendChild(windCont);
    console.log('Created!')
}

function loadPage() {
    console.log('Loading page...')
    var loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() =>
        loading.style.display = 'none'
    ,1500)
    console.log("Loaded!")
}