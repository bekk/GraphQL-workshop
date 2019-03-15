import React from 'react';
import { Query } from 'react-apollo';
import { GET_SHOWS } from './queries';
import { withRouter } from 'react-router-dom';

import './shows.css';

class Shows extends React.Component {

    handleClickLine = (e) => {
        this.handleClickFull();
        const full = e.target.parentElement.querySelector('.full');
        if (full) {
            full.classList.add('view');
            full.style.top = e.target.getBoundingClientRect().top + 'px';
            full.style.left = e.target.getBoundingClientRect().left + 'px';
        }
    };

    handleClickFull = () => {
        const expanded = document.querySelectorAll('img.full');
        expanded.forEach(img => {
            img.classList.remove('view');
        });
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

const ShowList = () => {
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
                        id, name, officialSite
                    }) => (
                    <tr key={id}>
                        <td>{name}</td>
                    </tr>
                ));
            }}
        </Query>
    )
};
