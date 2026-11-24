import { useEffect, useState } from 'react'
import placeholder from '../../assets/park-placeholder.webp'
import type { Park } from '../../types'
import { formatAmenity } from './formatAmenity'
import './ParkDetails.css'

const headingId = 'park-details-heading'

export function focusAndScrollTo(id: string) {
  const element = document.getElementById(id)
  element?.focus({ preventScroll: true })
  element?.scrollIntoView?.({ block: 'nearest', behavior: 'instant' })
}

interface ParkDetailsProps {
  park: Park | undefined
  onClose: () => void
}

function ParkPhotos({ park }: { park: Park }) {
  const [failedUrls, setFailedUrls] = useState(() => new Set<string>())
  const images = park.images ?? []

  if (images.every((src) => failedUrls.has(src))) {
    const reason = images.length ? 'Photo unavailable' : 'No photos provided'
    return (
      <figure>
        <img src={placeholder} alt={`Placeholder illustration — ${reason.toLowerCase()}`} />
        <figcaption><span className="park-photo-label">Placeholder</span> {reason}</figcaption>
      </figure>
    )
  }

  return images.map((src, index) => failedUrls.has(src) ? null : (
    <figure key={`${src}-${index}`}>
      <img
        src={src}
        alt={`Photo ${index + 1} of ${park.name}`}
        loading="lazy"
        onError={() => setFailedUrls((previous) => new Set(previous).add(src))}
      />
    </figure>
  ))
}

export function ParkDetails({ park, onClose }: ParkDetailsProps) {
  const parkId = park?.id

  useEffect(() => {
    if (parkId !== undefined) focusAndScrollTo(headingId)
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
        <h2 id={headingId} tabIndex={-1}>{park.name}</h2>
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
            <ParkPhotos park={park} />
          </dd>
        </div>
      </dl>
    </section>
  )
}
