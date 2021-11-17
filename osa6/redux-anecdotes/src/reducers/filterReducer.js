const initialState = { filter: '' }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return { ...state, filter: action.data.filter }
        default:
            return state
    }
}

export const addFilter = (filter) => {
    return {
        type: 'CHANGE_FILTER',
        data: { filter: filter }
    }
}

export default reducer