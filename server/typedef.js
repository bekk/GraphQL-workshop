const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        show(id: Int): Show
        shows: [Show]
    }

     type Image {
        medium: String
        original: String
    }
`;

module.exports = typeDefs;
