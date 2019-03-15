import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_SHOW } from './queries';
import Parser from 'html-react-parser';

import './show.css';

class Show extends React.Component {
    render() {
        const idNumber = parseInt(this.props.match.params.id);

        return (
            <Query query={GET_SHOW} variables={{ idNumber }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div>Laster...</div>;
                    }
                    if (error) {
                        return <div>Feil!</div>;
                    }

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
                                                <a href={data.show.officialSite} target="_blank" rel="noopener noreferrer">
                                                    {data.show.officialSite}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="summary">{Parser(data.show.summary)}</div>
                                    </div>
                                </div>
                            </div>
                            <button className="tilbake" onClick={() => window.history.back()}>Back</button>
                        </>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(Show);
