// Called from weather.js
function details() {
	const currentWeather = document.getElementById('detail_card1').innerText;
	var icon = document.getElementById('icon');

	if (currentWeather == 'Clear') {
		icon.href = '/images/sunny.svg';
	} else if (currentWeather == 'Partly Cloudy') {
		icon.href = '/images/partly.svg';
	} else if (currentWeather == 'Overcast') {
		icon.href = '/images/cloudy.svg';
	} else if (currentWeather == 'Rainy') {
		icon.href = '/images/rainy.svg';
	} else if (currentWeather == 'Thunderstorms') {
		icon.href = '/images/thunder.svg';
	}
}
