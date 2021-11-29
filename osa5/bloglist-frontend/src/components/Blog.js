import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import Button from './Button'

const Blog = ({ blog }) => {
  const [display, setDisplay] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const toggleVisibility = () => {
    setDisplay(!display)
  }

  const handleRemoveClick = () => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      dispatch(removeBlog(blog))
        .then(() => {
          dispatch(showNotification(`${blog.title} removed`, '', 5))
        })
        .catch(() => dispatch(showNotification('blog remove failed', 'error', 5)))
    }
  }

  const handleLikeClick = () => {
    dispatch(likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    }))
      .then(() => dispatch(showNotification('blog updated successfully', '', 5)))
      .catch(() => dispatch(showNotification('blog update failed', 'error', 5)))
  }

  const blogStyle = {
    padding: 8,
    marginTop: 5,
    backgroundColor: '#f3f3f3'
  }

  if (!display) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <Button text="view" clickAction={toggleVisibility} />
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Button text="hide" clickAction={toggleVisibility} />
      <p>Title: {blog.title}</p>
      <p>User: {blog.user.username}</p>
      <p>Url: {blog.url}</p>
      <p className="like-count">Likes: {blog.likes}</p>
      <Button text="like" clickAction={handleLikeClick} />
      {
        blog.user.username === user.username ?
          <Button text="remove blog" clickAction={handleRemoveClick} /> :
          <p>You have no permission to remove this blog.</p>
      }

    </div>
  )
}

export default Blog