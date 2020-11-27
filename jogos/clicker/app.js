var atual = 1


window.parent.gameInfo(
    'jogos/clicker/assets/10.jpeg',
    'Click Click Click',
    'Clique o mais rápido o possivel', 
    Math.max(Math.ceil(3 * Math.cos(parseInt(location.hash.slice(1))/31)), 0)
);

function timeout(){
    if(atual < 10) {
        window.parent.lose()
    }
}

function deactivate(){
    window.removeEventListener('click', click)
}

window.addEventListener('click', click)
function click(){
    
    if(atual < 10){
        atual++
        document.getElementById("imagem").src = "assets/"+atual+".jpeg"
        if(atual == 10){
            setTimeout(window.parent.win, 500)
        }
    }
}
