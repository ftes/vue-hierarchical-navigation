# Hierarchical navigation with Vue

Demo: http://nav.ftes.de

This is a shopping cart demo. Navigation occurs across three levels:
1. shopping cart list
2. shopping cart details with list of items
3. shopping cart item details

Consistent "hierarchical" navigation across these levels is achieved using `vue-router` and the [PagingMixin](./src/mixins/PagingMixin.vue).

## What does "hierarchical" navigation mean?

A better term might be hierarchy-aware navigation.
The idea is to preserve a hierarchical history in addition to the regular linear browser history.

```
      Upwards:       go back to most recent state of an ancestor in the navigation hierarchy
         ^
         |
         |
<----------------->
      Sideways:      switch between items within a level of the navigation hierarchy (honor the sorting/filter of the items)
```

### Navigate upwards in hierarchy

A user should be able to jump upwards in the hierarchy (e.g. from cart details (2) to cart list (1)).
This upward navigation in the hierarchy skips all intermediate states in the browser history, where the user navigated on lower levels.

This navigation is exposed in the title bar via
- a _Back_ button,
- breadcrumbs.


### Navigate sidways in hierarchy

A user should be able to navigate sidways in the hierarchy (e.g. switching between the detail views of different shopping carts).
This navigation should honor the sorting/filter/etc. of the parent in the hierarchy.

#### Example

A user sorts shopping carts by name in descending order:
- Wooden
- Steel
- Soft

He navigates down the hierarchy by clicking on the first shopping cart "Wooden".
When he now navigates sideways to the next shopping cart, he expects to see "Steel", as this is the next cart by descending name.


## Details

For every level in the hierarchy, the [most recent state is stored](https://github.com/ftes/vue-hierarchical-navigation/blob/master/src/router/index.js#L32).

Each level in the hierarchy that has children [can add metadata](https://github.com/ftes/vue-hierarchical-navigation/blob/master/src/mixins/PagingMixin.vue#L58). This is used to enrich the breadcrumbs and enable sideways navigation.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
