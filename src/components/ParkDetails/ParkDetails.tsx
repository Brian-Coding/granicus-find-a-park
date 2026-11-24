import { useEffect, useId, useRef, useState } from 'react'
import placeholder from '../../assets/park-placeholder.webp'
import type { Park } from '../../types'
import { formatAmenity } from './formatAmenity'
import './ParkDetails.css'

interface ParkDetailsProps {
  park: Park | undefined
  onClose: () => void
}

function ParkPhoto({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <figure>
      <img
        src={failed ? placeholder : src ?? placeholder}
        alt={failed ? 'Placeholder illustration (photo unavailable)' : alt}
        loading="lazy"
        onError={src && !failed ? () => setFailed(true) : undefined}
      />
      {failed && <figcaption>Photo unavailable</figcaption>}
      {!src && <figcaption>No photos provided</figcaption>}
    </figure>
  )
}

export function ParkDetails({ park, onClose }: ParkDetailsProps) {
  const headingId = useId()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const parkId = park?.id

  useEffect(() => {
    if (parkId !== undefined) headingRef.current?.focus()
  }, [parkId])

  if (!park) {
    return (
      <section className="panel" aria-labelledby={headingId}>
        <h2 id={headingId}>Park details</h2>
        <p>No park selected. Select a park from the list or map to see details.</p>
      </section>
    )
  }

  return (
    <section key={park.id} className="panel park-details" aria-labelledby={headingId}>
      <header className="park-details-header">
        <h2 id={headingId} ref={headingRef} tabIndex={-1}>{park.name}</h2>
        <button type="button" onClick={onClose}>Back to list</button>
      </header>
      <dl>
        <div className="park-details-hours">
          <dt>Hours</dt>
          <dd>{park.hours ?? 'Not provided'}</dd>
        </div>
        <div>
          <dt>Address</dt>
          <dd>{park.location?.address ?? 'Not provided'}</dd>
        </div>
        <div>
          <dt>Description</dt>
          <dd>{park.description ?? 'Not provided'}</dd>
        </div>
        <div>
          <dt>Amenities</dt>
          <dd>
            {park.amenities?.length ? (
              <ul>
                {park.amenities.map((slug, index) => <li key={`${slug}-${index}`}>{formatAmenity(slug)}</li>)}
              </ul>
            ) : 'Not provided'}
          </dd>
        </div>
        <div>
          <dt>Acreage</dt>
          <dd>{park.acreage != null ? `${park.acreage} ${park.acreage === 1 ? 'acre' : 'acres'}` : 'Not provided'}</dd>
        </div>
        <div>
          <dt>Rating</dt>
          <dd>{park.rating != null ? `${park.rating} out of 5` : 'Not provided'}</dd>
        </div>
        <div>
          <dt>Photos</dt>
          <dd className="park-details-photos">
            {park.images?.length ? park.images.map((src, index) => (
              <ParkPhoto key={`${src}-${index}`} src={src} alt={`Photo ${index + 1} of ${park.name}`} />
            )) : <ParkPhoto alt="Placeholder illustration (no photos provided)" />}
          </dd>
        </div>
      </dl>
    </section>
  )
}
