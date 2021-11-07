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

  return (
    <div>
      <form onSubmit={addNewBlog}>
        <div>
            title:
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => setNewBlog(oldState => ({ ...oldState, title: target.value }))}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => setNewBlog(oldState => ({ ...oldState, author: target.value }))}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => setNewBlog(oldState => ({ ...oldState, url: target.value }))}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm