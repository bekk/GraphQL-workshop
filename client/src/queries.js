import gql from "graphql-tag";

export const GET_SHOWS = gql`{
    shows {
        id,
        name,
    }
}`;
