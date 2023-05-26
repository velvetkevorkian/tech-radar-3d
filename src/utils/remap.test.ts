import { describe, expect, it } from 'vitest'
import remap from './remap'

describe('remap', () => {
  it('remaps different ranges', () => {
    const results = [remap(0.5, 0, 1, -50, 50), remap(50, 0, 100, 0, 1)]

    expect(results).toStrictEqual([0, 0.5])
  })
})
