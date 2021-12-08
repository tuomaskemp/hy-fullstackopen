import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
        name
        id
        born
        bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
        title
        author
        id
        published
    }
  }
`

export const ADD_BOOK = gql`
  mutation($title: String!, $published: Int, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      author
      genres
      published
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name,
      born
    }
  }
`