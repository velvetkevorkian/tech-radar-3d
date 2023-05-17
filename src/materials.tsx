import { MeshBasicMaterial } from 'three'

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
  color: '#ff0000',
  transparent: true,
  opacity: 0.1,
})

export const materialForQuadrant = (quadrant: string) => {
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
