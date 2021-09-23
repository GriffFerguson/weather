function getHourlyData(url) {
    fetch(url)
    .then(response => {
        console.log(`Fetching hourly data from ${url}`);
        return response.json();
    })
    .then(json => {
        hourlyForecast(json)
    })
}

function hourlyForecast(hourlyJSON) {
    console.log('Processing hourly data')
}