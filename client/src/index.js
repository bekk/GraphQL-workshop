import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './app';

import './index.css';

const cache = new InMemoryCache();
const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>,
	document.getElementById('root')
);
