import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { usersList } from '../reducers/userReducer'
import { Grid, Header } from 'semantic-ui-react'

const UserList = () => {
  const users = useSelector(state => state.user.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersList())
  }, [dispatch])

  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Header>username</Header>
          {users.map(user => <p key={user.id}><Link to={`/users/${user.id}`}>{user.fullname}</Link></p>)}
        </Grid.Column>

        <Grid.Column>
          <Header>blogs created</Header>
          {users.map(user => <p key={user.id}>{user.blogs.length}</p>)}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default UserList