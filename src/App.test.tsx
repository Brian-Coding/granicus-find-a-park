// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react'
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
  expect(screen.getByRole('region', { name: 'Park details' }).textContent).toMatch(/no park selected/i)
})

