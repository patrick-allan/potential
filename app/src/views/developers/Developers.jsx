import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import { useFetch } from '../../hooks/useFetch';
import CrudOptions from '../../components/utils/CrudOptions';

import './Developers.css';

const Developers = (props) => {
    const url = 'http://localhost:8000/developers';
    const response = useFetch(url);

    function showStates(states){
        return states.map(state => <li key={state.sigla}>{state.nome} - {state.sigla}</li>)
    }
    return(
        <div className="d-flex justify-content-center">
            <div className="card">
                <div className="card-header">
                    <h2>Developers <button className="btn btn-success"><FontAwesomeIcon icon={faPlus} /> Novo</button></h2>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Filtro</InputGroup.Text>
                            <select className="form-select filter">
                                <option value="nome" defaultValue>Nome</option>
                                <option value="idade">Idade</option>
                            </select>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <InputGroup.Append>
                            <Button><FontAwesomeIcon icon={faSearch} /> Buscar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col" className="text-center">Sexo</th>
                                <th scope="col" className="text-center">Idade</th>
                                <th scope="col" className="table-crud-options">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Patrick Allan</td>
                                <td className="text-center">M</td>
                                <td className="text-center">26</td>
                                <td className="table-crud-options"><CrudOptions /></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Elizângela</td>
                                <td className="text-center">F</td>
                                <td className="text-center">22</td>
                                <td></td>
                            </tr>
                            {!response.loading ? showStates(response.data) : false}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">
                    footer
                </div>
            </div>
        </div>
    );
};

export default Developers;