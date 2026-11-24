// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    screen.getByRole('button', { name: /^Alder Park\s*Address not provided$/ }),
    screen.getByRole('button', { name: /^Élan Park\s*7 Elm St$/ }),
    screen.getByRole('button', { name: /^Zinnia Park\s*Address not provided$/ }),
  ])
})

it('tabs through parks in name order and selects them with Enter and Space', async () => {
  const user = userEvent.setup()
  const onSelectPark = vi.fn()
  render(<ParkList parks={parks} selectedParkId={null} onSelectPark={onSelectPark} />)

  await user.tab()
  expect(document.activeElement).toBe(screen.getByRole('button', { name: /^Alder Park/ }))
  await user.keyboard('{Enter}')
  expect(onSelectPark).toHaveBeenCalledExactlyOnceWith('a')

  await user.tab()
  expect(document.activeElement).toBe(screen.getByRole('button', { name: /^Élan Park/ }))
  await user.keyboard(' ')
  expect(onSelectPark).toHaveBeenCalledTimes(2)
  expect(onSelectPark).toHaveBeenLastCalledWith('e')
})

it('marks only the park selected by the parent as current', () => {
  const props = { parks, onSelectPark: vi.fn() }
  const { rerender } = render(<ParkList {...props} selectedParkId="e" />)
  expect(screen.getByRole('button', { current: true }).textContent).toContain('Élan Park')
  rerender(<ParkList {...props} selectedParkId="z" />)
  expect(screen.getByRole('button', { current: true }).textContent).toContain('Zinnia Park')
})

it.each([undefined, null, '', '   '])('shows “Address not provided” when the address is %j', (address) => {
  const park = { id: 'highland', name: 'Highland Dog Park', location: { address } }
  render(<ParkList parks={[park]} selectedParkId={null} onSelectPark={vi.fn()} />)
  const button = screen.getByRole('button')
  expect(button.textContent).toMatch(/^Highland Dog Park\s*Address not provided$/)
  expect(button.textContent).not.toMatch(/undefined|null/)
  expect(button.querySelector('.park-list-address--missing')).toBeTruthy()
})

it('shows an empty message and no list when there are no parks', () => {
  render(<ParkList parks={[]} selectedParkId={null} onSelectPark={vi.fn()} />)
  const region = screen.getByRole('region', { name: 'Parks (0)' })
  expect(within(region).getByText('No parks available.')).toBeTruthy()
  expect(within(region).queryByRole('list')).toBeNull()
})
