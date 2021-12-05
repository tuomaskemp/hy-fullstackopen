import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { Form, Input, Button } from 'semantic-ui-react'

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
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username</label>
          <Input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>

          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Field>
        <Button primary id="submit" type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm