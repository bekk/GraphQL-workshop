import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Parser from 'html-react-parser';

import logo from './logo.svg';
import './app.css';

const App = () => {
	return (
		<div className="app">
			<header className="app-header">
				<img src={logo} className="app-logo" alt="logo"/>
			</header>
			<div className="shows">
				<Shows/>
			</div>
		</div>
	);
};

const GET_SHOWS = gql`{
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

const Shows = () => (
	<Query query={GET_SHOWS}
	>
		{({ loading, error, data }) => {
			if (loading) {
				return <p>Laster...</p>;
			}
			if (error) {
				return <p>Feil!</p>;
			}

			return data.shows.map((
				{ id, name, summary, type, genres, status, premiered, officialSite, image, episodes
				}) => (
				<div key={id} className="show">
					<p>{name}</p>
					<p>{Parser(summary)}</p>
					<p>{type}</p>
					<p>{status}</p>
					<p>{
						genres.map(genre => {
							return <span>{genre}</span>
						})
					}</p>
					<a href={officialSite} target="_blank">Offisiell nettside</a>
					<img src={image.medium} alt=""/>
					<p>{
						episodes.map(episode => {
							return <span>{episode.season}</span>
						})
					}</p>
				</div>
			));
		}}
	</Query>
);

export default App;
