import { resolve, sortBy, ASC } from '@/utils'
import data from './data.json'

const itemsResponse = (items, limit, offset, sort = [{ field: 'name', direction: ASC }]) => ({
  _total_count: items.length,
  params: {
    limit,
    offset
  },
  items: sortBy(items, sort).slice(offset, offset + limit)
})

const listCarts = (limit, offset, sort) =>
    resolve(itemsResponse(data, limit, offset, sort))

const getCart = (id) =>
  resolve(data.find(cart => cart.id === id))

const listItems = (cartId, limit, offset, sort) =>
  getCart(cartId)
    .then(cart => itemsResponse(cart.items, limit, offset, sort))

const getItem = (cartId, itemId) =>
  getCart(cartId)
    .then(cart => cart.items.find(item => item.id === itemId))

export default {
  listCarts,
  getCart,
  listItems,
  getItem
}
