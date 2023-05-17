import { BoxGeometry } from 'three'
import { materialForQuadrant } from '../utils/materials'
import type { RadarItemProps } from '../types'

const boxGeom = new BoxGeometry(0.75, 0.75, 0.75)

export function RadarItem({ item, position }: RadarItemProps) {
  const { name, ring, quadrant } = item

  const handleClick = () => {
    console.log({ name, ring, quadrant })
  }

  return (
    <mesh
      position={position}
      onClick={handleClick}
      material={materialForQuadrant(quadrant)}
      geometry={boxGeom}
    />
  )
}
