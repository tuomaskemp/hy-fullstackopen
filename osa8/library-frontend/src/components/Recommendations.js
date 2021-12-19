import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, USER } from '../queries'


const Recommendations = (props) => {
  const [genre, setGenre] = useState(null)
  const user = useQuery(USER)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (user.data) {
      setGenre(user.data.me.favoriteGenre)
    }
  }, [user.data])

  useEffect(() => {
    getBooks({ variables: { genre: genre } })
  }, [genre])

  if (!props.show) {
    return null
  }

  if(user.loading || result.loading) {
    return (
      <div>
        loading ...
      </div>
    )
  }

  return (
    <div>
      <h4>Recommendations</h4>
      books in your favourite genre <b>{genre}</b>

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
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations