const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        shows: [Show]
    }

    type Show {
        id: Int
        name: String
    }
`;

module.exports = typeDefs;
