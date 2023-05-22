import { SphereGeometry, Mesh } from 'three'
import { materialForQuadrant } from '../utils/materials'
import type { RadarItemProps } from '../types'
import { useRef, useContext } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { SelectedContext } from '../SelectedContext'

const sphereGeom = new SphereGeometry(0.25, 12, 12)

export function RadarItem({ item, position, isActive }: RadarItemProps) {
  const { name, quadrant, description } = item
  const meshRef = useRef<Mesh>(null)
  const { setSelected } = useContext(SelectedContext)

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    setSelected(isActive ? '' : name)
  }

  return (
    <mesh>
      <mesh
        ref={meshRef}
        position={position}
        onClick={handleClick}
        material={materialForQuadrant(quadrant)}
        geometry={sphereGeom}
      />

      {isActive && (
        <Html position={position}>
          <div className="item-content">
            <h2>{name}</h2>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </Html>
      )}
    </mesh>
  )
}
