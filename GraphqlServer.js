const fs = require('fs');

const { ApolloServer, gql } = require('apollo-server');


// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

const data = JSON.parse(fs.readFileSync('futurama.json', 'UTF-8'));


// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => 'world'
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
    console.log(data._embedded.episodes[0].name);
});
