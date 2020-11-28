const ganhar = Math.random() < 0.5
var japassou = false

document.getElementById('texto').innerText = (ganhar? "clicar pra ganhar": "clicar pra perder")

window.parent.gameInfo(
    'jogos/escolha/assets/icon.jpg',
    'Escolhas',
    (ganhar? "Pensa Rápido, clique pra ganhar": "GG ez, só fica de boa ai"), 
    Math.ceil(5 * (0.4 + 2496.16/(4160.26+Math.pow(1.39561242509, parseInt(location.hash.slice(1))))))
)

function timeout(){
    if(!japassou) {
        japassou = true
        document.getElementById('texto').innerText = ""
        document.getElementById('outrotexto').innerText = ""

        if(ganhar){
            document.getElementById("imagem").src = "assets/boom.png"
            setTimeout(window.parent.lose, 1000);
        }else {
            document.getElementById("imagem").src = "assets/ufa.jpg"
            setTimeout(window.parent.win, 1000);
        }
    }
}

function deactivate(){
    window.removeEventListener('click', click)
}

window.addEventListener('click', click)
function click(){
    japassou = true
    document.getElementById('texto').innerText = ""
    document.getElementById('outrotexto').innerText = ""

    if(!ganhar){
        document.getElementById("imagem").src = "assets/boom.png"
        setTimeout(window.parent.lose, 1000);
    }else {
        document.getElementById("imagem").src = "assets/ufa.jpg"
        setTimeout(window.parent.win, 1000);
    }
}
