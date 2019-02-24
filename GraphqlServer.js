const fs = require('fs');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedef')

const futurama = JSON.parse(fs.readFileSync('data/futurama.json', 'UTF-8'));
const southpark = JSON.parse(fs.readFileSync('data/southpark.json', 'UTF-8'));
const friends = JSON.parse(fs.readFileSync('data/friends.json', 'UTF-8'));
const got = JSON.parse(fs.readFileSync('data/gameOfThrones.json', 'UTF-8'));


const data = { shows: [futurama, southpark, friends, got] };

const resolvers = {
    Query: {
        getShow(obj, args, context, info) {
            //return find(data, {id: args.id})
            return findShow(args.id)
        },
        shows: () => data.shows,
    },
    Show: {
        episode(obj, args, context, info) {
            return findEpisode(args.id);;
        }
    }
}

function findShow(id) {
    return data.shows.find(show => show.id === id);
}

function findEpisode(id) {
    var episode;
    data.shows.forEach(show => {
        if (show.episodes.find(episode => episode.id === id)) {
            episode = show.episodes.find(episode => episode.id === id);
        }
    });
    return episode;
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});
