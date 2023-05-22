import { Canvas } from '@react-three/fiber'
import { items } from '../utils/parse-csv'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { buildRings } from '../utils/buildRings'
import { Ring } from '../components/Ring'
import { useControls } from 'leva'
import { SelectedProvider } from '../SelectedContext'

const rings = buildRings(items)

export function ThreeApp() {
  const debug = useControls('debug', { enabled: true })
  const performance = useControls('performance', { enabled: true })

  return (
    <Canvas>
      {performance.enabled && <Perf position="bottom-right" />}

      <OrbitControls makeDefault />

      {debug.enabled && <axesHelper args={[5]} />}

      <SelectedProvider>
        {rings.map((r, index) => (
          <Ring ring={r} ringSize={index} key={r.name} />
        ))}
      </SelectedProvider>
    </Canvas>
  )
}
