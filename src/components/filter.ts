import { carData } from '../data/cars-data';
import { ICarData } from '../types/car-data.interface';
import {  slideOne, slideTwo, slideTree, slideFour } from './slider';

interface IFilterData {
  search: string;
  whoMade: string[];
  km: number[];
  color: string[],
  popular: boolean,
  price: number[],
  availableQuantity: number[],
  currentTotalCart: number
}

export class Filter {
  private drawData!: ((data: ICarData[]) => void);

  public filterData: IFilterData = {
    search: '',
    whoMade: [],
    km: [],
    color: [],
    popular: false,
    price: [],
    availableQuantity: [],
    currentTotalCart: 0,
  };

  currentTotalCart = 0;

  cardsInBasket: string[] = [];

  init(drawFunction: { (data: ICarData[]): void; (data: ICarData[]): void; }) {
    this.drawData = drawFunction;
    const filterWhoMadeButtonsContainer = document.querySelector('.FilterWhoMade') as HTMLElement ;
    filterWhoMadeButtonsContainer.addEventListener('click', this.handleFilterWhoMadeClick.bind(this));
    const filterByPowerButtonsContainer = document.querySelector('.FilterByPower') as HTMLElement ;
    filterByPowerButtonsContainer.addEventListener('click', this.handleFilterByPowerClick.bind(this));
    const filterByColorButtonsContainer = document.querySelector('.FilterByColor') as HTMLElement;
    filterByColorButtonsContainer.addEventListener('click', this.handleFilterByColorClick.bind(this));
    const filterByPopularButtonsContainer = document.querySelector('.FilterByPopular') as HTMLElement;
    filterByPopularButtonsContainer.addEventListener('click', this.handleFilterByPopularClick.bind(this));
    filterByPopularButtonsContainer.addEventListener('click', ()=>{localStorage.getItem('popular') ? localStorage.setItem('popular', '1') : localStorage.removeItem('popular');});
    const searchInput = document.querySelector('.search') as HTMLElement;
    searchInput.addEventListener('keyup', this.handleSearch.bind(this));
    const clearSearchButton = document.querySelector('.clear') as HTMLElement;
    clearSearchButton.addEventListener('click', this.clearSearc.bind(this));
    const sortButton = document.querySelector('.select') as HTMLElement;
    sortButton.addEventListener('change', this.sort.bind(this));
    const resetFilterButton = document.getElementById('filtersReset') as HTMLElement;
    resetFilterButton.addEventListener('click', this.resetFilter.bind(this));
    const goodsItemCard = document.querySelector('.GoodsListing') as HTMLElement;
    goodsItemCard.addEventListener('click', this.addOrRemoveBasket.bind(this));
    const sliderOne = document.getElementById('slider-1') as HTMLInputElement;
    const sliderTwo = document.getElementById('slider-2') as HTMLInputElement;
    const sliderTree = document.getElementById('slider-3') as HTMLInputElement;
    const sliderFour = document.getElementById('slider-4') as HTMLInputElement;

    sliderOne.addEventListener('input', ()=> {
      localStorage.setItem('sliderNumber1', sliderOne.value);
      this.getChangeSliderOne();
      this.checkClass();
    });

    sliderTwo.addEventListener('input', ()=> {
      localStorage.setItem('sliderNumber2', sliderTwo.value);
      this.getChangeSliderTwo();
      this.checkClass();
    });

    sliderTree.addEventListener('input', ()=> {
      localStorage.setItem('sliderNumber3', sliderTree.value);
      this.getChangeSliderTree();
      this.checkClass();
    });

    sliderFour.addEventListener('input', ()=> {
      localStorage.setItem('sliderNumber4', sliderFour.value);
      this.getChangeSliderFour();
      this.checkClass();
    });
  }

