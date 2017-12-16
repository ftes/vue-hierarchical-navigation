<script>
import Paging from '@/components/Paging'
import SortableTh from '@/components/SortableTh'
import { parseSort, serializeSort } from '@/utils'

export default {
  components: {
    Paging,
    SortableTh
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
    },
    sort () {
      return this.$route.query.sort && parseSort(this.$route.query.sort)
    }
  },

  methods: {
    fetchItems () {
      const { offset, limit } = this.$route.query
      const offsetInt = offset ? parseInt(offset) : 0
      const limitInt = limit ? parseInt(limit) : undefined
      this.getItems(limitInt, offsetInt, this.sort)
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
    if (this.sort) from.meta.suffix += `, ${serializeSort(this.sort)}`
    from.meta.totalCount = this.totalCount
    from.meta.childRouteParam = this.childRouteParam

    // Use filters, sorting etc. to resolve ID
    const sort = this.sort
    from.meta.getId = offset => {
      return this.getItems(1, offset, sort)
      .then(response => response.items[0].id)
    }
    next()
  }
}
</script>
