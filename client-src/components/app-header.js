import Vue from '../lib/vue.js';

import { ProductsService } from '../services/productsService.js';
import { ToolsService } from '../services/toolsService.js';

let Main = Vue.component('app-header', {
  	template: '<div class="header">'+
        '<div class="menu">'+
          '<div class="menu-item">Е-<span class="title-327" :style="{backgroundColor: logoColor}">МАГ</span></div>'+
        '</div>'+
        '<div class="email" v-bind:class="{ hide: !shownEmail }">{{ email }}</div>'+
        '<div class="cart"><div class="cart__title" @click="showCart()" :style="{backgroundColor: cartBColor, color: cartColor}">Корзина</div></div>'+
      '</div>',
    data: function () {
        return {
          shownCart: false,
          shownEmail: false,
          shownFilter: false,
          shownCategories: false,
          filtered: 0,
          length: 0,
          logoColor: "",
          cartBColor: "",
          cartColor: "",
          catBColor: "",
          catColor: "",
          email: "guest@xmled.com"
        }
    },
  	created: function() {
      var self = this;

      self.logoColor = ToolsService.getFromWarmColors();
      self.cartBColor = "transparent";
      self.cartColor = "black";
      self.catBColor = "transparent";
      self.catColor = "black";
      self.filterBColor = "transparent";
      self.filterColor = "black";

      this.$root.$on("hideCart",  function(){
          self.shownCart = false;
      });

      this.$root.$on("showCart",  function(){
          self.shownCart = true;
          this.$root.$emit("hideFilter");
          this.$root.$emit("hideCategories");
      });

      this.$root.$on("hideFilter",  function(){
          self.shownFilter = false;
      });

      this.$root.$on("showFilter",  function(){
          self.shownFilter = true;

          this.$root.$emit("hideCart");
          this.$root.$emit("hideCategories");
      });

      this.$root.$on("showEmail",  function(data){
          self.shownEmail = true;
          self.email = data.email;
      });

      this.$root.$on("hideCategories",  function(){
          self.shownCategories = false;
      });

      this.$root.$on("showCategories",  function(){
          self.shownCategories = true;

          self.$root.$emit("hideCart");
          self.$root.$emit("hideFilter");
      });

      this.$root.$on("catalogRefresh",  function(data){
          if (data) {
            self.filtered = data.filteredProductsCount;
          } else {
            self.filtered = 0;
          }

          if (self.filtered> 0) {
	          self.filterBColor = ToolsService.getFromWarmColors();
	          self.filterColor = "white";
	       } else {
	          self.filterBColor = "transparent";
	          self.filterColor = "black";
	       }
      });

      this.$root.$on("recount", function(){
        self.length = ProductsService.getCurrentProducts().length;

        if (self.length > 0) {
          self.cartBColor = ToolsService.getFromWarmColors();
          self.cartColor = "white";
        } else {
          self.cartBColor = "transparent";
          self.cartColor = "black";
        }
      });
    },
    methods: {
      showCategories: function(){
         if(!this.shownCategories) {
           this.$root.$emit("showCategories");
         } else {
           this.$root.$emit("hideCategories");
         }
      },
      showCart: function(){
        if (this.length > 0) {
            if(!this.shownCart) {
              this.$root.$emit("showCart");
            } else {
              this.$root.$emit("hideCart");
            }
        }
      },
      showFilter: function(){
        if(!this.shownFilter) {
          this.$root.$emit("showFilter");
        } else {
          this.$root.$emit("hideFilter");
        }
      }
    }
})

export { Main };
