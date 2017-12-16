export default (sort, field) => {
  const entry = sort.find(entry => entry.field === field) || {}
  return entry.direction
}
