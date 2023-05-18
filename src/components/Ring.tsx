import { Text } from '@react-three/drei'
import type { RingProps } from '../types'
import { ringMaterial } from '../utils/materials'
import { RadarItem } from './RadarItem'
import { useParams } from 'react-router-dom'

export function Ring({ ring, ringSize }: RingProps) {
  const { quadrant } = useParams()
  console.log({ quadrant })
  return (
    <mesh material={ringMaterial}>
      <sphereGeometry args={[ringSize + 4]} />
      <Text position-x={ringSize} position-y={0}>
        {ring.name}
      </Text>

      {ring.quadrants.map((quad) =>
        quad.items.map(({ item, position }) => (
          <RadarItem key={item.id} item={item} position={position} />
        ))
      )}
    </mesh>
  )
}
