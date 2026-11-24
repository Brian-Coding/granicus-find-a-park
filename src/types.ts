export interface Park {
  id: string
  name: string
  description?: string | null
  location?: {
    lat?: number | null
    lng?: number | null
    address?: string | null
  } | null
  amenities?: string[] | null
  hours?: string | null
  images?: string[] | null
  acreage?: number | null
  rating?: number | null
}

export interface ParkSelectionProps {
  parks: readonly Park[]
  selectedParkId: string | null
  onSelectPark: (id: string) => void
}
