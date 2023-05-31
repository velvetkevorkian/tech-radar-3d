import { QuadrantProps } from '../types'
import { RadarItem } from './RadarItem'
import { useContext } from 'react'
import { SelectedContext } from '../SelectedContext'
import { useParams } from 'react-router-dom'

export function Quadrant({ quadrant }: QuadrantProps) {
  const { ring: activeRing, quadrant: activeQuadrant } = useParams()

  const ringMatches = activeRing === quadrant.ring.toLowerCase()
  const quadrantMatches = activeQuadrant === quadrant.name.toLowerCase()

  const isVisible =
    (activeRing && ringMatches) ||
    (activeQuadrant && quadrantMatches) ||
    (!activeRing && !activeQuadrant)

  const { selected } = useContext(SelectedContext)
  return (
    <group visible={isVisible}>
      {quadrant.items.map(({ item, position }) => (
        <RadarItem
          key={item.id}
          item={item}
          position={position}
          isActive={item.name === selected}
          // Html in the RadarItem doesn't respect the parent's `visible` prop
          // so we have to pass it in to each item explicitly
          isVisible={isVisible}
        />
      ))}
    </group>
  )
}
