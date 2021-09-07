import React from 'react'

const Filter = ({submitHandler, filterValue, inputChangeHandler}) => {
    return (
        <form onSubmit={submitHandler}>
            find countries 
            <input value={filterValue} onChange={inputChangeHandler}/>
        </form>
    )
}

export default Filter