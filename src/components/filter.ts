import { carData } from "../data/cars-data";
import { ICarData } from "../types/car-data.interface";
import {  slideOne, slideTwo, slideTree, slideFour } from "./slider";

interface IFilterData {
    search: string;
    whoMade: string[];
    km: number[];
    color: string[],
    popular: boolean,
    price: number[],
    availableQuantity: number[]
}

export class Filter {
    private drawData: (data: ICarData[]) => void;

    public filterData: IFilterData = {
        search: '',
        whoMade: [],
        km: [],
        color: [],
        popular: false,
        price: [],
        availableQuantity: [],
    }

    init (drawFunction) {
        this.drawData = drawFunction;
        const filterWhoMadeButtonsContainer = document.querySelector(".FilterWhoMade");
        filterWhoMadeButtonsContainer.addEventListener("click", this.handleFilterWhoMadeClick.bind(this));
        const filterByPowerButtonsContainer = document.querySelector(".FilterByPower");
        filterByPowerButtonsContainer.addEventListener("click", this.handleFilterByPowerClick.bind(this));
        const filterByColorButtonsContainer = document.querySelector(".FilterByColor");
        filterByColorButtonsContainer.addEventListener("click", this.handleFilterByColorClick.bind(this));
        const filterByPopularButtonsContainer = document.querySelector(".FilterByPopular");
        filterByPopularButtonsContainer.addEventListener("click",this.handleFilterByPopularClick.bind(this));
        filterByPopularButtonsContainer.addEventListener("click",()=>{localStorage.getItem("popular") ? localStorage.setItem('popular','1') : localStorage.removeItem('popular')})
        const searchInput = document.querySelector(".search");
        searchInput.addEventListener("keyup", this.handleSearch.bind(this));
        const clearSearchButton = document.querySelector(".clear");
        clearSearchButton.addEventListener("click", this.clearSearc.bind(this));
        const sortButton = document.querySelector(".select");
        sortButton.addEventListener("change", this.sort.bind(this));

        const resetFilterButton = document.getElementById("filtersReset");
        resetFilterButton.addEventListener("click", this.resetFilter.bind(this));
        const goodsItemCard = document.querySelector(".GoodsListing");
        goodsItemCard.addEventListener("click", this.addOrRemoveBasket.bind(this));

        const sliderOne = document.getElementById("slider-1") as HTMLInputElement;
        const sliderTwo = document.getElementById("slider-2") as HTMLInputElement;
        const sliderTree = document.getElementById("slider-3") as HTMLInputElement;
        const sliderFour = document.getElementById("slider-4") as HTMLInputElement;

        sliderOne.addEventListener('input',()=>{
            localStorage.setItem("sliderNumber1", sliderOne.value)
            this.getChangeSliderOne()
        });

        sliderTwo.addEventListener('input',()=>{
            localStorage.setItem("sliderNumber2", sliderTwo.value)
            this.getChangeSliderTwo()
            /* let [minNum, maxNum] = slideTwo()
            showRange(minNum, maxNum, displayValOne ,displayValTwo)
            this.getNumbersCostBetween(minNum, maxNum) */
        });

        sliderTree.addEventListener('input',()=>{
            localStorage.setItem("sliderNumber3", sliderTree.value)
            this.getChangeSliderTree()
       });

       sliderFour.addEventListener('input',()=>{
        localStorage.setItem("sliderNumber4", sliderFour.value)
        this.getChangeSliderFour()
         /*   let [minNum, maxNum] = slideFour()
           showRange(minNum, maxNum, displayValTree ,displayValFour)
           console.log(minNum, maxNum)
           this.getNumbersQuantityBetween(minNum,maxNum) */
       });
    }

