import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const UpdateBirthyear = () => {
  const [ name, setName ] = useState('')
  const [ setBornTo, setBorn ] = useState(0)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, { refetchQueries: [ { query: ALL_AUTHORS } ] })
  const result = useQuery(ALL_AUTHORS)
  const options = result.data.allAuthors.map(
    author => ({
      value: author.name,
      label: author.name,
      born: author.born !== null ? author.born : 0
    })
  )

  const submit = (e) => {
    e.preventDefault()
    editAuthor({ variables: { name, setBornTo } })
    setName('')
    setBorn('')
  }

  const handleChange = (selectedOption) => {
    setName(selectedOption.value)
    setBorn(selectedOption.born)
  }

  return (
    <div>
      <h4>set birthyear</h4>
      <form onSubmit={submit}>
        <div>
                name
          <Select defaultValue={name} options={options} onChange={handleChange} />
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