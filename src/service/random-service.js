import jsf from 'json-schema-faker'
import { resolve } from '@/utils'
import { cart, item, items } from './schemas'

const NUMBER_OF_CARTS = 35
const NUMBER_OF_ITEMS = 15

const pageSize = (limit, offset, max) =>
  offset + limit > max
    ? max - offset
    : limit

export default {
  listCarts: (limit, offset) =>
    resolve(jsf(items(pageSize(limit, offset, NUMBER_OF_CARTS), cart)))
      .then(items => ({
        ...items,
        _total_count: NUMBER_OF_CARTS,
        params: {
          limit,
          offset
        }
      })),

  getCart: id =>
    resolve(jsf(cart))
      .then(cart => ({
        ...cart,
        id
      })),

  listItems: (cartId, limit, offset) =>
    resolve(jsf(items(pageSize(limit, offset, NUMBER_OF_ITEMS), item)))
      .then(items => ({
        ...items,
        _total_count: NUMBER_OF_ITEMS,
        params: {
          limit,
          offset
        }
      })),

  getItem: (cartId, id) =>
    resolve(jsf(item))
      .then(item => ({
        ...item,
        id
      }))
}
