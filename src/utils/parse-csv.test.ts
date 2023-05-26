import { describe, expect, it } from 'vitest'
import { parseCsv } from './parse-csv'

const data = `name,ring,quadrant,status,description
TDD,Assess,Techniques,new,"Software development methodology focusing on testing prior to feature development (Related to a concept known as Test First). Follows a 'Red'-'Green'-'Refactor' cadence whereby a minimum requirement is tested before functionality is written, minimum possible functionality is written to pass the test, and the resulting code is refactored using the passed test as a benchmark for success. <a href='https://www.agilealliance.org/glossary/tdd/' target='_blank'>More info</a>."
Four Key Metrics,Assess,Techniques,new,TBC`

describe('parseCsv', () => {
  describe('parses CSVs', () => {
    const result = parseCsv(data)

    it('discards the first row and builds two items', () => {
      expect(result.length).toBe(2)
    })

    describe('for items with descriptions wrapped in quote marks', () => {
      it('parses the descripion', () => {
        expect(result[0].description).toMatch(
          'Software development methodology focusing on testing prior to feature development'
        )
      })

      it('strips the quotation marks', () => {
        expect(result[0].description.charAt(0)).toBe('S')
      })

      it('parses the properties', () => {
        expect(result[0]).toMatchObject({
          name: 'TDD',
          ring: 'Assess',
          quadrant: 'Techniques',
          status: 'new',
        })
      })
    })

    describe('for items with descriptions without quote marks', () => {
      it('parses the description', () => {
        expect(result[1].description).toBe('TBC')
      })

      it('parses the properties', () => {
        expect(result[1]).toMatchObject({
          name: 'Four Key Metrics',
          ring: 'Assess',
          quadrant: 'Techniques',
          status: 'new',
        })
      })
    })
  })
})
