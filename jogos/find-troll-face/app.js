const wally = Math.floor(Math.random() * 50) + 1


for(let i = 0; i < 70; i++){
    let generated = Math.floor(Math.random() * 50) + 1
    if(generated != wally){
        document.getElementById('todos').innerHTML += `
        <li style="top: ${Math.random()*80 + 10}%; left:${Math.random()*80+10}%">
            <img src="assets/${generated}.png">
        </li> `
    }
}

if(wally != 7) document.getElementById('todos').innerHTML += `
    <li style="top: ${Math.random()*80 + 10}%; left:${Math.random()*80 + 10}%" id='escolha'>
        <img src="assets/${wally}.png">
    </li> `

document.getElementById('wally').src = `assets/${wally}.png`

if(wally != 7) document.getElementById('escolha').addEventListener('click', click)
else document.getElementById('wally').addEventListener('click', click)

function click(){
    window.parent.win()
}

function timeout(){
    window.parent.lose()
}

window.parent.gameInfo(
    'jogos/find-troll-face/assets/icon.png',
    'Encontre o ...',
    'Encontre o personagem correto',
    Math.ceil(15 * (0.4 + 2496.16/(4160.26+Math.pow(1.39561242509, parseInt(location.hash.slice(1))))))
)

function deactivate(){
    if(wally != 7) document.getElementById('escolha').removeEventListener('click', click)
    else document.getElementById('wally').removeEventListener('click', click)
}