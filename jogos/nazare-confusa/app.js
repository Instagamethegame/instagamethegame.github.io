const a = Math.ceil(Math.random() * 9)
const b = Math.ceil(Math.random() * 9)
const c = Math.ceil(Math.random() * 9)

document.getElementById('texto').innerText = `${a} + ${b} x ${c}`

if((a + b * c) == ((a + b) * c)){
    document.getElementById('um').innerText = a + b * c
    document.getElementById('dois').innerText = (a + b) * c
    document.getElementById('um').addEventListener('click', window.parent.win)
    document.getElementById('dois').addEventListener('click', window.parent.win)
}else if(Math.random() < 0.5){
    document.getElementById('um').innerText = a + b * c
    document.getElementById('dois').innerText = (a + b) * c
    document.getElementById('um').addEventListener('click', window.parent.win)
    document.getElementById('dois').addEventListener('click', window.parent.lose)
}else{
    document.getElementById('um').innerText = (a + b) * c
    document.getElementById('dois').innerText = a + b * c
    document.getElementById('dois').addEventListener('click', window.parent.win)
    document.getElementById('um').addEventListener('click', window.parent.lose)
}

window.parent.gameInfo(
    'jogos/nazare-confusa/assets/nazare-confusa.jpg',
    'Matemática?!!?!?',
    "Ajude a Nazaré a encontrar a resposta correta", 
    Math.ceil(5 * (0.4 + 2496.16/(4160.26+Math.pow(1.39561242509, parseInt(location.hash.slice(1))))))
)

function timeout(){
    window.parent.lose()
}

function deactivate(){
    document.getElementById('dois').removeEventListener('click', window.parent.win)
    document.getElementById('um').removeEventListener('click', window.parent.lose)
    
    document.getElementById('dois').removeEventListener('click', window.parent.lose)
    document.getElementById('um').removeEventListener('click', window.parent.win)
}