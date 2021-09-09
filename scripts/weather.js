console.log("Processing location")

var url = new URLSearchParams(window.location.search);
var pos = {
    lat: url.get('lat'),
    long: url.get('long')
}

var data = {
    meta: null,
    forecast: [],
    city: null
}

if(pos.lat == null || pos.long == null && pos.lat == "" || pos.long == "") {
    console.log("Could not get location from URL")
} else {
    getWeather()
}

function getWeather() {
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
            "<p>Whoops! An error was encountered!<br>We'll reload the page!</p>" +
            "<p>If the problem persists, please ensure you are within the United States and have allowed access to your location!"
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        })
    })
    .catch(function(error) {
        console.log(`Experienced error, reloading page.\r\nError message: ${error}`)
        document.getElementById("loading_text-wrapper").innerHTML +=
        "<p>Whoops! An error was encountered!<br>We'll reload the page!</p>" +
        "<p>If the problem persists, please ensure you are within the United States and have allowed access to your location!"
        setTimeout(() => {
            window.location.reload();
        }, 3000)
    })
}

// Weekly forecast
function forecast(forecastJSON) {
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

async function createCard(forecast) {
    var cardID = 'card' + forecast.number;

    // Forecast time
    var name = document.createElement('h2')
    name.innerText = forecast.name;

    //Details
    forecastSummary = summary(forecast.shortForecast)
    var detail = document.createElement('p')
    detail.innerText = forecastSummary[0]
    detail.id = `detail_${cardID}`
    var detailImg = document.createElement('img')
    detailImg.classList.add('summary')
    detailImg.src = `/images/${forecastSummary[1]}`
    detailImg.alt = forecastSummary[0]
    

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
    imgWindSpeed.setAttribute('alt', 'wind speed')
    windCont.appendChild(imgWindSpeed);
    windCont.appendChild(windSpeed);
    var imgWindDir = document.createElement('img');
    imgWindDir.classList.add(`windDir-${forecast.windDirection}`)
    imgWindDir.src = './images/windDir.svg';
    imgWindDir.setAttribute('alt', 'wind direction')
    windCont.appendChild(imgWindDir);
    windCont.appendChild(windDir);

    const card = document.getElementById(cardID);
    card.appendChild(name);
    card.appendChild(detail);
    card.appendChild(detailImg);
    card.appendChild(temp);
    card.appendChild(windCont);
    console.log('Created!')
}

async function loadPage() {
    console.log('Loading page...')
    var loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() =>
        loading.style.display = 'none'
    ,1500)
    console.log("Loaded!")
}

function summary(forecast) {
    var forecastSummary;
    if(forecast.indexOf('Sunny') != -1 || forecast.indexOf('Clear') != -1) {
        forecastSummary = ['Clear','sunny.svg',0]
    }
    if(forecast.indexOf('Cloudy') != -1 ) {
        forecastSummary = ['Overcast','cloudy.svg',2]
    }
    if(forecast.indexOf('Mostly') != -1 || forecast.indexOf('Partly') != -1) {
        forecastSummary = ['Partly Cloudy','partly.svg',1]
    }
    if(forecast.indexOf('Showers') != -1 || forecast.indexOf('Rain') != -1) {
        forecastSummary = ['Rainy','cloudy.svg',3]
    }
    if(forecast.indexOf('Thunderstorms') != -1) {
        forecastSummary = ['Thunderstorms','cloudy.svg',3]
    }
    return forecastSummary
}