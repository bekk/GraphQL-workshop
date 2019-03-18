import React from 'react';
import { Query } from 'react-apollo';
import { GET_SHOWS } from './queries';
import { withRouter } from 'react-router-dom';

import './shows.css';

class Shows extends React.Component {

    handleClickRow = (e, id) => {
        if (!e.target.classList.contains('noclick') && !e.target.parentElement.classList.contains('noclick')) {
            this.props.history.push('/show/' + id);
        }
    };

    render () {
        return (
            <>
                <table className="shows">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Type</th>
                            <th className="notel">Status</th>
                            <th>Premiere</th>
                            <th className="notel">Webside</th>
                            <th className="notel">Bilde</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ShowList handleClickRow={this.handleClickRow} />
                    </tbody>
                </table>
            </>
        );
    }
}

export default withRouter(Shows);

const ShowList = ({handleClickRow}) => {
    return (
        <Query query={GET_SHOWS}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <tr>
                        <td colSpan={6}>Laster...</td>
                    </tr>;
                }
                if (error) {
                    return <tr>
                        <td colSpan={6}>Feil!</td>
                    </tr>;
                }

                return data.shows.map((
                    {
                        id, name, type, status, premiered, officialSite, image
                    }) => (
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{type}</td>
                        <td className="notel">{status}</td>
                        <td>{premiered}</td>
                        <td className="noclick notel"><a href={officialSite} target="_blank" rel="noopener noreferrer">{officialSite}</a></td>
                        <td className="noclick notel bilde">
                            <img src={image.medium} alt="" className="line"/>
                        </td>
                    </tr>
                ));
            }}
        </Query>
    )
};
