import { renderContainerForCards } from './basket';

export const routes = [
  {
    path: '/',
    data: `<div class="Goods">
                <div class="GoodsFiltersContainer">
                    <div class="GoodsFilterGroup">
                        <h4 class="title">Фильтры по значению</h4>
                        <div>
                            <div class="FilterWhoMade">
                                Производитель:
                                <ul class="list">
                                    <button class=" button type-mersedes ">Mercedes</button>
                                    <button class=" button type-tesla ">Tesla</button>
                                    <button class=" button type-volkswagen ">Volkswagen</button>
                                </ul>
                            </div>
                            <div class="FilterByPower">
                                Запас хода (км):
                                <ul class="list">
                                    <button class=" button type-large ">500</button>
                                    <button class=" button type-medium ">400</button>
                                    <button class=" button type-small ">300</button>
                                </ul>
                            </div>
                            <div class="FilterByColor">
                                Цвет:
                                <ul class="FilterByColor__list">
                                    <button class=" FilterByColor__button FilterByColor__button_type-white">белый</button>
                                    <button class=" FilterByColor__button FilterByColor__button_type-gray">серый</button>
                                    <button class=" FilterByColor__button FilterByColor__button_type-red">красный</button>
                                </ul>
                            </div>
                            <div class="FilterByPopular">
                                Только популярные:
                                <div>
                                    <button class="favorite-input">popular</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="GoodsFilterGroup">
                        <h4 class="title">Фильтры по диапазону</h4>
                            <div class="Range">
                                    <h5>Цена: </h5>
                                    <div class="range-slider">
                                        <div class="wrapper-slider">
                                            <div class="values">
                                                <span id="range1">
                                                    37000
                                                </span>
                                                <span> &dash; </span>
                                                <span id="range2">
                                                    100000
                                                </span>
                                            </div>
                                            <div class="containerSlider">
                                                <div class="slider-track"></div>
                                                <input type="range" min="37000" max="100000" value="37000" id="slider-1" >
                                                <input type="range" min="37000" max="100000" value="100000" id="slider-2" >
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class="Range">
                                    <h5>Количество: </h5>
                                    <div class="range-slider">
                                        <div class="range-slider">
                                            <div class="wrapper-slider">
                                                <div class="values">
                                                    <span id="range3">
                                                        1
                                                    </span>
                                                    <span> &dash; </span>
                                                    <span id="range4">
                                                        10
                                                    </span>
                                                </div>
                                                <div class="containerSlider">
                                                    <div class="slider-track"></div>
                                                    <input type="range" min="1" max="10" value="1" id="slider-3" >
                                                    <input type="range" min="1" max="10" value="10" id="slider-4" >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                    </div>
                    <div class="GoodsFilterGroup">
                        <h4 class="title"></h4>
                        <div>
                            <div class="FilterByName">
                                <h5 class="title">Поиск</h5>
                                <div class="searchWrapper">
                                    <input id="search" placeholder="Введите текст" class="search falce" value autofocus autocomplete="off">
                                    <div class="clear"></div>
                                </div>
                            </div>
                            <div>
                                <h5 class="title">Сортировка</h5>
                                <div class="selectContainer">
                                    <select id="select" class="select">
                                        <option value="value1"selected>По названию, от А до Я</option>
                                        <option value="value2" >По названию, от Я до А</option>
                                        <option value="value3">По году, по возрастанию</option>
                                        <option value="value4">По году, по убыванию</option>
                                        </select>
                                </div>
                            </div>
                            <div class="Reset">
                                <button id="filtersReset" >Сброс фильтров</button>
                                <!-- <button >Сброс настроек</button> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="GoodsListing"></div>
                <!-- <div class="message invisible">Извините, совпадений не обнаружено</div> -->
            </div>
    `,
  },
  {
    path: '/basket',
    data: `<div class="goodsInBasket">
        <div class="listGoods">
            <div class="titleGoods">
                <div class="nameTitle">Товары в корзине</div>
                <div class="amountGoods">Количество: <div class="amountGoodsNumber">3</div>
                </div>
                <div class="pagesTitle">Страница:
                    <div class="arrowPrev">
                        < </div>
                            <div class="numberPage">1</div>
                            <div class="arrowNext"> > </div>
                    </div>
                </div>
                <div class="previewOrder">
                    <div class="countGoods">1</div>
                    <div class="iconGoods"></div>
                    <div class="descriptionGoods">
                        <div class="nameGoods">Производитель: Mercedes A123</div>
                        <div class="goodsDescription">Описание: Mercedes-Benz EQA — это компактный электрический хэтчбек
                            со спортивным характером. Концептуальный автомобиль имеет по одному электрическому двигателю
                            на передней и задней оси, которые обеспечивает ему мощность более 200 кВт.</div>
                        <div class="yearGoods">Год выхода: 2010</div>
                        <div class="brandGoods">Производитель: Mercedes</div>
                        <div class="colorGoods">Цвет: Красный</div>
                        <div class="kmGoods">Запас хода (км): 400</div>
                        <div class="popularGoods">Популярный: Да</div>
                    </div>
                    <div class="countControl">
                        <div class="totalNumber">Всего:10</div>
                        <div class="managementNumber">
                            <div class="arrowPlus">-</div>
                            <div class="currentNumber">1</div>
                            <div class="arrowMinus">+</div>
                        </div>
                        <div class="currentPrice">€1,249.00</div>
                    </div>
                </div>
            </div>
            <div class="finalPurchase">
                <div class="summary"></div>
                <div class="allInfo">
                    <div class="allProducts">Всего товаров: 23</div>
                    <div class="allPrice">Итоговая цена: €13,020.00</div>
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
    `,
  },
];

export function router(event, container) {
  event.preventDefault();
  history.pushState({}, 'newUrl', event.target.href);
  let route = routes.find(item => item.path == window.location.pathname);
  if (route !== undefined) {
    container.innerHTML = route.data;
  }
}

export function routerForMain(event) {
  event.preventDefault();
  history.pushState({}, 'main', '/');
  const container = document.getElementById('container') as HTMLElement;
  container.innerHTML = routes[0].data;
}

export function routerForBasket(event, container) {
  event.preventDefault();
  history.pushState({}, 'basket', '/basket');
  let allGoodsInBasket:number[] = [];
  if (localStorage.getItem('idCardInBasket')) {
    allGoodsInBasket = localStorage.getItem('idCardInBasket').split(',').map(item => Number(item));
  }
  let goodsInBasket:number = (localStorage.getItem('idCardInBasket')) ? localStorage.getItem('idCardInBasket').split(',').length : 0;
  let totalPrice:number = (localStorage.getItem('totalPrice')) ? Number(localStorage.getItem('totalPrice')) : 0;
  let render = renderContainerForCards(goodsInBasket, totalPrice, allGoodsInBasket);
  container.innerHTML = render;
}


