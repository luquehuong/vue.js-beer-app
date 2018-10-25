<template>
  <div>
    <div :cart="cart" class="cart">
      <span class="cart-size float-right" @click="showCart = !showCart"> {{ cart | cartSize }} </span><i @click="showCart = !showCart"><font-awesome-icon class="float-right" icon="shopping-cart" size="lg" /></i>
      <div class="cart-items" v-show="showCart">
        <table class="cartTable">
          <tbody>
            <tr v-for="beer in cart" :key="beer.id">
              <td class="align-left"><div class="cartImage" @click="removeBeer(beer)"><i><font-awesome-icon icon="times" size="md" /></i></div></td>
              <td class="align-center"><button @click="quantityChange"><i><font-awesome-icon icon="minus" size="md" /></i></button></td>
              <td class="align-center">{{ cart[$index].quantity }}</td>
              <td class="align-center"><button @click="quantityChange"><i><font-awesome-icon icon="plus" size="md" /></i></button></td>
              <td class="align-center">{{ cart[$index] }}</td>
            </tr>
          </tbody>
        </table>
        <button class="clearCart" @click="clearCart()"> Clear Cart </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    beer: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      showCart: false,
      cart: [],
      cartSize: 0
    }    
  },
  filters: {
    cartSize: function(cart) {
      var cartSize = 0;

      for (var i = 0; i < cart.length; i++) {
        cartSize += cart[i].quantity;
      }

      return cartSize;
    }
  },
  methods: {
    removeBeer: function(beer) {
      this.cart.$remove(beer);
    },

    clearCart: function() {
      this.cart = [];
      this.showCart = false;
    },

    quantityChange: function(beer, direction) {

      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === beer.id) {

          var newBeer = this.cart[i];

          if(direction === "incriment") {
            newBeer.quantity = newBeer.quantity + 1;
            this.cart.push(newBeer);

          } else {
            newBeer.quantity = newBeer.quantity - 1;

            if(newBeer.quantity == 0) {
              this.cart.$remove(newBeer);

            } else {
              this.cart.push(newBeer);
            }
          }
        }
      }
    }
  }
}
</script>

