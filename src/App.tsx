import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { items } from './parse-csv'
import { OrbitControls } from '@react-three/drei'

const count = items.length

function Item({
  name,
  ring,
  quadrant,
  status,
  description,
  id,
}: (typeof items)[0]) {
  const handleClick = () => {
    console.log({ name, ring, quadrant })
  }

  return (
    <mesh position={[id - count / 2, 0, 0]} onClick={handleClick}>
      <boxGeometry args={[0.75, 0.75, 0.75]} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      <OrbitControls makeDefault />
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </Canvas>
  )
}

export default App
