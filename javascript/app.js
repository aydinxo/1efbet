"use strict";

const choosename = document.querySelector('.choosename');
const username = document.querySelector('#username');
const choosnameBtn = document.querySelector('.choosname__btn');
const menuUsername = document.querySelector('.menu__username');


// overley background
// const overlay = document.querySelector('.overlay');
// overlay.addEventListener('click' , (e)=> e.stopPropagation());

// choosnameBtn.addEventListener('click', () => {
//     if (username.value.length >= 3 && username.value.length <= 32) {
//         menuUsername.textContent = username.value;
//         choosename.classList.add('hidden');
//         overlay.classList.add('hidden');
//     }
// });


// menu open and close
const menu = document.querySelector('.menu');
const menuBar = document.querySelector('.menu__bar');

menuBar.addEventListener('click' , ()=>{
    menu.classList.remove('hidden');
    document.querySelector('.overlay').classList.toggle('hidden');
})

const menuClose = document.querySelector('.menu_close');
menuClose.addEventListener('click' , ()=>{
    menu.classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
})



// Range Slider
const range = document.querySelector(".footer__range");
const bomb = document.querySelector(".bomb__num");
const gem = document.querySelector(".diamond__num");
const menuMessage = document.querySelector('.menu__message');


let bombNum = 3;
let gemNum = 22;

let prevValue = Number(range.value);

const decimalNum = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

let jewelNum = 1.11;
let decimalNumber = decimalNum((bombNum - 1) / 10, (bombNum + 1) / 10);


