import Vue from '../lib/vue.js';

import CartItems from '../components/cart-items.js';
import CartTotalConfirm from '../components/cart-total-confirm.js';

let Main = Vue.component('cart', {
  	template:
			'<div class="cart-main" v-bind:class="{hide: hiddenCart}">'+
        '<cart-items></cart-items>'+
        '<cart-total-confirm></cart-total-confirm>'+
      '</div>',
    data: function () {
        return {
          hiddenCart: true
        }
    },
    created: function() {
      var self = this;

      this.$root.$on("showCart", function(){
        self.hiddenCart = false;
      });

      this.$root.$on("hideCart", function(){
        self.hiddenCart = true;
      });
    }
})

export { Main };
