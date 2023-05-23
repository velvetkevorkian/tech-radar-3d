import { SphereGeometry, Mesh } from 'three'
import { materialForQuadrant } from '../utils/materials'
import type { RadarItemProps } from '../types'
import { useRef, useContext, useState } from 'react'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { SelectedContext } from '../SelectedContext'

const sphereGeom = new SphereGeometry(0.25, 12, 12)

const minScale = 1
const maxScale = 1.3
const scaleStep = 0.05

export function RadarItem({ item, position, isActive }: RadarItemProps) {
  const { name, quadrant, description } = item
  const meshRef = useRef<Mesh>(null)
  const { setSelected } = useContext(SelectedContext)
  const [isHovered, setIsHovered] = useState(false)

  useFrame(() => {
    if (!meshRef.current) return
    if (isHovered && meshRef.current.scale.x < maxScale) {
      meshRef.current.scale.x += scaleStep
      meshRef.current.scale.y += scaleStep
      meshRef.current.scale.z += scaleStep
    } else if (!isHovered && meshRef.current.scale.x > minScale) {
      meshRef.current.scale.x -= scaleStep
      meshRef.current.scale.y -= scaleStep
      meshRef.current.scale.z -= scaleStep
    }
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    setSelected(isActive ? '' : name)
  }

  const handlePointerEnter = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    document.body.classList.add('hover')
    setIsHovered(true)
  }

  const handlePointerLeave = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    document.body.classList.remove('hover')
    setIsHovered(false)
  }

  return (
    <mesh>
      <mesh
        geometry={sphereGeom}
        material={materialForQuadrant(quadrant)}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        position={position}
        ref={meshRef}
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
