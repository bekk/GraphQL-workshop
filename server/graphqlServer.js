const fs = require('fs');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedef');

const dataFolder = 'data/';
const data = { shows: []};

fs.readdir(dataFolder, (err, files) => {
    files.forEach(file => {
        data.shows.push(JSON.parse(fs.readFileSync('data/'+file, 'UTF-8')));
    });
});

const resolvers = {
    Query: {
        shows: () => data.shows,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});
