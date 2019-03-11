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

export const GET_SHOW = gql`{
  getShow(id: 431) {
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
    }
}
`;
