import { Vector3 } from 'three'

export const rings = ['retire', 'assess', 'trial', 'support'] as const
export type RingName = (typeof rings)[number]

export const quadrants = [
  'tools',
  'techniques',
  'platforms',
  'languages-and-frameworks',
] as const
export type QuadrantName = (typeof quadrants)[number]

export type Item = {
  name: string
  ring: RingName
  quadrant: QuadrantName
  status: string
  description: string
  id: number
}

export type RingQuadrant = {
  name: QuadrantName
  items: RadarItemProps[]
}

export type Ring = {
  name: RingName
  quadrants: RingQuadrant[]
}

export type RadarItemProps = {
  item: Item
  position: Vector3
  isActive: boolean
}

export type RingProps = {
  ring: Ring
  ringSize: number
}
export type QuadrantProps = {
  quadrant: RingQuadrant
  activeQuadrant: string | undefined
}
