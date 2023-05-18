import { QuadrantProps } from '../types'
import { RadarItem } from './RadarItem'

export function Quadrant({ quadrant, activeQuadrant }: QuadrantProps) {
  const visible = !activeQuadrant || activeQuadrant === quadrant.name
  return (
    <mesh visible={visible}>
      {quadrant.items.map(({ item, position }) => (
        <RadarItem key={item.id} item={item} position={position} />
      ))}
    </mesh>
  )
}
