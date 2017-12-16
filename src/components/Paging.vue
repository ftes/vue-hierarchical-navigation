<template>
  <div>
    <span>Showing {{from}} - {{to}} of {{totalCount}}.</span>

    <slot/>

    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !prevPage }">
          <router-link class="page-link"
            :to="prevPage || {}">
            &laquo;
          </router-link>
        </li>
        <li v-for="(page, i) in pages" :key="page.query.offset"
          class="page-item" :class="{ active: i === pageNumber }">
          <router-link
            class="page-link"
            :to="page">
            {{i + 1}}
          </router-link>
        </li>
        <li class="page-item" :class="{ disabled: !nextPage }">
          <router-link class="page-link"
            :to="nextPage || {}">
            &raquo;
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    offset: Number,
    limit: Number,
    totalCount: Number,
    numberOfItems: Number,
    pageSize: Number
  },

  computed: {
    pageNumber () {
      return this.offset / this.pageSize
    },
    from () {
      return this.offset + 1
    },
    to () {
      return this.offset + this.numberOfItems
    },
    prevPage () {
      return this.offset > 0 && this.pageLink(this.pageNumber - 1)
    },
    nextPage () {
      return this.to < this.totalCount && this.pageLink(this.pageNumber + 1)
    },
    pages () {
      const numberOfPages = Math.ceil(this.totalCount / this.pageSize)
      return [...new Array(numberOfPages)].map((_, i) => this.pageLink(i))
    }
  },

  methods: {
    pageLink (pageNumber) {
      return {
        query: {
          limit: this.pageSize,
          offset: pageNumber * this.pageSize
        }
      }
    }
  }
}
</script>

