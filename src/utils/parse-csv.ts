import data from '../assets/data/interfaces-and-devices/radar.csv?raw'
import type { Item } from '../types'

const lines = data.split('\n').slice(1).filter(Boolean)

const items = lines.map((line, id) => {
  const [columns, description] = line.split(`"`).filter(Boolean)
  const [name, ring, quadrant, status] = columns.split(',')
  return { name, ring, quadrant, status, description, id } as Item
})

export { items }
