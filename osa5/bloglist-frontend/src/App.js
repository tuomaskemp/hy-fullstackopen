import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import LoginForm from './components/forms/loginForm'
import NewBlogForm from './components/forms/newBlogForm'
import Button from './components/Button'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: '', message: ''})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({ type: '', message: 'Login successful'})
    } catch {
      setNotification({ type: 'error', message: 'Login failed'})
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedInBlogAppUser')
    setUser(null)
    setNotification({ type: '', message: 'Logout successful'})
  }

  const handleNewBlogSubmit = (newBlog) => {
    blogService
    .create(newBlog)
    .then(addedBlog => {
      setNotification({ type: '', message: `a new blog ${newBlog.title} added`})
      setBlogs(blogs.concat(addedBlog))
      blogFormRef.current.toggleVisibility()
    })
    .catch (exception => 
    setNotification({ type: 'error', message: `cannot add a new blog. Reason: ${exception}`}))
  }

  const handleBlogLikeClick = (likedBlog) => {
    blogService
      .update(likedBlog.id, likedBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : updatedBlog))
        setNotification({ type: '', message: `blog updated successfully`})
      })
      .catch(() => setNotification({ type: 'error', message: 'blog update failed'}))
  }

  const handleRemovedBlogClick = removedBlog => {
    if (window.confirm(`Remove ${removedBlog.title}?`)) {
      blogService
        .del(removedBlog.id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== removedBlog.id))
          setNotification({ type: '', message: `${removedBlog.title} removed`})
        })
        .catch(() => setNotification({ type: 'error', message: 'blog remove failed'}))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification type={notification.type} message={notification.message} />
        <h2>Log in to application</h2>
        <LoginForm 
          loginHandler={handleLogin}
          username={username}
          password={password}
          usernameOnChange={({ target }) => setUsername(target.value)}
          passwordOnChange={({ target }) => setPassword(target.value)}
          />
      </div>
    )
  }

  return (
    <div>
      <Notification type={notification.type} message={notification.message}/>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <Button clickAction={handleLogout} text={"logout"} />
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlogForm createBlog={handleNewBlogSubmit}/>
      </Togglable>
      {blogs
        .sort((a, b) => a.likes < b.likes ? 1 : -1)
        .map(blog =>
        <Blog 
          key={blog.id} blog={blog} 
          likedBlog={handleBlogLikeClick} 
          removedBlog={handleRemovedBlogClick} 
          userName={user.username}
        />
      )}
    </div>
  )
}

export default App