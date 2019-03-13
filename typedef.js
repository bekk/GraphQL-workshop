const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        show(id: Int): Show
        shows: [Show]
        episodes(season: Int): [Episode]
    }

    type Mutation {
        createComment(showId: Int ,comment: String): Show
    }

    type Show {
        id: Int
        url: String
        name: String
        type: String
        language: String
        genres: [String]
        status: String
        premiered: String
        officialSite: String
        image: Image
        summary: String
        episodes: [Episode]
        episode(id: Int) : Episode
        comment: String
    }

    type Image {
        medium: String
        original: String
    }

    type Episode {
        id: Int
        url: String
        name: String
        season: Int
        airdate: String
        number: Int
        image: Image
        summary: String
    }
`;


module.exports = typeDefs;
