import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const User = () => {
  const userid = useParams()
  const users = useSelector(state => state.user.users)
  const user = users.find(user => user.id === userid.id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.fullname}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User