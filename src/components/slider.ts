/* window.onload = function(){
    slideOne();
    slideTwo();
}
 */
let sliderOne = document.getElementById("slider-1") as HTMLInputElement;
let sliderTwo = document.getElementById("slider-2") as HTMLInputElement;
let sliderTree = document.getElementById("slider-3") as HTMLInputElement;
let sliderFour = document.getElementById("slider-4") as HTMLInputElement;
let displayValOne = document.getElementById("range1") as HTMLElement;
let displayValTwo = document.getElementById("range2") as HTMLElement;
let displayValTree = document.getElementById("range3") as HTMLElement;
let displayValFour = document.getElementById("range4") as HTMLElement;
let minGap: number = 0;
/* let sliderTrack = document.querySelector(".slider-track") as HTMLElement;
let sliderTrackTwo = document.querySelector(".slider-track-Two") as HTMLElement;
let sliderMaxValue : number = parseInt((<HTMLInputElement>document.getElementById("slider-1")).max); */

export function slideOne():void{
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        let currValueSliderOne =  parseInt(sliderOne.value);
        currValueSliderOne = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    /* fillColor(); */
}

export function slideTwo():void{

    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        let currValueSliderTwo =  parseInt(sliderTwo.value);
        currValueSliderTwo = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    /* fillColor(); */
}

export function slideTree():void{
    if(parseInt(sliderFour.value) - parseInt(sliderTree.value) <= minGap){
        let currValueSliderTree =  parseInt(sliderTree.value);
        currValueSliderTree = parseInt(sliderFour.value) - minGap;
    }
    displayValTree.textContent = sliderTree.value;
    /* fillColor2(); */
}

export function slideFour():void{

    if(parseInt(sliderFour.value) - parseInt(sliderTree.value) <= minGap){
        let currValueSliderTwo =  parseInt(sliderFour.value);
        currValueSliderTwo = parseInt(sliderTree.value) + minGap;
    }
    displayValFour.textContent = sliderFour.value;
   /*  fillColor2(); */
}

/* function fillColor():void{
  let currValueSliderTwo =  parseInt(sliderTwo.value);
  let currValueSliderOne =  parseInt(sliderOne.value);
  let percent1 = (currValueSliderTwo / sliderMaxValue) * 100;
  let percent2 = (currValueSliderOne / sliderMaxValue) * 100;
  sliderTrack.style.background = `linear-gradient(to right,  #6a6ad9 ${percent1}% , #6a6ad9 ${percent1}% ,  #6a6ad9 ${percent2}%,  #6a6ad9 ${percent2}%)`;
}

function fillColor2():void{
    let currValueSliderTree =  parseInt(sliderFour.value);
    let currValueSliderFour =  parseInt(sliderTree.value);
    let percent1 = (currValueSliderFour / sliderMaxValue) * 100;
    let percent2 = (currValueSliderTree / sliderMaxValue) * 100;
    sliderTrackTwo.style.background = `linear-gradient(to right, #6a6ad9 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #6a6ad9 ${percent2}%)`;
  }
 */
