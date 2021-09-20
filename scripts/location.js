console.log("Getting location")

//Search URL
var loc_url = new URLSearchParams(window.location.search);
var loc_pos = {
    lat: loc_url.get('lat'),
    long: loc_url.get('long')
}

//
if(loc_pos.lat == null || loc_pos.long == null && loc_pos.lat == "" || loc_pos.long == "") {
    console.log("Could not get location from URL")
    navigator.geolocation.getCurrentPosition(
        redirect,
        error,
        {
            timeout: 30000,
            maximumAge: 0
    })
} else {
    console.log("Location received in URL")
    getWeather(loc_pos.lat, loc_pos.long); //weather.js
    weatherAlerts(loc_pos.lat, loc_pos.long); //alerts.js
}

function redirect(loc) {
    console.log(`${window.location.href.split('?')[0]}?lat=${loc.coords.latitude}&long=${loc.coords.longitude}`)
    window.location.replace(`${window.location.href.split('?')[0]}?lat=${loc.coords.latitude}&long=${loc.coords.longitude}`)
}

function error() {
    console.log('Encountered error receiving location')
    alert('Whoops! We couldn\'t find your location! please!\nPlease click change the permissions for this site to let us access your current location.')
}