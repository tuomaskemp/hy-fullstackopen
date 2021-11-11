import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, likedBlog, removedBlog, user }) => {
  const [display, setDisplay] = useState(false)

  const toggleVisibility = () => {
    setDisplay(!display)
  }

  const handleLikeClick = () => {
    likedBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    })
  }

  const handleRemoveClick = () => {
    removedBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    })
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
      <p>Likes: {blog.likes}</p>
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