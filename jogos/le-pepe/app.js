var divs = document.querySelectorAll('div')
var t = Math.ceil(1000 * (0.4 + 2496.16/(4160.26+Math.pow(1.39561242509, parseInt(location.hash.slice(1))))));
var target = 5;

window.parent.gameInfo(
    'jogos/le-pepe/assets/hit.png',
    'Acerte o Pepe',
    'Acerte 5 pepes antes de o tempo acabar', 
    7
);

function timeout(){
    window.parent.lose();
}

function deactivate(){
    for (let i = 0; i < divs.length; i++) divs[i].removeEventListener('click', click);
    clearInterval(interval)
}

for (let i = 0; i < divs.length; i++) divs[i].addEventListener('click', click);
function click(){
    if(this.classList.contains('mole')){
        this.classList.remove('mole')
        this.classList.add('hit')

        target--
        if(target == 0)
            window.parent.win();
    }
}

interval = setInterval(()=>{
    for (let i = 0; i < divs.length; i++)
        divs[i].className = ""
    
    divs[Math.floor(Math.random() * 9)].className = 'mole'
}, t);