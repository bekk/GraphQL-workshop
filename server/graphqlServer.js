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
        show(obj, args, context, info) {
            return findShow(args.id)
        },
        shows: () => data.shows,
    },
};

function findShow(id) {
    return data.shows.find(show => show.id === id);
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});
