import { items } from '../utils/parse-csv'
import { Ring } from './Ring'
import { buildRings } from '../utils/buildRings'
import { useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { SelectedContext } from '../SelectedContext'

const rings = buildRings(items)

export function Radar() {
  const location = useLocation()
  const { setSelected } = useContext(SelectedContext)

  useEffect(() => {
    setSelected('')
  }, [location, setSelected])

  return (
    <>
      {rings.map((r, index) => (
        <Ring ring={r} ringSize={index} key={r.name} />
      ))}
    </>
  )
}
