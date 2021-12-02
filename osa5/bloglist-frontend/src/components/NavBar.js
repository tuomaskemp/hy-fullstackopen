import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginForm from './forms/loginForm'
import Logout from './Logout'

const NavBar = () => {
  const user = useSelector(state => state.user)

  const userLoggedIn = (user) => {
    return user.username !== '' && user.token !== ''
  }

  const style = {
    backgroundColor: 'lightgray',
    padding: '10px'
  }

  if (!userLoggedIn(user)) {
    return (
      <div style={style}>
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }
  return (
    <div style={style}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <p>{user.username} logged in</p>
      <Logout />
    </div>
  )
}

export default NavBar