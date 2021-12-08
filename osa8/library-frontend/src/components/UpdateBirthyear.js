import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const UpdateBirthyear = () => {
    const [ name, setName ] = useState('')
    const [ setBornTo, setBorn ] = useState(0)

    const [ editAuthor ] = useMutation(EDIT_AUTHOR, { refetchQueries: [ { query: ALL_AUTHORS} ] })

    const submit = (e) => {
        e.preventDefault()
        editAuthor({ variables: { name, setBornTo }})
        setName('')
        setBorn('')
    }

    return (
        <div>
            <h4>set birthyear</h4>
            <form onSubmit={submit}>
            <div>
                name
                <input value={name} onChange={({ target }) => setName(target.value)} />
            </div>
            <div>
                born
                <input value={setBornTo} onChange={({ target }) => setBorn(parseInt(target.value))} />
            </div>
            <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default UpdateBirthyear