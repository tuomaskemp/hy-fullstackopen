import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './newBlogForm'

describe('<newBlogForm />', () => {
  test('eventhandler is called with correct information', () => {
    const newBlog = jest.fn()
    const component = render(<NewBlogForm createBlog={newBlog} />)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'My New Blog' }
    })
    fireEvent.change(author, {
      target: { value: 'John' }
    })
    fireEvent.change(url, {
      target: { value: 'www.example.com' }
    })

    fireEvent.click(component.container.querySelector('#submit'))

    expect(newBlog.mock.calls[0][0].title).toBe('My New Blog')
    expect(newBlog.mock.calls[0][0].author).toBe('John')
    expect(newBlog.mock.calls[0][0].url).toBe('www.example.com')
  })
})