    resetFilter () {
        this.filterData = {
            search: '',
            km: [],
            color: [],
            whoMade: [],
            popular: false,
            price:[37000, 100000],
            availableQuantity: [1, 10],
        }
        for (let  i = 0; i < carData.length; i++) {
            for (let j = i; j < carData.length; j++){
                if(carData[i].name > carData[j].name){
                    let temp = carData[i];
                    carData[i] = carData[j];
                    carData[j] = temp;
                }
            }
        }
        this.drawData(carData);

        const filterButtonsActive = document.querySelectorAll(".active");
        filterButtonsActive.forEach(element => {
            element.classList.remove("active");
        });
        const filterByColorButtonsActive = document.querySelectorAll(".FilterByColor_active");
        filterByColorButtonsActive.forEach(element => {
            element.classList.remove("FilterByColor_active");
        });
        const filterByPopularButtonsActive = document.querySelector(".FilterByPopular_active");
        const buttonsActive = document.querySelector('.favorite-input')
        if(buttonsActive.classList.contains("FilterByPopular_active")){
            filterByPopularButtonsActive.classList.remove("FilterByPopular_active");
        }


        const sliderOne = document.getElementById("slider-1") as HTMLInputElement;
        sliderOne.value = '37000';
        const sliderTwo = document.getElementById("slider-2") as HTMLInputElement;
        sliderTwo.value = '100000';
        const sliderTree = document.getElementById("slider-3") as HTMLInputElement;
        sliderTree.value = '1';
        const sliderFour = document.getElementById("slider-4") as HTMLInputElement;
        sliderFour.value = '10';
        const displayValOne = document.getElementById("range1") as HTMLElement;
        displayValOne.innerHTML = '37000';
        const displayValTwo = document.getElementById("range2") as HTMLElement;
        displayValTwo.innerHTML = '100000';
        const displayValTree = document.getElementById("range3") as HTMLElement;
        displayValTree.innerHTML = '1';
        const displayValFour = document.getElementById("range4") as HTMLElement;
        displayValFour.innerHTML = '10';
        const select = document.querySelector('#select') as HTMLSelectElement;
        localStorage.setItem('sliderNumber1','37000');
        localStorage.setItem('sliderNumber2','100000');
        localStorage.setItem('sliderNumber3','1');
        localStorage.setItem('sliderNumber4','10');
        localStorage.setItem('currentNumber','0');
        localStorage.removeItem('popular');
        localStorage.removeItem('kilometers');
        localStorage.removeItem('colors');
        localStorage.removeItem('makers');
        localStorage.setItem('sortNameUp','1')
        localStorage.removeItem('sortNameDown')
        localStorage.removeItem('sortYearUp')
        localStorage.removeItem('sortYearDown')

        select.value = 'value1';

    }

    showRange = (minNum:number , maxNum:number, displayValOne: HTMLElement, displayValTwo: HTMLElement):void =>{
        if(minNum > maxNum){
            let tmp = maxNum;
            maxNum = minNum;
            minNum = tmp;
            displayValOne.innerHTML = String(minNum)
            displayValTwo.innerHTML = String(maxNum)
        }
        displayValOne.innerHTML = String(minNum)
        displayValTwo.innerHTML = String(maxNum)
    }


    getChangeSliderOne(){
        /* this.showRange() */
        const sliderOne = document.getElementById("slider-1") as HTMLInputElement;
        const displayValOne = document.getElementById("range1") as HTMLElement;
        const displayValTwo = document.getElementById("range2") as HTMLElement;
        let [minNum, maxNum] = slideOne()
           /*  localStorage.setItem("sliderNumber1", String(sliderOne.value)) */
            if (localStorage.getItem("sliderNumber1")) {
                this.showRange(minNum, maxNum, displayValOne ,displayValTwo)
                this.getNumbersCostBetween( minNum, maxNum )
                sliderOne.value = localStorage.getItem("sliderNumber1");
                displayValOne.innerHTML = localStorage.getItem("sliderNumber1");
            }else{
                this.showRange(minNum, maxNum, displayValOne ,displayValTwo)
                this.getNumbersCostBetween( maxNum, minNum)
              }

console.log('getChangeNumber1',minNum, maxNum)

    }

