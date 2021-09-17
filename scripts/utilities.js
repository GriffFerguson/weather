// Navkeys
var navKeys = {
    left: document.getElementById('left'),
    right: document.getElementById('right'),
    down: document.getElementById('down'),
    up: document.getElementById('up')
}
var translation = 0;

navKeys.left.addEventListener('click', e => {
    if (translation < 0) {
        translation = translation + 16.35;
        for(var i = 1; i < document.getElementsByClassName('forecast-card').length; i++) {
            document.getElementsByClassName('forecast-card')[i].style.transform = `translateX(${translation}rem)`
        }
    }
})
navKeys.right.addEventListener('click', e => {
    if (translation > -130) {
        translation = translation - 16.35;
        for(var i = 1; i < document.getElementsByClassName('forecast-card').length; i++) {
            document.getElementsByClassName('forecast-card')[i].style.transform = `translateX(${translation}rem)`
        }
    }
})
navKeys.up.addEventListener('click', e => {
    if (translation < 0) {
        translation = translation + 18.35;
        for(var i = 1; i < document.getElementsByClassName('forecast-card').length; i++) {
            document.getElementsByClassName('forecast-card')[i].style.transform = `translateY(${translation}rem)`
        }
    }
})
navKeys.down.addEventListener('click', e => {
    if (translation > -130) {
        translation = translation - 18.35;
        for(var i = 1; i < document.getElementsByClassName('forecast-card').length; i++) {
            document.getElementsByClassName('forecast-card')[i].style.transform = `translateY(${translation}rem)`
        }
    }
})

// Load screen
setTimeout(() => {
    if(document.getElementById('loading').style.opacity != '0') {
        document.getElementById('loading_text-wrapper').innerHTML +=
        '<p>Experiencing delays? Wait a few more seconds then reload the page!' +
        '<br>Make sure to click "Allow" when prompted for your location as well!</p>'
    }
}, 7000)