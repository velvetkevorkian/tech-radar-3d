import { QuadrantProps } from '../types'
import { RadarItem } from './RadarItem'
import { useContext } from 'react'
import { SelectedContext } from '../SelectedContext'

export function Quadrant({ quadrant, activeQuadrant }: QuadrantProps) {
  const visible = !activeQuadrant || activeQuadrant === quadrant.name
  const { selected } = useContext(SelectedContext)
  return (
    <mesh visible={visible}>
      {quadrant.items.map(({ item, position }) => (
        <RadarItem
          key={item.id}
          item={item}
          position={position}
          isActive={item.name === selected}
        />
      ))}
    </mesh>
  )
}
