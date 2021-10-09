import React from 'react'

const ListDisplay = ({list, handleDelete}) => {
    return (
        <div>
            {list.map(person => 
                <p key={person.name}>
                    {person.name} {person.number}
                    <button onClick={handleDelete(person)}>delete</button>
                </p>
                )
            }
        </div>
    )
}

export default ListDisplay