import type { SummaryProps } from '../types'

export function Summary({ item, isHovered, isActive }: SummaryProps) {
  const { name, description, ring, quadrant, status } = item
  return (
    <div className={isActive ? 'item-content' : 'item-preview'}>
      {(isHovered || isActive) && <h2>{name}</h2>}
      {isActive && (
        <>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <dl>
            <dt>Status</dt>
            <dd>{status}</dd>
            <dt>Ring</dt>
            <dd>{ring}</dd>
            <dt>Quadrant</dt>
            <dd>{quadrant.replaceAll('-', ' ')}</dd>
          </dl>
        </>
      )}
    </div>
  )
}
