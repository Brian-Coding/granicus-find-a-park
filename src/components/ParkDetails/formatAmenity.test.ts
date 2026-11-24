import { expect, it } from 'vitest'
import { formatAmenity } from './formatAmenity'

it.each([
  ['dog-run', 'Dog run'],
  ['trails', 'Trails'],
  ['picnic_areas', 'Picnic areas'],
  ['wifi', 'WiFi'],
  ['WiFi', 'WiFi'],
])('formats %s as %s', (slug, expected) => {
  expect(formatAmenity(slug)).toBe(expected)
})
