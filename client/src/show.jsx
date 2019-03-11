import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_SHOW } from './queries';

import './show.css';

class Show extends React.Component {
	render() {
		const idNumber = parseInt(this.props.match.params.id);

		return (
			<Query query={GET_SHOW} variables={{ idNumber }}>
				{({ loading, error, data }) => {
					console.log('data', data);
					if (loading) {
						return <div>Laster...</div>;
					}
					if (error) {
						return <div>Feil!</div>;
					}

					return (
						<div key={data.show.id} className="show">
							<h1>{data.show.name} ({data.show.premiered.split('-')[0]})</h1>
							<div>{data.show.type}</div>
							<div>{data.show.status}</div>
							<div>{data.show.premiered}</div>
							<div>
								<a href={data.show.officialSite} target="_blank" rel="noopener noreferrer">{data.show.officialSite}</a>
							</div>
							<div>
								<img src={data.show.image.medium} alt=""/>
							</div>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default withRouter(Show);
