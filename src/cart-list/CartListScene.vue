<template>
  <div>
    <h1>Carts</h1>
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
        <tr v-for="cart in items" :key="cart.id">
          <td><router-link :to="cartLink(cart)">{{cart.name}}</router-link></td>
          <td>{{ cart.amount }} EUR</td>
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
    pageSize: PAGE_SIZE
  }),

  methods: {
    cartLink (cart) {
      return {
        name: 'cart.details',
        params: {
          cartId: cart.id
        }
      }
    },
    getItems (limit = PAGE_SIZE, offset) {
      return service.listCarts(limit, offset)
    }
  }
}
</script>
