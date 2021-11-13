import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHandler, username, password, usernameOnChange, passwordOnChange }) => (
  <div>
    <form onSubmit={loginHandler}>
      <div>
            username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={usernameOnChange}
        />
      </div>
      <div>
            password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={passwordOnChange}
        />
      </div>
      <button id="submit" type="submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
  usernameOnChange: PropTypes.func.isRequired,
  passwordOnChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm