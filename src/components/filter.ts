import { carData } from "../data/cars-data";
import { ICarData } from "../types/car-data.interface";
import {  slideOne, slideTwo, slideTree, slideFour } from "./slider";

interface IFilterData {
    search: string;
    whoMade: string[];
    km: number[];
    color: string[],
    popular: boolean,
    price: number,
    availableQuantity: number
}

export class Filter {
    private drawData: (data: ICarData[]) => void;

    public filterData: IFilterData = {
        search: '',
        whoMade: [],
        km: [],
        color: [],
        popular: false,
        price: 0,
        availableQuantity: 0,
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


        sliderOne.addEventListener('input',()=>{
            let tmp = slideOne()
            console.log(tmp)
        });

        sliderTwo.addEventListener('input',()=>{
           let tmp = slideTwo()
            console.log(tmp)
        });

        sliderTree.addEventListener('input',()=>{

           let tmp = slideTree()
           console.log(tmp)

       });

       sliderFour.addEventListener('input',()=>{

           let tmp = slideFour()
           console.log(tmp)
       });

    }

    resetFilter () {
        this.filterData = {
            search: '',
            km: [],
            color: [],
            whoMade: [],
            popular: false,
            price: 0,
            availableQuantity: 0,
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
        filterByPopularButtonsActive.classList.remove("FilterByPopular_active");



        //const searchInput = document.getElementById("search") as HTMLInputElement;
        //searchInput.value = '';
    }

    applyFilter () {
        console.log("applyFilter");
        console.log('can',this.filterData);
        let filteredData = carData;

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

    handleFilterWhoMadeClick (event) {
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
            console.log(this.filterData);
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