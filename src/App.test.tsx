// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import App from './App'
import sample from './data/parks.sample.json'

afterEach(cleanup)

it('renders the three named regions with the full sample and no initial selection', () => {
  render(<App />)
  expect(screen.getByRole('region', { name: `Parks (${sample.length})` })).toBeTruthy()
  const details = screen.getByRole('region', { name: 'Park details' })
  expect(within(details).getByText(/no park selected/i)).toBeTruthy()
  expect(screen.getByRole('region', { name: 'Park map' })).toBeTruthy()
})

it('returns focus from details to the selected park’s list button', async () => {
  const user = userEvent.setup()
  render(<App />)
  const parkButton = within(screen.getByRole('list')).getByRole('button', { name: /^Highland Dog Park\s*Address not provided$/ })
  await user.click(parkButton)
  expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Highland Dog Park' }))

  await user.tab()
  expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Back to list' }))
  await user.keyboard('{Enter}')
  expect(document.activeElement).toBe(parkButton)
  expect(parkButton.getAttribute('aria-current')).toBe('true')
  expect(screen.getByRole('heading', { name: 'Highland Dog Park' })).toBeTruthy()

  await user.keyboard('{Enter}')
  expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Highland Dog Park' }))
})

it('closes a marker popup when another park is selected from the list', async () => {
  const user = userEvent.setup()
  render(<App />)
  const map = within(screen.getByRole('region', { name: 'Park map' }))
  fireEvent.click(map.getByRole('button', { name: 'Prospect Park' }))
  expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Prospect Park' }))

  await user.click(screen.getByRole('button', { name: 'Back to list' }))
  expect(map.getByRole('button', { name: 'View details' })).toBeTruthy()
  const list = within(screen.getByRole('region', { name: `Parks (${sample.length})` }))
  expect(document.activeElement).toBe(list.getByRole('button', { name: /^Prospect Park/ }))

  await user.click(list.getByRole('button', { name: /^Highland Dog Park/ }))
  expect(map.queryByRole('button', { name: 'View details' })).toBeNull()
  expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Highland Dog Park' }))
})

