import { describe, expect, it } from 'vitest'
import sample from './parks.sample.json'
import { normalizePark } from './normalizePark'

function samplePark(id: string) {
  return normalizePark(sample.find((park) => park.id === id))
}

describe('normalizePark with the supplied parks', () => {
  it('keeps Highland Dog Park mappable without an address', () => {
    const { location } = samplePark('highland-dog-park')
    expect(location?.address).toBeUndefined()
    expect(location).toMatchObject({ lat: 40.6789, lng: -73.9442 })
  })

  it('leaves the Old Mill description absent', () => {
    expect(samplePark('old-mill-botanical-garden').description).toBeUndefined()
  })

  it.each(['cedar-hill-nature-preserve', 'east-ridge-trailhead'])(
    'keeps the empty image list for %s', (id) => {
      expect(samplePark(id).images).toEqual([])
    },
  )

  it('leaves the Cedar Hill rating absent', () => {
    expect(samplePark('cedar-hill-nature-preserve').rating).toBeUndefined()
  })
})

describe('normalizePark at the data boundary', () => {
  const identity = { id: 'fixture', name: 'Test fixture' }

  it('trims text and discards blank and non-string array entries', () => {
    const park = normalizePark({
      id: ' fixture ', name: ' Test fixture ', hours: ' Dawn to dusk ',
      description: '  ', amenities: [null, ' trails ', '   ', 7],
      images: [false, ' photo.jpg '], acreage: 0,
    })
    expect(park).toMatchObject({
      ...identity, hours: 'Dawn to dusk', description: undefined,
      amenities: ['trails'], images: ['photo.jpg'], acreage: 0,
    })
  })

  it('accepts absent and null optional fields', () => {
    const park = normalizePark({ ...identity, amenities: null, location: null })
    expect(park.location).toBeUndefined()
    expect(park.amenities).toEqual([])
    expect(park.images).toEqual([])
  })

  it.each([
    [91, 0], [0, -181], [NaN, 0], [0, Infinity], ['0', 0], [0, undefined],
  ])('retains the park and address without a marker for (%s, %s)', (lat, lng) => {
    const park = normalizePark({ ...identity, location: { lat, lng, address: ' Queens ' } })
    expect(park).toMatchObject(identity)
    expect(park.location).toEqual({ address: 'Queens' })
  })

  it.each([[-90, -180], [90, 180], [0, 0]])('accepts (%s, %s)', (lat, lng) => {
    expect(normalizePark({ ...identity, location: { lat, lng } }).location)
      .toMatchObject({ lat, lng })
  })

  it('rejects a blank required name', () => {
    expect(() => normalizePark({ ...identity, name: ' ' })).toThrow('id and name')
  })
})