    getChangeSliderTwo(){
        const sliderTwo = document.getElementById("slider-2") as HTMLInputElement;
        const displayValOne = document.getElementById("range1") as HTMLElement;
        const displayValTwo = document.getElementById("range2") as HTMLElement;
        let [minNum, maxNum] = slideTwo()
            if (localStorage.getItem("sliderNumber2")) {
                this.showRange(minNum, maxNum, displayValOne ,displayValTwo)
                this.getNumbersCostBetween(minNum, maxNum)
                sliderTwo.value = localStorage.getItem("sliderNumber2");
                displayValTwo.innerHTML = localStorage.getItem("sliderNumber2");
            }else{
                this.showRange(minNum, maxNum, displayValOne ,displayValTwo)
                this.getNumbersCostBetween(minNum, maxNum)
            }

            console.log('getChangeNumber2',minNum, maxNum)
    }
    getChangeSliderTree(){
        const sliderTree = document.getElementById("slider-3") as HTMLInputElement;
        const displayValTree = document.getElementById("range3") as HTMLElement;
        const displayValFour = document.getElementById("range4") as HTMLElement;
        let [minNum, maxNum] = slideTree()

        if (localStorage.getItem("sliderNumber3")) {
            this.showRange(minNum, maxNum, displayValTree ,displayValFour)
            this.getNumbersQuantityBetween(minNum,maxNum)
            displayValTree.innerHTML = localStorage.getItem("sliderNumber3");
            sliderTree.value = localStorage.getItem("sliderNumber3");
        }else{
            this.showRange(minNum, maxNum, displayValTree ,displayValFour)
            this.getNumbersQuantityBetween(minNum,maxNum)
        }
    }
    getChangeSliderFour(){
        const sliderFour = document.getElementById("slider-4") as HTMLInputElement;
        const displayValTree = document.getElementById("range3") as HTMLElement;
        const displayValFour = document.getElementById("range4") as HTMLElement;
        let [minNum, maxNum] = slideFour()
        if (localStorage.getItem("sliderNumber4")) {
            this.showRange(minNum, maxNum, displayValTree ,displayValFour)
            this.getNumbersQuantityBetween(minNum,maxNum)
            displayValFour.innerHTML = localStorage.getItem("sliderNumber4");
            sliderFour.value = localStorage.getItem("sliderNumber4");
        }else{
            this.showRange(minNum, maxNum, displayValTree ,displayValFour)
            this.getNumbersQuantityBetween(minNum,maxNum)
        }
    }

