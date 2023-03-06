import Vue from '../lib/vue.js';

import { ToolsService } from '../services/toolsService.js';
import { ProductsService } from '../services/productsService.js';
import { AjaxService } from '../services/ajaxService.js';

let Main = Vue.component('cart-items', {
  	template:
			'<div class="cart-items">'+
          '<div v-on:click="click()" class="cart-items__message">У вас в корзине товаров: {{products.length}} !!!</div>'+
          '<div class="container">'+
            '<div v-for="item in products" class="product">'+
                '<div class="product__name">{{item.product.name.$}}</div>'+
                '<div class="product__price">{{item.product.price.$}}</div>'+
                '<div v-bind:class="{hide: !canModifyItems}" class="remove-cross" v-on:click="removeItem(item)">&times;</div>'+
            '</div>'+
          '</div>'+
      '</div>',
    data: function () {
        return {
          products: [],
          canModifyItems: true,
          canChooseProducts: false
        }
    },
  	created: function() {
      let self = this;

      ProductsService.getAllProducts(function(data){
        self.productsAll = data;
      });

      this.$root.$on("orderCreated", function(){
        self.canModifyItems = false;
      });

      this.$root.$on("cancelOrder", function(){
        self.canModifyItems = true;
      });

      this.$root.$on("addProduct", function(data) {
        ProductsService.addProduct(data.item);
        self.$root.$emit("recount");
      });

      this.$root.$on("recount", function(data) {
        self.products = ProductsService.getCurrentProducts();
      });
    },
    methods: {
      removeItem: function(item){
        item.badge = "";

        this.products = ProductsService.products = ProductsService.products.filter(function(el) { return el.id != item.id; });
        this.$root.$emit("recount");
      },
		/*
		uphere: function($event){
        this.color = $event.currentTarget.style.backgroundColor;
        $event.currentTarget.style.backgroundColor = ToolsService.getRandomColor();
      },
      leave: function($event){
        $event.currentTarget.style.backgroundColor = this.color;
      }*/
    }
})

export { Main };
