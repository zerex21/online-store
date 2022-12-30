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
        filterByPopularButtonsContainer.addEventListener("click", this.handleFilterByPopularClick.bind(this));
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
        const displayValOne = document.getElementById("range1") as HTMLElement;
        const displayValTwo = document.getElementById("range2") as HTMLElement;
        const displayValTree = document.getElementById("range3") as HTMLElement;
        const displayValFour = document.getElementById("range4") as HTMLElement;


      /*   let showRange = (minNum:number , maxNum:number, displayValOne: HTMLElement, displayValTwo: HTMLElement):void =>{
            if(minNum > maxNum){
                let tmp = maxNum;
                maxNum = minNum;
                minNum = tmp;
                displayValOne.innerHTML = String(minNum)
                displayValTwo.innerHTML = String(maxNum)
            }
            displayValOne.innerHTML = String(minNum)
            displayValTwo.innerHTML = String(maxNum)
        } */

        sliderOne.addEventListener('input',()=>{
            localStorage.setItem("sliderNumber1", sliderOne.value)
            this.getChangeSliderOne()




          /*   let [minNum, maxNum] = slideOne()
            showRange(minNum, maxNum, displayValOne ,displayValTwo)
            this.getNumbersCostBetween( maxNum, minNum) */
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
          /*  let [minNum, maxNum] = slideTree()
           showRange(minNum, maxNum, displayValTree ,displayValFour)
           console.log(minNum,maxNum)
           this.getNumbersQuantityBetween(minNum,maxNum) */

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
           localStorage.setItem('sliderNumber1','37000')
           localStorage.setItem('sliderNumber2','100000')
           localStorage.setItem('sliderNumber3','1')
           localStorage.setItem('sliderNumber4','10')

        /* filterByPopularButtonsActive.forEach(element => {
            element.classList.remove("active");
        }); */

        /* if(filterByPopularButtonsActive.classList.contains("FilterByPopular_active")){
            filterByPopularButtonsActive.classList.remove("FilterByPopular_active");
        } */
      /*   const filterByPopularButtonsActive = document.querySelector("favorite-input"){

        } */




        //const searchInput = document.getElementById("search") as HTMLInputElement;
        //searchInput.value = '';
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
                this.getNumbersCostBetween( maxNum, minNum)
                sliderOne.value = localStorage.getItem("sliderNumber1");
                displayValOne.innerHTML = localStorage.getItem("sliderNumber1");
            }else{
                this.showRange(minNum, maxNum, displayValOne ,displayValTwo)
                this.getNumbersCostBetween( maxNum, minNum)
              }

/* console.log('getChangeNumber1',minNum, maxNum) */
      /*   const sliderOne = document.getElementById("slider-1") as HTMLInputElement;
        const displayValOne = document.getElementById("range1") as HTMLElement;
        */

    }

    getChangeSliderTwo(){
        const sliderTwo = document.getElementById("slider-2") as HTMLInputElement;
        const displayValOne = document.getElementById("range1") as HTMLElement;
        const displayValTwo = document.getElementById("range2") as HTMLElement;
        let [minNum, maxNum] = slideTwo()
        /* localStorage.setItem("sliderNumber2", String(maxNum)) */
            /* this.showRange(minNum, maxNum, displayValOne ,displayValTwo)
            this.getNumbersCostBetween(minNum, maxNum) */
            if (localStorage.getItem("sliderNumber2")) {
                this.showRange(minNum, maxNum, displayValOne ,displayValTwo)
                this.getNumbersCostBetween(minNum, maxNum)
                displayValTwo.innerHTML = localStorage.getItem("sliderNumber2");
                sliderTwo.value = localStorage.getItem("sliderNumber2");
            }else{
                this.showRange(minNum, maxNum, displayValOne ,displayValTwo)
                this.getNumbersCostBetween(minNum, maxNum)
            }

            /* console.log('getChangeNumber2',minNum, maxNum) */
            /*  const sliderOne = document.getElementById("slider-1") as HTMLInputElement;
        const displayValOne = document.getElementById("range1") as HTMLElement;
        if (localStorage.getItem("volume")) {
            sliderOne.value = localStorage.getItem("volume");
            displayValOne.innerHTML = localStorage.getItem("volume");
          } */
    }
    getChangeSliderTree(){
        const sliderTree = document.getElementById("slider-3") as HTMLInputElement;
        const displayValTree = document.getElementById("range3") as HTMLElement;
        const displayValFour = document.getElementById("range4") as HTMLElement;
        let [minNum, maxNum] = slideTree()
        /* localStorage.setItem("sliderNumber3", String(sliderTree.value)) */
       /*  this.showRange(minNum, maxNum, displayValTree ,displayValFour)
        this.getNumbersQuantityBetween(minNum,maxNum) */

        if (localStorage.getItem("sliderNumber3")) {
            this.showRange(minNum, maxNum, displayValTree ,displayValFour)
            this.getNumbersQuantityBetween(minNum,maxNum)
            displayValTree.innerHTML = localStorage.getItem("sliderNumber3");
            sliderTree.value = localStorage.getItem("sliderNumber3");
        }else{
            this.showRange(minNum, maxNum, displayValTree ,displayValFour)
            this.getNumbersQuantityBetween(minNum,maxNum)
        }
      /*   const sliderOne = document.getElementById("slider-1") as HTMLInputElement;
        const displayValOne = document.getElementById("range1") as HTMLElement;
        if (localStorage.getItem("volume")) {
            sliderOne.value = localStorage.getItem("volume");
            displayValOne.innerHTML = localStorage.getItem("volume");
          } */
    }
    getChangeSliderFour(){
        const sliderFour = document.getElementById("slider-4") as HTMLInputElement;
        const displayValTree = document.getElementById("range3") as HTMLElement;
        const displayValFour = document.getElementById("range4") as HTMLElement;
        let [minNum, maxNum] = slideFour()
        /* localStorage.setItem("sliderNumber4", String(maxNum)) */
        /* this.showRange(minNum, maxNum, displayValTree ,displayValFour)
        this.getNumbersQuantityBetween(minNum,maxNum) */
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

        console.log("filteredData");
        console.log(filteredData);
        console.log(this);
        this.drawData(filteredData);
        //localStorage.setItem("Masha", JSON.stringify(this.filterData));

      }

      getNumbersCostBetween(minNum, maxNum){
           this.filterData.price = [minNum, maxNum];
           this.applyFilter();
           if (this.filterData.price.length === 0){

            return this.resetFilter();
        }
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
        if (element.tagName === "BUTTON") {
            console.log(element.innerText);
            const buttonText = element.innerText.toLowerCase();
            if (element.classList.contains("active")) {
                const filterIndex = this.filterData.whoMade.indexOf(buttonText);
                this.filterData.whoMade.splice(filterIndex, 1);
            } else {
                this.filterData.whoMade.push(buttonText);
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
        if (element.tagName === "BUTTON") {
            console.log(element.innerText);
            const buttonText = +element.innerText;
            if (element.classList.contains("active")) {
                const filterIndex = this.filterData.km.indexOf(buttonText);
                this.filterData.km.splice(filterIndex, 1);
            } else {
                this.filterData.km.push(buttonText);
            }
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
        if (element.tagName === "BUTTON") {
            console.log(element.innerText);
            const buttonText = element.innerText.toLowerCase();
            if (element.classList.contains("FilterByColor_active")) {
                const filterIndex = this.filterData.color.indexOf(buttonText);
                this.filterData.color.splice(filterIndex, 1);
            } else {
                this.filterData.color.push(buttonText);
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
            } else {
                this.filterData.popular = true;
            }
            console.log(this.filterData);
            element.classList.toggle("FilterByPopular_active");
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