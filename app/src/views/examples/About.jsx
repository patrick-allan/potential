import React from 'react';

const About = props => (
    <div className="d-flex justify-content-center">
        <div className="card">
            <div className="card-header">
                <h2>Sobre</h2>
            </div>
            <div className="card-body">
                <ul>
                    <li><b>Requisitos: </b><a href="https://gitlab.com/felipe.furtuoso538/pontential-crud">Gitlab</a></li>
                    <li><b>Front-end: </b><a href="https://pt-br.reactjs.org/">REACT</a></li>
                    <li><b>Back-end: </b><a href="https://lumen.laravel.com/">Lumen (Laravel)</a></li>
                    <li><b>DataBase: </b><a href="https://www.mysql.com/">MySQL</a></li>
                </ul>
            </div>
        </div>
    </div>
);

export default About;