import Vue from '../lib/vue.js';

let Main = Vue.component('modal', {
  	template:
		'<div id="myModal" class="modal" v-bind:class="{hide: hideModal}">'+
		  '<div class="modal-content">'+
		    '<span class="close" @click="closeModal()">&times;</span>'+
		    '<div>'+
		    	'<img class="modal__img" :src="item.product.pics.pic[0].$" />'+
		    	'<div class="modal-slider"><div class="inner">'+
                '<img v-for="url in item.product.pics.pic[0].$" :src="url" />'+
		    	'</div></div>'+
		    	'<p class="modal__name">{{item.product.name.$}}</p>'+
		    	'<p>{{item.product.price.$}}</p>'+
		    	'<p>{{item.product.weight.$}} g.</p>'+
		    	'<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. </p>'+
		    '</div>'+
		  '</div>'+
		'</div>',
    data: function () {
        return {
        	hideModal: true,
        	item: {
        		name: "",
        		id: 123,
        		price: "1234.12",
        		weight: 100.12,
        		url: "http://"
        	}
        }
    },
    created: function() {
        var self = this;

	    this.$root.$on("hideModal", function(){
	      	self.hideModal = true;
	    })

	    this.$root.$on("showModal", function(data){
	      	self.item = data.item;
	      	self.hideModal = false;
	    })
    },
    methods:{
    	closeModal: function() {
    		this.hideModal = true;
    	}
    }
})

export { Main };
