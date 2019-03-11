import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import { GET_SHOW } from "./queries";

class Show extends React.Component {
    render() {
        console.log('param:id', this.props.match.params.id);
        return (
            <section className="show">
                <h1>SCHJÅVV! {this.props.match.params.id}</h1>
                <ShowList id={this.props.match.params.id}/>
            </section>
        );
    }
}

export default withRouter(Show);

const ShowList = ({ id }) => {
    var idNumber = parseInt(id);
    console.log('id', id);
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
                        <div>{data.show.name}</div>
                        <div>{data.show.type}</div>
                        <div>{data.show.status}</div>
                        <div>{data.show.premiered}</div>
                        <div><a href={data.show.officialSite} target="_blank" rel="noopener noreferrer">{data.show.officialSite}</a></div>
                        <div>
                            <img src={data.show.image.medium} alt=""/>
                        </div>
                    </div>
                );
            }}
        </Query>
    )
};
