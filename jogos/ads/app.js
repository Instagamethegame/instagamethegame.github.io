var color = ['#7189bf', '#df7599', '#ffc785', '#72d6c9'][Math.floor(Math.random() * 4)]
var ad = [
    {tipo: 'foto', arquivo:'luna.png', descricao: 'Veja mais fofura em @meetlunamarie no instagram 🐱'},
    {tipo: 'video', arquivo:'anna.mp4', descricao: 'Venha conhecer meu canal, é de arrebentar!!! https://cutt.ly/chtfWfH'}
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
}