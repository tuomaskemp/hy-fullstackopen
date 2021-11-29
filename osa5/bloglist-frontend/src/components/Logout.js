import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import Button from './Button'


const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Button clickAction={handleLogout} text={'logout'} />
    </div>
  )
}

export default Logout