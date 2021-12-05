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
import { initBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
    dispatch(usersList())
  }, [dispatch])

  return (
    <div>
      <NavBar />
      <Notification />
      {user.logged_in ?
        <div>
          <h2>blog app</h2>
          <Routes>
            <Route path="/users/:id" element={<User />} />
            <Route exact path="users" element={<Users />}></Route>
            <Route path="/blogs/:id" element={<Blog />} />
            <Route exact path="/" element={<Blogs />}></Route>
          </Routes>
        </div>
        : null}
    </div>
  )
}

export default App