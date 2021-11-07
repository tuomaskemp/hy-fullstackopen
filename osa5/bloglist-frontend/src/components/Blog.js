import React, { useState } from 'react'
import Button from './Button'

const Blog = ({blog, likedBlog, removedBlog, userName}) => {
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
        {blog.title} <Button text="view" clickAction={toggleVisibility} />
    </div>
    )
  }

  return (
    <div style={blogStyle}>
      <Button text="hide" clickAction={toggleVisibility} />
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p>
      <Button text="like" clickAction={handleLikeClick} />
      {
        blog.user.username === userName ? 
        <Button text="remove blog" clickAction={handleRemoveClick} /> :
        <p>You have no permission to remove this blog.</p>
      }
      
    </div>
  )
}

export default Blog