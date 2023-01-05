import { ICarData } from "../../types/car-data.interface";
//import noUiSlider, {API} from 'nouislider';
import {carData} from "../../data/cars-data";
import {Filter} from "../filter";
class App {
    private slider: HTMLElement;

    public start(): void {

        //localStorage.setItem("masha", "123");
        // let a = localStorage.getItem("Masha");
        // let b = JSON.parse(a);
        // console.log(a);
        // console.log(b);

        //localStorage.removeItem("masha");
        // console.log(a);
        this.draw(carData);

        const filter = new Filter();
        filter.init(this.draw);
        /* filter.handleFilterByPopularClick() */
        filter.getChangeSliderOne()
        filter.getChangeSliderTwo()
        filter.getChangeSliderTree()
        filter.getChangeSliderFour()
/* filter.checkAddBasket() */
        filter.applyFilter();
        //filter.filterData = b;
       /* filter.init(this.draw); */







      /* filter.getChangeSliderTree()
      filter.getChangeSliderFour() */


    /*     this.slider = document.getElementById('slider'); */


        // noUiSlider.create(this.slider, {
        //     start: [20, 80],
        //     range: {
        //         'min': 0,
        //         'max': 100
        //     }
        // });
    }

    public draw(data): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        let num = 1;
        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            let isPopular = item.popular?"да":"нет";
            let color = item.color;
            let inBasket = item.inBasket?"да":"нет";

            sourceClone.querySelector('.GoodsItem').setAttribute('data-card', `${num++}`)
            sourceClone.querySelector('.GoodsItem').setAttribute('data-price', `${item.price}`)
            sourceClone.querySelector('.GoodsItemImg').setAttribute("src", item.img);
            sourceClone.querySelector('.GoodsItemTitle').textContent = item.whoMade + " " + item.modelName;
            sourceClone.querySelector('.Quantity').textContent = item.availableQuantity;
            sourceClone.querySelector('.Year').textContent = item.year;
            sourceClone.querySelector('.WhoMade').textContent = item.whoMade;
            sourceClone.querySelector('.Color').textContent = color;
            sourceClone.querySelector('.Km').textContent = item.km;
            sourceClone.querySelector('.Popular').textContent = isPopular;
            sourceClone.querySelector('.InBasket').textContent = inBasket;
            sourceClone.querySelector('.Price').textContent = `€ ${item.price}`;



            fragment.append(sourceClone);

        });

        const goodsContainer = document.querySelector('.GoodsListing');
        goodsContainer.innerHTML = "";


        goodsContainer.append(fragment);
    }
}

export default App;