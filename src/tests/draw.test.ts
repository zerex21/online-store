import App from '../components/app/app';
import { carData } from '../data/cars-data';

const app = new App();
const { describe, it, expect } = require("jest-circus");
const { isExportDeclaration } = require("typescript");

document.body.innerHTML = `<template id="sourceItemTemp">
<div class="GoodsItem">
    <h4 class="GoodsItemTitle"></h4>
    <div class="GoodsItemImgContainer">
        <img src="" alt="car" class="GoodsItemImg">
    </div>
    <ul class="GoodsItemProps">
        <li>Количество: <span class="Quantity"></span></li>
        <li>Год выхода: <span class="Year"></span></li>
        <li>Производитель: <span class="WhoMade"></li>
        <li>Цвет: <span class="Color"></li>
        <li>Запас хода (км): <span class="Km"></li>
        <li>Популярный: <span class="Popular"></li>
        <li>Товар вкорзине: <span class="InBasket"></li>
        <li>Цена: <span class="Price"></li>
    </ul>
    <div class="btn-container">
        <div class="btn-addBasket">
            <button class="addBasket">В корзину</button>
        </div>
        <div class="btn-details">
            <button>Детали</button>
        </div>
    </div>
</div>
</template>`

test('Draw Car Card', () => {
    it('should correct draw car cad', () => {
        const draw = app.draw([carData[0]]);
        expect ((document.querySelector('.Year') as HTMLElement).innerText).toBe('2021');
    })
})

test('Draw All Car Cards', () => {
    it('should correct draw all car cads', () => {
        const draw = app.draw(carData);
        expect (document.querySelectorAll('.GoodsItem').length).toBe(27);
    })
})
