import blogService from '../services/blogs'
import loginService from '../services/loginService'
import { showNotification } from './notificationReducer'

const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
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
    const user = null
    dispatch({
      type: 'SET_USER',
      data: user
    })
    dispatch(showNotification('Logout successful', '', 5))
  }
}

export default reducer