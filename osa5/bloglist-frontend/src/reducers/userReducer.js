import blogService from '../services/blogs'
import loginService from '../services/loginService'
import userService from '../services/userService'
import { clearBlogState } from './blogReducer'
import { showNotification } from './notificationReducer'

const initialState = {
  username: '',
  token: '',
  fullname: '',
  users: [],
  logged_in: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER':
    return { ...state,
      username: action.data.username,
      token: action.data.token,
      fullname: action.data.fullname,
      logged_in: true
    }
  case 'SET_USERLIST':
    return { ...state, users: action.data }
  case 'CLEAR_STATE':
    return initialState
  default:
    return state
  }
}

export const initUser = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      blogService.setToken(user.token)
    }
  }
}

export const login = (data) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: data.username,
        password: data.password
      })
      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      dispatch(showNotification('Login successful', '', 5))
    } catch (e) {
      dispatch(showNotification('Login failed', 'error', 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    dispatch({
      type: 'CLEAR_STATE'
    })
    dispatch(clearBlogState())
    dispatch(showNotification('Logout successful', '', 5))
  }
}

export const usersList = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: 'SET_USERLIST',
        data: users
      })
    } catch (e) {
      dispatch(showNotification('Cannot fetch users', 'error', 5))
    }
  }
}

export default reducer