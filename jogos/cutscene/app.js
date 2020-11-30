var color = ['#7189bf', '#df7599', '#ffc785', '#72d6c9'][Math.floor(Math.random() * 4)]
var ad = [
    {tipo: 'foto', arquivo:'luna.png', descricao: 'Veja mais fofura em @meetlunamarie no instagram 🐱'},
    {tipo: 'foto', arquivo:'diegoexe.jpg', descricao: 'DIEGO.EXE: A Lenda Urbana do DCOMP onde um professor se vinga de todos os seus alunos. Disponível nunca em 8K exclusivamente no Polystation 5'},
    {tipo: 'video', arquivo:'anna.mp4', descricao: 'Venha conhecer meu canal, é de arrebentar!!! https://cutt.ly/chtfWfH'},
    {tipo: 'video', arquivo:'trotta.mp4', descricao: 'Ouça agora Such a Beach, disponível em todas as plataformas de streaming!'},
][Math.floor(Math.random() * 4)]

feather.replace()

let pausado = window.parent.document.getElementById('musica').paused

document
    .getElementById('barrinha')
    .style.backgroundColor = color

switch (ad.tipo) {
    case 'foto':
        let img = document.createElement('img');
        img.src = 'cutscene/' + ad.arquivo

        document
            .getElementById('content')
            .appendChild(img)
        break;
    case 'video':
        let video = document.createElement('video');

        video.muted = window.parent.document.getElementById('musica').paused;
        video.autoplay = true;
        video.controls = false;
        video.loop = true;

        window.parent.document.getElementById('musica').pause()

        video.src = 'cutscene/' + ad.arquivo
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
    if(!pausado) window.parent.document.getElementById('musica').play()
}

window.addEventListener('click', click)
function click(){
    window.parent.loadGame()
}
