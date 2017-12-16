import Vue from 'vue'
import Router from 'vue-router'
import CartListScene from '@/cart-list/CartListScene'
import CartDetailsScene from '@/cart-details/CartDetailsScene'
import CartItemDetailsScene from '@/cart-item-details/CartItemDetailsScene'

Vue.use(Router)

export const hierarchy = ['cart.list', 'cart.details', 'cart.item.details']

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cart.list',
      component: CartListScene
    }, {
      path: '/:cartId',
      name: 'cart.details',
      component: CartDetailsScene
    }, {
      path: '/:cartId/:itemId',
      name: 'cart.item.details',
      component: CartItemDetailsScene
    }
  ]
})
