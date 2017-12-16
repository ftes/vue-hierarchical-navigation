import { ASC, DESC } from './sortBy'

const parseSortToken = token => ({
  direction: token.startsWith(DESC) ? DESC : ASC,
  field: token.replace(DESC, '')
})

export default (sort = []) => {
  if (!Array.isArray(sort)) sort = [sort]
  return sort.map(parseSortToken)
}
