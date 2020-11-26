const games = (location.hash.trim() != "" ? [location.hash.slice(1)] : ['memoria', 'vibing', 'escolha','le-pepe' ])
var info = {
    streak: 0, 
    lives: 3,
    adcounter: 0,
    timer: null
}
 var raffle = [...games]

var firebaseConfig = {
    apiKey: "AIzaSyAvcRBjbWvHfQIZm-0rQ6aRD7iyEoBXKDM",
    authDomain: "instagamethegame.firebaseapp.com",
    databaseURL: "https://instagamethegame.firebaseio.com",
    projectId: "instagamethegame",
    storageBucket: "instagamethegame.appspot.com",
    messagingSenderId: "329922687957",
    appId: "1:329922687957:web:d1a20693c8e1a3d4f6435c"
};

firebase.initializeApp(firebaseConfig);

var bd = firebase.database();

bd.ref().on('value', (snapshot)=>{
    document.getElementById('scoreboard').innerHTML = ''
    
    Object
        .entries(snapshot.val())
        .map((el) => el[1])
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .forEach((el) =>{
            var li = document.createElement('li')
            li.innerHTML = `
            <img src="public/img/avatars/${el.avatar}.svg">
            <span>${el.user}</span>
            <span>${el.score}</span> `
            document.getElementById('scoreboard').appendChild(li)
        })

})

u('aside .voce .img').handle('click', () => {
    let num = Math.floor(Math.random() * 50);
    u('aside .voce .img img').attr('src', `public/img/avatars/${num}.svg`)
    localStorage.num = num
})
if(localStorage.num){
    u('aside .voce .img img').attr('src', `public/img/avatars/${localStorage.num}.svg`)
}

u('aside .voce input').on('keydown keyup', () => {
    localStorage.nome = u('aside .voce input').nodes[0].value
})
if(localStorage.nome){
    u('aside .voce input').nodes[0].value = localStorage.nome
}


function loadGame(){
    clearTimeout(info.timer)

    if((info.adcounter++) == 15) loadAd()
    else {
        u(u('section').last())
            .children('.wrapper')
            .children('iframe')
            .nodes[0]
            .contentWindow
            .deactivate()
        
        let chosenGame = raffle[Math.floor(Math.random() * raffle.length)]

        raffle = raffle.filter(el => el != chosenGame).concat(games);
        u('main')
            .append(`<section>
                <div class="info">
                    <img />
                    <h2></h2> 
                </div>
                <div class='wrapper'>
                    <iframe src="/jogos/${chosenGame}#${info.streak}"></iframe>
                </div>
                <div class='icones'> 
                    <div class='icon'>
                        <i data-feather="heart"></i>
                        <span>${info.streak}</span>
                    </div>
                    <div class='icon'>
                        <i data-feather="clock"></i>
                        <span></span>
                    </div>
                    <div class='icon'>
                        <i data-feather="send"></i>
                        <span>${info.lives}</span>
                    </div>
                </div>
                <p>
                    <strong>@${chosenGame}</strong>
                    <span></span>
                </p>
            </section>`)

        feather.replace()
        u('section').last().scrollIntoView({behavior:'smooth', block:'center'})
    }
}

function loadAd(){
    info.adcounter = 0
    u(u('section').last())
        .children('.wrapper')
        .children('iframe')
        .nodes[0]
        .contentWindow
        .deactivate()

    u('main')
        .append(`<section>
            <div class="info">
                <img />
                <h2></h2> 
            </div>
            <div class='wrapper'>
                <iframe src="/jogos/ads"></iframe>
            </div>
            <div class='icones'> 
                <div class='icon'>
                    <i data-feather="heart"></i>
                    <span>${info.streak}</span>
                </div>
                <div class='icon'>
                    <i data-feather="clock"></i>
                    <span></span>
                </div>
                <div class='icon'>
                    <i data-feather="send"></i>
                    <span>${info.lives}</span>
                </div>
            </div>
            <p>
                <strong>@instagamethegame</strong>
                <span></span>
            </p>
        </section>`)

    feather.replace()
    u('section').last().scrollIntoView({behavior:'smooth', block:'center'})
}

function gameInfo(icon, title, description, time){
    u(u('section').last())
        .children('.info')
        .children('img')
        .attr('src', icon)
    
    u(u('section').last())
        .children('.info')
        .children('h2')
        .text(title)
    
    u(u('section').last())
        .children('p')
        .children('span')
        .text(description)
    
    timer(time)
}

function win(){
    info.streak++
    if(info.streak % 10 == 0) info.lives++
    loadGame()
}

function lose(){
    info.lives--

    if(info.lives < 0) {
        alert('Perdeu playboy')
        u(u('section').last())
            .children('.wrapper')
            .children('iframe')
            .nodes[0]
            .contentWindow
            .deactivate()
        
        if(parseInt(u('#maxpontos').text()) < info.streak){
            u('#maxpontos').text(info.streak)
            u('#submit').nodes[0].removeAttribute('disabled')
            localStorage.streak = info.streak;
        }
    } else {
        loadGame()
    }
}

if(localStorage.streak){
    u('#maxpontos').text(localStorage.streak)
}

u('#submit').handle('click', function(){
    if(!u(this).is(':disabled')) {
        bd.ref().push({
            user: u('aside .voce input').nodes[0].value,
            score: parseInt(u('#maxpontos').text()),
            avatar: parseInt(u('aside .voce .img img').attr('src').split('/')[3].split('.')[0])
        })
        u('#submit').attr('disabled', true)
    }
})


function timer(time){
    u(u('section').last())
        .children('.icones')
        .children('.icon:nth-child(2)')
        .children('span')
        .text(time)

    if(time > 0){
        time--;
        info.timer = setTimeout(timer, 1000, time);
    }else{
        u(u('section').last())
            .children('.wrapper')
            .children('iframe')
            .nodes[0]
            .contentWindow
            .timeout()
    }
}