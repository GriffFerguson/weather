console.log("Awaiting start in weather.js")

var data = {
    meta: null,
    forecast: [],
    hourlyForecast: [],
    city: null
}

function getWeather(lat, long) {
    console.log('Beginning to gather weather data')
    fetch(`https://api.weather.gov/points/${lat},${long}`, {
        headers: {
            'accept': 'application/geo+json'
        },
        cache: 'no-cache'
    })
    .then(function(response) {
        console.log(`Fetching data from: https://api.weather.gov/points/${lat},${long}`)
        return response.json()
    })
    .then(function(json) {
        data.meta = json.properties
        getHourlyData(json.properties.forecastHourly)
        fetch(json.properties.forecast, {cache: 'no-cache'})
        .then(function(response) {
            console.log(`Fetching weather data`)
            return response.json()
        })
        .then(function(json) {
            forecast(json)
        })
        .catch(error => {fetchError(error)})
    })
    .catch(error => {fetchError(error)})
}

// Weekly forecast
function forecast(forecastJSON) {
    console.log(`Processing data`)
    data.city = `${data.meta.relativeLocation.properties.city}, ${data.meta.relativeLocation.properties.state}`
    document.getElementById('location').innerText = data.city;

    data.forecast = forecastJSON.properties.periods;

    for(var i = 0; i < data.forecast.length; i++) {
        // console.log(`Creating card ${i + 1}`)
        createCard(data.forecast[i])
        if(i == data.forecast.length - 1) {
            console.log('Created all forecast cards')
            loadStatus++;
            loadPage()
        }
    }
}

function createCard(forecast) {
    var cardID = 'card' + forecast.number;
    const card = document.getElementById(cardID);


    // Forecast time
    var name = document.createElement('h2')
    name.innerText = forecast.name;
    card.setAttribute('value', getTime(forecast.startTime).shortDate)

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

    if (forecast.temperature >= 70) {
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
        imgWindSpeed.src = '/images/windSpeed.svg';
        imgWindSpeed.setAttribute('alt', 'wind speed')
        twoCont.appendChild(imgWindSpeed);
        twoCont.appendChild(windSpeed);
        var imgWindDir = document.createElement('img');
        imgWindDir.classList.add(`windDir-${forecast.windDirection}`)
        imgWindDir.src = '/images/windDir.svg';
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

    card.appendChild(name);
    card.appendChild(detail);
    card.appendChild(detailImg);
    card.appendChild(temp);
    card.appendChild(twoCont);
    // console.log('Created!')
}