import { resolve } from '@/utils'
import data from './data.json'

const itemsResponse = (items, limit, offset) => ({
  _total_count: items.length,
  params: {
    limit,
    offset
  },
  items: items.slice(offset, offset + limit)
})

const listCarts = (limit, offset) =>
    resolve(itemsResponse(data, limit, offset))

const getCart = (id) =>
  resolve(data.find(cart => cart.id === id))

const listItems = (cartId, limit, offset) =>
  getCart(cartId)
    .then(cart => itemsResponse(cart.items, limit, offset))

const getItem = (cartId, itemId) =>
  getCart(cartId)
    .then(cart => cart.items.find(item => item.id === itemId))

export default {
  listCarts,
  getCart,
  listItems,
  getItem
}
