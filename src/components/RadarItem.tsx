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
const scaleTime = 0.15 // in seconds, because delta is is seconds not ms like you'd expect
const scaleStep = (maxScale - minScale) / scaleTime // scale amount per second

export function RadarItem({
  item,
  position,
  isActive,
  isVisible,
}: RadarItemProps) {
  const { name, quadrant, description } = item
  const meshRef = useRef<Mesh>(null)
  const { setSelected } = useContext(SelectedContext)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((_state, delta) => {
    if (!meshRef.current) return

    const step = scaleStep * delta

    const { scale } = meshRef.current

    if ((isActive || isHovered) && scale.x < maxScale) {
      const newScale = scale.x + step
      scale.set(newScale, newScale, newScale)
    } else if (!isHovered && !isActive && scale.x > minScale) {
      const newScale = scale.x - step
      scale.set(newScale, newScale, newScale)
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

      <Html wrapperClass="item-wrapper" position={position}>
        {/* TODO: remove this once Html respects parent's visibility */}
        {isVisible && (
          <div className={isActive ? 'item-content' : 'item-preview'}>
            {(isHovered || isActive) && <h2>{name}</h2>}
            {isActive && (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        )}
      </Html>
    </mesh>
  )
}
