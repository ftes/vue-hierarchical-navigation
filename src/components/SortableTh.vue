<template>
  <th class="sortable" @click="onClick">
    <slot/>
    <i class="fas" :class="[sortIcon]"/>
  </th>
</template>

<script>
import { parseSort, serializeSort, sortDirection, toggleSort, ASC, DESC } from '@/utils'

export default {
  props: {
    field: String
  },

  computed: {
    sort () {
      return parseSort(this.$route.query.sort)
    },

    direction () {
      return sortDirection(this.sort, this.field)
    },

    sortIcon () {
      if (this.direction === ASC) return 'fa-sort-up'
      if (this.direction === DESC) return 'fa-sort-down'
      return 'fa-sort'
    }
  },

  methods: {
    onClick () {
      const sort = toggleSort(this.sort, this.field)
      this.$emit('input', sort)
      this.$router.replace({
        query: {
          ...this.$route.query,
          sort: serializeSort(sort)
        }
      })
    }
  }
}
</script>

<style>
  th.sortable {
    cursor: pointer;
  }
</style>
