import { carData } from '../../data/cars-data';
import { Filter } from '../filter';
class App {

  public start(): void {
    this.draw(carData);
    const filter = new Filter();

    filter.init(this.draw);
    filter.applyFilter();
    filter.getChangeSliderOne();
    filter.getChangeSliderTwo();
    filter.getChangeSliderTree();
    filter.getChangeSliderFour();
    filter.checkClass();
  }

  public draw(data): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
      const isPopular = item.popular ? 'да' : 'нет';
      let color = item.color;
      let inBasket = item.inBasket ? 'да' : 'нет';
      sourceClone.querySelector('.GoodsItem')?.setAttribute('data-card', `${item.id}`);
      sourceClone.querySelector('.GoodsItem')?.setAttribute('data-price', `${item.price}`);
      sourceClone.querySelector('.GoodsItemImg')?.setAttribute("src", item.img);
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