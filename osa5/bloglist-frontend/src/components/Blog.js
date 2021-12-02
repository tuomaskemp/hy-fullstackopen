import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 8,
    marginTop: 5,
    backgroundColor: '#f3f3f3'
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog