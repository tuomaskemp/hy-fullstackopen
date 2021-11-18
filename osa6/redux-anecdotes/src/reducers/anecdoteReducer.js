import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteById = state.find(a => a.id === id)
      const anecdoteToUpdate = {
        ...anecdoteById, votes: action.data.votes
      }
      return state.map(a => a.id !== id ? a : anecdoteToUpdate)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = (id, content) => {
  return async dispatch => {
    content.votes += 1
    const anecdote = await anecdoteService.update(id, content)
    dispatch({
    type: 'VOTE',
    data: anecdote
  })
  }
  
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer