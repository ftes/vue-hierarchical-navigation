import sortDirection from './sortDirection'
import { ASC, DESC } from './sortBy'

export default (sort, field) => {
  const direction = sortDirection(sort, field) === DESC ? ASC : DESC
  const newEntry = {
    field,
    direction
  }
  return [newEntry] // only sort by one field
}
