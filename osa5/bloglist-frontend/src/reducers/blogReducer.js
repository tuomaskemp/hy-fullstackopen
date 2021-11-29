import blogService from '../services/blogs'

const intialState = []

const reducer = (state = intialState, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (data) => {
  return async dispatch => {
    const blog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (data) => {
  return async dispatch => {
    const blog = await blogService.update(data.id, data)
    dispatch({
      type: 'LIKE_BLOG',
      data: blog
    })
  }
}

export const removeBlog = (data) => {
  return async dispatch => {
    await blogService.del(data.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: data
    })
  }
}

export default reducer