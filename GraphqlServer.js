const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./typedef')
const { find, filter } = require('lodash');

const data = JSON.parse(fs.readFileSync('futurama.json', 'UTF-8'));

// A map of functions which return data for the schema.
const resolvers = {
        Query: {
            getShow(obj, args, context, info) {
                //return find(data, {id: args.id})
                return findShow(args.id)
            },
            futurama: () => data,
        },
        Futurama: {
            episode(obj, args, context, info) {
                return findEpisode(args.id)
            }
        }
}

function findShow(id) {
    if(data.id === id) {
        return data;
    }
}

function findEpisode(id) {
   return find(data.episodes, {id: id})
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});
