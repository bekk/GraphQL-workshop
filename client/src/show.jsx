import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_SHOW } from './queries';
import Parser from 'html-react-parser';

import './show.css';

class Show extends React.Component {
    render() {
        const idNumber = parseInt(this.props.match.params.id);

        const showSeasons = (e) => {

        };

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

                    const distinctSeasons = [...new Set(data.show.episodes.map(episode => episode.season))];

                    return (
                        <>
                            <div key={data.show.id} className="show">
                                <h1>
                                    {data.show.name}{' '}
                                    <span className="aarstall">({data.show.premiered.split('-')[0]})</span>
                                </h1>
                                <div className="content">
                                    <div>
                                        <img src={data.show.image.medium} alt=""/>
                                    </div>
                                    <div>
                                        <div className="subtext">
                                            <span>{data.show.type}</span>
                                            {' | '}
                                            <span>{data.show.status}</span>
                                            {' | '}
                                            <span>{data.show.genres.join(' | ')}</span>
                                            {' | '}
                                            <span className="lenke">
                                    <a href={data.show.officialSite} target="_blank" rel="noopener noreferrer">{data.show.officialSite}</a>
                                </span>
                                        </div>
                                        <div className="summary">{Parser(data.show.summary)}</div>
                                        <div className="seasons">
                                            {distinctSeasons.map(season => {
                                                return <a href="#" onClick={showSeasons} key={season}>Season {season}</a>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => window.history.back()}>Back</button>
                        </>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(Show);
