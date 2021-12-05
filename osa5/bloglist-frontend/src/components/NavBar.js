import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginForm from './forms/loginForm'
import Logout from './Logout'
import { Menu, Header, Segment, Container } from 'semantic-ui-react'

const NavBar = () => {
  const user = useSelector(state => state.user)

  const userLoggedIn = (user) => {
    return user.username !== '' && user.token !== ''
  }

  if (!userLoggedIn(user)) {
    return (
      <Container>
        <Segment raised>
          <Header size="huge">Log in to application</Header>
          <LoginForm />
        </Segment>
      </Container>
    )
  }
  return (
    <Menu>
      <Menu.Menu position='left'>
        <Menu.Item>
          <Link to="/">blogs</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/users">users</Link>
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position='right'>
        <Menu.Item>
          <p><b>{user.username}</b> logged in</p>
        </Menu.Item>
        <Menu.Item>
          <Logout />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar