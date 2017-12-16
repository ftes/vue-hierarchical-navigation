<template>
  <div>
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
    pageSize: PAGE_SIZE
  }),

  methods: {
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
  }
}
</script>
