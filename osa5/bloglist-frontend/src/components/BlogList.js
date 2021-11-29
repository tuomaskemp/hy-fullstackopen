import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className="blogs-list">
      {blogs
        .sort((a, b) => a.likes < b.likes ? 1 : -1)
        .map(blog =>
          <Blog
            key={blog.id} blog={blog}
          />
        )}
    </div>
  )
}

export default BlogList