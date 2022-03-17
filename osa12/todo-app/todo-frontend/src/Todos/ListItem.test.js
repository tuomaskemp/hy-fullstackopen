import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import ListItem from './ListItem'

test('renders list item', () => {
  const todo = {
    text: "Write code",
    done: true
  }
  const fn = () => {}

  render(<ListItem todo={todo} onClickComplete={fn} onClickDelete={fn} />)

  const element1 = screen.getByText('Write code')
  expect(element1).toBeDefined()
  const element2 = screen.getByText('This todo is done')
  expect(element2).toBeDefined()
})