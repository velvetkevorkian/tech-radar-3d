import { Link, useParams } from 'react-router-dom'
import { quadrants, rings } from '../types'
import type { LinkItemProps } from '../types'

function LinkItem({ param, type }: LinkItemProps) {
  return (
    <Link to={`/${type}/${param}`} key={param}>
      {param.replaceAll('-', ' ')}
    </Link>
  )
}

export function Nav() {
  // TODO: active state
  const { quadrant, ring } = useParams()

  return (
    <nav>
      Quadrants:
      {quadrants.map((q) => (
        <LinkItem param={q} type="quadrant" key={q} />
      ))}
      <br />
      Rings:
      {rings.map((r) => (
        <LinkItem param={r} type="ring" key={r} />
      ))}
      <br />
      All: <Link to="/">Show</Link>
    </nav>
  )
}
