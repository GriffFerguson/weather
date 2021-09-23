// Called from utilities.js
var bgcolorBase = [218, 218, 218];
var body = document.getElementsByTagName('body')[0]
var icon = document.getElementById('icon'); 

function details(currentWeather) {
	document.title = `Weather for ${document.getElementById('location').innerText}`

	if (currentWeather == 'Clear') {
		icon.href = '/images/sunny.svg';
		setColor([44, 160, 255])
	} else if (currentWeather == 'Partly Cloudy') {
		icon.href = '/images/partly.svg';
		// setColor([130, 140, 152])
		setColor([223, 224, 159])
	} else if (currentWeather == 'Overcast') {
		icon.href = '/images/cloudy.svg';
		setColor([90, 90, 90])
	} else if (currentWeather == 'Rainy') {
		icon.href = '/images/rainy.svg';
		setColor([12, 7, 90])
	} else if (currentWeather == 'Thunderstorms') {
		icon.href = '/images/thunder.svg';
		setColor([0, 0, 0])
	}
}

function setColor(bgcolor) {
	var step = [bgcolorBase[0], bgcolorBase[1], bgcolorBase[2]]
	if(body.classList == '') {
		setColor_Gradient()
		function setColor_Gradient() {
			setTimeout(function() {
				body.style.backgroundImage = 
				`radial-gradient(
					rgb(218,218,218) 20%,
					rgb(
						${step[0] < bgcolor[0] ? step[0]++ : step[0] > bgcolor[0] ? step[0]-- : bgcolor[0]},
						${step[1] < bgcolor[1] ? step[1]++ : step[1] > bgcolor[1] ? step[1]-- : bgcolor[1]},
						${step[2] < bgcolor[2] ? step[2]++ : step[2] > bgcolor[2] ? step[2]-- : bgcolor[2]}
					)
				)`
				if(step[0] != bgcolor[0] || step[1] != bgcolor[1] || step[2] != bgcolor[2]) {
					setColor_Gradient()
				} else {
					bgcolorBase[0] = step[0]
					bgcolorBase[1] = step[1]
					bgcolorBase[2] = step[2]
				}
			}, 10)
		}
	}
}