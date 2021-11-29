import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import LoginForm from './components/forms/loginForm'
import NewBlogForm from './components/forms/newBlogForm'
import Logout from './components/Logout'
import Notification from './components/Notification'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <Logout />
      <h2>create new</h2>
      <NewBlogForm />
      <BlogList />
    </div>
  )
}

export default App