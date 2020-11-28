const cnv = document.getElementById('jogo').getContext('2d')
const intervalo = Math.ceil(100 * (0.4 + 2496.16/(4160.26+Math.pow(1.39561242509, parseInt(location.hash.slice(1))))) )

var pos = 0
var speed = 0
var gravidade = 0.0002
var maxSpeed = 0.1
var minSpeed = -0.1
var pontos = [{x:0, y:0}]
var TIME = null
var lost = false
var pipes = []


window.parent.gameInfo(
    'jogos/stonks/assets/icon.jpeg',
    'WallStreet Bets',
    'Mantenha suas ações no ar e longe dos empresários', 
    15
);

for(let i = 100; i < 5000; i = i + intervalo){
    let y = Math.max(Math.min((Math.random() * 100), 70), 30)
    document.getElementById('pipes').innerHTML += `<li class="pipe" id="pipe${i}"><img src="assets/pipe.png" style="height:${y - 10}%;"><img src="assets/pipe.png" style="height:${90 - y}%"></li>`

    pipes.push({x: i, y, id: 'pipe' + i})
}


function click(){
    pontos.push({x:250, y:pos * 10})
    speed-=0.2
}
window.addEventListener('click', click)
cnv.lineCap = 'round'
cnv.lineJoin = 'round'
cnv.strokeStyle = 'rgb(254,67,0)'
cnv.lineWidth = 50

function draw(timing){

    if(TIME != null){
        let dt = timing - TIME
        pos = pos + speed * dt
        pos = Math.max(Math.min(pos, 100), 0)
        if(pos == 100) speed = 0
        else{
            if(speed < 0 && speed + gravidade * dt > 0){
                pontos.push({x:250, y:pos * 10})
            }

            speed = speed + gravidade * dt
            speed = Math.max(Math.min(speed, maxSpeed), minSpeed)
        }

        document.getElementById('player').style.top = pos + '%'
        document.getElementById('player').style.transform = `translate(-50%, -50%) rotate(${speed>0?135:45}deg)`
        cnv.clearRect(0, 0,300, 1000);
        cnv.beginPath()
        for(var i = 0; i < pontos.length; i++){
            cnv.lineTo(pontos[i].x, pontos[i].y)
            pontos[i].x = pontos[i].x - 0.1 * dt
        }
        cnv.lineTo(250, pos*10)
        cnv.stroke()

        for (let i = 0; i < pipes.length; i++) {
            document.getElementById(pipes[i].id).childNodes[0].style.left = pipes[i].x + "%"
            document.getElementById(pipes[i].id).childNodes[1].style.left = pipes[i].x + "%"
            pipes[i].x = pipes[i].x - 0.06 * dt
            if(pipes[i].x > 15 && pipes[i].x < 25 && !(pipes[i].y > pos - 10 && pipes[i].y < pos + 10)){
                window.parent.lose()
            }
        }



    }

    TIME = timing
    if(!lost) animationframe = requestAnimationFrame(draw)
}

var animationframe = requestAnimationFrame(draw)

function timeout(){
    window.parent.win()
}

function deactivate(){
    lost = true;
    cancelAnimationFrame(animationframe);
    window.removeEventListener('click', click)
}