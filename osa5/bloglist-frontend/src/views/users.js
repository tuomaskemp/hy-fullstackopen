import React from 'react'
import UserList from '../components/UserList'
import { Header } from 'semantic-ui-react'

const Users = () => {
  return (
    <div>
      <Header size="huge">Users</Header>
      <UserList />
    </div>
  )
}

export default Users