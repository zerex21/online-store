import App from './components/app/app';
import { slideOne, slideTwo, slideTree, slideFour } from './components/slider';
import './global.css';


const app = new App();
app.start();

const sliderOne = document.getElementById("slider-1") as HTMLInputElement;
const sliderTwo = document.getElementById("slider-2") as HTMLInputElement;
const sliderTree = document.getElementById("slider-3") as HTMLInputElement;
const sliderFour = document.getElementById("slider-4") as HTMLInputElement;

sliderOne.addEventListener('input',()=>{
     slideOne()
 });

 sliderTwo.addEventListener('input',()=>{
    slideTwo()
 });

 sliderTree.addEventListener('input',()=>{
    slideTree()
});

sliderFour.addEventListener('input',()=>{
    slideFour()
});