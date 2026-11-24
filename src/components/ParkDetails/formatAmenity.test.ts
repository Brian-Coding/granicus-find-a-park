import { expect, it } from 'vitest'
import { formatAmenity } from './formatAmenity'

it.each([
  ['dog-run', 'Dog run'],
  ['trails', 'Trails'],
  ['bike-path', 'Bike path'],
  ['kayak-launch', 'Kayak launch'],
  ['picnic-areas', 'Picnic areas'],
  ['picnic_areas', 'Picnic areas'],
  ['accessible-paths', 'Accessible paths'],
  ['Accessible_Paths', 'Accessible paths'],
  ['wifi', 'WiFi'],
  ['WiFi', 'WiFi'],
])('formats %s as %s', (slug, expected) => {
  expect(formatAmenity(slug)).toBe(expected)
})
