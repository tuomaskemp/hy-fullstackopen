const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const MONGODB_URI = 'mongodb+srv://fullstack:Salasana123@cluster0.sqz73.mongodb.net/book_db?retryWrites=true&w=majority'
const JWT_SECRET = 'MYSECRET'

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
      bookCount: Int!,
      authorCount: Int!,
      allBooks(author: String, genre: String): [Book!]!,
      allAuthors: [Author!]!,
      me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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
    },
    me: (root, args, context) => {
      return context.currentUser
    }
    },
  Mutation: {
      addBook: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
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
      editAuthor: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        try {
          return await Author.findOneAndUpdate({ 
            name: args.name }, 
            { $set: { "born": args.setBornTo }})
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      },
      createUser: (root, args) => {
        const user = new User({ ...args })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})