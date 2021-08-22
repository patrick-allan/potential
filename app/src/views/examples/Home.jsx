import React from 'react';

const Home = props => (
    <div className="d-flex justify-content-center">    
        <div className="card">
            <div className="card-header">
                <h2>Boas vindas</h2>
            </div>
            <div className="card-body">                
                <p>Prova de Recrutamento 2021</p>
                <p>Projeto disponível no <a href="https://github.com/patrick-allan/potential">GitHub</a>.</p>
            </div>
            <div className="card-footer text-right">
                <a href="https://github.com/patrick-allan">Patrick Allan</a>
            </div>
        </div>
    </div>
);

export default Home;