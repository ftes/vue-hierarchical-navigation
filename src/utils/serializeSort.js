import { DESC } from './sortBy'

const serializeEntry = entry => (entry.direction === DESC ? DESC : '') + entry.field

export default entries => entries.map(serializeEntry)
