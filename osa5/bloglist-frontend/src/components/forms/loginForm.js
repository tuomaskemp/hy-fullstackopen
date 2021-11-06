import React from 'react'

const LoginForm = ({loginHandler, username, password, usernameOnChange, passwordOnChange}) => (
    <div>
        <form onSubmit={loginHandler}>
        <div>
            username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={usernameOnChange}
            />
        </div>
        <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={passwordOnChange}
            />
        </div>
        <button type="submit">login</button>
    </form>  
    </div>
)

export default LoginForm