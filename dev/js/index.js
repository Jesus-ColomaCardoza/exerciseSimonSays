const contanier=document.getElementById('container');
const formPlayer=document.getElementById('form-player')
const colors=document.querySelectorAll('.button--color');
const level=document.getElementById('level');
const dataPlayerScore=document.getElementById('data-player__score');
const dataPlayerName=document.getElementById('data-player__name');
const windowModalBackground=document.getElementById('window-modal__background');
const windowModal=document.getElementById('window-modal');
const windowModalMessage=document.getElementById('window-modal__message');


//sounds
let click=new Audio('./sounds/click.wav');
let right=new Audio('./sounds/right.wav');
let wrong=new Audio('./sounds/wrong.wav');

//variables
let randomColors=[];
let randomNumbers=[];
let arrayColors=[];
let round;
let touch;
let score;

//initiation of variables
arrayColors=Array.from(colors);
round=1;
touch=0;
score=0;

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
            // console.log(arrayColors[randomNumbers[i]],i);
        },500);
        setTimeout(()=>{
            arrayColors[randomNumbers[i]].classList.remove('button--select');
            // console.log(arrayColors[randomNumbers[i]],i);
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
            console.log(e.target.id);
            right.play();
            touch++ 
            changeScore(score+25)
            if (touch==round) {
                //We win a round
                changeLevel(round+1);
                mixColors();
                showColors();
            }
        }else{
            //The game Finish
            wrong.play();
            //we assign the score to the player
            player.score=score;
            player.level=round;
            console.log(player); 

            //we must reset player, this still lack
            dataPlayerName.textContent='Name: Player';

            changeLevel(1);
            changeScore(0);
            showWindowModal('Game over')
        }
    }else if (e.target.classList.contains('button--start')) {
        if (dataPlayerName.textContent!='Name: Player') {
            //The game start
            changeLevel(1);
            changeScore(0);
            mixColors();
            showColors();
        }else{
            showWindowModal('Enter your player name, Player is not correct name')
        }
    }
})
const player={
    id:'',
    name:'',
    level:0,
    score:0,
    date:null
}
formPlayer.addEventListener('click',(e)=>{
    e.preventDefault();
    if (e.target.classList.contains('form-player__accept')) {
        dataPlayerName.textContent=`Name: ${formPlayer.name.value}`
        
        //we create to the player
        const dateStart= new Date();
        player.name=formPlayer.name.value;
        player.date=`${dateStart.getDate()}/${dateStart.getMonth()+1}/${dateStart.getFullYear()}`;
        console.log(player);
    }
    formPlayer.reset(); 
})

windowModal.addEventListener('click',(e)=>{
    if (e.target.classList.contains('window-modal__accept')||e.target.classList.contains('window-modal__close')) {
        windowModalBackground.classList.remove('window-modal__background--scale')
    }
})

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