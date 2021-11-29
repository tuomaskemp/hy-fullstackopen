import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogReducer'
import { showNotification } from '../../reducers/notificationReducer'
import Togglable from '../Togglable'

const NewBlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addNewBlog = (e) => {
    e.preventDefault()
    dispatch(createBlog(newBlog))
      .then(() => {
        dispatch(showNotification(`a new blog ${newBlog.title} added`, '', 5))
        setNewBlog({ title: '', author: '', url: '' })
        blogFormRef.current.toggleVisibility()
      })
      .catch (exception =>
        dispatch(showNotification(`cannot add a new blog. Reason: ${exception}`, 'error', 5))
      )
  }

  const handleTitleChange = (event) => {
    const value = event.target.value
    setNewBlog(oldState => ({ ...oldState, title: value }))
  }
  const handleAuthorChange = (event) => {
    const value = event.target.value
    setNewBlog(oldState => ({ ...oldState, author: value }))
  }
  const handleUrlChange = (event) => {
    const value = event.target.value
    setNewBlog(oldState => ({ ...oldState, url: value }))
  }
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <form onSubmit={addNewBlog}>
          <div>
            title:
            <input
              id="title"
              type="text"
              value={newBlog.title}
              name="Title"
              placeholder="title"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author:
            <input
              id="author"
              type="text"
              value={newBlog.author}
              name="Author"
              placeholder="author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url:
            <input
              id="url"
              type="text"
              value={newBlog.url}
              name="Url"
              placeholder="url"
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit" id="submit">create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default NewBlogForm