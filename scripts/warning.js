if(param == 'stay-safe') {
    warning()
}

function warning() {
    var cont = document.createElement('div')
    cont.setAttribute('id', 'warning-cont')
    
    var warning = document.createElement('iframe')
    warning.src = '/warning.html'
    warning.setAttribute('id', 'warning')

    var close = document.createElement('div')
    close.innerText = 'X'
    close.setAttribute('id', 'close')
    close.setAttribute('onclick', 'closeWarning()')
    
    cont.appendChild(close)
    cont.appendChild(warning)
    document.body.appendChild(cont)
}

function closeWarning() {
    document.getElementById('warning-cont').remove();
}