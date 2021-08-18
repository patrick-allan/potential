import React from 'react';
import Menu from '../components/layout/Menu';
import Content from '../components/layout/Content';
import { BrowserRouter } from 'react-router-dom'
import './App.css';

const App = props => (
    <div className="App">
        <BrowserRouter>
            <Menu />
            <Content />
        </BrowserRouter>        
    </div>
);

export default App;