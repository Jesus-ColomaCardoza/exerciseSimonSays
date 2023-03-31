const contanier=document.getElementById('container');
const colors=document.querySelectorAll('.color');

const arrayColors=Array.from(colors);

//sounds
let click=new Audio('./sounds/click.wav');
let right=new Audio('./sounds/right.wav');
let wrong=new Audio('./sounds/wrong.wav');

//variables
let randomColors=[];
let randomNumbers=[];
let round;
let touch;

round=1;
touch=0;
const mixtColors=()=>{
    for (let i = 0; i <round ; i++) {
        const randomNum=parseInt(Math.random()*4); //to 0 to 3
        randomNumbers.push(randomNum);
    }
}


const showColors=()=>{
    i=-1
    let initShowColors= setInterval(()=>{
        setTimeout(()=>{            
            arrayColors[randomNumbers[i]].classList.add('color--select');
            // console.log(arrayColors[randomNumbers[i]],i);
        },500);
        setTimeout(()=>{
            arrayColors[randomNumbers[i]].classList.remove('color--select');
            // console.log(arrayColors[randomNumbers[i]],i);
        },1000);
        i++;
        if (i==round-1) {
            clearInterval(initShowColors)
        }
        click.play()
    },1500)
}

contanier.addEventListener('click',(e)=>{
    if (e.target.classList.contains('color')) {
        if (e.target.id==arrayColors[randomNumbers[touch]].id) {
            console.log(e.target.id);
            right.play();
        }else{
            wrong.play();
            //The play Finish, we reset all 
            touch=0; //we reset the touch to the new round
            round=1;//It increase the level
            randomNumbers=[];//reset 
            // mixtColors()
            // showColors()
            console.log('You lose, Game over');
        }
        touch++ 
        if (touch==round) {
            //We win a round
            touch=0; //we reset the touch to the new round
            round++;//It increase the level
            randomNumbers=[];//reset 
            mixtColors()
            showColors()
            console.log(randomNumbers);
        }
        
    }
})

mixtColors()
showColors()
console.log(randomNumbers);