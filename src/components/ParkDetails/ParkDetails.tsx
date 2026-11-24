import { useEffect, useId, useRef, useState } from 'react'
import type { Park } from '../../types'
import { formatAmenity } from './formatAmenity'
import './ParkDetails.css'

interface ParkDetailsProps {
  park: Park | undefined
  onClose: () => void
}

function ParkPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) return <div className="park-photo-placeholder">Image unavailable</div>

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
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
        {park.description && (
          <div>
            <dt>Description</dt>
            <dd>{park.description}</dd>
          </div>
        )}
        <div>
          <dt>Address</dt>
          <dd>{park.location?.address ?? 'Not provided'}</dd>
        </div>
        <div>
          <dt>Hours</dt>
          <dd>{park.hours ?? 'Not provided'}</dd>
        </div>
        {park.acreage != null && (
          <div>
            <dt>Acreage</dt>
            <dd>{park.acreage} {park.acreage === 1 ? 'acre' : 'acres'}</dd>
          </div>
        )}
        {park.rating != null && (
          <div>
            <dt>Rating</dt>
            <dd>{park.rating} out of 5</dd>
          </div>
        )}
        {park.amenities && park.amenities.length > 0 && (
          <div>
            <dt>Amenities</dt>
            <dd>
              <ul>
                {park.amenities.map((slug, index) => <li key={`${slug}-${index}`}>{formatAmenity(slug)}</li>)}
              </ul>
            </dd>
          </div>
        )}
      </dl>
      {park.images && park.images.length > 0 && (
        <div className="park-details-photos">
          {park.images.map((src, index) => (
            <ParkPhoto key={`${src}-${index}`} src={src} alt={`Photo ${index + 1} of ${park.name}`} />
          ))}
        </div>
      )}
    </section>
  )
}
