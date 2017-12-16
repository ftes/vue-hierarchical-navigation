<script>
import Paging from '@/components/Paging'

export default {
  components: {
    Paging
  },

  data: () => ({
    items: [],
    params: {
      limit: 0,
      offset: 0
    },
    totalCount: 0
  }),

  methods: {
    fetchItems () {
      const { offset, limit } = this.$route.query
      const offsetInt = offset ? parseInt(offset) : 0
      const limitInt = limit ? parseInt(limit) : undefined
      this.getItems(limitInt, offsetInt)
        .then(response => {
          this.items = response.items
          this.params = response.params
          this.totalCount = response._total_count
        })
    }
  },

  watch: {
    '$route.query' () {
      this.fetchItems()
    }
  },

  mounted () {
    this.fetchItems()
  }
}
</script>
