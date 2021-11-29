const initialState = { message: '', type: '' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return { ...state, message: action.data.message, type: action.data.type }
  default:
    return state
  }
}

let timeoutID = undefined

export const showNotification = (msg, type, timeInSeconds) => {
  return async dispatch =>  {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: { message: msg, type: type }
    })

    if (typeof timeoutID === 'number') {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: { message: '' }
      })
    }, timeInSeconds * 1000)

  }
}

export default reducer