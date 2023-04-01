const contanier=document.getElementById('container');
const formPlayer=document.getElementById('form-player')
const colors=document.querySelectorAll('.button--color');
const level=document.getElementById('level');
const dataPlayerScore=document.getElementById('data-player__score');
const dataPlayerName=document.getElementById('data-player__name');


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
    arrayColors.map(color=>{color.disabled=true});
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
            //we active the buttons to can play
            arrayColors.map(color=>{color.disabled=false});
        }
        click.play()
    },1500)
}

contanier.addEventListener('click',(e)=>{
    if (e.target.classList.contains('button--color')) {
        if (e.target.id==arrayColors[randomNumbers[touch]].id) {
            console.log(e.target.id);
            right.play();
            touch++ 
            changeScore(score+25)
            if (touch==round) {
                //We win a round
                changeLevel(round+1);
            }
        }else{
            //The game Finish
            wrong.play();
            //we assign the score to the player
            player.score=score;
            console.log(player); 
            changeLevel(1);
            changeScore(0);
            console.log('You lose, Game over');

        }
    }else if (e.target.classList.contains('button--start')) {
        //The game start
        changeLevel(1);
        changeScore(0)
    }
})
const player={
    id:'',
    name:'',
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
    mixColors();
    showColors();
    console.log(randomNumbers);
}


