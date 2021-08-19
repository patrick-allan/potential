import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Menu.css';

export default function Menu() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>                
                <Link className="navbar-brand" to="/">
                    <img
                    src="/logo192.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    />
                    PotentialApp 
                </Link>                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/developers">Developers</Link>
                        <Link className="nav-link" to="/about">Sobre</Link>                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};