const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        shows: [Show]
    }
`;


module.exports = typeDefs;