    applyFilter () {
        console.log("applyFilter");
        console.log('can',this.filterData);
        let filteredData = carData;

        if (this.filterData.price.length) {
            filteredData = filteredData.filter(item => {
                if (this.filterData.price[0]<= item.price && this.filterData.price[1]>= item.price) {
                    return true;
                } else {return false}
            })
        }
        if (this.filterData.availableQuantity.length) {
            filteredData = filteredData.filter(item => {
                if (this.filterData.availableQuantity[0]<= item.availableQuantity && this.filterData.availableQuantity[1]>= item.availableQuantity) {
                    return true;
                } else {return false}
            })
        }
        if (this.filterData.whoMade.length) {
            filteredData = filteredData.filter(item => {
                if (this.filterData.whoMade.includes(item.whoMade.toLowerCase())) {
                    return true;
                } else {return false}
            })
        }
        if (this.filterData.km.length) {
            filteredData = filteredData.filter(item => {
                if (this.filterData.km.includes(item.km)) {
                    return true;
                } else {return false}
            })
        }
        if (this.filterData.color.length) {
            console.log('filterColorSearch', filteredData)
            filteredData = filteredData.filter(item => {
                if (this.filterData.color.includes(item.color.toLowerCase())) {
                    return true;
                } else {return false}
            })
        }
        if (this.filterData.popular) {
            filteredData = filteredData.filter(item => {
                if (this.filterData.popular === item.popular) {
                    return true;
                } else {return false}
            })
        }

        if (this.filterData.search) {
            filteredData = filteredData.filter(item => item.whoMade.toLowerCase().includes(this.filterData.search) || item.modelName.toLowerCase().includes(this.filterData.search))
        }





        const filterByPopularButtonsActive = document.querySelector(".favorite-input")
        const typeLarge = document.querySelector('.type-large')
        const typeMedium = document.querySelector('.type-medium')
        const typeSmall  = document.querySelector('.type-small')
        const buttonWhite = document.querySelector('.FilterByColor__button_type-white')
        const buttonGgray = document.querySelector('.FilterByColor__button_type-gray')
        const buttonRed  = document.querySelector('.FilterByColor__button_type-red')
        const typeMersedes = document.querySelector('.type-mersedes')
        const typeTesla = document.querySelector('.type-tesla')
        const typeVolkswagen  = document.querySelector('.type-volkswagen')
        const select = document.querySelector('#select') as HTMLSelectElement;

       /*  const sortButton = document.querySelector(".select");
        sortButton.addEventListener("change", this.sort.bind(this)) */

        if(localStorage.getItem("popular")){
         filterByPopularButtonsActive.classList.add("FilterByPopular_active")
         this.filterData.popular = true;
        }
        if(localStorage.getItem('sliderNumber1') && localStorage.getItem('sliderNumber2')){
            this.filterData.price = [Number(localStorage.getItem('sliderNumber1')), Number(localStorage.getItem('sliderNumber2')) ]
        }
        if(localStorage.getItem('sliderNumber3') && localStorage.getItem('sliderNumber4')){
            this.filterData.availableQuantity = [Number(localStorage.getItem('sliderNumber3')), Number(localStorage.getItem('sliderNumber4')) ]
        }


        if(localStorage.getItem("kilometers")){
           this.filterData.km=[]
           let currArrKm:string[] = localStorage.getItem("kilometers").split(',')
         for(let i = 0 ; i<= currArrKm.length; i++){
            if(currArrKm[i] == '500'){
                typeLarge.classList.add('active')
                this.filterData.km.push(500)
            }
            if(currArrKm[i] == '400'){
                typeMedium.classList.add('active')
                this.filterData.km.push(400)

            }
            if(currArrKm[i] == '300'){
                typeSmall.classList.add('active')
                this.filterData.km.push(300)
            }
         }
        }


        if(localStorage.getItem("colors")){
            this.filterData.color=[]
            let currArrColors:string[] = localStorage.getItem("colors").split(',')
          for(let i = 0 ; i<= currArrColors.length; i++){
             if(currArrColors[i] == 'белый'){
                 buttonWhite.classList.add('FilterByColor_active')
                 this.filterData.color.push('белый')
             }
             if(currArrColors[i] == 'серый'){
                 buttonGgray.classList.add('FilterByColor_active')
                 this.filterData.color.push('серый')

             }
             if(currArrColors[i] == 'красный'){
                 buttonRed.classList.add('FilterByColor_active')
                 this.filterData.color.push('красный')
             }
          }
         }


         if(localStorage.getItem("makers")){
            this.filterData.whoMade=[]
            let currArrColors:string[] = localStorage.getItem("makers").split(',')
          for(let i = 0 ; i<= currArrColors.length; i++){
             if(currArrColors[i] == 'mercedes'){
                 typeMersedes.classList.add('active')
                 this.filterData.whoMade.push('mercedes')
             }
             if(currArrColors[i] == 'tesla'){
                 typeTesla.classList.add('active')
                 this.filterData.whoMade.push('tesla')

             }
             if(currArrColors[i] == 'volkswagen'){
                 typeVolkswagen.classList.add('active')
                 this.filterData.whoMade.push('volkswagen')
             }
          }
         }




         if(localStorage.getItem('sortNameUp')){

            select.value = 'value1'
            for (let  i = 0; i < carData.length; i++) {
                for (let j = i; j < carData.length; j++){
                    if(carData[i].name > carData[j].name){
                        let temp = carData[i];
                        carData[i] = carData[j];
                        carData[j] = temp;
                    }
                }
            }

        }
        if(localStorage.getItem('sortNameDown')){
            select.value = 'value2'
            for (let  i = 0; i < carData.length; i++) {
                for (let j = i; j < carData.length; j++){
                    if(carData[i].name < carData[j].name){
                        let temp = carData[i];
                        carData[i] = carData[j];
                        carData[j] = temp;
                    }
                }
            }
        }

         if(localStorage.getItem('sortYearUp')){
            select.value = 'value3'
            for (let  i = 0; i < carData.length; i++) {
                for (let j = i; j < carData.length; j++){
                    if(carData[i].year > carData[j].year){
                        let temp = carData[i];
                        carData[i] = carData[j];
                        carData[j] = temp;
                    }
                }
            }
        }

        if(localStorage.getItem('sortYearDown')){
            select.value = 'value4'
            for (let  i = 0; i < carData.length; i++) {
                for (let j = i; j < carData.length; j++){
                    if(carData[i].year < carData[j].year){
                        let temp = carData[i];
                        carData[i] = carData[j];
                        carData[j] = temp;
                    }
                }
            }
        }

        console.log("filteredData");
        console.log(filteredData);
        console.log(this);
        this.drawData(filteredData);
      }

