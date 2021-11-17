const initialState = { message: '' }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_MESSAGE':
            return { ...state, message: action.data.message }
        default:
            return state
    }
}

export const showNotification = (msg) => {
    return {
        type: 'CHANGE_MESSAGE',
        data: { message: msg }
    }
}

export const hideNotification = () => {
    return {
        type: 'CHANGE_MESSAGE',
        data: { message: '' }
    }
}

export default reducer