  resetFilter() {
    this.filterData = {
      search: '',
      km: [],
      color: [],
      whoMade: [],
      popular: false,
      price:[37000, 100000],
      availableQuantity: [1, 10],
      currentTotalCart: 0,
    };
    for (let  i = 0; i < carData.length; i++) {
      for (let j = i; j < carData.length; j++) {
        if (carData[i].name > carData[j].name) {
          const temp = carData[i];
          carData[i] = carData[j];
          carData[j] = temp;
        }
      }
    }

    this.drawData(carData);

    const filterButtonsActive: NodeListOf<Element> = document.querySelectorAll('.active');

    filterButtonsActive.forEach(element => {
      element.classList.remove('active');
    });

    const filterByColorButtonsActive: NodeListOf<Element> = document.querySelectorAll('.FilterByColor_active');

    filterByColorButtonsActive.forEach(element => {
      element.classList.remove('FilterByColor_active');
    });

    const filterByPopularButtonsActive = document.querySelector('.FilterByPopular_active') as HTMLElement;
    const buttonsActive = document.querySelector('.favorite-input') as HTMLElement;

    if (buttonsActive.classList.contains('FilterByPopular_active')) {
      filterByPopularButtonsActive.classList.remove('FilterByPopular_active');
    }

    const sliderOne = document.getElementById('slider-1') as HTMLInputElement;
    sliderOne.value = '37000';
    const sliderTwo = document.getElementById('slider-2') as HTMLInputElement;
    sliderTwo.value = '100000';
    const sliderTree = document.getElementById('slider-3') as HTMLInputElement;
    sliderTree.value = '1';
    const sliderFour = document.getElementById('slider-4') as HTMLInputElement;
    sliderFour.value = '10';
    const displayValOne = document.getElementById('range1') as HTMLElement;
    displayValOne.innerHTML = '37000';
    const displayValTwo = document.getElementById('range2') as HTMLElement;
    displayValTwo.innerHTML = '100000';
    const displayValTree = document.getElementById('range3') as HTMLElement;
    displayValTree.innerHTML = '1';
    const displayValFour = document.getElementById('range4') as HTMLElement;
    displayValFour.innerHTML = '10';
    const select = document.querySelector('#select') as HTMLSelectElement;
    const currentTotalCart = document.querySelector('.currentTotalCart') as HTMLElement;
    const basket = document.querySelector('.basket') as HTMLElement;
    localStorage.setItem('sliderNumber1', '37000');
    localStorage.setItem('sliderNumber2', '100000');
    localStorage.setItem('sliderNumber3', '1');
    localStorage.setItem('sliderNumber4', '10');
    localStorage.setItem('currentNumber', '0');
    localStorage.removeItem('popular');
    localStorage.removeItem('kilometers');
    localStorage.removeItem('colors');
    localStorage.removeItem('makers');
    localStorage.setItem('sortNameUp', '1');
    localStorage.removeItem('sortNameDown');
    localStorage.removeItem('sortYearUp');
    localStorage.removeItem('sortYearDown');
    localStorage.removeItem('idCardInBasket');
    basket.innerHTML = '0';
    this.cardsInBasket = [];
    this.currentTotalCart = 0;
    localStorage.setItem('totalPrice', String(0));
    currentTotalCart.innerHTML = 'Текущая цена: € 0';
    carData.forEach(element => element.inBasket = false );
    const isInBasket:NodeListOf<Element> = document.querySelectorAll('.InBasket') ;
    for (let i = 0 ; i <= isInBasket.length; i++) {
      if (isInBasket[i].innerHTML == 'да') {
        isInBasket[i].innerHTML = 'нет';
      } else {false;}
    }
    select.value = 'value1';
  }


  checkClass() {
    if (localStorage.getItem('idCardInBasket')) {
      const tmp: string[] = localStorage.getItem('idCardInBasket')!.split(',');
      const arr2: string [] = [];
      for (let i = 0; i < tmp.length; i++) {
        arr2.push((tmp[i]));
      }
      this.cardsInBasket = arr2;
      const tmpArr:string[] = localStorage.getItem('idCardInBasket')!.split(',');
      const basket = document.querySelector('.basket') as HTMLElement;
      basket.innerHTML = String(tmpArr.length);
      this.currentTotalCart = Number(localStorage.getItem('totalPrice'));

      const arr:string[] = localStorage.getItem('idCardInBasket')!.split(',');

      for (let y = 0 ; y < arr.length; y++) {

        const goodsItem = document.querySelectorAll('.GoodsItem');
        for (let g = 0 ; g < goodsItem.length; g++) {
          if (goodsItem[g].closest('.GoodsItem')?.getAttribute('data-card') == arr[y]) {
            goodsItem[g].closest('.GoodsItem')!.querySelector('.InBasket')!.innerHTML = 'да';
            goodsItem[g].closest('.GoodsItem')!.querySelector('.addBasket')!.innerHTML = 'В корзине';
            goodsItem[g].classList.add('GoodsItemInBasket');
          }
          for (let i = 0 ; i < carData.length; i++) {
            carData[g].inBasket = true;
          }
        }
      }
    }
  }

