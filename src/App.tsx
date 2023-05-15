import { Canvas } from '@react-three/fiber'
import { items } from './parse-csv'
import { OrbitControls, Text } from '@react-three/drei'

const rings = ['support', 'trial', 'assess', 'retire']

type RingProps = {
  ringName: string
  ringSize: number
}

type Item = (typeof items)[0]

type ItemProps = {
  item: Item
  position: { x: number; y: number; z: number }
}

function Ring({ ringName, ringSize }: RingProps) {
  const color = 0xff0000

  const ringItems = items.filter((item) => item.ring.toLowerCase() === ringName)
  const step = (Math.PI * 2) / ringItems.length

  return (
    <mesh>
      <meshBasicMaterial transparent color={color} opacity={0.2} />
      <sphereGeometry args={[ringSize]} />
      <Text position-x={ringSize + 1.5} position-y={ringSize}>
        {ringName}
      </Text>

      {ringItems.map((item, index) => {
        const x = Math.cos(step * index) * ringSize
        const y = Math.sin(step * index) * ringSize
        const z = 0
        return <Item key={item.id} item={item} position={{ x, y, z }} />
      })}
    </mesh>
  )
}

function Item({ item, position }: ItemProps) {
  const { name, ring, quadrant } = item
  const handleClick = () => {
    console.log({ name, ring, quadrant })
  }

  return (
    <mesh position={[position.x, position.y, position.z]} onClick={handleClick}>
      <boxGeometry args={[0.75, 0.75, 0.75]} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      <OrbitControls makeDefault />
      {rings.map((ringName, index) => (
        <Ring ringName={ringName} ringSize={index * 2 + 4} key={ringName} />
      ))}
    </Canvas>
  )
}

export default App
