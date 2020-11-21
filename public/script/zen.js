const games = ['memoria']
var streak = 0

function loadGame(){
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
                <iframe src="/jogos/${chosenGame}"></iframe>
            </div>
            <div class='icones'> 
                <div class='icon'>
                    <i data-feather="heart"></i>
                    <span>${streak}</span>
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
    
}

function win(){
    streak++
    loadGame()
}

function lose(){
    loadGame()

}
