import type { Park } from '../../types'

interface ParkDetailsProps {
  park: Park | undefined
  onClose: () => void
}

export function ParkDetails({ park }: ParkDetailsProps) {
  return (
    <section className="panel" aria-labelledby="park-details-heading">
      <h2 id="park-details-heading">Park details</h2>
      <p>{park ? `Details placeholder for ${park.name}.` : 'Details placeholder. No park selected.'}</p>
    </section>
  )
}
