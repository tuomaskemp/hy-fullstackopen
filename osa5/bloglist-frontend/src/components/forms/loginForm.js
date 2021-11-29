import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="submit" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm