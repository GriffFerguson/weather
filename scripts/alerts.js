async function weatherAlerts() {
    fetch(`https://api.weather.gov/alerts/active?point=${pos.lat},${pos.long}`, {
        headers: {
            'accept': 'application/geo+json'
        }
    })
    .then(function(response) {
        console.log(`Fetching weather alerts from https://api.weather.gov/alerts/active?point=${pos.lat},${pos.long}`)
        return response.json()
    })
    .then(function(json) {
        formatAlerts(json.features)
    })
}

var warningCont = document.getElementById('warnings')
function formatAlerts(data) {
    console.log('Processing weather alerts')
    for(var i = 0; i < data.length; i++) {
        var weatherAlertObj = {
            name: data[i].properties.event,
            areas: data[i].properties.areaDesc,
            shortDesc: data[i].properties.headline,
            longDesc: data[i].properties.description,
        }
        var cont = document.createElement('div')
        cont.classList.add('weather-warning-container')
        var title = document.createElement('h2')
        title.innerText = data[i].properties.event;
        var area = document.createElement('p')
        area.innerText = `Affected areas: ${data[i].properties.areaDesc}`

        cont.appendChild(title)
        cont.appendChild(area)
        warningCont.appendChild(cont)
    }
}