function updateSlider() {
    let min = range.min ? range.min : 0;
    let max = range.max ? range.max : 100;
    let val = ((Number(range.value) - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #16a34a ${val}%, #0C1C2B ${val}%)`;

    let currentValue = Number(range.value);

    if (currentValue > prevValue) {
        bombNum++;
        gemNum--;
        menuMessage.textContent = `اولین جواهر برابره ${Number((jewelNum += decimalNumber).toFixed(2))}x است`;
        
    } else if (currentValue < prevValue) {
        bombNum--;
        gemNum++;
        menuMessage.textContent = `اولین جواهر برابره ${Number((jewelNum -= decimalNumber).toFixed(2))}x است`;
    }

    if(jewelNum < 1.14){
        jewelNum = 1.11;
        menuMessage.textContent = `اولین جواهر برابره ${Number(jewelNum).toFixed(2)}x است`;
    }

    bomb.textContent = bombNum;
    gem.textContent = gemNum;

    prevValue = currentValue;


}

updateSlider();
range.addEventListener("input", updateSlider);

//////////////////////////////////////////////////////




// betAmount open calculator
const betAmount = document.querySelector('#betAmount');
const calculator = document.querySelector('.calculator');

betAmount.addEventListener('click' , ()=>{
    const calculator = document.querySelector('.calculator');
    calculator.classList.toggle('hidden');
    // document.querySelector('.overlay').classList.remove('hidden');
});
////////////////////////////////////////////////////////




// calaculator buttons and conditions
const calculatorBtn = document.querySelectorAll('.calculator__btn');
let sum = betAmount.value;
for(let i = 0 ; i < calculatorBtn.length ; i++){
    calculatorBtn[i].addEventListener('click' , ()=>{    
        if(calculatorBtn[i].textContent === '←'){
            sum = sum.slice(0, -1);
            betAmount.value = sum;
        }
        else if(calculatorBtn[i].textContent === 'c'){
            sum = '';
            betAmount.value = sum;
        }
        else if(calculatorBtn[i].textContent === 'Ok'){
            calculator.classList.add('hidden');
            // document.querySelector('.overlay').classList.add('hidden');
        }
        else{
            sum += calculatorBtn[i].textContent;
            betAmount.value = sum;
        }
        longgerThanOne();
        
    })
}
////////////////////////////////////////////////////////





// footer crossX2 and half buttons
const footerCrossX2 = document.querySelector('.footer__crossX2');
const footerHalf = document.querySelector('.footer__half');

footerCrossX2.addEventListener('click' , ()=>{
    sum = Number(sum) * 2;
    betAmount.value = sum;
    longgerThanOne();

});
footerHalf.addEventListener('click' , ()=>{
    sum = Number(sum) / 2;
    betAmount.value = sum;
    longgerThanOne();

});

function longgerThanOne(){
    if(Number(betAmount.value) <= 1){
        footerHalf.disabled = true;
        footerHalf.classList.add('opacity-5');
        betAmount.value = sum = '1';
    }
    else{
        footerHalf.disabled = false;
        footerHalf.classList.remove('opacity-5');
    }
}
longgerThanOne();
////////////////////////////////////////////////////////








// footer condition button
const footerCondition = document.querySelector('.footer__condition');
const allCondition = document.getElementById('all__condition');
const inventory = document.getElementById('inventory');
const idHand = document.getElementById('ID__hand');
const minesItem = document.querySelectorAll('.mines__item');
const winnerModal = document.getElementById('winner-modal');
const winnerText = document.getElementById('winner-text');

function minesLopp(bool){
    for(let i = 0 ; i < minesItem.length ; i++){
        minesItem[i].disabled = bool;
    }
}
minesLopp(true);

const winnerOdds = document.getElementById('winner-odds');
const winnerResult = document.getElementById('winner-result');

let inventoryNum = 1000;

const randNum = ()=> Math.floor(Math.random() * 25);

let itemAndis = [];

let pickedUp = 1;

footerCondition.addEventListener('click' , ()=>{

    minesLopp(false);

    pickedUp++;
    if(pickedUp === 3){
        winnerModal.classList.remove('hidden');
        // document.querySelector('.overlay').classList.remove('hidden');
        winnerText.classList.add('scale-span');

        winnerOdds.textContent = Number(jewelNum - decimalNumber).toFixed(2) + 'x';
        winnerOdds.textContent = `${Number(jewelNum - decimalNumber).toFixed(2)}x`;
        winnerResult.textContent = `$ ${Number(jewelNum - decimalNumber).toFixed(2)}`;

        setTimeout(()=>{
            resetMinse();
        },4000)
    }
    else{
        footerCondition.textContent = `برداشت ${betAmount.value}$`;
        allCondition.textContent = betAmount.value + '$';
        inventory.textContent = inventoryNum - Number(betAmount.value) + '$';
        idHand.textContent = Number(idHand.textContent) + 1;
    
        footerCrossX2.classList.add('opacity-5');
        footerHalf.classList.add('opacity-5');
        footerCrossX2.disabled = true;
        footerHalf.disabled = true;
    
        menuMessage.textContent = `یک جواهر پیدا کنید تا ${Number(jewelNum).toFixed(2)}x برنده شوید`;
        menuMessage.classList.add('menu__message--color');
    
        for(let i = 0 ; i < minesItem.length ; i++){
            minesItem[i].classList.add('opacity-10')
        }
    
        for (let i = 1; i <= bombNum; i++) {
            let rand = randNum();
            while (itemAndis.includes(rand)) {
                rand = randNum();
            }
            itemAndis.push(rand);
        }
        console.log(itemAndis);
    
        for(let i = 0 ; i < itemAndis.length; i++){
            minesItem[itemAndis[i]].firstElementChild.src = './images/mine.png';
        }

    }

    // for(let i = 0 ; i < minesItem.length; i++){
    //     minesItem[i].classList.add('mines__item--active');
    // }


});

let gemClicked = [];

function resetMinse(){

    for(let i = 0 ; i < minesItem.length; i++){
        minesItem[i].firstElementChild.src = './images/gem.png';  
        minesItem[i].classList.remove('mines__item--active');
        minesItem[i].classList.remove('mines__item--active--bomb');     
    };

    for(let i = 0 ; i < gemClicked.length; i++){
        gemClicked[i].classList.remove('mines__item--active--gem');
    };

    gemClicked = [];
    itemAndis = [];
    pickedUp = 1;
    jewelNum = 1.11;
    
    if(betAmount.value > 1)
        footerHalf.classList.remove('opacity-5');
    footerCrossX2.classList.remove('opacity-5');
    footerCrossX2.disabled = false;
    footerHalf.disabled = false;

    winnerModal.classList.add('hidden');
    // document.querySelector('.overlay').classList.add('hidden');
    winnerText.classList.remove('scale-span');

    for(let i = 0 ; i < minesItem.length ; i++){
        minesItem[i].classList.remove('opacity-10')
    }

    footerCondition.textContent = 'شرط';

    menuMessage.textContent = `اولین جواهر برابره ${Number((jewelNum += decimalNumber)).toFixed(2)}x است`;
    menuMessage.classList.remove('menu__message--orange')
    menuMessage.classList.remove('menu__message--color')

    minesLopp(true);

}


for(let i = 0 ; i < minesItem.length ; i++){
    minesItem[i].addEventListener('click' , ()=>{
        if(minesItem[i].firstElementChild.src == 'http://127.0.0.1:5500/images/mine.png'){
            minesItem[i].classList.add('mines__item--active');
            minesItem[i].classList.add('mines__item--active--bomb');

            pickedUp = 1;

            for(let i = 0 ; i < minesItem.length; i++){
                minesItem[i].classList.add('mines__item--active');
            };
            for(let i = 0 ; i < gemClicked.length; i++){
                gemClicked[i].classList.add('mines__item--active--gem');
            };

            menuMessage.textContent = 'شما برنده نشدید دوباره امتحان کنید';
            menuMessage.classList.add('menu__message--orange')

            setTimeout(()=>{
                resetMinse();
            },4000)
        }
        else{
            minesItem[i].classList.add('mines__item--active');
            gemClicked.push(minesItem[i])

            footerCondition.textContent = `برداشت ${Number(jewelNum).toFixed(2)}$`;

            decimalNumber = decimalNum((bombNum - 1) / 10, (bombNum + 1) / 10);
            console.log(decimalNumber);
            menuMessage.textContent = `ادامه دهید تا ${Number((jewelNum += decimalNumber).toFixed(2))}x برنده شوید`;

        };
    });
};