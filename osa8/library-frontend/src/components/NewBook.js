import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import Notification from './Notification'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState({ name: '', born: 0 })
  const [published, setPublished] = useState(0)
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError ] = useState(null)

  const notification = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onError: (error) => {
      notification(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      props.updateCacheWith(response.data.addBook)
    }
  })


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    addBook({ variables: { title, published, author, genres } })

    setTitle('')
    setPublished('')
    setAuthor({ name: '', born: 0 })
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notification msg={error} />
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author name
          <input
            value={author.name}
            onChange={({ target }) => setAuthor({ ...author, name: target.value })}
          />
        </div>
        <div>
          author born
          <input
            value={author.born}
            type="number"
            onChange={({ target }) => setAuthor({ ...author, born: parseInt(target.value) })}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
