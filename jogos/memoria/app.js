//cartas
const cardArray = [
  {
      name: 'foca',
      img: 'assets/foca.jpg'
  },
  {
      name: 'foca',
      img: 'assets/foca.jpg'
  },
  {
      name: 'dog',
      img: 'assets/dog.jpg'
  },
  {
      name: 'dog',
      img: 'assets/dog.jpg'
  },
  {
      name: 'gato1',
      img: 'assets/gato1.jpg'
  },
  {
      name: 'gato1',
      img: 'assets/gato1.jpg'
  },
  {
      name: 'gato2',
      img: 'assets/gato2.jpg'
  },
  {
      name: 'gato2',
      img: 'assets/gato2.jpg'
  },
  {
      name: 'papagaio',
      img: 'assets/papagaio.jpg'
  },
  {
      name: 'papagaio',
      img: 'assets/papagaio.jpg'
  },
  {
      name: 'urso',
      img: 'assets/urso.jpg'
  },
  {
      name: 'urso',
      img: 'assets/urso.jpg'
  },
  {
    name: 'pato',
    img: 'assets/pato.jpg'
  },
  {
    name: 'pato',
    img: 'assets/pato.jpg'
  },
  {
    name: 'raposa',
    img: 'assets/raposa.jpg'
  },
  {
    name: 'raposa',
    img: 'assets/raposa.jpg'
  }
]

cardArray.sort(() => 0.5 - Math.random())

const grid = document.getElementById('grid')
var cardsChosen = []
var cardsChosenId = []
var cardsWon = []

//tabuleiro
function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    var card = document.createElement('img')
    card.setAttribute('src','assets/back.svg')
    card.setAttribute('data-id',i)
    card.addEventListener('click', flipcard)
    grid.appendChild(card)
  }
}

var canflip = true;
//confere
function checkForMatch() {
  canflip = true
  var cards = document.querySelectorAll('img')
  const optionOneId = cardsChosenId[0]
  const optionTwoId = cardsChosenId[1]
  if (cardsChosen[0] === cardsChosen[1] && optionOneId != optionTwoId){
    cards[optionOneId].setAttribute('src', 'assets/empty.png')
    cards[optionTwoId].setAttribute('src', 'assets/empty.png')
    cards[optionOneId].removeEventListener('click', flipcard)
    cards[optionTwoId].removeEventListener('click', flipcard)
    cardsWon.push(cardsChosen)
  }else{
    cards[optionOneId].setAttribute('src', 'assets/back.svg')
    cards[optionTwoId].setAttribute('src', 'assets/back.svg')
  }
  cardsChosen = []
  cardsChosenId = []
  if (cardsWon.length === cardArray.length/2){
    window.parent.win()
  }
}


//vira carta
function flipcard(){
  if(canflip){
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if(cardsChosen.length === 2) {
      canflip = false
      setTimeout(checkForMatch, 500)
    }
  }
}

  window.parent.gameInfo(
    'jogos/memoria/assets/icon.jfif',
    'Jogo da Memória',
    "Encontre todos os pares antes do tempo acabar", 
    Math.max(Math.ceil(30 * Math.cos(parseInt(location.hash.slice(1))/31)), 0)
  );


  function timeout(){
      window.parent.lose();
      
}

function deactivate(){
  var cards = document.querySelectorAll('img')
  for (let i = 0; i < cardArray.length; i++) {
    cards[i].removeEventListener('click', flipcard)
  }  
}


createBoard()