      sortType(value) {
        switch (value) {
            case "value1":
                this.sortByNameUp();
              break;
            case "value2":
                this.sortByNameDown();
                break;
            case "value3":
                this.sortByYearUp();
                break;
            case "value4":
                this.sortByYearDown();
                break;
        }
    }


      getNumbersCostBetween(minNum, maxNum){

           this.filterData.price = [minNum, maxNum];
           this.applyFilter();
           console.log('SortPrice', this.filterData.price)
      /*      if (this.filterData.price.length === 0){
            return this.resetFilter();
        } */

      }
      getNumbersQuantityBetween(minNum, maxNum){
        this.filterData.availableQuantity = [minNum, maxNum];
        this.applyFilter();
        if (this.filterData.availableQuantity.length === 0){
            return this.resetFilter();
        }
   }

    handleFilterWhoMadeClick (event) {
        console.log('whoMadeFilterData!',this.filterData);
        const element = event.target;
        let arrMakers : string[] = [];
        if (element.tagName === "BUTTON") {
            console.log(element.innerText);
            const buttonText = element.innerText.toLowerCase();
            if (element.classList.contains("active")) {
                const filterIndex = this.filterData.whoMade.indexOf(buttonText);
                this.filterData.whoMade.splice(filterIndex, 1);
            } else {
                this.filterData.whoMade.push(buttonText);
            }
            arrMakers = this.filterData.whoMade
            localStorage.setItem('makers', String(arrMakers))
            if(arrMakers.length === 0){
                localStorage.removeItem('makers')
            }
            console.log('whoMadeFilterData',this.filterData);
            element.classList.toggle("active");
            if (this.filterData.whoMade.length === 0){
                return this.resetFilter();
            }
            this.applyFilter();
        }
    }

    handleFilterByPowerClick (event) {
        const element = event.target;
        let arrKm : number[] = [];
        if (element.tagName === "BUTTON") {
            console.log(element.innerText);
            const buttonText = +element.innerText;
            if (element.classList.contains("active")) {
                const filterIndex = this.filterData.km.indexOf(buttonText);
                this.filterData.km.splice(filterIndex, 1);
            } else {
                this.filterData.km.push(buttonText);
            }

            arrKm = this.filterData.km
            localStorage.setItem('kilometers', String(arrKm))
            if(arrKm.length === 0){
                localStorage.removeItem('kilometers')
            }

            console.log("arrArrKM", arrKm)
            console.log(this.filterData);
            element.classList.toggle("active");


            if (this.filterData.km.length === 0){
                return this.resetFilter();
            }
            this.applyFilter();
        }
    }

    handleFilterByColorClick (event) {
        const element = event.target;
        let arrColors : string[] = [];
        if (element.tagName === "BUTTON") {
            console.log(element.innerText);
            const buttonText = element.innerText.toLowerCase();
            if (element.classList.contains("FilterByColor_active")) {
                const filterIndex = this.filterData.color.indexOf(buttonText);
                this.filterData.color.splice(filterIndex, 1);
            } else {
                this.filterData.color.push(buttonText);

            }
            arrColors = this.filterData.color
            localStorage.setItem('colors', String(arrColors))
            if(arrColors.length === 0){
                localStorage.removeItem('colors')
            }
            console.log('filtercolor',this.filterData);
            element.classList.toggle("FilterByColor_active");
            if (this.filterData.color.length === 0){
                return this.resetFilter();
            }
            this.applyFilter();
        }
    }

    handleFilterByPopularClick (event) {
        const element = event.target;

        if (element.tagName === "BUTTON") {
            console.log(element.innerText);
            if (element.classList.contains("FilterByPopular_active")) {
                this.filterData.popular = false;
                element.classList.remove("FilterByPopular_active");
                localStorage.removeItem("popular")
                console.log('popularClick1')
            } else {
                this.filterData.popular = true;
                element.classList.add("FilterByPopular_active")
                localStorage.setItem("popular", '1')
                console.log('popularClick2')

            }
            console.log(this.filterData);
            /* element.classList.toggle("FilterByPopular_active"); */
            if (this.filterData.popular === false){
                return this.resetFilter();
            }
            this.applyFilter();
        }
    }

