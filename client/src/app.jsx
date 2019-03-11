import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Shows from './shows';
import Show from './show';
import Episode from './episode';
import logo from "./logo.svg";

const App = () => {
    return (
        <BrowserRouter basename="/">
            <>
                <header className="header">
                    <img src={logo} className="logo" alt="logo"/>
                </header>
                <main className="main">
                    <Switch>
                        <Route path="/episode/:id" component={Episode}/>
                        <Route path="/show/:id" component={Show}/>
                        <Route path="/" component={Shows}/>
                    </Switch>
                </main>
            </>
        </BrowserRouter>
    );
};

export default App;
