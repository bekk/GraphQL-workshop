import gql from "graphql-tag";

export const GET_SHOWS = gql`{
    shows {
        id,
        name,
		summary,
        type,
        genres,
        status,
        premiered,
        officialSite,
		image {
            medium
        },
		episodes {
			name,
			summary,
			season,
			image {
				medium
			}
		}
    }}
`;

