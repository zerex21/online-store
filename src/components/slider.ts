const minGap = 0;


function fillColor():number[] {
  const sliderOne = document.getElementById('slider-1') as HTMLInputElement;
  const sliderTwo = document.getElementById('slider-2') as HTMLInputElement;
  const sliderMaxValue : number = parseInt((<HTMLInputElement>document.getElementById('slider-1')).max);
  const currValueSliderTwo:number =  parseInt(sliderTwo.value);
  const currValueSliderOne:number =  parseInt(sliderOne.value);

  const percent1:number = (currValueSliderTwo / sliderMaxValue) * 100;
  const percent2:number = (currValueSliderOne / sliderMaxValue) * 100;

  return ([Math.round(percent1 * 1000), Math.round(percent2 * 1000)]);
}

function fillColor2():number[] {
  const sliderTree = document.getElementById('slider-3') as HTMLInputElement;
  const sliderFour = document.getElementById('slider-4') as HTMLInputElement;
  const sliderMaxValue : number = parseInt((<HTMLInputElement>document.getElementById('slider-1')).max);
  const currValueSliderTree:number =  parseInt(sliderFour.value);
  const currValueSliderFour:number =  parseInt(sliderTree.value);

  const percent1:number = (currValueSliderFour / sliderMaxValue) * 100;
  const percent2:number = (currValueSliderTree / sliderMaxValue) * 100;

  return ([Math.round(percent1 * 1000), Math.round(percent2 * 1000)]);
}


export function slideOne():number[] {
  const displayValOne = document.getElementById('range1') as HTMLElement;
  const sliderOne = document.getElementById('slider-1') as HTMLInputElement;
  const sliderTwo = document.getElementById('slider-2') as HTMLInputElement;

  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    let currValueSliderOne: number =  parseInt(sliderOne.value);
    currValueSliderOne = parseInt(sliderTwo.value) - minGap;
  }
  displayValOne.textContent = sliderOne.value;
  const currNumbers:number[] = fillColor();

  return (currNumbers.sort(function (a, b) {
    return a - b;
  }));
}

export function slideTwo():number[] {
  const displayValTwo = document.getElementById('range2') as HTMLElement;
  const sliderOne = document.getElementById('slider-1') as HTMLInputElement;
  const sliderTwo = document.getElementById('slider-2') as HTMLInputElement;

  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    let currValueSliderTwo:number = parseInt(sliderTwo.value);
    currValueSliderTwo = parseInt(sliderOne.value) + minGap;
  }
  displayValTwo.textContent = sliderTwo.value;
  const currNumbers:number[] = fillColor();

  return (currNumbers.sort(function (a, b) {
    return a - b;
  }));
}

export function slideTree():number[] {
  const sliderTree = document.getElementById('slider-3') as HTMLInputElement;
  const sliderFour = document.getElementById('slider-4') as HTMLInputElement;
  const displayValTree = document.getElementById('range3') as HTMLElement;

  if (parseInt(sliderFour.value) - parseInt(sliderTree.value) <= minGap) {
    let currValueSliderTree:number = parseInt(sliderTree.value);
    currValueSliderTree = parseInt(sliderFour.value) - minGap;
  }
  displayValTree.textContent = sliderTree.value;

  const currNumbers:number[] = fillColor2();

  return (currNumbers.sort(function (a, b) {
    return a - b;
  }));
}

export function slideFour():number[] {
  const sliderTree = document.getElementById('slider-3') as HTMLInputElement;
  const sliderFour = document.getElementById('slider-4') as HTMLInputElement;
  const displayValFour = document.getElementById('range4') as HTMLElement;

  if (parseInt(sliderFour.value) - parseInt(sliderTree.value) <= minGap) {
    let currValueSliderTwo:number = parseInt(sliderFour.value);
    currValueSliderTwo = parseInt(sliderTree.value) + minGap;
  }
  displayValFour.textContent = sliderFour.value;
  const currNumbers:number[] = fillColor2();

  return (currNumbers.sort(function (a, b) {
    return a - b;
  }));
}
