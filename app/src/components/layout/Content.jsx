import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '../../views/examples/About';
import Home from '../../views/examples/Home';
import Developers from '../../views/developers/Developers';
import NotFound from '../../views/examples/NotFound';
import './Content.css';

const Content = () => (
    <main>
        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/developers">
                <Developers />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    </main>
);

export default Content;