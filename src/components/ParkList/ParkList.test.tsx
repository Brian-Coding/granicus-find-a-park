// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import type { Park } from '../../types'
import { ParkList } from './ParkList'

afterEach(cleanup)

const parks: readonly Park[] = Object.freeze([
  { id: 'z', name: 'Zinnia Park' },
  { id: 'e', name: 'Élan Park', location: { address: '7 Elm St' } },
  { id: 'a', name: 'Alder Park' },
])

it('lists every park in locale-aware name order without changing the input', () => {
  render(<ParkList parks={parks} selectedParkId={null} onSelectPark={vi.fn()} />)
  const items = within(screen.getByRole('list')).getAllByRole('listitem')
  expect(items.map((item) => within(item).getByRole('button'))).toEqual([
    screen.getByRole('button', { name: 'Alder Park' }),
    screen.getByRole('button', { name: /^Élan Park\s*7 Elm St$/ }),
    screen.getByRole('button', { name: 'Zinnia Park' }),
  ])
})

it('exposes a tabbable native button and selects its park on Enter activation', () => {
  const onSelectPark = vi.fn()
  render(<ParkList parks={parks} selectedParkId={null} onSelectPark={onSelectPark} />)
  const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Alder Park' })
  expect(button.type).toBe('button')
  expect(button.tabIndex).toBe(0)

  // jsdom needs the browser's default Tab focus and Enter click supplied explicitly.
  if (fireEvent.keyDown(document.body, { key: 'Tab' })) button.focus()
  expect(document.activeElement).toBe(button)
  if (fireEvent.keyDown(button, { key: 'Enter' })) fireEvent.click(button)
  expect(onSelectPark).toHaveBeenCalledExactlyOnceWith('a')
})

it('marks only the park selected by the parent as current', () => {
  const props = { parks, onSelectPark: vi.fn() }
  const { rerender } = render(<ParkList {...props} selectedParkId="e" />)
  expect(screen.getByRole('button', { current: true }).textContent).toContain('Élan Park')
  rerender(<ParkList {...props} selectedParkId="z" />)
  expect(screen.getByRole('button', { current: true }).textContent).toBe('Zinnia Park')
})

it.each([undefined, null, '', '   '])('omits the address line for %j', (address) => {
  const park = { id: 'highland', name: 'Highland Dog Park', location: { address } }
  render(<ParkList parks={[park]} selectedParkId={null} onSelectPark={vi.fn()} />)
  expect(screen.getByRole('button').textContent).toBe('Highland Dog Park')
})

it('shows an empty message and no list when there are no parks', () => {
  render(<ParkList parks={[]} selectedParkId={null} onSelectPark={vi.fn()} />)
  const region = screen.getByRole('region', { name: 'Parks (0)' })
  expect(within(region).getByText('No parks available.')).toBeTruthy()
  expect(within(region).queryByRole('list')).toBeNull()
})
