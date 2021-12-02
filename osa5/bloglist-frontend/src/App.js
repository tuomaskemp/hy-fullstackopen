import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import { initUser } from './reducers/userReducer'
import { usersList } from './reducers/userReducer'
import Blogs from './views/blogs'
import Users from './views/users'
import User from './views/user'
import Blog from './views/blog'
import NavBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initUser())
    dispatch(usersList())
  }, [dispatch])



  return (
    <div>
      <NavBar />
      <Notification />
      <h2>blog app</h2>
      {user.logged_in ?
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route exact path="users" element={<Users />}></Route>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route exact path="/" element={<Blogs />}></Route>
        </Routes>
        : null}
    </div>
  )
}

export default App