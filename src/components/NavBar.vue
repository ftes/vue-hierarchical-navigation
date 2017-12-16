<template>
  <nav id="navbar" class="navbar navbar-dark bg-dark">
    <ol id="breadcrumb" class="breadcrumb">
      <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.title"
        class="breadcrumb-item" :class="{ 'active': breadcrumb.active }">
        <router-link :to="breadcrumb.to" v-if="!breadcrumb.active">
          {{breadcrumb.title}}
          <span v-if="breadcrumb.suffix"> ({{breadcrumb.suffix}})</span>
        </router-link>
        <span v-else>{{breadcrumb.title}}</span>
      </li>
    </ol>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item" v-if="backLink">
        <router-link :to="backLink">Back</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { hierarchy, lastRouteByLevel } from '@/router'

const titles = {
  'cart.list': 'Carts',
  'cart.details': 'Cart Details',
  'cart.item.details': 'Item Details'
}

export default {
  computed: {
    level () {
      return hierarchy.indexOf(this.$route.name)
    },

    breadcrumbs () {
      const breadcrumbs = hierarchy.slice(0, this.level + 1)
      return breadcrumbs.map((routeName, i) => ({
        title: titles[routeName],
        active: routeName === this.$route.name,
        to: this.levelLink(i),
        suffix: this.suffix(i)
      }))
    },

    backLink () {
      return this.level > 0 && this.levelLink(this.level - 1)
    }
  },

  methods: {
    lastRoute (level) {
      return lastRouteByLevel[hierarchy[level]]
    },

    levelLink (level) {
      const name = hierarchy[level]
      return {
        name, // in case we do not have a navigation history
        ...this.lastRoute(level)
      }
    },

    suffix (level) {
      return this.lastRoute(level) && this.lastRoute(level).meta.suffix
    }
  }
}
</script>

<style>
#breadcrumb {
  margin: 0
}
</style>
