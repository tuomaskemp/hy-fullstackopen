import React from 'react'

const Filter = ({submitHandler, filterValue, contactsToDisplay}) => {
    return (
        <>
            <p>filter shown with</p>
            <form onSubmit={submitHandler}>
                <input value={filterValue} onChange={contactsToDisplay} />
            </form>
        </>
    )
}

export default Filter