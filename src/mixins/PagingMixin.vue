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

  computed: {
    from () {
      return this.params.offset + 1
    },
    to () {
      return this.params.offset + this.items.length
    }
  },

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
  },

  beforeRouteLeave (to, from, next) {
    from.meta.suffix = `${this.from} - ${this.to} of ${this.totalCount}`
    next()
  }
}
</script>
