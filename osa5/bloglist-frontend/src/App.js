import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import LoginForm from './components/forms/loginForm'
import NewBlogForm from './components/forms/newBlogForm'
import Button from './components/Button'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: ''})
  const [notification, setNotification] = useState({ type: '', message: ''})

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

  const handleNewBlogSubmit = (e) => {
    e.preventDefault()
    blogService.create(newBlog)
    .then(addedBlog => {
      setNotification({ type: '', message: `a new blog ${newBlog.title} added`})
      setBlogs(blogs.concat(addedBlog))
      setNewBlog({ title: '', author: '', url: ''})
    })
    .catch (exception => 
    setNotification({ type: 'error', message: `cannot add a new blog. Reason: ${exception}`}))
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
      <NewBlogForm 
        newBlogSubmitHandler={handleNewBlogSubmit}
        title={newBlog.title}
        author={newBlog.author}
        url={newBlog.url}
        titleOnChange={({ target }) => setNewBlog(oldState => ({...oldState, title: target.value}))}
        authorOnChange={({ target }) => setNewBlog(oldState => ({...oldState, author: target.value}))}
        urlOnChange={({ target }) => setNewBlog(oldState => ({...oldState, url: target.value}))}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App