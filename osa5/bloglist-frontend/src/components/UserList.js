import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { usersList } from '../reducers/userReducer'

const UserList = () => {
  const users = useSelector(state => state.user.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersList())
  }, [dispatch])

  const style = {
    width: '20%',
    position: 'relative',
    float: 'left'
  }
  return (
    <div>
      <div style={style}>
        <h4>username</h4>
        {users.map(user => <p key={user.id}><Link to={`/users/${user.id}`}>{user.fullname}</Link></p>)}
      </div>
      <div style={style}>
        <h4>blogs created</h4>
        {users.map(user => <p key={user.id}>{user.blogs.length}</p>)}
      </div>
    </div>
  )
}

export default UserList