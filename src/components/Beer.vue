<template>
  <div>
    <div :cart="cart">
      <span @click="deleteBeer(beer)">
        <i><font-awesome-icon class="float-right" icon="trash" size="xs" /></i>
      </span>
      <span @click="openForm()" v-show="!isEditing">
        <i><font-awesome-icon class="float-right" icon="edit" size="xs" /></i>
      </span>
      <div class='ui centered card' v-show="isEditing">
        <div class='ui form'>
          <div class='field'>
            <label>Name</label>
            <input v-model="beer.name" type='text'>
          </div>
          <div class='field'>
            <label>Description</label>
            <textarea rows="3" v-model="beer.description"></textarea>
          </div>
          <div class='field'>
            <label>Image</label>
            <input v-model="beer.image_url" type='text'>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="closeForm">
              Close
            </button>
          </div>
        </div>
      </div>
      <div>
        <span v-on:click="addToCart(beer)"> 
          <i><font-awesome-icon class="float-right" icon="shopping-cart" size="xs" /></i> &nbsp; &nbsp;
        </span>
      </div>
      <router-link
        :to="{name:'detail',params:{id:beer.id}}"
      >
        {{ beer.name }}
      </router-link>  
    </div>
  </div>
</template>
<script>
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.css';
import Cart from '@/components/Cart';

export default {
  components: {
    Cart
  },
  props: {
    beer: {
      type: Object,
      default: () => null
    },
    cart: {
      type: Array,
      default: () => []
    },
    cartSize: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    deleteBeer(beer) {
      this.$emit('deleteBeer', beer);
    },
    openForm() {
      this.isEditing = true;
    },
    closeForm() {
      this.isEditing = false;
    },
    addToCart(beer) {
      var found = false;

      for (var i = 0; i < this.cart.length; i++) {

        if (this.cart[i].id === beer.id) {
          var newBeer = this.cart[i];
          newBeer.quantity = newBeer.quantity + 1;
          this.cart.push(newBeer);
          //console.log("DUPLICATE",  this.cart[i].beer + "'s quantity is now: " + this.cart[i].quantity);
          found = true;
          break;
        }
      }

      if(!found) {
        beer.quantity = 1;
        this.cart.push(beer);
      }
    }
  }
};  
</script>
<style scoped>

#carts {
  width: 100%;
  min-height: 40px;
  background: #eee;
  padding: 20px;
}

.items { 
  padding: 10px;
  margin-top: 50px;
  padding: 20px;  
}

.items p {
  margin-top: 2px;
  background: #f5f5f5;
  padding: 4px 10px;
  cursor: pointer;
  position: relative;
}

.cart-btn {
  position: absolute;
  right: 2%;
}

.cart-price {
  margin-left: 20px;
}

.delete {
  margin-left: 20px;
}
</style>