  showRange = (minNum:number, maxNum:number, displayValOne: HTMLElement, displayValTwo: HTMLElement):void =>{
    if (minNum > maxNum) {
      const tmp = maxNum;
      maxNum = minNum;
      minNum = tmp;
      displayValOne.innerHTML = String(minNum);
      displayValTwo.innerHTML = String(maxNum);
    }
    displayValOne.innerHTML = String(minNum);
    displayValTwo.innerHTML = String(maxNum);
  };


  getChangeSliderOne():void {
    const sliderOne = document.getElementById('slider-1') as HTMLInputElement;
    const displayValOne = document.getElementById('range1') as HTMLElement;
    const displayValTwo = document.getElementById('range2') as HTMLElement;
    const [minNum, maxNum]: number[] = slideOne();

    if (localStorage.getItem('sliderNumber1')) {
      this.showRange(minNum, maxNum, displayValOne, displayValTwo);
      this.getNumbersCostBetween( minNum, maxNum );
      sliderOne.value = localStorage.getItem('sliderNumber1')!;
      displayValOne.innerHTML = localStorage.getItem('sliderNumber1')!;
    } else {
      this.showRange(minNum, maxNum, displayValOne, displayValTwo);
      this.getNumbersCostBetween( maxNum, minNum);
    }
  }

  getChangeSliderTwo():void {
    const sliderTwo = document.getElementById('slider-2') as HTMLInputElement;
    const displayValOne = document.getElementById('range1') as HTMLElement;
    const displayValTwo = document.getElementById('range2') as HTMLElement;
    const [minNum, maxNum]: number[] = slideTwo();
    if (localStorage.getItem('sliderNumber2')) {
      this.showRange(minNum, maxNum, displayValOne, displayValTwo);
      this.getNumbersCostBetween(minNum, maxNum);
      sliderTwo.value = localStorage.getItem('sliderNumber2')!;
      displayValTwo.innerHTML = localStorage.getItem('sliderNumber2')!;
    } else {
      this.showRange(minNum, maxNum, displayValOne, displayValTwo);
      this.getNumbersCostBetween(minNum, maxNum);
    }
  }

  getChangeSliderTree():void {
    const sliderTree = document.getElementById('slider-3') as HTMLInputElement;
    const displayValTree = document.getElementById('range3') as HTMLElement;
    const displayValFour = document.getElementById('range4') as HTMLElement;
    const [minNum, maxNum]: number[] = slideTree();

    if (localStorage.getItem('sliderNumber3')) {
      this.showRange(minNum, maxNum, displayValTree, displayValFour);
      this.getNumbersQuantityBetween(minNum, maxNum);
      displayValTree.innerHTML = localStorage.getItem('sliderNumber3')!;
      sliderTree.value = localStorage.getItem('sliderNumber3')!;
    } else {
      this.showRange(minNum, maxNum, displayValTree, displayValFour);
      this.getNumbersQuantityBetween(minNum, maxNum);
    }
  }

  getChangeSliderFour():void {
    const sliderFour = document.getElementById('slider-4') as HTMLInputElement;
    const displayValTree = document.getElementById('range3') as HTMLElement;
    const displayValFour = document.getElementById('range4') as HTMLElement;
    const [minNum, maxNum]: number[] = slideFour();
    if (localStorage.getItem('sliderNumber4')) {
      this.showRange(minNum, maxNum, displayValTree, displayValFour);
      this.getNumbersQuantityBetween(minNum, maxNum);
      displayValFour.innerHTML = localStorage.getItem('sliderNumber4')!;
      sliderFour.value = localStorage.getItem('sliderNumber4')!;
    } else {
      this.showRange(minNum, maxNum, displayValTree, displayValFour);
      this.getNumbersQuantityBetween(minNum, maxNum);
    }
  }

