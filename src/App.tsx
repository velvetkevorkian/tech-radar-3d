import { Canvas } from '@react-three/fiber'
import { items } from './utils/parse-csv'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { buildRings } from './utils/buildRings'
import { Ring } from './components/Ring'
import { useControls } from 'leva'

const rings = buildRings(items)

function App() {
  const debug = useControls('debug', { enabled: true })
  const performance = useControls('performance', { enabled: true })

  return (
    <Canvas>
      {performance.enabled && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      {debug.enabled && <axesHelper args={[5]} />}

      {rings.map((r, index) => (
        <Ring ring={r} ringSize={index} key={r.name} />
      ))}
    </Canvas>
  )
}

export default App
