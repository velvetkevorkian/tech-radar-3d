import data from '../assets/data/interfaces-and-devices/radar.csv?raw'
import type { Item } from '../types'

const parseCsv = (csv: string) => {
  const lines = csv.split('\n').slice(1).filter(Boolean)
  return lines.map((line, id) => {
    const [name, ring, quadrant, status, ...rest] = line.split(',')
    const description = rest.join(',')
    return { name, ring, quadrant, status, description, id } as Item
  })
}

const items = parseCsv(data)

export { items, parseCsv }
