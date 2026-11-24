import type { Park } from '../types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() || undefined : undefined
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map(cleanString).filter((item) => item !== undefined)
}

function finiteNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function coordinate(value: unknown, limit: number) {
  const number = finiteNumber(value)
  return number !== undefined && Math.abs(number) <= limit ? number : undefined
}

function normalizeLocation(value: unknown): Park['location'] {
  if (!isRecord(value)) return undefined
  const lat = coordinate(value.lat, 90)
  const lng = coordinate(value.lng, 180)
  const address = cleanString(value.address)

  // A marker needs the full pair. An address is useful even without it.
  if (lat === undefined || lng === undefined) return address ? { address } : undefined
  return { lat, lng, address }
}

export function normalizePark(raw: unknown): Park {
  if (!isRecord(raw)) throw new Error('Expected a park record')
  const id = cleanString(raw.id)
  const name = cleanString(raw.name)
  if (!id || !name) throw new Error('A park requires an id and name')

  return {
    id,
    name,
    description: cleanString(raw.description),
    location: normalizeLocation(raw.location),
    amenities: stringList(raw.amenities),
    hours: cleanString(raw.hours),
    images: stringList(raw.images),
    acreage: finiteNumber(raw.acreage),
    rating: finiteNumber(raw.rating),
  }
}
