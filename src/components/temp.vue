<template>
  <div>
    try {
      const { data } = await axios.get("https://api.punkapi.com/v2/beers", {
        params: {
          page: 2,
          per_page: 10
        }
      });
      this.list = data;
    } catch (e) {
      console.error(e)
    },
    numPages: function numPages() {
      return Math.ceil(this.list.length / this.elementsPerPage);
    },
    getRows: function getRows() {
      var start = (this.currentPage-1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.sortedList.slice(start, end);
    },
    this.currentPage = currentPage
      const newParams = {...this.params, currentPage: page}
      this.params = newParams
      this.getBeerList(newParams)
  </div>
</template>
<template>
  //@TODO NOTIFICATIONS

//---------
// Vue components
//---------
Vue.component('products', {
  
  ready: function () {
    var self = this;
    document.addEventListener("keydown", function(e) {
      if (self.showModal && e.keyCode == 37) {
        self.changeProductInModal("prev");
      } else if (self.showModal && e.keyCode == 39) {
        self.changeProductInModal("next");
      } else if (self.showModal && e.keyCode == 27) {
        self.hideModal();
      }
    });
  },

  template: "<h1>Products</h1>" + 
  <div class='products'> +
  <div v-for='product in productsData' track-by='$index' class='product {{ product.product | lowercase }}'> + 
  <div class='image' @click='viewProduct(product)' v-bind:style='{ backgroundImage: \"url(\" + product.image + \")\" }' style='background-size: cover; background-position: center;'></div> +
  <div class='name'>{{ product.product }}</div> +
  <div class='description'>{{ product.description }}</div> +
  <div class='price'>{{ product.price | currency }}</div> +
  <button @click='addToCart(product)'>Add to Cart</button><br><br></div> +
  </div> +
  <div class='imageWrapper'><div class='image' v-bind:style='{ backgroundImage: \"url(\" + modalData.image + \")\" }' style='background-size: cover; background-position: center;' v-on:mouseover='imageMouseOver($event)' v-on:mousemove='imageMouseMove($event)' v-on:mouseout='imageMouseOut($event)'></div></div> +
  <div class='additionalImages' v-if='modalData.images'> + 
  <div v-for='image in modalData.images' class='additionalImage' v-bind:style='{ backgroundImage: \"url(\" + image.image + \")\" }' style='background-size: cover; background-position: center;' @click='changeImage(image.image)'></div> +
  </div> +
  <div class='name'>{{ modalData.product }}</div> +
  <div class='description'>{{ modalData.description }}</div> +
  <div class='details'>{{ modalData.details }}</div> +
  <h3 class='price'>{{ modalData.price | currency }}</h3> +
  <label for='modalAmount'>QTY</label> +
  <input id='modalAmount' value='{{ modalAmount }}' v-model='modalAmount' class='amount' @keyup.enter='modalAddToCart(modalData), hideModal()'/> +
  <button @click='modalAddToCart(modalData), hideModal()'>Add to Cart</button> +
  </div></div>,

  props: ['productsData', 'cart', 'tax', 'cartSubTotal', 'cartTotal'],

  data: function() {
    return {
      showModal: false,
      modalData: {},
      modalAmount: 1,
      timeout: "",
      mousestop: ""
    }
  },

  methods: {
    addToCart: function(product) {
      var found = false;

      for (var i = 0; i < vue.cart.length; i++) {

        if (vue.cart[i].sku === product.sku) {
          var newProduct = vue.cart[i];
          newProduct.quantity = newProduct.quantity + 1;
          vue.cart.$set(i, newProduct);
          //console.log("DUPLICATE",  vue.cart[i].product + "'s quantity is now: " + vue.cart[i].quantity);
          found = true;
          break;
        }
      }

      if(!found) {
        product.quantity = 1;
        vue.cart.push(product);
      }

      vue.cartSubTotal = vue.cartSubTotal + product.price;
      vue.cartTotal = vue.cartSubTotal + (vue.tax * vue.cartSubTotal);
      vue.checkoutBool = true;
    },

    modalAddToCart: function(modalData) {
      var self = this;

      for(var i = 0; i < self.modalAmount; i++) {
        self.addToCart(modalData);
      }

      self.modalAmount = 1;
    },

    viewProduct: function(product) {      
      var self = this;
      //self.modalData = product;
      self.modalData = (JSON.parse(JSON.stringify(product)));
      self.showModal = true;
    },

    changeProductInModal: function(direction) {
      var self = this,
          productsLength = vue.productsData.length,
          currentProduct = self.modalData.sku,
          newProductId,
          newProduct;

      if(direction === "next") {
        newProductId = currentProduct + 1;

        if(currentProduct >= productsLength) {
          newProductId = 1;
        }

      } else if(direction === "prev") {
        newProductId = currentProduct - 1;

        if(newProductId === 0) {
          newProductId = productsLength;
        }
      }

      //console.log(direction, newProductId);

      for (var i = 0; i < productsLength; i++) {
        if (vue.productsData[i].sku === newProductId) {
          self.viewProduct(vue.productsData[i]);
        }
      }
    },

    hideModal: function() {
      //hide modal and empty modal data
      var self = this;
      self.modalData = {};
      self.showModal = false;
    },

    changeImage: function(image) {
      var self = this;
      self.modalData.image = image;
    },
});

Vue.component('cart', {
  template: '<div class="cart">' + 
  '<span class="cart-size" @click="showCart = !showCart"> {{ cart | cartSize }} </span><i class="fa fa-shopping-cart" @click="showCart = !showCart"></i>' +
  '<div class="cart-items" v-show="showCart">' +
  '<table class="cartTable">' +
  '<tbody>' +
  '<tr class="product" v-for="product in cart">' +
  '<td class="align-left"><div class="cartImage" @click="removeProduct(product)" v-bind:style="{ backgroundImage: \'url(\' + product.image + \')\' }" style="background-size: cover; background-position: center;"><i class="close fa fa-times"></i></div></td>' +
  '<td class="align-center"><button @click="quantityChange(product, \'decriment\')"><i class="close fa fa-minus"></i></button></td>' +
  '<td class="align-center">{{ cart[$index].quantity }}</td>' +
  '<td class="align-center"><button @click="quantityChange(product, \'incriment\')"><i class="close fa fa-plus"></i></button></td>' +
  '<td class="align-center">{{ cart[$index] | customPluralize }}</td>' +
  '<td>{{ product.price | currency }}</td>' +
  '</tbody>' +
  '<table>' +
  '</div>' +
  '<h4 class="cartSubTotal" v-show="showCart"> {{ cartSubTotal | currency }} </h4></div>' +
  '<button class="clearCart" v-show="checkoutBool" @click="clearCart()"> Clear Cart </button>' +
  '<button class="checkoutCart" v-show="checkoutBool" @click="propagateCheckout()"> Checkout </button>',

  props: ['checkoutBool', 'cart', 'cartSize', 'cartSubTotal', 'tax', 'cartTotal'],

  data: function() {
    return {
      showCart: false
    }
  },

  filters: {
    customPluralize: function(cart) {      
      var newName;

      if(cart.quantity > 1) {
        if(cart.product === "Peach") {
          newName = cart.product + "es";
        } else if(cart.product === "Puppy") {
          newName = cart.product + "ies";
          newName = newName.replace("y", "");
        } else {
          newName = cart.product + "s";
        }

        return newName;
      }

      return cart.product;
    },

    cartSize: function(cart) {
      var cartSize = 0;

      for (var i = 0; i < cart.length; i++) {
        cartSize += cart[i].quantity;
      }

      return cartSize;
    }
  },

  methods: {
    removeProduct: function(product) {
      vue.cart.$remove(product);
      vue.cartSubTotal = vue.cartSubTotal - (product.price * product.quantity);
      vue.cartTotal = vue.cartSubTotal + (vue.tax * vue.cartSubTotal);

      if(vue.cart.length <= 0) {
        vue.checkoutBool = false;
      }
    },

    clearCart: function() {
      vue.cart = [];
      vue.cartSubTotal = 0;
      vue.cartTotal = 0;
      vue.checkoutBool = false;
      this.showCart = false;
    },

    quantityChange: function(product, direction) {
      var qtyChange;

      for (var i = 0; i < vue.cart.length; i++) {
        if (vue.cart[i].sku === product.sku) {

          var newProduct = vue.cart[i];

          if(direction === "incriment") {
            newProduct.quantity = newProduct.quantity + 1;
            vue.cart.$set(i, newProduct);

          } else {
            newProduct.quantity = newProduct.quantity - 1;

            if(newProduct.quantity == 0) {
              vue.cart.$remove(newProduct);

            } else {
              vue.cart.$set(i, newProduct);
            }
          }
        }
      }

      if(direction === "incriment") {
        vue.cartSubTotal = vue.cartSubTotal + product.price;

      } else {
        vue.cartSubTotal = vue.cartSubTotal - product.price;
      }

      vue.cartTotal = vue.cartSubTotal + (vue.tax * vue.cartSubTotal);

      if(vue.cart.length <= 0) {
        vue.checkoutBool = false;
      }
    },
    //send our request up the chain, to our parent
    //our parent catches the event, and sends the request back down
    propagateCheckout: function() {
      vue.$dispatch("checkoutRequest");
    }
  }
});


//---------
// Vue init
//---------
Vue.config.debug = false;
var vue = new Vue({
  el: "#vue",

  data: {
    productsData: [
      {
        sku: 1,
        product: "Monkey",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/chimpanzee.jpg",
        images: [
          { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/chimpanzee.jpg" },
          { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/gorilla.jpg" },
          { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/red-monkey.jpg" },
          { image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/mandrill-monkey.jpg" }
        ],
        description: "This is a monkey",
        details: "This is where some detailes on monkies would go. This monkey done seent some shit.",
        price: 5.50
      },

      {
        sku: 2,
        product: "Kitten",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/kittens.jpg",
        description: "This is a kitten",
        details: "This is where some detailes on kittens would go. Shout out kittens for being adorable.",
        price: 10
      },

      {
        sku: 3,
        product: "Shark",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/shark.jpg",
        description: "This is a shark",
        details: "This is where some detailes on sharks would go. Damn nature, you scary.",
        price: 15
      },

      {
        sku: 4,
        product: "Puppy",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/dog.jpg",
        description: "This is a puppy",
        details: "This is where some detailes on puppies would go. Shout out puppies for being adorable.",
        price: 5
      },

      {
        sku: 5,
        product: "Apple",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/apple.jpg",
        description: "This is an apple",
        details: "This is where some detailes on apples would go. Shout out apples for being delicious.",
        price: 1
      },

      {
        sku: 6,
        product: "Orange",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/orange.jpg",
        description: "This is an orange",
        details: "This is where some detailes on oranges would go. Shout out oranges for being delicious.",
        price: 1.1
      },

      {
        sku: 7,
        product: "Peach",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/peach.jpg",
        description: "This is a peach",
        details: "This is where some detailes on peaches would go. Shout out peaches for being delicious.",
        price: 1.5
      },

      {
        sku: 8,
        product: "Mango",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/mango.png",
        description: "This is a mango",
        details: "This is where some detailes on mangos would go. Shout out mangos for being delicious.",
        price: 2
      },

      {
        sku: 9,
        product: "Cognac",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/cognac.jpg",
        description: "This is a glass of cognac",
        details: "This is where some detailes on cognac would go. I'm like hey whats up, hello.",
        price: 17.38
      },

      {
        sku: 10,
        product: "Chain",
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/241793/chain.jpg",
        description: "This is a chain",
        details: "This is where some details on chains would go. 2Chainz but I got me a few on.",
        price: 17.38
      }
    ],
    checkoutBool: false,
    cart: [],
    cartSubTotal: 0,
    tax: 0.065,
    cartTotal: 0
  },
  
  //intercept the checkout request dispatch
  //send it back down the chain
  events: {
    "checkoutRequest": function() {
      vue.$broadcast("checkoutRequest");
    }
  }
});
</template>
<div class="main-wrapper">
  <div class="header"><h1>Vue Shopping Cart</h1></div>
  <div id="vue">
    <cart :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal" :checkout-bool="checkoutBool"></cart>
    <products :cart="cart" :cart-sub-total="cartSubTotal" :tax="tax" :cart-total="cartTotal" :products-data="productsData"></products>
    <checkout-area v-if="checkoutBool" :cart="cart" :tax="tax" :cart-sub-total="cartSubTotal" :cart-total="cartTotal" :products-data="productsData" :total-with-tax="totalWithTax"></checkout-area>
  </div>
</div>
