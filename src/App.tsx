import { useState } from 'react'
import { ParkDetails } from './components/ParkDetails/ParkDetails'
import { ParkList } from './components/ParkList/ParkList'
import { ParkMap } from './components/ParkMap/ParkMap'
import { normalizePark } from './data/normalizePark'
import sample from './data/parks.sample.json'

const parks = sample.map(normalizePark)

export default function App() {
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null)
  const selectedPark = parks.find((park) => park.id === selectedParkId)
  const selectionProps = { parks, selectedParkId, onSelectPark: setSelectedParkId }

  return (
    <main>
      <h1>Find a Park</h1>
      <div className="park-layout">
        <div className="park-sidebar">
          <ParkList {...selectionProps} />
          <ParkDetails park={selectedPark} onClose={() => setSelectedParkId(null)} />
        </div>
        <ParkMap {...selectionProps} />
      </div>
    </main>
  )
}
