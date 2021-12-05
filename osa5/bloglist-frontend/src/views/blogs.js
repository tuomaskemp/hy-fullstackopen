import React from 'react'
import BlogList from '../components/BlogList'
import NewBlogForm from '../components/forms/newBlogForm'


const Blogs = () => {
  return (
    <div>
      <h2>create new</h2>
      <NewBlogForm />
      <BlogList />
    </div>
  )
}

export default Blogs