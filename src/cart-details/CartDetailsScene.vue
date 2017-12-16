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
          <sortable-th field="name">Name</sortable-th>
          <sortable-th field="amount">Amount</sortable-th>
        </tr>
        <tr v-for="(item, i) in items" :key="item.id">
          <td><router-link :to="itemLink(item, i)">{{item.name}}</router-link></td>
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
    pageSize: PAGE_SIZE,
    childRouteParam: 'itemId'
  }),

  methods: {
    fetchCart () {
      service.getCart(this.$route.params.cartId)
        .then(cart => {
          this.cart = cart
        })
    },
    itemLink (item, offsetWithinPage) {
      return {
        name: 'cart.item.details',
        params: {
          [this.childRouteParam]: item.id
        },
        query: {
          parentOffset: this.params.offset + offsetWithinPage
        }
      }
    },
    getItems (limit = PAGE_SIZE, offset, sort) {
      const cartId = this.$route.params.cartId
      return service.listItems(cartId, limit, offset, sort)
    },
    navigateTo (cartId) {
      this.$router.push({ params: { cartId } })
    }
  },

  watch: {
    '$route.params.cartId' () {
      this.fetchCart()
    }
  }
}
</script>

