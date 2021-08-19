import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = props => (    
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>            
            <Link className="navbar-brand" to="/">PotentialApp</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/developers">Developers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">Sobre</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Menu;