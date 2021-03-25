const {gql} = require('apollo-server-express');

const typeDefs = gql `

type Book {
    _id: ID!
    bookId: String
    authors: [String]
    # of authors: String
    title: String
    image: String
    link: String
}

type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

input savedBook {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: saveBook!): User
    removeBook(bookId: ID!): User
}

type Auth {
    token: ID!
    user: User
}

`;

module.exports = typeDefs;