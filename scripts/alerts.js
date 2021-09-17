var warningsObj = {
    label: document.getElementById('warnings-label'),
    sec: document.getElementById('warnings')
}
var param = window.location.href.split('#')[1];
if(param == 'warnings') {
    displayAlerts()
}

warningsObj.label.addEventListener('click', displayAlerts)
function displayAlerts(e) {
    if(warningsObj.sec.style.display == 'none') {
        warningsObj.sec.style.display = 'block'
        warningsObj.label.href = '#warnings'
        warningsObj.label.innerHTML = 'Weather alerts&nbsp;&nbsp;&nbsp;/\\'
    } else {
        warningsObj.sec.style.display = 'none'
        warningsObj.label.href = '#'
        warningsObj.label.innerHTML = 'Weather alerts&nbsp;&nbsp;&nbsp;\\\/'
    }
}

console.log('Beginning to gather weather alerts')
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

var warningCont = document.getElementById('warnings')
function formatAlerts(data) {
    console.log('Processing weather alerts')
    if(data.length > 0) {
        for(var i = 0; i < data.length; i++) {
            var cont = document.createElement('div')
            cont.classList.add('weather-warning-container')
            var title = document.createElement('h2')
            title.innerText = data[i].properties.event;
            var area = document.createElement('p')
            area.innerText = `Affected areas: ${data[i].properties.areaDesc}`
            var headline = document.createElement('p')
            headline.innerText = data[i].properties.headline
            var desc = document.createElement('p')
            desc.innerText = data[i].properties.description
            var instruction = document.createElement('p')
            instruction.innerText = `Instructions: ${data[i].properties.instruction}`
    
            cont.appendChild(title)
            cont.appendChild(area)
            cont.appendChild(headline)
            cont.appendChild(desc)
            cont.appendChild(instruction)
            warningCont.appendChild(cont)
    
            console.log(`Created weather alert ${i+1}`)
    
            if(i == data.length - 1) {
                loadStatus++;
                loadPage()
            }
        }
    } else {
        console.log('No alerts for this area')
        warningsObj.label.style.display = 'none'
        loadStatus++;
        loadPage()
    }
}