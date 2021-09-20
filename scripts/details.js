// Called from utilities.js
var bgcolorBase = [44, 160, 255];
function details() {
	const currentWeather = document.getElementById('detail_card1').innerText;
	var icon = document.getElementById('icon');

	console.log(currentWeather)

	if (currentWeather == 'Clear') {
		icon.href = '/images/sunny.svg';
		setColor([44, 160, 255])
	} else if (currentWeather == 'Partly Cloudy') {
		icon.href = '/images/partly.svg';
		setColor([139, 176, 222])
	} else if (currentWeather == 'Overcast') {
		icon.href = '/images/cloudy.svg';
		setColor([105, 105, 105])
	} else if (currentWeather == 'Rainy') {
		icon.href = '/images/rainy.svg';
		setColor([12, 7, 90])
	} else if (currentWeather == 'Thunderstorms') {
		icon.href = '/images/thunder.svg';
		setColor([0, 0, 0])
	}
	document.title = `Weather for ${document.getElementById('location').innerText}`
}

function setColor(bgcolor) {
	console.log(bgcolor)
	if(document.body.classList == '') {
		for(var i = 0; i < 100; i++) {
			document.getElementsByTagName('body')[0].style.backgroundImage =
			`cross-fade(radial-gradient(rgb(${bgcolorBase[0]},${bgcolorBase[1]},${bgcolorBase[2]})),radial-gradient(rgb(${bgcolor[0]},${bgcolor[1]},${bgcolor[2]})), ${i}%)`
			console.log(`Cross fading: ${i}%`)
		}
	}
}