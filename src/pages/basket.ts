import { carData } from "../data/cars-data"

export let renderContainerForCards = (goodsInBasket, totalPrice, allGoodsInBasket) =>{
    return(`
    <div class="goodsInBasket">
    <div class="listGoods">
        <div class="titleGoods">
            <div class="nameTitle">Товары в корзине</div>
            <div class="amountGoods">Количество: <div class="amountGoodsNumber">${ goodsInBasket}
            </div>
        </div>
            <div class="pagesTitle">Страница:
                <div class="arrowPrev">
                    < </div>
                        <div class="numberPage">1</div>
                        <div class="arrowNext"> > </div>
                </div>
        </div>
        ${cycleForCards(allGoodsInBasket)}
        <div class="finalPurchase">
            <div class="summary"></div>
            <div class="allInfo">
                <div class="allProducts">Всего товаров: ${goodsInBasket}</div>
                <div class="allPrice">Итоговая цена: € ${totalPrice}</div>
                <form class="buyGoods" action="#">
                    <label for="code"> <input type="text" placeholder="Введите промокод" name="code"
                            class="promoCode"></label>
                    <div class="decryptionPromoCode">Promo for test: 'RS', 'EPM'</div>
                    <div class="btnCode">
                        <button type="submit">Купить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    `)
}


let renderCard = (count:number,name:string,img:string,description:string,year:number,maker:string,color:string,
                  km:number,popular:string,quantity:number,price:number) =>{
    return (`
    <div class="previewOrder">
                <div class="countGoods">${count}</div>
                <div class="iconGoodsContainer">
                        <img class="iconGoods" src="${img}" alt="car">
                    </div>
                <div class="descriptionGoods">
                    <div class="nameGoods">Производитель: ${name}</div>
                    <div class="goodsDescription">Описание: ${description}</div>
                    <div class="yearGoods">Год выхода: ${year}</div>
                    <div class="brandGoods">Производитель: ${maker}</div>
                    <div class="colorGoods">Цвет: ${color}</div>
                    <div class="kmGoods">Запас хода (км): ${km}</div>
                    <div class="popularGoods">Популярный: ${popular}</div>
                </div>
                <div class="countControl">
                    <div class="totalNumber">Всего:${quantity}</div>
                    <div class="managementNumber">
                        <div class="arrowPlus">-</div>
                        <div class="currentNumber">1</div>
                        <div class="arrowMinus">+</div>
                    </div>
                    <div class="currentPrice">€ ${price}</div>
                </div>
            </div>
        </div>
    `
    )
}

export let cycleForCards = (allGoodsInBasket) => {
 console.log(allGoodsInBasket)
 allGoodsInBasket = allGoodsInBasket.sort((a,b)=>a-b)
 let div: HTMLElement = document.createElement('div');
 div.className = 'blockCards'
 for(let i = 0 ; i < allGoodsInBasket.length ; i++){
      for(let y = 0; y < carData.length ; y++){
        if(allGoodsInBasket[i] === carData[y].id){
            let num = i
            let render =  renderCard(++num,carData[y].name,carData[y].img,carData[y].description,carData[y].year,carData[y].whoMade, carData[y].color,
                                     carData[y].km, (carData[y].popular === false) ? 'нет' : 'да' ,carData[y].availableQuantity,
                                     carData[y].price )

           div.innerHTML += (render)
        }
      }

 }
 return (div.innerHTML)
}