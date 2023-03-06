import Vue from '../lib/vue.js';

import { ToolsService } from '../services/toolsService.js';
import { ProductsService } from '../services/productsService.js';

let Main = Vue.component('cart-total-confirm', {
  	template:
			'<div><div class="cart-total" v-bind:class="{ hide: hiddenTotal }">'+
          '<div class="cart-total__price">Итого: {{total}}</div>'+
          '<div v-bind:class="{ hide: hiddenButton }" class="cart-total__confirm button" v-on:click="confirm()">Купить</div>'+
          '<img v-bind:class="{ hide: hiddenLoading }" class="cart-total__loading" src="/static/img/1484.gif" width="40px"/>'+
      '</div>'+
      '<div class="cart-total__greetings" v-bind:class="{ hide: !hiddenTotal }">'+
        'Спасибо за покупку! Вам будет отправлен Имейл. <br/>'+
        '<div class="cart-total__greetings-order">Ваш заказ номер <b>#{{orderId}}</b><div class="cancel-cross" v-on:click="cancelOrder()">&times;</div>'+
      '</div></div>',
    data: function () {
        return {
          total: "0",
          hiddenButton: false,
          hiddenLoading: true,
          hiddenTotal: false,
          orderId: 0
        }
    },
  	created: function() {
      let self = this;

      this.total = ProductsService.getTotalPrice();

      this.$root.$on("recount", function(){
        self.total = ProductsService.getTotalPrice();

        if (ProductsService.getCurrentProducts().length == 0) {
          self.$root.$emit("hideCart");
        }
      });
    },
    methods: {
    	confirm: function(){
        var self = this;
        let ids = [];

        this.hiddenButton = true;
        this.hiddenLoading = false;

        for (let p of ProductsService.products) {
          ids.push(p.id)
        }

        ProductsService.makeOrder(ids, function(data){
            self.hiddenTotal = true;
            self.hiddenLoading = true;

            if (data.orderId) {
              self.$root.$emit("orderCreated", {orderId: data.orderId});
              self.orderId = data.orderId;
            } else {
              self.$root.$emit("orderFailure");
            }

            self.$forceUpdate();
        })
    	},
      cancelOrder: function(){
        ProductsService.cancelOrder(function(){
          this.hiddenTotal = false;
          this.hiddenButton = false;

          this.$root.$emit("cancelOrder", {orderId: self.orderId});
        }, 3000)
      }
    }
})

export { Main };
