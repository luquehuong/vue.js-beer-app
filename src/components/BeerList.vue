<template>
  <div>
    <div>
      <h4> Cart </h4>
      <div id="carts">
        <p v-if = "cartItems.length <= 0"> No cart items  </p>
        <div v-for = "beer in cartItems" :key="beer.id">
          <span> {{ beer.name }} </span>
          <span class="delete btn text-danger" v-on:click="deleteItem(beer)"> &#x2718; </span>    
        </div> 
      </div>
    </div>
    <div
      v-for="beer in list"
      :key="beer.id"
    >
      <beer 
      :beer="beer"
      :item="item"
      @deleteBeer="deleteBeer"
      @addToCart="addToCart"
      @deleteItem="deleteItem">
      </beer>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/tailwind.css';
import '@/assets/styles/main.css';
import Beer from '@/components/Beer';

export default {
  components: {
    Beer,
  },
  data() {
    return {
      cartItems: [],
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    beer: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    deleteBeer(beer) {
      this.$emit('deleteBeer', beer);
    },
    addToCart (beer) {
      if (this.cartItems.includes(beer)) {
        alert("already there");
      } else {
        this.cartItems.push(beer);  
      }
    },
    deleteItem (item) {         
      this.cartItems.splice(
        this.cartItems.indexOf(item), 1
      );
    }
  }
}
</script>
<style scoped>
</style>
