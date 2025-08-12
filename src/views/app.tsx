import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import NoMatch from './no_match';
import ReactGA from 'react-ga';

const App: React.FC = () => {
    useEffect(() => {
        // TEMPORARILY DISABLED TO TEST FOR BANNER SOURCE
        // ReactGA.initialize('UA-110182129-1');
        // ReactGA.pageview('Init page view');
    }, []);

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    );
};

export default App;
