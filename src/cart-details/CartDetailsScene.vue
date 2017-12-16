<template>
  <div>
    <h1>Cart: {{cart.name}}</h1>
    <div><b>Amount:</b> {{cart.amount}} EUR</div>
    <hr/>
    <h2>Items</h2>
    <paging
      :limit="params.limit"
      :offset="params.offset"
      :totalCount="totalCount"
      :pageSize="pageSize"
      :numberOfItems="items.length">

      <table class="table">
        <tr>
          <th>Name</th>
          <th>Amount</th>
        </tr>
        <tr v-for="item in items" :key="item.id">
          <td><router-link :to="itemLink(item)">{{item.name}}</router-link></td>
          <td>{{ item.amount }} pieces</td>
        </tr>
      </table>

    </paging>
  </div>
</template>

<script>
import service from '@/service'
import PagingMixin from '@/mixins/PagingMixin'

const PAGE_SIZE = 10

export default {
  mixins: [
    PagingMixin
  ],

  data: () => ({
    cart: {},
    pageSize: PAGE_SIZE
  }),

  methods: {
    fetchCart () {
      service.getCart(this.$route.params.cartId)
        .then(cart => {
          this.cart = cart
        })
    },
    itemLink (item) {
      return {
        name: 'cart.item.details',
        params: {
          itemId: item.id
        }
      }
    },
    getItems (limit = PAGE_SIZE, offset) {
      const cartId = this.$route.params.cartId
      return service.listItems(cartId, limit, offset)
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

