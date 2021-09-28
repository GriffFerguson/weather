//Param var
var param = window.location.href.split('#')[1] == undefined ? '' : window.location.href.split('#')[1];

// Navkeys
var navKeys = {
    daily: {
        left: document.getElementById('left'),
        right: document.getElementById('right'),
        down: document.getElementById('down'),
        up: document.getElementById('up')
    }
}
var cards = {
    daily: document.getElementsByClassName('daily')
}
var translation = 0;

navKeys.daily.left.addEventListener('click', e => {
    if (translation < 0) {
        translation = translation + 16.35;
        for(var i = 1; i < cards.daily.length; i++) {
            cards.daily[i].style.transform = `translateX(${translation}rem)`
        }
    }
})
navKeys.daily.right.addEventListener('click', e => {
    if (translation > -130) {
        translation = translation - 16.35;
        for(var i = 1; i < cards.daily.length; i++) {
            cards.daily[i].style.transform = `translateX(${translation}rem)`
        }
    }
})
navKeys.daily.up.addEventListener('click', e => {
    if (translation < 0) {
        translation = translation + 18.35;
        for(var i = 1; i < cards.daily.length; i++) {
            cards.daily[i].style.transform = `translateY(${translation}rem)`
        }
    }
})
navKeys.daily.down.addEventListener('click', e => {
    if (translation > -130) {
        translation = translation - 18.35;
        for(var i = 1; i < cards.daily.length; i++) {
            cards.daily[i].style.transform = `translateY(${translation}rem)`
        }
    }
})

// Loading screen
setTimeout(() => {
    if(document.getElementById('loading').style.opacity != '0') {
        document.getElementById('loading_text-wrapper').innerHTML +=
        '<p>Experiencing delays? Wait a few more seconds then reload the page!' +
        '<br>Make sure to click "Allow" when prompted for your location as well!</p>'
    }
}, 7000)

//Load page
var loadStatus = 0;
function loadPage() {
    if(loadStatus == 3) {
        console.log('Loading page...')
        var loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() =>
            loading.style.display = 'none'
        ,1500)
        console.log("Loaded!")
        details(document.getElementById('detail_card1').innerText)
    } else {
        console.log('Awaiting two load confirmations')
    }
}

// Event listeners on forecast cards
for(var i = 0; i < cards.daily.length; i++) {
    cards.daily[i].addEventListener('click', cardClick)
}

var t;
function cardClick(e) {
    t = e.target;
    details(document.getElementById(`detail_${t.id}`).innerText)
}

// Fetch error
function fetchError(error) {
    console.log(`Experienced error, reloading page.\r\nError message: ${error}`)
    document.getElementById("loading_text-wrapper").innerHTML +=
    "<p>Whoops! An error was encountered!<br>We'll reload the page!</p>" +
    "<p>If the problem persists, please ensure you are within the United States and have allowed access to your location!"
    setTimeout(() => {
        window.location.reload();
    }, 2000)
}

// Parse time
function getTime(time) {
    var timeDate = []
    timeDate[0] = time.split('T')[0]
    timeDate[1] = time.split('T')[1]
    
    var string = {
        date: null,
        shortDate: null,
        time: null,
    }
    // Format date string
    var date = {
        year: timeDate[0].split('-')[0],
        month: timeDate[0].split('-')[1],
        date: timeDate[0].split('-')[2],
    }
    string.shortDate = `${date.month}/${date.date}/${date.year}`
    if (date.month == 1) {
        date.month = 'January'
    } else if(date.month == 2) {
        date.month = 'February'
    } else if(date.month == 3) {
        date.month = 'March'
    } else if(date.month == 4) {
        date.month = 'April'
    } else if(date.month == 5) {
        date.month = 'May'
    } else if(date.month == 6) {
        date.month = 'June'
    } else if(date.month == 7) {
        date.month = 'July'
    } else if(date.month == 8) {
        date.month = 'August'
    } else if(date.month == 9) {
        date.month = 'September'
    } else if(date.month == 10) {
        date.month = 'October'
    } else if(date.month == 11) {
        date.month = 'November'
    } else if(date.month == 12) {
        date.month = 'December'
    }
    string.date = `${date.month} ${date.date}, ${date.year}`

    // Format time string
    var time = {
        hour: timeDate[1].split(':')[0],
        minute: timeDate[1].split(':')[1],
        suffix: 'a.m'
    }
    if (time.hour > 12) {
        time.hour = time.hour - 12;
        time.suffix = 'p.m'
    }
    string.time = `${time.hour}:${time.minute} ${time.suffix}`
    
    return string
}

// Weather summary
function summary(forecast) {
    var forecastSummary;
    if(forecast.indexOf('Sunny') != -1 || forecast.indexOf('Clear') != -1) {
        forecastSummary = ['Clear','sunny.svg',0]
    }
    if(forecast.indexOf('Cloudy') != -1 ) {
        forecastSummary = ['Overcast','cloudy.svg',2]
    }
    if(forecast.indexOf('Mostly') != -1 || forecast.indexOf('Partly') != -1) {
        forecastSummary = ['Partly Cloudy','partly.svg',1]
    }
    if(forecast.indexOf('Showers') != -1 || forecast.indexOf('Rain') != -1) {
        forecastSummary = ['Rainy','rainy.svg',3]
    }
    if(forecast.indexOf('Thunderstorms') != -1) {
        forecastSummary = ['Thunderstorms','thunder.svg',4]
    }
    if(forecast.indexOf('Tropical Storm') != -1) {
        forecastSummary = ['Tropical Storm','thunder.svg',5]
    }
    return forecastSummary
}