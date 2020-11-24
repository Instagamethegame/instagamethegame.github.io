var result = 5
const dificuldade = Math.max(Math.ceil(1000 * Math.cos(parseInt(location.hash.slice(1))/31)), 0)

const square = document.querySelectorAll('.square')

var TIME = null
var current = dificuldade

function randomSquare(timing){
    if(TIME != null){
        let dt = timing - TIME
        current -= dt

        if(current < 0){
            current = dificuldade
        

            square.forEach(className => {
                className.classList.remove('mole')
                className.classList.remove('hit')
            })
            let randomPosition = square[Math.floor(Math.random() * 9)]
            randomPosition.classList.add('mole')
            hitPosition = randomPosition.id
        }
    }

    TIME = timing
    animationframe = requestAnimationFrame(randomSquare);
}

function click(){
    if(this.id === hitPosition){
        this.classList.remove('mole')
        this.classList.add('hit')
        hitPosition = -1
        result--
        if(result == 0){
            window.parent.win()
        }
    }
}

square.forEach(id =>{
    id.addEventListener('click', click)
})

var animationframe = requestAnimationFrame(randomSquare)

function timeout(){
    window.parent.lose()
}

function deactivate(){
    cancelAnimationFrame(animationframe)
    square.forEach(className => {
        className.classList.remove('mole')
        className.removeEventListener('click', click)
    })
}

window.parent.gameInfo(
    'jogos/whack-a-pepe/assets/mole.png',
    'Acerte o Pepe',
    'Acerte 5 pepes antes do tempo acabar', 
    7
)

