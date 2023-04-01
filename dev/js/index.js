const contanier=document.getElementById('container');
const colors=document.querySelectorAll('.button--color');
const level=document.getElementById('level');


//sounds
let click=new Audio('./sounds/click.wav');
let right=new Audio('./sounds/right.wav');
let wrong=new Audio('./sounds/wrong.wav');

//variables
let randomColors=[];
let randomNumbers=[];
let round;
let touch;
let arrayColors=[];

//initiation of variables
round=1;
touch=0;
arrayColors=Array.from(colors);

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
            if (touch==round) {
                //We win a round
                reset(round+1);//we reset but increase the level
            }
        }else{
            //The game Finish
            wrong.play();
            reset(1);//we reset all included the level 
            console.log('You lose, Game over');
        }
    }else if (e.target.classList.contains('button--start')) {
        reset(1);
    }
})

const reset=(roundParameter)=>{
    //We change the level in the html
    level.textContent=`Level ${roundParameter}`
    round=roundParameter; 
    touch=0;
    randomNumbers=[];
    mixColors();
    showColors();
    console.log(randomNumbers);
}

