import sortDirection from './sortDirection'
import { ASC, DESC } from './sortBy'

export default (sort, field) => {
  const direction = sortDirection(sort, field) === ASC ? DESC : ASC
  const newEntry = {
    field,
    direction
  }
  return [newEntry] // only sort by one field
}
