import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'My first blog',
    author: 'John',
    likes: 2,
    url: 'example.com',
    user: {
      username: 'Doe',
      fullname: 'John Doe'
    }
  }

  const mockHandler = jest.fn()
  let component

  beforeEach(() => {

    component = render(
      <Blog blog={blog} user={blog.user.username} likedBlog={mockHandler} />
    )
  })

  test('renders title and author but not likes and url', () => {
    expect(component.container).toHaveTextContent(
      'My first blog John'
    )
    expect(component.container).not.toHaveTextContent(
      'example.com'
    )
    expect(component.container).not.toContain(2)
  })

  test('likes and url are visible after button click', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
      'example.com'
    )
    expect(component.container).toHaveTextContent('Likes: 2')
  })

  test('eventhandler is called twice when button clicked two times', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const like = component.getByText('like')
    fireEvent.click(like)
    const like2 = component.getByText('like')
    fireEvent.click(like2)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})