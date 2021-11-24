const initialState = { message: '' }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_MESSAGE':
            return { ...state, message: action.data.message }
        default:
            return state
    }
}

let timeoutID = undefined

export const showNotification = (msg, timeInSeconds) => {
    return async dispatch =>  {
        dispatch({
            type: 'CHANGE_MESSAGE',
            data: { message: msg }
        })

        if (typeof timeoutID === 'number') {
            clearTimeout(timeoutID)
        }
        
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'CHANGE_MESSAGE',
                data: { message: '' }
            })
        }, timeInSeconds * 1000)
        
    }
    
    
}

export default reducer