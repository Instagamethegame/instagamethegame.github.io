const beats = []
const time = Math.max(Math.ceil(15 * Math.cos(parseInt(location.hash.slice(1))/31)), 0)

window.parent.gameInfo(
    'jogos/vibing/assets/icon.jpg',
    'Acompanhe o gato',
    'Acerte o tempo e os alvos com o gato.', 
    time
);

for(let i = 2; i < time; i = i + (Math.random() * 4) + 1){
    let x,y;
    do{
        x = Math.random()
        y = Math.random()
    }while(x < 0.4 && y < 0.4)

    beats.push({x , y, timing: i})
}

const cnv = document.getElementById('jogo').getContext('2d')
cnv.fillStyle = 'rgba(255, 255, 255, 0.3)'
cnv.lineWidth = 3

var TIME = null;
var current = 0;

function draw(timing){
    if(TIME != null){
        let dt = timing - TIME;
        current += dt / 1000;

        cnv.clearRect(0, 0, 500, 500);
        
        for(let i = beats.length - 1; i >= 0 ; i--) {
            if((beats[i].timing - current) <= 0)
                window.parent.lose();

            cnv.beginPath();
            cnv.arc((beats[i].x * 500), (beats[i].y * 500), (beats[i].timing - current) * 150, 0, 2 * Math.PI);
            cnv.fill();
            cnv.stroke();
        }
    }

    TIME = timing;
    animationframe = requestAnimationFrame(draw);
}

var animationframe = requestAnimationFrame(draw);

function timeout(){
    window.parent.lose();
}

window.addEventListener('click', click)
function click(ev){
    let dx = beats[0].x - (ev.clientX / window.innerWidth);
    let dy = beats[0].y - (ev.clientY / window.innerHeight);

    if(beats[0].timing - current <= 0.5 && (dx*dx + dy*dy) <= 0.2){
        beats.shift();
        if(beats.length == 0) window.parent.win();
    }
}

function deactivate(){
    cancelAnimationFrame(animationframe);
    window.removeEventListener('click', click)
}