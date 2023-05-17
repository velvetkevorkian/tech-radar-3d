import { Canvas } from '@react-three/fiber'
import { items } from './parse-csv'
import { OrbitControls, Text } from '@react-three/drei'
import { Vector3, BoxGeometry } from 'three'
import { Perf } from 'r3f-perf'
import remap from './remap'
import { materialForQuadrant, ringMaterial } from './materials'

const rings = ['support', 'trial', 'assess', 'retire'].reverse()

const quadrants = [
  'tools',
  'techniques',
  'platforms',
  'languages-and-frameworks',
]

const boxGeom = new BoxGeometry(0.75, 0.75, 0.75)

type Item = (typeof items)[0]

type ItemProps = {
  item: Item
  position: Vector3
}

type Quadrant = {
  name: string
  items: ItemProps[]
}

type Ring = {
  name: string
  quadrants: Quadrant[]
}

function randomPositionForQuadrant(quadrant: string, radius: number) {
  let phi = 0 // latitude (north/south)
  let theta = 0 // longitude (east/west)

  switch (quadrant) {
    case 'languages-and-frameworks': {
      // bottom right
      phi = remap(Math.random(), 0, 1, Math.PI / 2, Math.PI)
      theta = remap(Math.random(), 0, 1, 0, Math.PI)
      break
    }
    case 'tools': {
      // top right
      phi = remap(Math.random(), 0, 1, 0, Math.PI / 2)
      theta = remap(Math.random(), 0, 1, 0, Math.PI)
      break
    }
    case 'techniques': {
      // top left
      phi = remap(Math.random(), 0, 1, 0, Math.PI / 2)
      theta = remap(Math.random(), 0, 1, -Math.PI, 0)
      break
    }
    case 'platforms': {
      // bottom left
      phi = remap(Math.random(), 0, 1, Math.PI / 2, Math.PI)
      theta = remap(Math.random(), 0, 1, -Math.PI, 0)
      break
    }
  }

  return new Vector3().setFromSphericalCoords(radius, phi, theta)
}

function buildRings() {
  return rings.map((r, i) => {
    return {
      name: r,
      quadrants: quadrants.map((q) => {
        return {
          name: q,
          items: items
            .filter(
              (item) =>
                item.ring.toLowerCase() === r &&
                item.quadrant.toLowerCase() === q
            )
            .map((item) => {
              // TODO: distribute evenly across the sphere's surface
              const position = randomPositionForQuadrant(q, i + 4)
              return {
                ...item,
                position,
              }
            }),
        }
      }),
    }
  })
}

const ringsWithItems = buildRings()

function Ring({ ring, ringSize }) {
  return (
    <mesh material={ringMaterial}>
      <sphereGeometry args={[ringSize + 4]} />
      <Text position-x={ringSize} position-y={0}>
        {ring.name}
      </Text>

      {ring.quadrants.map((quad) => {
        return quad.items.map((item) => (
          <Item key={item.id} item={item} position={item.position} />
        ))
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
    <mesh
      position={position}
      onClick={handleClick}
      material={materialForQuadrant(quadrant)}
      geometry={boxGeom}
    />
  )
}

function App() {
  return (
    <Canvas>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <axesHelper args={[5]} />
      {ringsWithItems.map((r, index) => (
        <Ring ring={r} ringSize={index} key={r.name} />
      ))}
    </Canvas>
  )
}

export default App
