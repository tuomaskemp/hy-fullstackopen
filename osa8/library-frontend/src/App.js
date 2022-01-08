import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [authenticated, setAuthenticated] = useState(false)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: {
      genre: '',
    }, })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: {
          genre: '' },
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`a new book ${subscriptionData.data.bookAdded.title} added `)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { authenticated ?
          (<>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('account')}>account</button>
          </>)
          : <button onClick={() => setPage('account')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page === 'account'}
        setAuthenticated={setAuthenticated}
        client={client}
      />

      <Recommendations show={page === 'recommendations'} />

    </div>
  )
}

export default App