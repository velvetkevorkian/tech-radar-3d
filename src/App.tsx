import { Canvas } from '@react-three/fiber'
import { items } from './parse-csv'
import { OrbitControls, Text } from '@react-three/drei'
import { Vector3, MeshBasicMaterial, BoxGeometry } from 'three'
import { Perf } from 'r3f-perf'

const rings = ['support', 'trial', 'assess', 'retire']
// const rings = ['support']

const techniquesColor = '#03c7b8'
const platformsColor = '#ce7e19'
const toolsColor = '#d3ab05'
const languagesFrameworksColor = '#4e26d0'

const techniquesMaterial = new MeshBasicMaterial({ color: techniquesColor })
const platformsMaterial = new MeshBasicMaterial({ color: platformsColor })
const toolsMaterial = new MeshBasicMaterial({ color: toolsColor })
const languagesFrameworksMaterial = new MeshBasicMaterial({
  color: languagesFrameworksColor,
})

const ringMaterial = new MeshBasicMaterial({
  color: '#ff0000',
  transparent: true,
  opacity: 0.2,
})

const materialForQuadrant = (quadrant: string) => {
  switch (quadrant.toLowerCase()) {
    case 'techniques':
      return techniquesMaterial
    case 'platforms':
      return platformsMaterial
    case 'tools':
      return toolsMaterial
    case 'languages-and-frameworks':
      return languagesFrameworksMaterial
  }
}

const boxGeom = new BoxGeometry(0.75, 0.75, 0.75)

type RingProps = {
  ringName: string
  ringSize: number
}

type Item = (typeof items)[0]

type ItemProps = {
  item: Item
  position: Vector3
}

function Ring({ ringName, ringSize }: RingProps) {
  const ringItems = items.filter((item) => item.ring.toLowerCase() === ringName)
  const step = Math.PI / ringItems.length

  return (
    <mesh material={ringMaterial}>
      <sphereGeometry args={[ringSize]} />
      <Text position-x={ringSize} position-y={0}>
        {ringName}
      </Text>

      {ringItems.map((item, index) => {
        const phi = step * index
        const theta = step * index * 4
        const radius = ringSize
        const position = new Vector3().setFromSphericalCoords(
          radius,
          phi,
          theta
        )

        return <Item key={item.id} item={item} position={position} />
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
      {rings.map((ringName, index) => (
        <Ring ringName={ringName} ringSize={index * 2 + 4} key={ringName} />
      ))}
    </Canvas>
  )
}

export default App
