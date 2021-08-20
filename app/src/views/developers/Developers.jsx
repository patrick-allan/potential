import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import { useFetch } from '../../hooks/useFetch';
import CrudOptions from '../../components/utils/CrudOptions';

import './Developers.css';

const url = 'http://localhost:8000/developers?';

const Developers = (props) => {
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(2);
    const [firstPage, setFirstPage] = useState(true);
    const [lastPage, setLastPage] = useState(false);
    const [filter, setFilter] = useState('nome');
    const [textFilter, setTextFilter] = useState('');

    //const url = 'http://localhost:8000/developers?';
    //const response = useFetch(url + `pageLimit=${pageLimit}&page=${currentPage}`);    
    //const url = `http://localhost:8000/developers?pageLimit=${pageLimit}&page=${currentPage}&${filter}=${textFilter}`;
        
    const [urlParams, setUrlParams] = useState(''); 
    const response = useFetch(urlParams);
    
    useEffect(function () {
        if (textFilter){
            setUrlParams(url+`pageLimit=${pageLimit}&page=${currentPage}&${filter}=${textFilter}`);
        }else{
            setUrlParams(url+`pageLimit=${pageLimit}&page=${currentPage}`);
        }        
    }, [currentPage]);  
          
    const handleSubmit = async (e) => {        
        e.preventDefault();        
        try {                        
            if (textFilter){
                setUrlParams(url+`pageLimit=${pageLimit}&${filter}=${textFilter}`);
            }else{
                setUrlParams(url+`pageLimit=${pageLimit}`);
            }            
        } catch (error) {            
            setError(true);
        }               
    }    
        
    function showStates(states) {
        return states.map(state =>
            <tr key={state.id}>
                <th>{state.id}</th>
                <td>{state.nome}</td>
                <td className="text-center">{state.sexo}</td>
                <td className="text-center">{state.idade}</td>
                <td className="table-crud-options"><CrudOptions /></td>
            </tr>
        );
    };  
    
    useEffect(function () {
        if (!response.loading) {
            setCurrentPage(response.data.current_page);

            if (response.data.last_page === currentPage) {
                setLastPage(true);
            } else {
                setLastPage(false);
            }

            if (currentPage === 1) {
                setFirstPage(true);
            } else {
                setFirstPage(false);
            }
        }
    }, [response]);
       
    const handleChange = (e) => {
        setFilter(e.target.value);        
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="card">
                <div className="card-header">
                    <h2>Developers <button className="btn btn-success"><FontAwesomeIcon icon={faPlus} /> Novo</button></h2>
                    <form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Filtro</InputGroup.Text>
                                <select className="form-select filter" defaultValue={filter} onChange={handleChange}>
                                    <option value="nome">Nome</option>
                                    <option value="idade">Idade</option>
                                </select>
                            </InputGroup.Prepend>
                            <FormControl
                                value={textFilter}
                                onChange={e => setTextFilter(e.target.value)}  
                            />
                            <InputGroup.Append>
                                <Button type="submit"><FontAwesomeIcon icon={faSearch} /> Buscar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                </div>
                <div className="card-body">
                    <div className="mb-1">
                        {error && <div className="alert alert-danger" role="alert">Dados Incorretos. {error}  </div>}
                    </div>
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
                            {!response.loading ? showStates(response.data.data?response.data.data:response.data) : false}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-center">
                    <Button id="previus-page" disabled={firstPage} variant="outline-primary" onClick={() => setCurrentPage(currentPage - 1)}><FontAwesomeIcon icon={faArrowLeft} /> Anterior</Button>{' '}
                    <Button id="next-page" disabled={lastPage} variant="outline-primary" onClick={() => setCurrentPage(currentPage + 1)}>Próximo <FontAwesomeIcon icon={faArrowRight} /></Button>
                </div>
            </div>
        </div>
    );
};

export default Developers;