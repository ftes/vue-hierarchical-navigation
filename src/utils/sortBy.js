import orderBy from 'lodash.orderby'

export const ASC = '+'
export const DESC = '-'

export default (items, sort) => {
  const fields = sort.map(entry => entry.field)
  const orders = sort.map(entry => entry.direction === ASC ? 'asc' : 'desc')
  return orderBy(items, fields, orders)
}
