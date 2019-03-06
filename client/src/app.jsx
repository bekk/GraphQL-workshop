import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Shows from './shows';
import Show from './show';
import Episode from './episode';

const App = () => {
    return (
        <main className="main">
            <BrowserRouter basename="/">
                <div>
                    <div className="side">
                        <Switch>
                            <Route path="/episode/:id" component={Episode}/>
                            <Route path="/show/:id" component={Show}/>
                            <Route path="/" component={Shows}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </main>
    );
};

export default App;