  applyFilter() {
    let filteredData = carData;
    if (this.filterData.price.length) {
      filteredData = filteredData.filter(item => {
        if (this.filterData.price[0] <= item.price && this.filterData.price[1] >= item.price) {
          return true;
        } else {return false;}
      });
    }

    if (this.filterData.availableQuantity.length) {
      filteredData = filteredData.filter(item => {
        if (this.filterData.availableQuantity[0] <= item.availableQuantity && this.filterData.availableQuantity[1] >= item.availableQuantity) {
          return true;
        } else {return false;}
      });
    }

    if (this.filterData.whoMade.length) {
      filteredData = filteredData.filter(item => {
        if (this.filterData.whoMade.includes(item.whoMade.toLowerCase())) {
          return true;
        } else {return false;}
      });
    }

    if (this.filterData.km.length) {
      filteredData = filteredData.filter(item => {
        if (this.filterData.km.includes(item.km)) {
          return true;
        } else {return false;}
      });
    }

    if (this.filterData.color.length) {
      filteredData = filteredData.filter(item => {
        if (this.filterData.color.includes(item.color.toLowerCase())) {
          return true;
        } else {return false;}
      });
    }

    if (this.filterData.popular) {
      filteredData = filteredData.filter(item => {
        if (this.filterData.popular === item.popular) {
          return true;
        } else {return false;}
      });
    }

    if (this.filterData.search) {
      filteredData = filteredData.filter(item => item.whoMade.toLowerCase().includes(this.filterData.search) || item.modelName.toLowerCase().includes(this.filterData.search));
    }

    const filterByPopularButtonsActive = document.querySelector('.favorite-input') as HTMLElement;
    const typeLarge = document.querySelector('.type-large') as HTMLElement;
    const typeMedium = document.querySelector('.type-medium') as HTMLElement;
    const typeSmall  = document.querySelector('.type-small') as HTMLElement;
    const buttonWhite = document.querySelector('.FilterByColor__button_type-white') as HTMLElement;
    const buttonGgray = document.querySelector('.FilterByColor__button_type-gray') as HTMLElement;
    const buttonRed  = document.querySelector('.FilterByColor__button_type-red') as HTMLElement;
    const typeMersedes = document.querySelector('.type-mersedes') as HTMLElement;
    const typeTesla = document.querySelector('.type-tesla') as HTMLElement;
    const typeVolkswagen  = document.querySelector('.type-volkswagen') as HTMLElement;
    const select = document.querySelector('#select') as HTMLSelectElement;

    if (localStorage.getItem('popular')) {
      filterByPopularButtonsActive.classList.add('FilterByPopular_active');
      this.filterData.popular = true;
    }

    if (localStorage.getItem('sliderNumber1') && localStorage.getItem('sliderNumber2')) {
      this.filterData.price = [Number(localStorage.getItem('sliderNumber1')), Number(localStorage.getItem('sliderNumber2'))];
    }

    if (localStorage.getItem('sliderNumber3') && localStorage.getItem('sliderNumber4')) {
      this.filterData.availableQuantity = [Number(localStorage.getItem('sliderNumber3')), Number(localStorage.getItem('sliderNumber4'))];
    }

    if (localStorage.getItem('kilometers')) {
      this.filterData.km = [];
      const currArrKm:string[] = localStorage.getItem('kilometers')!.split(',');
      for (let i = 0 ; i <= currArrKm.length; i++) {
        if (currArrKm[i] == '500') {
          typeLarge.classList.add('active');
          this.filterData.km.push(500);
        }
        if (currArrKm[i] == '400') {
          typeMedium.classList.add('active');
          this.filterData.km.push(400);

        }
        if (currArrKm[i] == '300') {
          typeSmall.classList.add('active');
          this.filterData.km.push(300);
        }
      }
    }

    if (localStorage.getItem('colors')) {
      this.filterData.color = [];
      const currArrColors:string[] = localStorage.getItem('colors')!.split(',');
      for (let i = 0 ; i <= currArrColors.length; i++) {
        if (currArrColors[i] == 'белый') {
          buttonWhite.classList.add('FilterByColor_active');
          this.filterData.color.push('белый');
        }

        if (currArrColors[i] == 'серый') {
          buttonGgray.classList.add('FilterByColor_active');
          this.filterData.color.push('серый');
        }

        if (currArrColors[i] == 'красный') {
          buttonRed.classList.add('FilterByColor_active');
          this.filterData.color.push('красный');
        }
      }
    }

    if (localStorage.getItem('makers')) {
      this.filterData.whoMade = [];
      const currArrColors:string[] = localStorage.getItem('makers')!.split(',');
      for (let i = 0 ; i <= currArrColors.length; i++) {
        if (currArrColors[i] == 'mercedes') {
          typeMersedes.classList.add('active');
          this.filterData.whoMade.push('mercedes');
        }

        if (currArrColors[i] == 'tesla') {
          typeTesla.classList.add('active');
          this.filterData.whoMade.push('tesla');
        }
        if (currArrColors[i] == 'volkswagen') {
          typeVolkswagen.classList.add('active');
          this.filterData.whoMade.push('volkswagen');
        }
      }
    }


    if (localStorage.getItem('totalPrice')) {
      const currentTotalCart = document.querySelector('.currentTotalCart') as HTMLElement;
      currentTotalCart.innerHTML = `Текущая цена: € ${localStorage.getItem('totalPrice')}`;
    }

    if (localStorage.getItem('sortNameUp')) {
      select.value = 'value1';
      for (let  i = 0; i < carData.length; i++) {
        for (let j = i; j < carData.length; j++) {
          if (carData[i].name > carData[j].name) {
            const temp = carData[i];
            carData[i] = carData[j];
            carData[j] = temp;
          }
        }
      }
    }
    if (localStorage.getItem('sortNameDown')) {
      select.value = 'value2';
      for (let  i = 0; i < carData.length; i++) {
        for (let j = i; j < carData.length; j++) {
          if (carData[i].name < carData[j].name) {
            const temp = carData[i];
            carData[i] = carData[j];
            carData[j] = temp;
          }
        }
      }
    }

    if (localStorage.getItem('sortYearUp')) {
      select.value = 'value3';
      for (let i = 0; i < carData.length; i++) {
        for (let j = i; j < carData.length; j++) {
          if (carData[i].year > carData[j].year) {
            const temp = carData[i];
            carData[i] = carData[j];
            carData[j] = temp;
          }
        }
      }
    }

    if (localStorage.getItem('sortYearDown')) {
      select.value = 'value4';
      for (let  i = 0; i < carData.length; i++) {
        for (let j = i; j < carData.length; j++) {
          if (carData[i].year < carData[j].year) {
            const temp = carData[i];
            carData[i] = carData[j];
            carData[j] = temp;
          }
        }
      }
    }
    this.drawData(filteredData);
  }

