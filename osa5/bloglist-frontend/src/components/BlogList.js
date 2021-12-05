import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

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