export function formatAmenity(slug: string): string {
  if (slug.toLowerCase() === 'wifi') return 'WiFi'
  const label = slug.replace(/[-_]+/g, ' ')
  return label.charAt(0).toUpperCase() + label.slice(1)
}
