const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
var result = 5
var dificuldade = Math.max(Math.ceil(1000 * Math.cos(parseInt(location.hash.slice(1))/31)), 0)


window.parent.gameInfo(
    'jogos/whack-a-pepe/assets/mole.png',
    'Acerte o Pepe',
    'Acerte 5 pepes antes do tempo acabar', 
    7
);


function randomSquare(){
    square.forEach(className => {
        className.classList.remove('mole')
        className.classList.remove('hit')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')

    hitPosition = randomPosition.id
}

square.forEach(id =>{
    id.addEventListener('click', () => {
        if(id.id === hitPosition){
            id.classList.remove('mole')
            id.classList.add('hit')
            hitPosition = -1
            result--
            if(result == 0){
                window.parent.win()
            }
        }
    })
})

let timerId = setInterval(randomSquare, dificuldade)

function timeout(){
    window.parent.lose()
}

function deactivate(){
    clearInterval(timerId)
    square.forEach(className => {
        className.classList.remove('mole')
    })
    hitPosition = -1
}
