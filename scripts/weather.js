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
            'accept': 'application/geo+json',
        },
        cache: 'no-store'
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        console.log(`Fetching data from: ${json.properties.forecast}`)
        data.meta = json.properties
        getHourlyData(json.properties.forecastHourly)
        fetch(json.properties.forecast, {cache: 'no-store'})
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
    card.setAttribute('value', getTime(forecast.startTime).shortDate)
    var name = document.createElement('h2')
    name.setAttribute('id', `name_${cardID}`)
    name.innerText = forecast.name;
    var date = document.createElement('h3')
    date.setAttribute('id', `date_${cardID}`)
    date.innerText = getTime(forecast.startTime).date
    date.classList.add('date')

    //Details
    forecastSummary = summary(forecast.shortForecast)
    var detail = document.createElement('p')
    detail.innerText = forecastSummary[0]
    detail.id = `detail_${cardID}`
    var detailImg = document.createElement('div')
    detailImg.classList.add('summary')
    detailImg.setAttribute('style', `background-image: url('/images/${forecastSummary[1]}')`)
    detailImg.setAttribute('aria-label', `${forecastSummary[0]} image`)
    detailImg.setAttribute('role', `img`)
    detailImg.setAttribute('id', `img_${cardID}`)
    
    // Temperature
    var temp = document.createElement('p')
    temp.classList.add('temperature')
    temp.setAttribute('id', `temp_${cardID}`)

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
    twoCont.setAttribute('id', `cont_${cardID}`)
    if(forecastSummary[2] != 5) {
        // Wind
        var windSpeed = document.createElement('p');
        windSpeed.innerText = forecast.windSpeed;
        windSpeed.setAttribute('id', `windSpeed_${cardID}`)
        var windDir = document.createElement('p');
        windDir.innerText = forecast.windDirection;
        windDir.setAttribute('id', `windDirection_${cardID}`)

        var imgWindSpeed = document.createElement('img');
        imgWindSpeed.src = '/images/windSpeed.svg';
        imgWindSpeed.setAttribute('alt', 'wind speed')
        imgWindSpeed.setAttribute('id', `windSpeedImg_${cardID}`)
        twoCont.appendChild(imgWindSpeed);
        twoCont.appendChild(windSpeed);
        var imgWindDir = document.createElement('img');
        imgWindDir.classList.add(`windDir-${forecast.windDirection}`)
        imgWindDir.src = '/images/windDir.svg';
        imgWindDir.setAttribute('alt', 'wind direction')
        imgWindDir.setAttribute('id', `windDireectionImg_${cardID}`)
        twoCont.appendChild(imgWindDir);
        twoCont.appendChild(windDir);
    } else if (forecastSummary[2] == 5) {
        //Rain
        var rainChance = document.createElement('p');
        rainChance.innerText = forecast.detailedForecast.split('is ')[1].split('.')[0]
        rainChance.setAttribute('id', `rainChance_${cardID}`)
        var rainCloudImg = document.createElement('img')
        rainCloudImg.src = '/images/rainy.svg';
        rainCloudImg.alt = 'rain cloud';
        rainCloudImg.setAttribute('id', `rainImg_${cardID}`)
        twoCont.appendChild(rainCloudImg)
        twoCont.appendChild(rainChance)
        var warning = document.createElement('a')
        warning.href = '#stay-safe'
        warning.setAttribute('onclick', 'warning()')
        warning.innerText = 'Stay safe!'
        warning.setAttribute('id', `warning_${cardID}`)
        var warningImg = document.createElement('img')
        warningImg.src = '/images/thunder.svg';
        warningImg.alt = 'thunderstorm';
        setAttribute('id', `warningImg_${cardID}`)
        twoCont.appendChild(warningImg)
        twoCont.appendChild(warning)
    }

    card.appendChild(name);
    card.appendChild(date);
    card.appendChild(detail);
    card.appendChild(detailImg);
    card.appendChild(temp);
    card.appendChild(twoCont);
    // console.log('Created!')
}