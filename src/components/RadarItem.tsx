import { SphereGeometry, TorusGeometry, Mesh } from 'three'
import { materialForQuadrant } from '../utils/materials'
import type { RadarItemProps } from '../types'
import { useRef, useContext, useState } from 'react'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { Html, Billboard } from '@react-three/drei'
import { SelectedContext } from '../SelectedContext'

const sphereRadius = 0.25
const arcRadius = 0.35
const tubeRadius = 0.03

const sphereGeom = new SphereGeometry(sphereRadius, 12, 12)
const arcGeom = new TorusGeometry(arcRadius, tubeRadius, 12, 24, Math.PI / 2)
const ringGeom = new TorusGeometry(arcRadius, tubeRadius, 12, 24, Math.PI * 2)

const minScale = 1
const maxScale = 1.4
const scaleTime = 0.15 // in seconds, because delta is is seconds not ms like you'd expect
const scaleStep = (maxScale - minScale) / scaleTime // scale amount per second

export function RadarItem({
  item,
  position,
  isActive,
  isVisible,
}: RadarItemProps) {
  const { name, quadrant, description, status, ring } = item
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

  const material = materialForQuadrant(quadrant)

  let statusGeom = null

  switch (status) {
    case 'new': {
      statusGeom = ringGeom
      break
    }

    case 'in':
    case 'out': {
      statusGeom = arcGeom
      break
    }
  }

  return (
    <mesh>
      <Billboard position={position}>
        <mesh
          geometry={sphereGeom}
          material={material}
          onClick={handleClick}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          ref={meshRef}
        />

        {statusGeom && (
          <mesh
            geometry={statusGeom}
            material={material}
            rotation={[0, 0, status === 'out' ? Math.PI : 0]}
          />
        )}
      </Billboard>

      <Html wrapperClass="item-wrapper" position={position}>
        {/* TODO: remove this once Html respects parent's visibility */}
        {isVisible && (
          <div className={isActive ? 'item-content' : 'item-preview'}>
            {(isHovered || isActive) && <h2>{name}</h2>}
            {isActive && (
              <>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                <dl>
                  <dt>Status</dt>
                  <dd>{status}</dd>
                  <dt>Ring</dt>
                  <dd>{ring}</dd>
                  <dt>Quadrant</dt>
                  <dd>{quadrant.replaceAll('-', ' ')}</dd>
                </dl>
              </>
            )}
          </div>
        )}
      </Html>
    </mesh>
  )
}
