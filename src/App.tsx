import { Canvas } from '@react-three/fiber'
import { items } from './utils/parse-csv'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { buildRings } from './utils/buildRings'
import { Ring } from './components/Ring'
import { useControls } from 'leva'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { quadrants } from './types'

const rings = buildRings(items)

function ThreeApp() {
  const debug = useControls('debug', { enabled: true })
  const performance = useControls('performance', { enabled: true })
  return (
    <Canvas>
      {performance.enabled && <Perf position="bottom-right" />}

      <OrbitControls makeDefault />

      {debug.enabled && <axesHelper args={[5]} />}

      {rings.map((r, index) => (
        <Ring ring={r} ringSize={index} key={r.name} />
      ))}
    </Canvas>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">All</Link>
        {quadrants.map((q) => (
          <Link to={q} key={q}>
            {q.replaceAll('-', ' ')}
          </Link>
        ))}
      </nav>
      <Routes>
        <Route path="/:quadrant?" element={<ThreeApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
