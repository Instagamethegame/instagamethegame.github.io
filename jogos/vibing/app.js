const beats = []
const time = Math.ceil(15 * (0.4 + 2496.16/(4160.26+Math.pow(1.39561242509, parseInt(location.hash.slice(1))))) )

window.parent.gameInfo(
    'jogos/vibing/assets/icon.jpg',
    'Acompanhe o gato',
    'Acerte o tempo e os alvos com o gato.', 
    time
);

for(let i = 2; i < time; i = i + (Math.random() * 4) + 1){
    let x = Math.random();
    let y = Math.random();
    while(x < 0.4 && y > 0.6) {
        x = Math.random()
        y = Math.random()
    }

    beats.push({x, y, timing: i})
}

const cnv = document.getElementById('jogo').getContext('2d')
cnv.fillStyle = 'rgba(255, 255, 255, 0.3)'
cnv.strokeStyle = 'white'
cnv.lineWidth = 5

var TIME = null;
var current = 0;
var lost = false;

var prev = 0;
function draw(timing){
    if(TIME != null){
        let dt = timing - TIME;
        current += dt / 1000;

        cnv.clearRect(0, 0, 500, 500);
        
        if((beats[0].timing - current) <= 0)
            window.parent.lose();
        
        let progress = (beats[0].timing - current) / (beats[0].timing - prev)
        let sizing = Math.sin((progress * Math.PI) / 2);

        for(i = 50; i < 500; i*=1.5){
            cnv.beginPath();
            cnv.arc((beats[0].x * 500), (beats[0].y * 500), sizing * i, 0, 2 * Math.PI);
            cnv.fill();
        }

        if(beats[0].timing - current <= 1){
            cnv.beginPath();
            cnv.arc((beats[0].x * 500), (beats[0].y * 500), 100, 0, 2 * Math.PI);
            cnv.stroke();
        }
    }

    TIME = timing;
    if(!lost) animationframe = requestAnimationFrame(draw);
}

var animationframe = requestAnimationFrame(draw);

function timeout(){
    if(!lost)
        window.parent.lose();
}

window.addEventListener('click', click)
function click(ev){
    let dx = beats[0].x - (ev.clientX / window.innerWidth);
    let dy = beats[0].y - (ev.clientY / window.innerHeight);

    if(beats[0].timing - current <= 1 && (dx*dx + dy*dy) <= 0.4){
        prev = beats[0].timing
        beats.shift();
        if(beats.length == 0) window.parent.win();
    }
}

function deactivate(){
    lost = true;
    cancelAnimationFrame(animationframe);
    window.removeEventListener('click', click)
}