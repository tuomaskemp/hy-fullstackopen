const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

const MONGODB_URI = 'mongodb+srv://secret@cluster0.sqz73.mongodb.net/book_db?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
      name: String!,
      id: ID!,
      born: Int,
      bookCount: Int
  }
  input AuthorInput {
    name: String!,
    born: Int!
  }
  type Book {
      title: String!,
      published: Int,
      author: Author!,
      id: ID!,
      genres: [String!]!
  }
  type Query {
      bookCount: Int!,
      authorCount: Int!,
      allBooks(author: String, genre: String): [Book!]!,
      allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
        title: String!,
        published: Int,
        author: AuthorInput!,
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!,
        setBornTo: Int!,
    ) : Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        if (args.author) {
          return await Book.find({}).populate({
            path: 'author', 
            select: 'name born bookCount', 
            populate: 'bookCount'
          })
        }
        if (args.genre) {
          return await Book.find({ genres: { $in: args.genre }}).populate({
            path: 'author', 
            select: 'name born bookCount', 
            populate: 'bookCount'
          })
        }
        return await Book.find({}).populate({
          path: 'author', 
          select: 'name born bookCount', 
          populate: 'bookCount'
        })
    },
    allAuthors: async (root, args) => {
        return await Author.find({}).populate('bookCount')
    }
    },
  Mutation: {
      addBook: async (root, args) => {
        const book = new Book({ ...args })
        const existingAuthor = await Author.findOne({ name: args.author.name })

        if(existingAuthor) {
          book.author = existingAuthor
        } else {
          const author = new Author({ ...args.author })
          try {
            const savedAuthor = await author.save()
            book.author = savedAuthor
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }

        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        return book
      },
      editAuthor: async (root, args) => {
        try {
          return await Author.findOneAndUpdate({ 
            name: args.name }, 
            { $set: { "born": args.setBornTo }})
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})