  sortType(value:string) {
    switch (value) {
      case 'value1':
        this.sortByNameUp();
        break;
      case 'value2':
        this.sortByNameDown();
        break;
      case 'value3':
        this.sortByYearUp();
        break;
      case 'value4':
        this.sortByYearDown();
        break;
    }
  }

  getNumbersCostBetween(minNum:number, maxNum:number) {
    this.filterData.price = [minNum, maxNum];
    this.applyFilter();
  }

  getNumbersQuantityBetween(minNum:number, maxNum:number) {
    this.filterData.availableQuantity = [minNum, maxNum];
    this.applyFilter();
    if (this.filterData.availableQuantity.length === 0) {
      return this.resetFilter();
    }
  }

  handleFilterWhoMadeClick(event: Event) {
    const element = <Element>event.target;
    let arrMakers: string[] = [];
    if (element!.tagName === 'BUTTON') {
      const buttonText = (element as HTMLElement).innerText.toLowerCase();
      if (element.classList.contains('active')) {
        const filterIndex = this.filterData.whoMade.indexOf(buttonText);
        this.filterData.whoMade.splice(filterIndex, 1);
      } else {
        this.filterData.whoMade.push(buttonText);
      }
      arrMakers = this.filterData.whoMade;
      localStorage.setItem('makers', String(arrMakers));
      if (arrMakers.length === 0) {
        localStorage.removeItem('makers');
      }
      element.classList.toggle('active');
      if (this.filterData.whoMade.length === 0) {
        return this.resetFilter();
      }
      this.applyFilter();
      this.checkClass();
    }
  }

