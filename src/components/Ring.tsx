import { Text } from '@react-three/drei'
import type { RingProps } from '../types'
import { ringMaterial } from '../utils/materials'
import { useParams } from 'react-router-dom'
import { Quadrant } from './Quadrant'

export function Ring({ ring, ringSize }: RingProps) {
  const { quadrant: activeQuadrant } = useParams()

  return (
    <mesh material={ringMaterial}>
      <sphereGeometry args={[ringSize + 4]} />
      <Text position-x={ringSize} position-y={0}>
        {ring.name}
      </Text>

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
