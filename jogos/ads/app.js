var color = ['#7189bf', '#df7599', '#ffc785', '#72d6c9'][Math.floor(Math.random() * 4)]
var ad = [
    {tipo: 'foto', arquivo:'luna.png', descricao: 'Veja mais fofura em @meetlunamarie no instagram 🐱'},
    {tipo: 'foto', arquivo:'diegoexe.jpg', descricao: 'DIEGO.EXE: A Lenda Urbana do DCOMP onde um professor se vinga de todos os seus alunos. Disponível nunca em 8K exclusivamente Polystation 5'},
    {tipo: 'foto', arquivo:'mundo.jpg', descricao: 'O GOVERNO AMERICANO MENTIU PRA VOCÊ ESSAS SÃO AS IMAGENS REAIS DA TERRA TUDO INVENÇÃO DA MAÇONARIA'}
][Math.floor(Math.random() * 2)]

feather.replace()

document
    .getElementById('barrinha')
    .style.backgroundColor = color

switch (ad.tipo) {
    case 'foto':
        let img = document.createElement('img');
        img.src = 'ads/' + ad.arquivo

        document
            .getElementById('content')
            .appendChild(img)
        break;
    case 'video':
        let video = document.createElement('video');

        video.autoplay = true;
        video.controls = false;
        video.loop = true;

        video.src = 'ads/' + ad.arquivo
        document
            .getElementById('content')
            .appendChild(video)
        break;
}

window.parent.gameInfo(
    'jogos/tutorial/assets/icon.svg',
    'Patrocinado',
    ad.descricao, 
    10
)

function timeout() {
    window.parent.loadGame()
}

function deactivate() {
    if (ad.tipo == 'video')
        document
            .getElementById('content')
            .childNodes[0]
            .pause()
    
    window.removeEventListener('click', click)
}

window.addEventListener('click', click)
function click(){
    window.parent.loadGame()
}

//{tipo: 'video', arquivo:'anna.mp4', descricao: 'Venha conhecer meu canal, é de arrebentar!!! https://cutt.ly/chtfWfH'},