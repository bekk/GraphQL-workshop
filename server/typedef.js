const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        show(id: Int): Show
        shows: [Show]
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
    }

     type Image {
        medium: String
        original: String
    }
    
`;


module.exports = typeDefs;
