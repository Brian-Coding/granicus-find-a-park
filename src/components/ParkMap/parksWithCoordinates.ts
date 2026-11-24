import type { Park } from '../../types'

export function parksWithCoordinates(parks: readonly Park[]) {
  const markers: { id: string; name: string; position: [number, number] }[] = []

  for (const { id, name, location } of parks) {
    const { lat, lng } = location ?? {}
    if (typeof lat === 'number' && Math.abs(lat) <= 90 &&
        typeof lng === 'number' && Math.abs(lng) <= 180) {
      markers.push({ id, name, position: [lat, lng] })
    }
  }

  return markers
}
