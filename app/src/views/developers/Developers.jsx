import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faArrowLeft, faArrowRight, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Button, Modal, Form } from 'react-bootstrap';
import { useFetch } from '../../hooks/useFetch';
import CrudOptions from '../../components/utils/CrudOptions';
import DevelopersService from '../../services/developers';

import './Developers.css';

const url = 'http://localhost:8000/developers?';

const Developers = (props) => {
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('N');
    const [hobby, setHobby] = useState('');
    const [datanascimento, setDatanascimento] = useState('');
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    //const [pageLimit, setPageLimit] = useState(2);
    const pageLimit = 5;
    const [firstPage, setFirstPage] = useState(true);
    const [lastPage, setLastPage] = useState(false);
    const [filter, setFilter] = useState('nome');
    const [textFilter, setTextFilter] = useState('');

    //const url = 'http://localhost:8000/developers?';
    //const response = useFetch(url + `pageLimit=${pageLimit}&page=${currentPage}`);    
    //const url = `http://localhost:8000/developers?pageLimit=${pageLimit}&page=${currentPage}&${filter}=${textFilter}`;

    const [urlParams, setUrlParams] = useState('');
    //const response = useFetch(urlParams);
    const [response, setResponse] = useState({loading:true, data:''});    

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        if (urlParams){
            const fetchData = async () => {
                const data = await await DevelopersService.getFiltered(urlParams);           
                setResponse({loading: false, data: data.data});
             }      
             fetchData();
        }        
    }, [urlParams]);

    useEffect(function () {
        if (textFilter) {
            setUrlParams(url + `pageLimit=${pageLimit}&page=${currentPage}&${filter}=${textFilter}`);
        } else {
            setUrlParams(url + `pageLimit=${pageLimit}&page=${currentPage}`);
        }
    }, [currentPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (textFilter) {
                setUrlParams(url + `pageLimit=${pageLimit}&${filter}=${textFilter}`);
            } else {
                setUrlParams(url + `pageLimit=${pageLimit}`);
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
                <td className="table-crud-options">
                    <CrudOptions
                        registerName='desenvolvedor'
                        registerId={state.id}
                        crudOperation={crudOperation}
                        resource='developers'
                    />
                </td>
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

    const crudOperation = useCallback(function (operation, id) {
        console.log('crudOperation');
        switch (operation) {
            case 'edit': editDeveloper(id); break;
            case 'del': deleteDeveloper(id); break;
            default: setError(true);
        }
    }, []);

    async function editDeveloper(id) {
        console.log('editDeveloper: ' + id);
    }

    async function deleteDeveloper(id) {
        await DevelopersService.delete(id);
    }
    
    function cleanModalDev() {
        setNome('');
        setSexo('');
        setHobby('');
        setDatanascimento('');
    }

    function cancelModalDev() {
        setShow(false);
        cleanModalDev();
    };

    const submitModalDev = async (e) => {
        e.preventDefault();
        try {
            const developer = await DevelopersService.include(
                {nome, sexo, hobby, datanascimento}
            );
            console.log('dev response', developer);
            cleanModalDev();
            setShow(false);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card">
                <div className="card-header">
                    <h2>Developers <button className="btn btn-success" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Novo</button></h2>
                    <form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Filtro</InputGroup.Text>
                                <select className="form-select filter"
                                    defaultValue={filter} onChange={handleChange}>
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
                            {!response.loading ? showStates(response.data.data ? response.data.data : response.data) : false}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-center">
                    <Button id="previus-page" disabled={firstPage} variant="outline-primary"
                        onClick={() => setCurrentPage(currentPage - 1)}><FontAwesomeIcon icon={faArrowLeft} /> Anterior</Button>{' '}
                    <Button id="next-page" disabled={lastPage} variant="outline-primary"
                        onClick={() => setCurrentPage(currentPage + 1)}>Próximo <FontAwesomeIcon icon={faArrowRight} /></Button>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Developers</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitModalDev} className="form-developer">
                <Modal.Body>                    
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text"
                                value={nome} onChange={e => setNome(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Sexo</Form.Label>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="genero mb-3"
                                    /* onChange={setGender.bind(this)} */
                                    onChange={e => setSexo(e.target.value)}
                                >
                                    <Form.Check
                                        inline
                                        label="Masculino"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        value="M"
                                    />
                                    <Form.Check
                                        inline
                                        label="Feminino"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        value="F"
                                    />
                                    <Form.Check
                                        inline
                                        label="Não Binário"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-3`}
                                        value="N"
                                    />
                                </div>
                            ))}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Hobby</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={hobby} onChange={e => setHobby(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control type="date"
                                value={datanascimento} onChange={e => setDatanascimento(e.target.value)}
                            />
                        </Form.Group>                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={cancelModalDev}><FontAwesomeIcon icon={faTimes} /> Cancelar</Button>
                    <Button variant="success" type="submit"><FontAwesomeIcon icon={faSave} /> Salvar</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default Developers;