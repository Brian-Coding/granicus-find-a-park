import type { ParkSelectionProps } from '../../types'

export function ParkList({ parks }: ParkSelectionProps) {
  return (
    <section className="panel" aria-labelledby="park-list-heading">
      <h2 id="park-list-heading">Park list</h2>
      <p>List placeholder for {parks.length} parks.</p>
    </section>
  )
}