    handleSearch (event) {
        this.filterData.search = event.target.value;
        this.applyFilter();

        const text = document.querySelector(".GoodsListing");
        if(!text.innerHTML){
            text.innerHTML = "Извините, совпадений не обнаружено";
        }
    }

    clearSearc (event) {
        const searchInput = document.querySelector(".search") as any;
        searchInput.value = "";
        this.filterData.search = "";
        this.applyFilter();
    }

    sort(event) {
        const value = event.target.value;
        switch (value) {
            case "value1":
                this.sortByNameUp();
              break;
            case "value2":
                this.sortByNameDown();
                break;
            case "value3":
                this.sortByYearUp();
                break;
            case "value4":
                this.sortByYearDown();
                break;
        }
    }

    sortByNameUp() {
        for (let  i = 0; i < carData.length; i++) {
            for (let j = i; j < carData.length; j++){
                if(carData[i].name > carData[j].name){
                    let temp = carData[i];
                    carData[i] = carData[j];
                    carData[j] = temp;
                }
            }
        }
        localStorage.setItem('sortNameUp','1')
        localStorage.removeItem('sortNameDown')
        localStorage.removeItem('sortYearUp')
        localStorage.removeItem('sortYearDown')
        console.log(carData);
        this.applyFilter();
    }

    sortByNameDown() {
        for (let  i = 0; i < carData.length; i++) {
            for (let j = i; j < carData.length; j++){
                if(carData[i].name < carData[j].name){
                    let temp = carData[i];
                    carData[i] = carData[j];
                    carData[j] = temp;
                }
            }
        }
        localStorage.setItem('sortNameDown','1')
        localStorage.removeItem('sortNameUp')
        localStorage.removeItem('sortYearUp')
        localStorage.removeItem('sortYearDown')
        this.applyFilter();
    }

    sortByYearUp() {
        for (let  i = 0; i < carData.length; i++) {
            for (let j = i; j < carData.length; j++){
                if(carData[i].year > carData[j].year){
                    let temp = carData[i];
                    carData[i] = carData[j];
                    carData[j] = temp;
                }
            }
        }
        localStorage.setItem('sortYearUp','1')
        localStorage.removeItem('sortNameUp')
        localStorage.removeItem('sortNameDown')
        localStorage.removeItem('sortYearDown')
        this.applyFilter();
    }

    sortByYearDown() {
        for (let  i = 0; i < carData.length; i++) {
            for (let j = i; j < carData.length; j++){
                if(carData[i].year < carData[j].year){
                    let temp = carData[i];
                    carData[i] = carData[j];
                    carData[j] = temp;
                }
            }
        }
        localStorage.setItem('sortYearDown','1')
        localStorage.removeItem('sortYearUp')
        localStorage.removeItem('sortNameUp')
        localStorage.removeItem('sortNameDown')
        this.applyFilter();
    }

    addOrRemoveBasket(event){
        const element = event.target;
        if (element.classList.contains("GoodsItem")) {
            const basket = document.querySelector(".basket");
            let quantityInBasket = +basket.innerHTML;
            if (quantityInBasket < 2 || (quantityInBasket === 2 && element.classList.contains("GoodsItemInBasket"))) {
                element.classList.toggle("GoodsItemInBasket");
                let isInBasket = element.querySelector(".InBasket");
                isInBasket.innerText === "да" ?isInBasket.innerText = "нет" : isInBasket.innerText = "да";
                const itemFields = element.querySelector(".GoodsItemTitle").innerText +
                " " + element.querySelector(".Color").innerText;
                carData.forEach(element => {
                    if (element.whoMade + " " + element.modelName + " " + element.color === itemFields) {
                        element.inBasket ? element.inBasket = false : element.inBasket = true;
                    }
                });
                console.log("carData");
                console.log(carData);
                carData.forEach(element => {
                    if (element.inBasket === true) quantityInBasket++;
                });
                console.log(basket);
                    let res = 0;
                    carData.forEach(element => {
                    if (element.inBasket) res++
                });
                basket.innerHTML = "" + res;
            }   else alert("Извините, все слоты заполнены");
        }
    }
}