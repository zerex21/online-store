import { routes, routerForMain, routerForBasket } from './pages/pages';
import App from './components/app/app';
import './global.css';

const container = document.getElementById('container') as HTMLElement;

window.addEventListener('popstate', function () {
  const route = routes.find(item => item.path == window.location.pathname);
  if (route) {
    container.innerHTML = route.data;
  }
});

window.addEventListener('DOMContentLoaded', function () {
  const route = routes.find(item => item.path == window.location.pathname);
  if (route) {
    container.innerHTML = route.data;
  }

  const logo = document.getElementById('logo') as HTMLInputElement;
  const favourite = document.getElementById('favourite') as HTMLInputElement;

  logo.addEventListener('click', (event) => {
    routerForMain(event);
    const app = new App();
    app.start();
  });

  addEventListener('popstate', (event) => {
    routerForMain(event);
    const app = new App();
    app.start();
  }, false);

  favourite.addEventListener('click', (event) => {
    routerForBasket(event, container);
  });

  const app = new App();
  app.start();
});