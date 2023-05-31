import { Vector3 } from 'three'
import remap from './remap'
import type { QuadrantName, Item, Ring } from '../types'
import { rings, quadrants } from '../types'

const { PI } = Math
const HALF_PI = PI / 2

function positionsForQuadrant(count: number, quadrant: QuadrantName) {
  const rows: number[][] = []

  let row = 0
  let total = 0

  while (total < count) {
    // TODO: don't fill last row unless needed?
    rows[row] = new Array(row + 1).fill(row)
    row++
    total += row
  }

  const rowAngleStep = Math.PI / 2 / (rows.length + 2)

  const positions = rows
    .map((r, i) => {
      const phi = rowAngleStep * (i + 1)
      const columnAngleStep = Math.PI / (r.length + 1)
      const vectors = r.map((_, j) => {
        const theta = columnAngleStep * (j + 1)
        return remapAnglesForQuadrant({ quadrant, phi, theta })
      })
      return vectors
    })
    .flat()

  return positions
}

function remapAnglesForQuadrant({
  quadrant,
  phi, // latitude (north/south)
  theta, // longitude (east/west)
}: {
  quadrant: QuadrantName
  phi: number
  theta: number
}) {
  switch (quadrant) {
    case 'languages-and-frameworks': {
      // bottom right
      phi = remap(phi, 0, HALF_PI, PI, HALF_PI)
      theta = remap(theta, 0, PI, 0, PI)
      break
    }
    case 'tools': {
      // top right
      phi = remap(phi, 0, HALF_PI, 0, HALF_PI)
      theta = remap(theta, 0, PI, 0, PI)
      break
    }
    case 'techniques': {
      // top left
      phi = remap(phi, 0, HALF_PI, 0, HALF_PI)
      theta = remap(theta, 0, PI, -PI, 0)
      break
    }
    case 'platforms': {
      // bottom left
      phi = remap(phi, 0, HALF_PI, PI, HALF_PI)
      theta = remap(theta, 0, PI, -PI, 0)
      break
    }
  }
  return { phi, theta }
}

export function radiusForIndex(index: number) {
  return index * 2 + 2
}

export function buildRings(items: Item[]) {
  return rings.map((r, i) => {
    return {
      name: r,
      quadrants: quadrants.map((q) => {
        const itemsForQuadrant = items.filter(
          (item) =>
            item.ring.toLowerCase() === r && item.quadrant.toLowerCase() === q
        )
        const anglesForQuadrant = positionsForQuadrant(
          itemsForQuadrant.length,
          q
        )

        return {
          name: q,
          ring: r,
          items: itemsForQuadrant.map((item, j) => {
            const { phi, theta } = anglesForQuadrant[j]
            const position = new Vector3().setFromSphericalCoords(
              radiusForIndex(i),
              phi,
              theta
            )
            return {
              item,
              position,
            }
          }),
        }
      }),
    } as Ring
  })
}
