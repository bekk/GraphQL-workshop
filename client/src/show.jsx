import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import { CREATE_COMMENT, GET_SHOW } from './queries';
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
                                                <a href={data.show.officialSite} target="_blank" rel="noopener noreferrer">
                                                    {data.show.officialSite}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="summary">{Parser(data.show.summary)}</div>
                                        <div className="seasons">
                                            {distinctSeasons.map(season => {
                                                return (
                                                    <span key={season}>Season {season}</span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="comments">
                                    <h2>Comments:</h2>
                                    <ul>
                                    {data.show.comments && data.show.comments.map((comment, index) => {
                                        return (
                                            <li className="comment" key={index}>
                                                {comment}
                                            </li>
                                        )
                                    })}
                                    </ul>
                                </div>
                            </div>
                            <button className="tilbake" onClick={() => window.history.back()}>Back</button>
                            <CreateComment showId={data.show.id}/>
                        </>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(Show);

const CreateComment = ({showId}) => {
    let textarea;

    return (
        <Mutation mutation={CREATE_COMMENT}>
            {(createComment) => (
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        createComment({ variables: { showId: showId,  comment: textarea.value } });
                        textarea.value = "";
                    }}
                >
                    <textarea rows={3} cols={30} ref={node => {
                        textarea = node
                    }}
                    />
                    <button type="submit">Add Comment</button>
                </form>
            )}
        </Mutation>
    );
};
