import { SphereGeometry, Mesh } from 'three'
import { materialForQuadrant } from '../utils/materials'
import type { RadarItemProps } from '../types'
import { useRef } from 'react'
import { ThreeEvent } from '@react-three/fiber'

const sphereGeom = new SphereGeometry(0.25, 12, 12)

export function RadarItem({ item, position }: RadarItemProps) {
  const { name, ring, quadrant } = item
  const meshRef = useRef<Mesh>(null)

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    console.log({ name, ring, quadrant })
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      material={materialForQuadrant(quadrant)}
      geometry={sphereGeom}
    />
  )
}
