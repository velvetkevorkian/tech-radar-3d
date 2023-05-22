import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { SelectedProvider } from '../SelectedContext'
import { Nav } from './Nav'
import { Radar } from './Radar'

export function ThreeApp() {
  return (
    <>
      <Nav />

      <Canvas camera={{ position: [0, 0, 25] }}>
        <OrbitControls makeDefault />

        <axesHelper args={[5]} />

        <SelectedProvider>
          <Radar />
        </SelectedProvider>
      </Canvas>
    </>
  )
}
