import React from 'react'
import { useDispatch } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const FilterForm = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        dispatch(addFilter(filter))
    }

    const style = {
        marginBottom: 10
      }
    return (
        <div style={style}>
            filter
            <input onChange={handleChange} /> 
        </div>
    )
}

export default FilterForm