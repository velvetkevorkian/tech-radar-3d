import { Vector3 } from 'three'
import remap from './remap'
import type { QuadrantName, Item, Ring } from '../types'
import { rings, quadrants } from '../types'

function randomPositionForQuadrant(quadrant: QuadrantName, radius: number) {
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

export function radiusForIndex(index: number) {
  return index * 2 + 2
}

export function buildRings(items: Item[]) {
  return rings.map((r, i) => {
    return {
      name: r,
      quadrants: quadrants.map((q) => {
        return {
          name: q,
          ring: r,
          items: items
            .filter(
              (item) =>
                item.ring.toLowerCase() === r &&
                item.quadrant.toLowerCase() === q
            )
            .map((item) => {
              // TODO: distribute evenly across the sphere's surface
              const position = randomPositionForQuadrant(q, radiusForIndex(i))
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
