const fs = require('fs');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedef');

const dataFolder = 'data/';
const data = { shows: []}

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
    Mutation: {
        createComment(obj, args, context, info) {
            let show = findShow(args.showId);
            show.comments ? show.comments.push(args.comment) : show.comments = [args.comment];
            return show;
        }
    }
};

function findShow(id) {
    return data.shows.find(show => show.id === id);
}

function findEpisode(id) {
    let episode;
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
