import React from 'react';
import { Query } from 'react-apollo';
import { GET_SHOWS } from './queries';
import { withRouter } from 'react-router-dom';

import './shows.css';

class Shows extends React.Component {

    handleClickLine = (e) => {
        const full = e.target.parentElement.querySelector('.full');
        if (full) {
            full.classList.add('view');
            full.style.top = e.target.getBoundingClientRect().top + 'px';
            full.style.left = e.target.getBoundingClientRect().left + 'px';
        }
    };

    handleClickFull = (e) => {
        e.target.classList.remove('view');
    };

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
                        <ShowList
                            handleClickRow={this.handleClickRow}
                            handleClickLine={this.handleClickLine}
                            handleClickFull={this.handleClickFull}
                        />
                    </tbody>
                </table>
            </>
        );
    }
}

export default withRouter(Shows);

const ShowList = ({handleClickRow, handleClickLine, handleClickFull}) => {
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
                    <tr key={id} onClick={(e) => handleClickRow(e, id)}>
                        <td>{name}</td>
                        <td>{type}</td>
                        <td className="notel">{status}</td>
                        <td>{premiered}</td>
                        <td className="noclick notel"><a href={officialSite} target="_blank" rel="noopener noreferrer">{officialSite}</a></td>
                        <td className="noclick notel bilde">
                            <img src={image.medium} alt="" className="line" onClick={handleClickLine}/>
                            <img src={image.medium} alt="" className="full" onClick={handleClickFull}/>
                        </td>
                    </tr>
                ));
            }}
        </Query>
    )
};
