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
      service.getItem(this.$route.params.id)
        .then(item => {
          this.item = item
        })
    }
  },
  watch: {
    '$route.params.id' (id) {
      this.fetchItem()
    }
  },
  mounted () {
    this.fetchItem()
  }
}
</script>

