// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import placeholder from '../../assets/park-placeholder.webp'
import { normalizePark } from '../../data/normalizePark'
import sample from '../../data/parks.sample.json'
import { ParkDetails } from './ParkDetails'

afterEach(cleanup)

function samplePark(id: string) {
  return normalizePark(sample.find((park) => park.id === id))
}

const prospect = samplePark('prospect-park')
const highland = samplePark('highland-dog-park')

it.each(sample.map(normalizePark))('shows every field in order for $name', (park) => {
  render(<ParkDetails park={park} onClose={vi.fn()} />)
  const region = screen.getByRole('region', { name: park.name })
  const details = within(region)
  const heading = details.getByRole('heading', { name: park.name })
  const hours = details.getByText('Hours')
  const terms = details.getAllByRole('term')
  expect(heading.compareDocumentPosition(hours) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  expect(terms.map((term) => term.textContent)).toEqual([
    'Hours', 'Address', 'Description', 'Amenities', 'Acreage', 'Rating', 'Photos',
  ])
  expect(hours.nextElementSibling?.textContent).toBe(park.hours ?? 'Not provided')
  expect(region.textContent).not.toMatch(/null|undefined/i)
})

it('shows the supplied facts, amenities, and photos for Prospect Park', () => {
  render(<ParkDetails park={prospect} onClose={vi.fn()} />)
  const details = within(screen.getByRole('region', { name: 'Prospect Park' }))

  expect(details.getByRole('heading', { level: 2, name: 'Prospect Park' })).toBeTruthy()
  expect(details.getByText("A 526-acre park", { exact: false }).textContent).toBe(prospect.description)
  for (const value of ['Brooklyn, NY 11225', '6:00 AM - 1:00 AM', '526 acres', '4.7 out of 5']) {
    expect(details.getByText(value).tagName).toBe('DD')
  }
  const amenities = within(details.getByRole('list')).getAllByRole('listitem')
  expect(amenities.map((item) => item.textContent)).toEqual([
    'Playground', 'Dog run', 'Trails', 'Restrooms', 'Parking', 'Lake', 'Picnic areas',
  ])
  const photos = details.getAllByRole('img')
  expect(photos.map((photo) => photo.getAttribute('alt'))).toEqual([
    'Photo 1 of Prospect Park', 'Photo 2 of Prospect Park',
  ])
  expect(photos.map((photo) => photo.getAttribute('src'))).toEqual(prospect.images)
  expect(photos.every((photo) => photo.getAttribute('loading') === 'lazy')).toBe(true)
})

it('labels the missing description for Old Mill Botanical Garden', () => {
  render(<ParkDetails park={samplePark('old-mill-botanical-garden')} onClose={vi.fn()} />)
  const details = screen.getByRole('region', { name: 'Old Mill Botanical Garden' })
  expect(within(details).getByText('Description').nextElementSibling?.textContent).toBe('Not provided')
  expect(details.textContent).not.toMatch(/null|undefined/i)
})

it('labels the missing address for Highland Dog Park and preserves its hours', () => {
  render(<ParkDetails park={highland} onClose={vi.fn()} />)
  expect(screen.getByText('Address').nextElementSibling?.textContent).toBe('Not provided')
  expect(screen.getByText('Hours').nextElementSibling?.textContent).toBe('6:00 AM - 9:00 PM')
})

it('labels the missing rating and shows one captioned illustration for Cedar Hill Nature Preserve', () => {
  render(<ParkDetails park={samplePark('cedar-hill-nature-preserve')} onClose={vi.fn()} />)
  const details = within(screen.getByRole('region', { name: 'Cedar Hill Nature Preserve' }))
  expect(details.getByText('Rating').nextElementSibling?.textContent).toBe('Not provided')
  const figure = details.getByRole('figure')
  expect(details.getByText('Photos').nextElementSibling?.contains(figure)).toBe(true)
  const image = within(figure).getByRole('img', { name: 'Placeholder illustration — no photos provided' })
  expect(details.getAllByRole('img')).toEqual([image])
  expect(image.getAttribute('src')).toBe(placeholder)
  expect(within(figure).getByText('No photos provided').tagName).toBe('FIGCAPTION')
  expect(within(figure).getByText('Placeholder').closest('figcaption')).toBeTruthy()
})

it('distinguishes zero and singular acreage from missing facts', () => {
  const park = { ...prospect, rating: 0, acreage: 0, hours: undefined, amenities: [] }
  const onClose = vi.fn()
  const { rerender } = render(<ParkDetails park={park} onClose={onClose} />)
  expect(screen.getByText('0 out of 5')).toBeTruthy()
  expect(screen.getByText('0 acres')).toBeTruthy()
  expect(screen.getByText('Hours').nextElementSibling?.textContent).toBe('Not provided')
  expect(screen.getByText('Amenities').nextElementSibling?.textContent).toBe('Not provided')
  expect(screen.queryByRole('list')).toBeNull()

  rerender(<ParkDetails park={{ ...park, acreage: 1 }} onClose={onClose} />)
  expect(screen.getByText('1 acre')).toBeTruthy()
  rerender(<ParkDetails park={{ ...park, acreage: undefined }} onClose={onClose} />)
  expect(screen.getByText('Acreage').nextElementSibling?.textContent).toBe('Not provided')
})

it('removes a failed photo and keeps the other photo with its original number and URL', () => {
  render(<ParkDetails park={prospect} onClose={vi.fn()} />)
  const firstPhoto = screen.getByRole('img', { name: 'Photo 1 of Prospect Park' })
  const secondPhoto = screen.getByRole('img', { name: 'Photo 2 of Prospect Park' })
  fireEvent.error(firstPhoto)
  expect(firstPhoto.isConnected).toBe(false)
  expect(screen.getAllByRole('img')).toEqual([secondPhoto])
  expect(secondPhoto.getAttribute('alt')).toBe('Photo 2 of Prospect Park')
  expect(secondPhoto.getAttribute('src')).toBe(prospect.images?.[1])
  expect(screen.queryByText('Placeholder')).toBeNull()
})

it('shows one labeled illustration after both Prospect photos fail and never retries it', () => {
  render(<ParkDetails park={prospect} onClose={vi.fn()} />)
  const details = within(screen.getByRole('region', { name: 'Prospect Park' }))
  const photos = [1, 2].map((number) => details.getByRole('img', { name: `Photo ${number} of Prospect Park` }))
  expect(photos.map((photo) => photo.getAttribute('src'))).toEqual(prospect.images)
  photos.forEach((photo) => fireEvent.error(photo))

  const figure = within(details.getByRole('figure'))
  const image = figure.getByRole('img', { name: 'Placeholder illustration — photo unavailable' })
  expect(details.getAllByRole('img', { hidden: true })).toEqual([image])
  expect(image.getAttribute('src')).toBe(placeholder)
  const caption = figure.getByText('Photo unavailable', { selector: 'figcaption' })
  expect(within(caption).getByText('Placeholder')).toBeTruthy()

  const mutations = new MutationObserver(() => {})
  mutations.observe(image, { attributeFilter: ['src'] })
  fireEvent.error(image)
  expect(mutations.takeRecords()).toHaveLength(0)
  mutations.disconnect()
  expect(image.getAttribute('src')).toBe(placeholder)
  expect(details.getAllByRole('img', { hidden: true })).toEqual([image])
})

it('starts each park selection with fresh photos after every photo failed', () => {
  const onClose = vi.fn()
  const { rerender } = render(<ParkDetails park={prospect} onClose={onClose} />)
  screen.getAllByRole('img').forEach((photo) => fireEvent.error(photo))
  expect(screen.getByText('Photo unavailable')).toBeTruthy()

  rerender(<ParkDetails park={highland} onClose={onClose} />)
  expect(screen.queryByText('Photo unavailable')).toBeNull()
  expect(screen.queryByText('Placeholder')).toBeNull()
  const photo = screen.getByRole('img', { name: 'Photo 1 of Highland Dog Park' })
  expect(screen.getAllByRole('img')).toEqual([photo])
  expect(photo.getAttribute('src')).toBe(highland.images?.[0])

  rerender(<ParkDetails park={prospect} onClose={onClose} />)
  expect(screen.getAllByRole('img').map((img) => img.getAttribute('src'))).toEqual(prospect.images)
})

it('moves focus only when a park is selected or its id changes', () => {
  const onClose = vi.fn()
  const { rerender } = render(<ParkDetails park={undefined} onClose={onClose} />)
  expect(document.activeElement).toBe(document.body)
  expect(screen.getByRole('heading', { name: 'Park details' })).toBeTruthy()

  rerender(<ParkDetails park={prospect} onClose={onClose} />)
  expect(document.activeElement).toBe(screen.getByRole('heading', { name: prospect.name }))
  const back = screen.getByRole('button', { name: 'Back to list' })
  back.focus()
  rerender(<ParkDetails park={{ ...prospect }} onClose={onClose} />)
  expect(document.activeElement).toBe(back)

  rerender(<ParkDetails park={highland} onClose={onClose} />)
  expect(document.activeElement).toBe(screen.getByRole('heading', { name: highland.name }))
  rerender(<ParkDetails park={undefined} onClose={onClose} />)
  expect(document.activeElement).not.toBe(screen.getByRole('heading', { name: 'Park details' }))
})

it('calls onClose when Back to list is activated', () => {
  const onClose = vi.fn()
  render(<ParkDetails park={prospect} onClose={onClose} />)
  const back = screen.getByRole('button', { name: 'Back to list' })
  expect(back.getAttribute('type')).toBe('button')
  fireEvent.click(back)
  expect(onClose).toHaveBeenCalledTimes(1)
})
