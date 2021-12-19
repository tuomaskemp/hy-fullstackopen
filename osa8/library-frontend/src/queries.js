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
  query($genre: String) {
    allBooks(genre: $genre) {
        title
        author {
          name
          born
        }
        id
        published
        genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation($title: String!, $published: Int, $author: AuthorInput!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      author {
        name
        born
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`