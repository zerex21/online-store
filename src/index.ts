import { routes, router, routerForMain, routerForBasket, } from './pages/pages';
import App from './components/app/app';
import './global.css';

const container = document.getElementById('container');

window.addEventListener('popstate', function() {
    let route = routes.find(route => route.path == window.location.pathname);
    container.innerHTML = route.data;
    console.log('b');
})

window.addEventListener('DOMContentLoaded', function() {
    let route = routes.find(route => route.path == window.location.pathname);
    container.innerHTML = route.data;
    // console.log(route.path);

    const logo = document.getElementById("logo") as HTMLInputElement;
    const favourite = document.getElementById("favourite") as HTMLInputElement;
/* console.log('pathname', window.location.pathname) */

 /*************************************** */
    logo.addEventListener("click" , (event) => {routerForMain(event); /********* */ const app = new App();
        app.start();}/********** */);

    addEventListener("popstate", (event) => {routerForMain(event);  const app = new App();
        app.start();},false);
        /******************************************** */
    favourite.addEventListener("click" , (event) => {routerForBasket(event,container)});

    const app = new App();
    app.start();

})