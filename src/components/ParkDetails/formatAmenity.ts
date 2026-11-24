export function formatAmenity(slug: string): string {
  const label = slug.toLowerCase().replace(/[-_]+/g, ' ')
  if (label === 'wifi') return 'WiFi'
  return label.charAt(0).toUpperCase() + label.slice(1)
}
