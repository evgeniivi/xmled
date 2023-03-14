import { ToolsService } from './toolsService.js';
import { AjaxService } from './ajaxService.js';

let ProductsService = {
	picSize: 180,
	categories: [],
	config: {},
	products: [],
	productsAll: [],
	filters: [],
	getByApiAll: function(cb){
		let products = [];
		let self = this;

    AjaxService.doAjaxPost("/catalog/out/", {}, function(data){
			let productsAll = data.products;
			self.config = data.config;

			for (var i of productsAll) {
				let product = i;
				product.badge = "";

				if (product){
						product.id = product[self.config["id"]];
						product.name = product[self.config["name"]];
						product.price = product[self.config["price"]]*1;
						product.pic = [];

						for (let i=1; i <= product[self.config["pics"]]*1; i++){
							  let istr = product.id + (i != 1 ? "."+i :"") + ".png";
    						product.pic.push("/static/pics/" + istr);
						}
				}
				products.push(product);
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
		for(let i of this.products) {
			sum += i.price;
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
	makeOrder: function(opts, cb) {
		let idsstr = "";
		let i = 0;
		for (let id of opts["ids"]) {
			idsstr = idsstr + ((i != 0) ? "-": "") + id;
			i++;
		}
		let fdata = new FormData();
		fdata.append("ids", idsstr);
		fdata.append("userid", opts["userId"]);
		AjaxService.doAjaxPost("/catalog/order/", fdata, function(data){
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
