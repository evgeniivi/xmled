import Vue from '../lib/vue.js';

import Modal from './modal.js';

import { ToolsService } from '../services/toolsService.js';
import { ProductsService } from '../services/productsService.js';

let Main = Vue.component('catalog', {
  	template: '<div>'+
    '<div class="products-list"><div v-for="(item, index) in products" class="product-card" v-on:click="showProduct(item)">'+
      '<img  :src="item.pic[1]" />'+
      '<div class="product-card__name">{{item.name}}</div>'+
      '<div class="product-card__price">{{item.price}}</div>'+
      '<div class="product-card__cover""></div>'+
      '<div class="product-card__badge" v-bind:class="{ hide: item.badge.length == 0}">{{item.badge}}</div>'+
      '<div class="product-card__buy" v-bind:class="{ hide: (item.badge.length > 0) || orderCreated}" v-on:click="addProduct($event, item)">купить</div>'+
   '</div></div>'+
 '<modal></modal>',
     data: function () {
        return {
          products: [],
          orderCreated: false,
          bestPrice: 0
        }
    },
  	created: function() {
      var self = this;

      // this.bigImageUrl = PicsService.finallyGetPicUrl(this.bigImageSize).final;

  		ProductsService.getAllProducts(function(data){
        self.products = data;
      });

  		// this.bestPrice = ToolsService.getRandomFloat(0, 1000, 2);

      this.$root.$on("orderCreated", function(){
        self.orderCreated = true;
      });

      this.$root.$on("catalogRefresh", function(){
        self.products = ProductsService.getAllProducts();
        self.currentProducts = ProductsService.getCurrentProducts();

        var ids = [];
        for(var p of self.currentProducts) {
          ids.push(p.id);
        }

        for(var p of self.products) {
          if (ids.indexOf(p.id) !== -1){
            p.badge = "добавлено";
          }
        }

        self.$forceUpdate();
      });

      this.$root.$on("cancelOrder", function(){
        self.orderCreated = false;
      });
    },
    methods: {
    	sortCatalog: function(direction) {

    	},
      addProduct: function($event, item) {
          $event.stopPropagation();
	        this.$root.$emit("addProduct", {item: item});
          item.badge = "добавлено";
	    },
    }
})

export { Main };
