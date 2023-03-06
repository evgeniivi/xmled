import { ToolsService } from './toolsService.js';
import { AjaxService } from './ajaxService.js';

let ProductsService = {
	picSize: 180,
	categories: [],
	products:[],
	productsAll:[],
	filters: [],
	getByApiAll: function(cb){
		let products = [];

    AjaxService.doAjax("/catalog/out/", function(data){
			let productsAll = data;

			for (var i of productsAll) {
				let product = i;
				product.badge = "";

				if (product.product)
						product.id = product.product.id.$;

				products.push(i);
			}
			cb(products)
		})
	},
	/*filter: function(mask, from, to) {
		var self = this;

		if (mask) {
			this.filters.push("byTitle");
		} else {
			this.filters = this.filters.filter(f => f !== 'byTitle');
		}

		if (from && to) {
			this.filters.push("byPrice");
		} else {
			this.filters = this.filters.filter(f => f !== 'byPrice');
		}

		this.productsAll = (this.getByApiAll()).filter(function(el) {
			var cond1 = (el.name.toLowerCase().indexOf(mask.toLowerCase()) != -1)
		 	var price = parseFloat(el.price.replace("$", ""));
		 	var cond2 = (((price) > parseFloat(from)) && (price < parseFloat(to)));
		 	var result = true;

		 	for (var filter of self.filters) {
		 		switch (filter) {
		 			case "byTitle":
		 				result = result && cond1;
		 			break;
		 			case "byPrice":
		 				result = result && cond2;
		 			break;
		 		}
		 	}

		 	return result;
		});
		var countFiltered = (this.getByApiAll()).length - this.productsAll.length;
		return countFiltered;
	},
	clearFilter: function(mask) {
		this.productsAll = this.getByApiAll();
		return this.productsAll;
	},*/
	getTotalPrice: function() {
		let sum = 0;
		for(let i of this.products){
			sum += i.product.price.$;
		}
		return parseFloat(sum).toFixed(2);
	},
	getCurrentProducts: function() {
		return this.products = (this.products.length > 0 ? this.products : this.getByApi());
	},
	getAllProducts: function(cb) {
		let self = this;
		this.getByApiAll(function(data){
			self.productsAll = data;
			cb(data)
		});
	},
	/*getCategories: function(){
		this.categories = [];
		let allProducts = this.getAllProducts();

		for(let product of allProducts){
			if (this.categories.indexOf(product.category) == -1) {
				this.categories.push(product.category);
			}
		}

		return this.categories;
	},*/
	addProduct: function(item) {
		this.products.push(item);
		return this.products;
	},
	makeOrder: function(ids, cb) {
		let idsstr = "";
		let i = 0;

		for (let id of ids) {
			idsstr = idsstr + ((i != 0) ? "-": "") + id;
			i++;
		}
		AjaxService.doAjax("/catalog/order/"+ idsstr, function(data){
			cb(data)
		})
	},
	cancelOrder: function(id, cb) {
		AjaxService.doAjax("/catalog/order/" + id, function(data){
			cb(data)
		})
	}
};

export { ProductsService };