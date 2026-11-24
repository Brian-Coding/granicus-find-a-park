import { expect, it } from 'vitest'
import { normalizePark } from '../../data/normalizePark'
import sample from '../../data/parks.sample.json'
import type { Park } from '../../types'
import { parksWithCoordinates } from './parksWithCoordinates'

const prospect = normalizePark(sample[0])

it('keeps valid parks in latitude, longitude order', () => {
  expect(parksWithCoordinates([prospect])).toEqual([
    { id: prospect.id, name: prospect.name, position: [40.6602, -73.969] },
  ])
})

it.each([
  { lat: 0, lng: 0 }, { lat: -90, lng: 180 }, { lat: 90, lng: -180 },
])('accepts zero and boundary coordinates ($lat, $lng)', (location) => {
  expect(parksWithCoordinates([{ ...prospect, location }])).toHaveLength(1)
})

it.each<Park['location']>([
  undefined, null, { lat: 40 }, { lng: -74 }, { lat: null, lng: -74 },
  { lat: 91, lng: 0 }, { lat: 0, lng: -181 }, { lat: NaN, lng: 0 },
  { lat: 0, lng: Infinity },
])('skips an incomplete or invalid location: %j', (location) => {
  expect(parksWithCoordinates([{ ...prospect, location }])).toEqual([])
})

it('skips an address-only normalized park and keeps the other markers', () => {
  const addressOnly = normalizePark({ ...prospect, location: { address: 'Brooklyn', lat: 40 } })
  expect(addressOnly.location).toEqual({ address: 'Brooklyn' })
  expect(parksWithCoordinates([addressOnly, prospect])).toEqual(parksWithCoordinates([prospect]))
})
