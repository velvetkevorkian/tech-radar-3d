import { MeshBasicMaterial } from 'three'
import type { QuadrantName } from '../types'

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

export const ringMaterial = new MeshBasicMaterial({
  color: '#00ff00',
  transparent: true,
  opacity: 0.5,
})

export const materialForQuadrant = (quadrant: QuadrantName) => {
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
