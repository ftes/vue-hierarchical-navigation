<template>
  <div>
    <h1>Cart: {{cart.name}}</h1>
    <div><b>Amount:</b> {{cart.amount}} EUR</div>
    <hr/>
    <h2>Items</h2>
    <cart-items-list/>
  </div>
</template>

<script>
import service from '@/service'
import CartItemsList from './components/CartItemsList'

export default {
  components: {
    CartItemsList
  },

  data: () => ({
    cart: {}
  }),

  methods: {
    fetchCart () {
      service.getCart(this.$route.params.cartId)
        .then(cart => {
          this.cart = cart
        })
    }
  },

  watch: {
    '$route.params.cartId' () {
      this.fetchCart()
    }
  },

  mounted () {
    this.fetchCart()
  }
}
</script>

