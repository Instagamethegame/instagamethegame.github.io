const games = ['memoria','escolha']
var info = {
    streak: 0, 
    lives: 3,
    adcounter: 0,
    timer: null
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
        
        let chosenGame = games[Math.floor(Math.random() * games.length)]
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
        u(u('section').last()).nodes[0].scrollIntoView({behavior:'smooth', block:'center'})
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
    u(u('section').last()).nodes[0].scrollIntoView({behavior:'smooth', block:'center'})
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
    } else {
        loadGame()
    }
}

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