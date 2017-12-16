<template>
  <div>
    <h1>Carts</h1>
    <paging
      :limit="params.limit"
      :offset="params.offset"
      :totalCount="totalCount"
      :pageSize="pageSize"
      :numberOfItems="items.length">
      <table class="table" id="step2-4">
        <tr>
          <sortable-th field="name" id="nameHeader">Name</sortable-th>
          <sortable-th field="amount">Amount</sortable-th>
        </tr>
        <tr v-for="(cart, i) in items" :key="cart.id">
          <td><router-link :to="cartLink(cart, i)">{{cart.name}}</router-link></td>
          <td>{{ cart.amount }} EUR</td>
        </tr>
      </table>
    </paging>
  </div>
</template>

<script>
import service from '@/service'
import PagingMixin from '@/mixins/PagingMixin'
import IntroMixin from '@/mixins/IntroMixin'

const PAGE_SIZE = 10

export default {
  mixins: [
    PagingMixin,
    IntroMixin
  ],

  data: () => ({
    pageSize: PAGE_SIZE,
    childRouteParam: 'cartId'
  }),

  methods: {
    cartLink (cart, offsetWithinPage) {
      return {
        name: 'cart.details',
        params: {
          [this.childRouteParam]: cart.id
        },
        query: {
          parentOffset: this.params.offset + offsetWithinPage
        }
      }
    },
    getItems (limit = PAGE_SIZE, offset, sort) {
      return service.listCarts(limit, offset, sort)
    }
  }
}
</script>
