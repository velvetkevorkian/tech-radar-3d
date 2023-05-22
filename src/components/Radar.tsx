import { items } from '../utils/parse-csv'
import { Ring } from './Ring'
import { buildRings } from '../utils/buildRings'

const rings = buildRings(items)

export function Radar() {
  return (
    <>
      {rings.map((r, index) => (
        <Ring ring={r} ringSize={index} key={r.name} />
      ))}
    </>
  )
}
