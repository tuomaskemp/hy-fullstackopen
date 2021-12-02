import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from '../components/BlogList'
import NewBlogForm from '../components/forms/newBlogForm'
import { initBlogs } from '../reducers/blogReducer'


const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <div>
      <h2>create new</h2>
      <NewBlogForm />
      <BlogList />
    </div>
  )
}

export default Blogs