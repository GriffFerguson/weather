// Called from weather.js
function details() {
	const currentWeather = document.getElementById('detail_card1').innerText;
	var icon = document.getElementById('icon');
	var bgcolor;
	var bgcolorBase = [44, 160, 255];

	if (currentWeather == 'Clear') {
		icon.href = '/images/sunny.svg';
		bgcolor = [44, 160, 255]
	} else if (currentWeather == 'Partly Cloudy') {
		icon.href = '/images/partly.svg';
		bgcolor = [139, 176, 222]
	} else if (currentWeather == 'Overcast') {
		icon.href = '/images/cloudy.svg';
		bgcolor = [105, 105, 105]
	} else if (currentWeather == 'Rainy') {
		icon.href = '/images/rainy.svg';
		bgcolor = [12, 7, 90]
	} else if (currentWeather == 'Thunderstorms') {
		icon.href = '/images/thunder.svg';
		bgcolor = [0, 0, 0]
	}
	
	document.title = `Weather for ${document.getElementById('location').innerText}`
}