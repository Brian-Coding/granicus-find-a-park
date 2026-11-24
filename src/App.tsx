import { useState } from 'react'
import { ParkDetails, focusAndScrollTo } from './components/ParkDetails/ParkDetails'
import { ParkList } from './components/ParkList/ParkList'
import { ParkMap } from './components/ParkMap/ParkMap'
import { normalizePark } from './data/normalizePark'
import sample from './data/parks.sample.json'

const parks = sample.map(normalizePark)

export default function App() {
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null)
  const selectedPark = parks.find((park) => park.id === selectedParkId)
  const selectionProps = { parks, selectedParkId, onSelectPark: selectPark }

  function selectPark(id: string) {
    if (id === selectedParkId) {
      focusAndScrollTo('park-details-heading')
    } else {
      setSelectedParkId(id)
    }
  }

  function backToList() {
    focusAndScrollTo(`park-list-button-${selectedParkId}`)
  }

  return (
    <main>
      <h1>Find a Park</h1>
      <div className="park-layout">
        <ParkList {...selectionProps} />
        <div className="park-map-and-details">
          <ParkDetails park={selectedPark} onClose={backToList} />
          <ParkMap {...selectionProps} />
        </div>
      </div>
    </main>
  )
}
