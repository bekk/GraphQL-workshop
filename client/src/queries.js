import gql from "graphql-tag";

export const GET_SHOWS = gql`{
    shows {
        id,
        name,
        type,
        status,
        premiered,
        officialSite,
        image {
            medium
        },
    }
}`;

export const GET_SHOW = gql`
    query GetShow($idNumber: Int!) {
        show(id: $idNumber) {
            id,
            name,
            summary,
            type,
            genres,
            status,
            premiered,
            officialSite,
            comments,
            image {
                medium
            },
            episodes {
                name,
                summary,
                season,
                airdate,
                image {
                    medium
                }
            }
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation CreateComment($showId: Int!, $comment: String!) {
        createComment(showId: $showId, comment: $comment) {
            id, name, comments
        }
    }
`;


export const GET_EPISODES = gql`
    query GetEpisodes($season: Int!) {
        show(season: $season) {
            id,
            name,
            summary,
            season,
            airdate,
            image {
                medium
            }
        }
    }
`;
