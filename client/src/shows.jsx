import React from 'react';
import { Query } from 'react-apollo';
import { GET_SHOWS } from './queries';
import { withRouter } from 'react-router-dom';

import logo from './logo.svg';
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
        console.log('this.props', this.props);
        console.log('id', id);
        if (!e.target.classList.contains('noclick') && !e.target.parentElement.classList.contains('noclick')) {
            this.props.history.push('/show/' + id);
        }
    };

    render () {
        return (
            <>
                <header className="header">
                    <img src={logo} className="logo" alt="logo"/>
                </header>
                <table className="shows">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Premiere</th>
                            <th>Webside</th>
                            <th>Bilde</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                    <tr key={id} className="show" onClick={(e) => this.handleClickRow(e, id)}>
                                        <td>{name}</td>
                                        <td>{type}</td>
                                        <td>{status}</td>
                                        <td>{premiered}</td>
                                        <td className="noclick"><a href={officialSite} target="_blank" rel="noopener noreferrer">{officialSite}</a></td>
                                        <td className="noclick">
                                            <img src={image.medium} alt="" className="line" onClick={this.handleClickLine}/>
                                            <img src={image.medium} alt="" className="full" onClick={this.handleClickFull}/>
                                        </td>
                                    </tr>
                                ));
                            }}
                        </Query>
                    </tbody>
                </table>
            </>
        );
    }
}

export default withRouter(Shows);
