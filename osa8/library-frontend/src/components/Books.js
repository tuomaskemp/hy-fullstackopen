import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [allGenres, setAllGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  const genreToShow = (genre) => {
    getBooks({ variables: { genre: genre } })
  }

  useEffect(() => {
    genreToShow(selectedGenre)
  }, [])

  useEffect(() => {
    genreToShow(selectedGenre)
  }, [selectedGenre])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (books.length > 0 && allGenres.length === 0) {
      const genres = new Set(result.data.allBooks
        .map(book => book.genres)
        .reduce((acc, el) => acc.concat(el), [])
      )
      setAllGenres([...genres])
    }
  }, [result])

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return (
      <div>
        loading ...
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        allGenres.map(genre => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
        ))
      }
      <button onClick={() => setSelectedGenre('')}>all genres</button>
    </div>
  )
}

export default Books