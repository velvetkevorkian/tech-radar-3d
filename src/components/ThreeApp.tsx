import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import { SelectedProvider } from '../SelectedContext'
import { Nav } from './Nav'
import { Radar } from './Radar'

export function ThreeApp() {
  const debug = useControls('debug', { enabled: true })
  const performance = useControls('performance', { enabled: true })

  return (
    <>
      <Nav />

      <Canvas>
        {performance.enabled && <Perf position="bottom-right" />}

        <OrbitControls makeDefault />

        {debug.enabled && <axesHelper args={[5]} />}

        {/* <ambientLight /> */}

        <SelectedProvider>
          <Radar />
        </SelectedProvider>
      </Canvas>
    </>
  )
}
