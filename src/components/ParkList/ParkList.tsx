import type { ParkSelectionProps } from '../../types'
import './ParkList.css'

export function ParkList({ parks, selectedParkId, onSelectPark }: ParkSelectionProps) {
  const sortedParks = [...parks].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <section className="panel" aria-labelledby="park-list-heading">
      <h2 id="park-list-heading">Parks ({parks.length})</h2>
      {parks.length === 0 ? (
        <p>No parks available.</p>
      ) : (
        <ul className="park-list" role="list">
          {sortedParks.map((park) => {
            const address = park.location?.address?.trim()
            return (
              <li key={park.id}>
                <button
                  id={`park-list-button-${park.id}`}
                  type="button"
                  className="park-list-button"
                  aria-current={park.id === selectedParkId ? 'true' : undefined}
                  onClick={() => onSelectPark(park.id)}
                >
                  <span className="park-list-name">{park.name}</span>
                  <span className={address ? 'park-list-address' : 'park-list-address park-list-address--missing'}>
                    {address || 'Address not provided'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

