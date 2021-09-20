console.log("Awaiting start in weather.js")

var data = {
    meta: null,
    forecast: [],
    city: null
}

function getWeather(lat, long) {
    console.log('Beginning to gather weather data')
    fetch(`https://api.weather.gov/points/${lat},${long}`, {
        headers: {
            'accept': 'application/geo+json'
        }
    })
    .then(function(response) {
        console.log(`Fetching data from: https://api.weather.gov/points/${lat},${long}`)
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
        console.log(`Creating card ${i + 1}`)
        createCard(data.forecast[i])
        if(i == data.forecast.length - 1) {
            console.log('Created all forecast cards')
            loadStatus++;
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

    //Details
    forecastSummary = summary(forecast.shortForecast)
    var detail = document.createElement('p')
    detail.innerText = forecastSummary[0]
    detail.id = `detail_${cardID}`
    var detailImg = document.createElement('div')
    detailImg.classList.add('summary')
    detailImg.setAttribute('style', `background-image: url('/images/${forecastSummary[1]}')`)
    detailImg.ariaLabel = forecastSummary[0]
    

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
    
    var twoCont = document.createElement('div');
    twoCont.classList.add('two-container');
    if(forecastSummary[2] != 5) {
        // Wind
        var windSpeed = document.createElement('p');
        windSpeed.innerText = forecast.windSpeed;
        var windDir = document.createElement('p');
        windDir.innerText = forecast.windDirection;

        var imgWindSpeed = document.createElement('img');
        imgWindSpeed.src = './images/windSpeed.svg';
        imgWindSpeed.setAttribute('alt', 'wind speed')
        twoCont.appendChild(imgWindSpeed);
        twoCont.appendChild(windSpeed);
        var imgWindDir = document.createElement('img');
        imgWindDir.classList.add(`windDir-${forecast.windDirection}`)
        imgWindDir.src = './images/windDir.svg';
        imgWindDir.setAttribute('alt', 'wind direction')
        twoCont.appendChild(imgWindDir);
        twoCont.appendChild(windDir);
    } else if (forecastSummary[2] == 5) {
        //Rain
        var rainChance = document.createElement('p');
        rainChance.innerText = forecast.detailedForecast.split('is ')[1].split('.')[0]
        var rainCloudImg = document.createElement('img')
        rainCloudImg.src = '/images/rainy.svg';
        rainCloudImg.alt = 'rain cloud';
        twoCont.appendChild(rainCloudImg)
        twoCont.appendChild(rainChance)
        var warning = document.createElement('a')
        warning.href = '#stay-safe'
        warning.setAttribute('onclick', 'warning()')
        warning.innerText = 'Stay safe!'
        var warningImg = document.createElement('img')
        warningImg.src = '/images/thunder.svg';
        warningImg.alt = 'thunderstorm';
        twoCont.appendChild(warningImg)
        twoCont.appendChild(warning)
    }

    const card = document.getElementById(cardID);
    card.appendChild(name);
    card.appendChild(detail);
    card.appendChild(detailImg);
    card.appendChild(temp);
    card.appendChild(twoCont);
    console.log('Created!')
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
        forecastSummary = ['Rainy','rainy.svg',3]
    }
    if(forecast.indexOf('Thunderstorms') != -1) {
        forecastSummary = ['Thunderstorms','thunder.svg',4]
    }
    if(forecast.indexOf('Tropical Storm') != -1) {
        forecastSummary = ['Tropical Storm','thunder.svg',5]
    }
    return forecastSummary
}