import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from './'

test('renders learn react link', () => {
  render(<Home />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
