console.log('Awaiting start in hourly.js')
function getHourlyData(url) {
    fetch(url, {cache: 'no-store'})
    .then(response => {
        console.log(`Fetching hourly data from ${url}`);
        return response.json();
    })
    .then(json => {
        hourlyForecast(json)
    })
    .catch(error => {fetchError(error)})
}

function hourlyForecast(hourlyJSON) {
    console.log('Processing hourly data')
    data.hourlyForecast = hourlyJSON.properties.periods

    for(var i = 0; i < data.hourlyForecast.length; i++) {
        // console.log(`Creating hourly card ${i + 1}`)
        createHourlyCard(data.hourlyForecast[i])
        if(i == data.hourlyForecast.length - 1) {
            console.log('Created all forecast cards')
            loadStatus++;
            loadPage()
        }
    }
}

var hourlyCards = []
var hourlyCardRow = document.getElementById('hourly-card-row')
function createHourlyCard(forecast) {
    var cardID = forecast.number;
    var card = document.createElement('div')
    card.classList.add('forecast-card')
    card.classList.add('hourly')
    card.setAttribute('id',`hourly_card${cardID}`)
    card.setAttribute('value', getTime(forecast.startTime).shortDate)

    // Details
    var name = document.createElement('h2')
    name.innerText = `${getTime(forecast.startTime).time} - ${getTime(forecast.endTime).time}`
    var detail = document.createElement('p')
    var forecastSummary = summary(forecast.shortForecast)
    detail.innerText = forecastSummary[0]
    var detailImg = document.createElement('div')
    detailImg.classList.add('summary')
    detailImg.setAttribute('style', `background-image: url('/images/${forecastSummary[1]}')`)
    detailImg.setAttribute('aria-label', `${forecastSummary[0]} image`)
    detailImg.setAttribute('role', `img`)
    
    // Temperature
    var temp = document.createElement('p')
    temp.classList.add('temperature')
    temp.innerText = `${forecast.temperature}\u00B0${forecast.temperatureUnit}`;

    if (forecast.temperature >= 70) {
        temp.classList.add('hot-temp')
    } else if (forecast.temperature < 70) {
        temp.classList.add('cold-temp')
    } else if (forecast.temperature < 32) {
        temp.classList.add('freezing-temp')
    }

    // Wind
    var twoCont = document.createElement('div');
    twoCont.classList.add('two-container');

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

    card.appendChild(name)
    card.appendChild(detail)
    card.appendChild(detailImg)
    card.appendChild(temp)
    card.appendChild(twoCont)
    hourlyCards.push(card)
}

var activeHourlyCards = [];
function displayHourlyCards(date) {
    hourlyTranslation = 0;
    for(var id of activeHourlyCards) {
        document.getElementById(id).remove()   
    }
    activeHourlyCards = []
    for(var card of hourlyCards) {
        if(card.getAttribute('value') == date) {
            hourlyCardRow.appendChild(card)
            activeHourlyCards.push(card.getAttribute('id'))
        }
    }
    cards.hourly = document.getElementsByClassName('hourly')
}