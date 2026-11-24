import { useEffect, useMemo, useRef } from 'react'
import { icon, type Popup as LeafletPopup } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import type { ParkSelectionProps } from '../../types'
import { parksWithCoordinates } from './parksWithCoordinates'
import './ParkMap.css'

const parkIcon = icon({
  iconUrl, iconRetinaUrl, shadowUrl,
  iconSize: [25, 41], iconAnchor: [12, 41],
  shadowSize: [41, 41], popupAnchor: [1, -34],
})
const selectedIcon = icon({
  ...parkIcon.options,
  className: 'selected-park-marker',
  iconSize: [32, 52], iconAnchor: [16, 52], popupAnchor: [1, -45],
})

function MapView({ position }: { position?: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    // MapContainer forwards map options, but only a few DOM attributes.
    const container = map.getContainer()
    container.setAttribute('role', 'group')
    container.setAttribute('aria-label', 'Map of parks')
  }, [map])

  useEffect(() => {
    if (position) map.panTo(position, { animate: false })
  }, [map, position])
  return null
}

export function ParkMap({ parks, selectedParkId, onSelectPark }: ParkSelectionProps) {
  const markers = useMemo(() => parksWithCoordinates(parks), [parks])
  const selected = markers.find((marker) => marker.id === selectedParkId)
  const missingCount = parks.length - markers.length
  const openPopup = useRef<{ id: string; popup: LeafletPopup } | null>(null)

  useEffect(() => {
    const current = openPopup.current
    if (current && current.id !== selectedParkId) {
      current.popup.close()
      openPopup.current = null
    }
  }, [selectedParkId])

  return (
    <section className="panel map-panel" aria-labelledby="park-map-heading">
      <h2 id="park-map-heading">Park map</h2>
      {missingCount > 0 && (
        <p>{missingCount} {missingCount === 1 ? 'park has' : 'parks have'} no map location. See the park list.</p>
      )}
      <MapContainer
        className="park-map"
        {...(markers.length
          ? { bounds: markers.map((marker) => marker.position) }
          : { center: [40.71, -74.01] as [number, number], zoom: 10 })}
        boundsOptions={{ padding: [32, 48], maxZoom: 15 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        <MapView position={selected?.position} />
        {markers.map(({ id, name, position }) => (
          <Marker
            key={id}
            position={position}
            title={name}
            alt={name}
            icon={id === selectedParkId ? selectedIcon : parkIcon}
            zIndexOffset={id === selectedParkId ? 1000 : 0}
            eventHandlers={{
              click: () => onSelectPark(id),
              popupopen: ({ popup }) => { openPopup.current = { id, popup } },
            }}
          >
            <Popup>
              <strong>{name}</strong>
              <button type="button" onClick={() => onSelectPark(id)}>View details</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  )
}
