import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Shows from './shows';
import Show from './show';
import logo from './imdb.jpg';

const App = () => {
	return (
		<BrowserRouter basename="/">
            <>
                <header className="header">
					<div className="limit">
                    	<img src={logo} className="logo" alt="logo"/>
                    </div>
                </header>
                <main className="main">
					<div className="limit">
						<Switch>
							<Route path="/show/:id" component={Show}/>
							<Route path="/" component={Shows}/>
						</Switch>
					</div>
                </main>
				<footer></footer>
            </>
		</BrowserRouter>
	);
};

export default App;
