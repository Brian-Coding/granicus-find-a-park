// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import App from './App'
import sample from './data/parks.sample.json'

it('renders the three named regions with the full sample and no initial selection', () => {
  render(<App />)
  expect(screen.getByRole('region', { name: `Parks (${sample.length})` })).toBeTruthy()
  const details = screen.getByRole('region', { name: 'Park details' })
  expect(within(details).getByText(/no park selected/i)).toBeTruthy()
  expect(screen.getByRole('region', { name: 'Park map' })).toBeTruthy()
})
