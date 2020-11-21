feather.replace()

window.addEventListener('click', click)
function click() {
    window.parent.loadGame()
    window.removeEventListener('click', click)
}

function deactivate(){}