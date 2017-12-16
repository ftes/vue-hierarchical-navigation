<template>
  <div>
    <h1>{{item.name}}</h1>
    <h2>{{item.amount}} pieces</h2>
  </div>
</template>

<script>
import service from '@/service'

export default {
  data: () => ({
    item: {}
  }),

  methods: {
    fetchItem () {
      service.getItem(this.$route.params.cartId, this.$route.params.itemId)
        .then(item => {
          this.item = item
        })
    },
    navigateTo (itemId) {
      this.$router.push({ params: { itemId } })
    }
  },

  watch: {
    '$route.params.itemId' (id) {
      this.fetchItem()
    }
  },

  mounted () {
    this.fetchItem()
  }
}
</script>

