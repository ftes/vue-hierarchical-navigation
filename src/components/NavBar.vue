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
    <span class="ml-auto btn-group">
      <router-link class="btn btn-outline-secondary"
        :class="{ disabled: !prevLink }" :to="prevLink || {}">
        &laquo;
      </router-link>
      <router-link class="btn btn-outline-secondary"
         :class="{ disabled: !backLink }" :to="backLink || {}">
         Back
      </router-link>
      <router-link class="btn btn-outline-secondary"
        :class="{ disabled: !nextLink }" :to="nextLink || {}">
        &raquo;
      </router-link>
    </span>
  </nav>
</template>

<script>
import { hierarchy, lastRouteByLevel } from '@/router'
import { isDefined } from '@/utils'

const titles = {
  'cart.list': 'Carts',
  'cart.details': 'Cart Details',
  'cart.item.details': 'Item Details'
}

export default {
  data: () => ({
    prevLink: false,
    nextLink: false
  }),

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
    },

    parentOffset () {
      const parentOffset = this.$route.query.parentOffset
      return parentOffset && parseInt(parentOffset)
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
    },

    setLinkForId (getId, linkName, parentOffset, routeParam) {
      getId(parentOffset)
        .then(id => {
          this[linkName] = {
            query: {
              parentOffset
            },
            params: {
              [routeParam]: id
            }
          }
        })
    }
  },

  watch: {
    '$route' () {
      this.prevLink = false
      this.nextLink = false

      const lastParentRoute = this.level > 0 && this.lastRoute(this.level - 1)
      if (!lastParentRoute || !isDefined(this.parentOffset)) return

      const { totalCount, getId, childRouteParam } = lastParentRoute.meta

      if (this.parentOffset > 0) {
        this.setLinkForId(getId, 'prevLink', this.parentOffset - 1, childRouteParam)
      }

      if (this.parentOffset < totalCount - 1) {
        this.setLinkForId(getId, 'nextLink', this.parentOffset + 1, childRouteParam)
      }
    }
  }
}
</script>

<style>
#breadcrumb {
  margin: 0;
}

#navbar {
  margin-bottom: 20px;
}
</style>
