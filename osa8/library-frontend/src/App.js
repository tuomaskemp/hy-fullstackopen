import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [authenticated, setAuthenticated] = useState(false)

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
      />

      <LoginForm show={page === 'account'} setAuthenticated={setAuthenticated} />

      <Recommendations show={page === 'recommendations'} />

    </div>
  )
}

export default App