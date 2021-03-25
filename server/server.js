const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth')

const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// typedefs and resolvers HERE

const { typeDefs, resolvers } = require('./schemas')

const app = express();
const PORT = process.env.PORT || 3088;


// new apollo server, add in schema data

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// implement middleware.
server.applyMiddleware({app});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.use(routes);

// update with graphQL link
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  // GraphQL link
  console.log(`GraphQL can be used at http://localhost:${PORT}${server.graphqlPath}`)
});

process.on('uncaughtException', function(err) {
  console.log(`Caught an exception: + ${err}`);
})
