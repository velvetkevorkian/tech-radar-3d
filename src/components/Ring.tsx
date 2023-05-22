import { Text, Wireframe } from '@react-three/drei'
import type { RingProps } from '../types'
import { ringMaterial } from '../utils/materials'
import { useParams } from 'react-router-dom'
import { Quadrant } from './Quadrant'
import { radiusForIndex } from '../utils/buildRings'

export function Ring({ ring, ringSize }: RingProps) {
  const { quadrant: activeQuadrant, ring: activeRing } = useParams()

  const visible = !activeRing || activeRing === ring.name

  return (
    <mesh visible={visible}>
      <mesh material={ringMaterial}>
        <sphereGeometry args={[radiusForIndex(ringSize)]} />
        <Wireframe
          stroke={'#00ff00'}
          strokeOpacity={0.8}
          simplify
          fillOpacity={0.1}
          fillMix={1}
          squeeze
          squeezeMin={0.5}
        />
      </mesh>

      {/* <Text position-x={ringSize} position-y={0}>
        {ring.name}
      </Text> */}

      {ring.quadrants.map((quad) => (
        <Quadrant
          quadrant={quad}
          key={quad.name}
          activeQuadrant={activeQuadrant}
        />
      ))}
    </mesh>
  )
}
