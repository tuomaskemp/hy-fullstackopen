import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addNewBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({ title: '', author: '', url: '' })
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
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm