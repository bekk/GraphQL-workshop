const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./typedef')

const data = JSON.parse(fs.readFileSync('futurama.json', 'UTF-8'));

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        futurama: () => data
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});
