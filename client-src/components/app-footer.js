import Vue from '../lib/vue.js';

import { ProductsService } from '../services/productsService.js';

let Main = Vue.component('app-footer', {
  	template: '<div class="footer">'+
          '<div class="menu">'+
            '<div class="menu-item"><a href="/delivery">Доставка и Оплата</a></div>'+
            '<div class="menu-item"><a href="/rules">Правила сайта</a></div>'+
            '<div class="menu-item"><a href="/sitemap">Карта сайта</a></div>'+
          '</div>'+
          '<div class="menu">'+
            '<div class="menu-item"><a href="/blog">Блог</a></div>'+
            '<div class="menu-item"><a href="/news">Новости</a></div>'+
          '</div>'+
          '<div class="copyright">-xmled- © Копирайт: <a href="https://github.com/evgeniivi">evgeniivi</a></div>'+
      '</div>',
    data: function () {
        return {
          data: ""
        }
    },
  	created: function() {
    },
    methods: {

    }
})

export { Main };
