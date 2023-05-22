import { Link, useParams } from 'react-router-dom'
import { quadrants, rings } from '../types'
import type { LinkItemProps } from '../types'

function LinkItem({ param, type, active }: LinkItemProps) {
  return (
    <Link
      to={`/${type}/${param}`}
      key={param}
      className={active ? 'active' : undefined}
    >
      {param.replaceAll('-', ' ')}
    </Link>
  )
}

export function Nav() {
  const { quadrant, ring } = useParams()

  return (
    <nav>
      Quadrants:
      {quadrants.map((q) => (
        <LinkItem param={q} type="quadrant" key={q} active={quadrant === q} />
      ))}
      <br />
      Rings:
      {rings.map((r) => (
        <LinkItem param={r} type="ring" key={r} active={ring === r} />
      ))}
      <br />
      <Link to="/" className={quadrant || ring ? undefined : 'active'}>
        Show All
      </Link>
    </nav>
  )
}
