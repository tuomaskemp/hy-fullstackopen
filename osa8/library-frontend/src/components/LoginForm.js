import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { LOGIN } from '../queries'
import Notification from './Notification'

const LoginForm = ({ show, setAuthenticated }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')
  const client = useApolloClient()


  const notification = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      notification(error.graphQLErrors[0].message)
    }
  })

  const tokenInLocalStorage = () => {
    return localStorage.getItem('library_user') !== null ? true : false
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('library_user', token)
      setAuthenticated(true)
      setUsername('')
      setPassword('')
    }
  }, [result.data]) // eslint-disable-line

  useEffect(() => {
    if (tokenInLocalStorage) {
      setAuthenticated(true)
    }
  }, [])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  const logout = () => {
    setAuthenticated(false)
    localStorage.clear()
    client.resetStore()
  }

  if (!tokenInLocalStorage()) {
    return (
      <div>
        <Notification msg={error} />
        <form onSubmit={submit}>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <Notification msg={error} />
      <h4>Account</h4>
      <p>Welcome to your account!</p>
      <button onClick={logout}>logout</button>
    </div>
  )

}

export default LoginForm