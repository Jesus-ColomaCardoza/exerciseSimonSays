const contanier=document.getElementById('container');
const formPlayer=document.getElementById('form-player')
const colors=document.querySelectorAll('.button--color');
const level=document.getElementById('level');
const dataPlayerScore=document.getElementById('data-player__score');
const dataPlayerName=document.getElementById('data-player__name');
const windowModalBackground=document.getElementById('window-modal__background');
const windowModal=document.getElementById('window-modal');
const windowModalMessage=document.getElementById('window-modal__message');
const ranking=document.getElementById('ranking');
const rankingRecord=document.getElementById('ranking__record');

//sounds
let click=new Audio('./sounds/click.wav');
let right=new Audio('./sounds/right.wav');
let wrong=new Audio('./sounds/wrong.wav');

//variables
let randomColors=[];
let randomNumbers=[];
let arrayColors=[];
let simonSaysPlayers=[];
let round;
let touch;
let score;
let playing;
let dateStart;

//initiation of variables
arrayColors=Array.from(colors);
round=1;
touch=0;
score=0;
playing=false;
dateStart= new Date();

let player={
    id:'',
    name:'',
    level:0,
    score:0,
    date:''
}

const mixColors=()=>{
    for (let i = 0; i <round ; i++) {
        const randomNum=parseInt(Math.random()*4); //to 0 to 3
        randomNumbers.push(randomNum);
    }
}

const showColors=()=>{
    //First We disable the buttons to prevent click events 
    contanier.classList.add('container--block')
    //We show the color serie
    i=-1
    let initShowColors= setInterval(()=>{
        setTimeout(()=>{            
            arrayColors[randomNumbers[i]].classList.add('button--select');
        },500);
        setTimeout(()=>{
            arrayColors[randomNumbers[i]].classList.remove('button--select');
        },1000);
        i++;
        if (i==round-1) {
            clearInterval(initShowColors)
            contanier.classList.remove('container--block')
        }
        click.play()
    },1500)
}

contanier.addEventListener('click',(e)=>{
    if (e.target.classList.contains('button--color') && randomNumbers.length>0) {
        if (e.target.id==arrayColors[randomNumbers[touch]].id) {
            //console.log(e.target.id);
            right.play();
            touch++ 
            changeScore(score+25)
            if (touch==round) {
                //We win a round
                changeLevel(round+1);//next level
                mixColors();//mixt of colors 
                showColors();//show the colors
            }
        }else{
            //The game Finish, when you failded
            wrong.play();

            //we add to the player
            addPlayer();

            //we reset all our object player
            resetPlayer();
            changeLevel(1);
            changeScore(0);
            showWindowModal('Game over')
            printAllPlayers();
            playing=false;
        }
    }else if (e.target.classList.contains('button--start')) {
        if (player.name!='' && playing==false) {
            //The game start for first time
            changeLevel(1);
            changeScore(0);
            mixColors();
            showColors();
            playing=true;
        }else if (player.name=='') { //First the player must to be sign up 
            showWindowModal('Enter your player name, Player is not correct name')
        }else if (playing==true) { //allow reset the game although game has started
            //we reset all our object player
            resetPlayer();
            changeLevel(1);
            changeScore(0);
            printAllPlayers()
            playing=false;
        }
    }
})
formPlayer.addEventListener('click',(e)=>{
    e.preventDefault();
    if (e.target.classList.contains('form-player__accept')) {
        dataPlayerName.textContent=`Name: ${formPlayer.name.value}`
        player.name=formPlayer.name.value;
        formPlayer.reset(); 
    }
})

windowModal.addEventListener('click',(e)=>{
    if (e.target.classList.contains('window-modal__accept')||e.target.classList.contains('window-modal__close')) {
        windowModalBackground.classList.remove('window-modal__background--scale')
    }
})

ranking.addEventListener('click',(e)=>{
    if (e.target.classList.contains('button--showranking')) {
        printAllPlayers();
        rankingRecord.classList.add('ranking__record--scale')
    }else if (e.target.classList.contains('button--removeranking'))  {
        localStorage.clear();
        removeAllPlayers();
    }else if (e.target.classList.contains('ranking__record'))  {
        rankingRecord.classList.remove('ranking__record--scale')
    }
})

const addPlayer=()=>{//add a player to the localstorage
    if (localStorage.length>0) {//when the players array already exits
        simonSaysPlayers=JSON.parse(localStorage.getItem('simonSaysPlayers'));//we assign the array from localtorage to our current array
        player.id=simonSaysPlayers.length;
    }else{
        player.id=0;
    }
    player.level=round;
    player.score=score;
    player.date=`${dateStart.getDate()}/${dateStart.getMonth()+1}/${dateStart.getFullYear()}`;
    //console.log(player);
    const playerAdded={
        id:player.id,
        name:player.name,
        level:player.level,
        score:player.score,
        date:player.date
    }
    simonSaysPlayers.push(playerAdded);//we add the player al array simonSaysPlayers          
    localStorage.setItem('simonSaysPlayers', JSON.stringify(simonSaysPlayers));//we replace the array simonSaysPlayers of localstorage four our current array simonSaysPlayers.
    // console.log(simonSaysPlayers);
}
const resetPlayer=()=>{
    dataPlayerName.textContent='Name: Player';
    player.name='';
    player.score=0;
    player.level=0;
    player.date=''; 
}
const changeScore=(scoreParameter)=>{
    score=scoreParameter;
    dataPlayerScore.textContent=`Score: ${score}`;
}
const changeLevel=(levelParameter)=>{
    //animation of level
    if (levelParameter==1) {
        level.classList.add('level--scalered')
    }else{
        level.classList.add('level--scalegreen')
    }
    setTimeout(()=>{
        level.classList.remove('level--scalered','level--scalegreen')
    },500)
    //We reset the level in the html
    level.textContent=`Level ${levelParameter}`
    round=levelParameter; //we update o reset the level
    touch=0;//we reset the touches
    randomNumbers=[];
    console.log(randomNumbers);
}
const showWindowModal=(message)=>{
    windowModalBackground.classList.add('window-modal__background--scale')
    windowModalMessage.textContent=message
}
const removeAllPlayers=()=>{//remove all the players on the HTML
    let childrenArray=Array.from(rankingRecord.children);
    console.log(childrenArray);
    for (let i = 5; i < childrenArray.length; i++) {
        rankingRecord.removeChild(childrenArray[i])
    }
    childrenArray=[];
    simonSaysPlayers=[];
}
const printAllPlayers=()=>{//print all the players on the HTML
    removeAllPlayers();
    const fragmet=document.createDocumentFragment();
    let pos=1
    if (localStorage.length>0) {
        simonSaysPlayers=JSON.parse(localStorage.getItem('simonSaysPlayers'));//get the array from localstorage
        simonSaysPlayers.sort((a,b)=> b.score-a.score)//sort by score the ranking
        simonSaysPlayers.forEach(player => {//show the players
            const position=document.createElement('DIV');
            const name=document.createElement('DIV');
            const level=document.createElement('DIV');
            const score=document.createElement('DIV');
            const date=document.createElement('DIV');
            position.classList.add('ranking__row')
            name.classList.add('ranking__row')
            level.classList.add('ranking__row')
            score.classList.add('ranking__row')
            date.classList.add('ranking__row')
            position.textContent=pos;
            name.textContent=player.name;
            level.textContent=player.level;
            score.textContent=player.score;
            date.textContent=player.date;
            fragmet.appendChild(position);
            fragmet.appendChild(name);
            fragmet.appendChild(level);
            fragmet.appendChild(score);
            fragmet.appendChild(date);
            pos++;
        });
        rankingRecord.appendChild(fragmet);
    }
}
