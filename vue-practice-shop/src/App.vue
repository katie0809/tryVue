<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7" :key="prod.id" v-for="prod in product_list">
        <product :product="prod" :cart="cart" v-on:add-to-cart="addToCart"></product>
      </div>
      <div class="col-md-5">
        <cart :items="cart" v-on:remove-from-cart="removeFromCart" v-on:pay-now="payNow"></cart>
      </div>
    </div>
  </div>
</template>

<script>
import product_list from '@/products.json';
import product from '@/components/Product.vue';
import cart from '@/components/Cart.vue';

export default {
  name: 'app',
  data() {
    return {
      product_list,
      cart: []
    }
  },
  components: {
    product,
    cart
  },
  methods: {
    addToCart(prod) {
      const idx = this.cart.findIndex(x => x.info.id === prod.id);
      if(idx > -1)
      {
        // 이미 상품이 배열 내에 존재한다
        this.cart[idx].count++;
      }
      else
        this.cart.push({info: prod, count: 1});
      
    },
    removeFromCart(prod) {
      // 상품이 카트안에 2개이상 있으면 개수만 줄이고
      // 1개 들어있으면 아예 카트에서 뺀다
      const idx = this.cart.findIndex(x => x.info.id === prod.id);
      if(this.cart[idx].count > 1)
      {
        this.cart[idx].count--;
      }
      else{
        this.cart.splice(idx, 1);
      }

    },
    payNow() {
      this.cart = [];
      alert('Shopping completed!')
    }
  }
}
</script>

<!-- style scoped로 선언 시 해당 컴포넌트에만 스타일이 적용되도록 할 수 있다. -->
<style>
  body {
    background-color: aliceblue;
  }
</style>
