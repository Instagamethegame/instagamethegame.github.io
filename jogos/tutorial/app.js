feather.replace()

window.addEventListener('click', click)
function click() {
    window.parent.loadGame()
}

function deactivate(){
    window.removeEventListener('click', click)
}