  handleFilterByPowerClick(event: Event) {
    const element = <Element>event.target;
    let arrKm: number[] = [];
    if (element.tagName === 'BUTTON') {
      const buttonText = +(element as HTMLElement).innerText;
      if (element.classList.contains('active')) {
        const filterIndex = this.filterData.km.indexOf(buttonText);
        this.filterData.km.splice(filterIndex, 1);
      } else {
        this.filterData.km.push(buttonText);
      }
      arrKm = this.filterData.km;
      localStorage.setItem('kilometers', String(arrKm));
      if (arrKm.length === 0) {
        localStorage.removeItem('kilometers');
      }
      element.classList.toggle('active');
      if (this.filterData.km.length === 0) {
        return this.resetFilter();
      }
      this.applyFilter();
      this.checkClass();
    }
  }

  handleFilterByColorClick(event: Event) {
    const element = <Element>event.target;
    let arrColors : string[] = [];
    if (element.tagName === 'BUTTON') {
      const buttonText = (element as HTMLElement).innerText.toLowerCase();
      if (element.classList.contains('FilterByColor_active')) {
        const filterIndex = this.filterData.color.indexOf(buttonText);
        this.filterData.color.splice(filterIndex, 1);
      } else {
        this.filterData.color.push(buttonText);
      }
      arrColors = this.filterData.color;
      localStorage.setItem('colors', String(arrColors));
      if (arrColors.length === 0) {
        localStorage.removeItem('colors');
      }
      element.classList.toggle('FilterByColor_active');
      if (this.filterData.color.length === 0) {
        return this.resetFilter();
      }
      this.applyFilter();
      this.checkClass();
    }
  }

  handleFilterByPopularClick(event: Event) {
    const element = <Element>event.target;
    if (element.tagName === 'BUTTON') {
      if (element.classList.contains('FilterByPopular_active')) {
        this.filterData.popular = false;
        element.classList.remove('FilterByPopular_active');
        localStorage.removeItem('popular');
      } else {
        this.filterData.popular = true;
        element.classList.add('FilterByPopular_active');
        localStorage.setItem('popular', '1');
      }
      if (this.filterData.popular === false) {
        return this.resetFilter();
      }
      this.applyFilter();
      this.checkClass();
    }
  }

  handleSearch(event: Event) {
    this.filterData.search = (event.target as HTMLButtonElement)!.value;
    this.applyFilter();
    const text = document.querySelector('.GoodsListing') as HTMLElement;
    if (!text.innerHTML) {
      text.innerHTML = 'Извините, совпадений не обнаружено';
    }
    this.checkClass();
  }

  clearSearc() {
    const searchInput = document.querySelector('.search') as HTMLInputElement;
    searchInput.value = '';
    this.filterData.search = '';
    this.applyFilter();
    this.checkClass();
  }

  sort(event: Event) {
    const value = (event.target as HTMLButtonElement)!.value;
    switch (value) {
      case 'value1':
        this.sortByNameUp();
        break;
      case 'value2':
        this.sortByNameDown();
        break;
      case 'value3':
        this.sortByYearUp();
        break;
      case 'value4':
        this.sortByYearDown();
        break;
    }
    this.checkClass();
  }

  sortByNameUp() {
    for (let  i = 0; i < carData.length; i++) {
      for (let j = i; j < carData.length; j++) {
        if (carData[i].name > carData[j].name) {
          const temp = carData[i];
          carData[i] = carData[j];
          carData[j] = temp;
        }
      }
    }
    localStorage.setItem('sortNameUp', '1');
    localStorage.removeItem('sortNameDown');
    localStorage.removeItem('sortYearUp');
    localStorage.removeItem('sortYearDown');
    this.applyFilter();
  }

  sortByNameDown() {
    for (let  i = 0; i < carData.length; i++) {
      for (let j = i; j < carData.length; j++) {
        if (carData[i].name < carData[j].name) {
          const temp = carData[i];
          carData[i] = carData[j];
          carData[j] = temp;
        }
      }
    }
    localStorage.setItem('sortNameDown', '1');
    localStorage.removeItem('sortNameUp');
    localStorage.removeItem('sortYearUp');
    localStorage.removeItem('sortYearDown');
    this.applyFilter();
  }

  sortByYearUp() {
    for (let  i = 0; i < carData.length; i++) {
      for (let j = i; j < carData.length; j++) {
        if (carData[i].year > carData[j].year) {
          const temp = carData[i];
          carData[i] = carData[j];
          carData[j] = temp;
        }
      }
    }
    localStorage.setItem('sortYearUp', '1');
    localStorage.removeItem('sortNameUp');
    localStorage.removeItem('sortNameDown');
    localStorage.removeItem('sortYearDown');
    this.applyFilter();
  }

  sortByYearDown() {
    for (let  i = 0; i < carData.length; i++) {
      for (let j = i; j < carData.length; j++) {
        if (carData[i].year < carData[j].year) {
          const temp = carData[i];
          carData[i] = carData[j];
          carData[j] = temp;
        }
      }
    }
    localStorage.setItem('sortYearDown', '1');
    localStorage.removeItem('sortYearUp');
    localStorage.removeItem('sortNameUp');
    localStorage.removeItem('sortNameDown');
    this.applyFilter();
  }

  addOrRemoveBasket(event: Event) {
    const currPrice = document.querySelector('.currentTotalCart') as HTMLElement;
    const element = event.target;
    if ((element as HTMLElement)!.classList.contains('addBasket')) {
      const basket = document.querySelector('.basket') as HTMLElement;
      let quantityInBasket:number = +basket.innerHTML;

      if ((this.cardsInBasket.includes((event.target as HTMLElement)!.closest('.GoodsItem')!.getAttribute('data-card')!))) {
        this.cardsInBasket = this.cardsInBasket.filter(function (f) {return f !== ((event.target as HTMLElement)!.closest('.GoodsItem')!.getAttribute('data-card'))});
      } else if (!(this.cardsInBasket.includes((event.target as HTMLElement)!.closest('.GoodsItem')!.getAttribute('data-card')!))) {
        this.cardsInBasket.push((event.target  as HTMLElement)!.closest('.GoodsItem')!.getAttribute('data-card')!);
      }

      localStorage.setItem('idCardInBasket', String(this.cardsInBasket));

      if (quantityInBasket < 27 || (quantityInBasket === 27 && (element as HTMLElement)!.classList.contains('GoodsItemInBasket'))) {
        (event.target as HTMLElement)!
          .closest('.GoodsItem')!
          .classList.toggle('GoodsItemInBasket');
        localStorage.setItem('inBasket', 'true');
        const isInBasket = (element as HTMLElement)!.closest('.GoodsItem')!.querySelector('.InBasket') as HTMLElement;
        isInBasket.innerText === 'да' ? isInBasket.innerText = 'нет' : isInBasket.innerText = 'да';

        if ( isInBasket.innerText === 'нет' ) {
          this.currentTotalCart -= Number((event.target as HTMLElement)!.closest('.GoodsItem')!.getAttribute('data-price'));
          currPrice.innerHTML = `Текущая цена: € ${this.currentTotalCart}`;
          localStorage.setItem('totalPrice', String(this.currentTotalCart));
          (element as HTMLElement)!.closest('.GoodsItem')!.querySelector('.addBasket')!.innerHTML = 'В корзину';
        } else {
          this.currentTotalCart += Number(((event as Event).target as HTMLElement)!.closest('.GoodsItem')!.getAttribute('data-price'));
          currPrice.innerHTML = `Текущая цена: € ${this.currentTotalCart}`;
          localStorage.setItem('totalPrice', String(this.currentTotalCart));
          (element as HTMLElement)!.closest('.GoodsItem')!.querySelector('.addBasket')!.innerHTML = 'В корзине';
        }

        const itemFields = ((element  as HTMLElement)!.closest('.GoodsItem')!.querySelector('.GoodsItemTitle') as HTMLElement)!.innerText +
        ' ' + ((element as HTMLElement)!.closest('.GoodsItem')!.querySelector('.Color') as HTMLElement)!.innerText;
        carData.forEach(item => {
          if (item.whoMade + ' ' + item.modelName + ' ' + item.color === itemFields) {
            item.inBasket ? item.inBasket = false : item.inBasket = true;
          }
        });
        carData.forEach(item => {
          if (item.inBasket === true) quantityInBasket++;
        });
        let res = 0;
        carData.forEach(item => {
          if (item.inBasket) res++;
        });
        if (res === 0) {
          localStorage.removeItem('idCardInBasket');
        }

        if (localStorage.getItem('idCardInBasket')) {
          const tmpArr:string[] = localStorage.getItem('idCardInBasket')!.split(',');
          basket.innerHTML = String(tmpArr.length);
        } else {
          basket.innerHTML = '0';
        }
      } else alert('Извините, все слоты заполнены');
    }
  }
}