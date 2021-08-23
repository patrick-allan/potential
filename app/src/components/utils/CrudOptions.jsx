import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfo, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import CrudService from '../../services/crudService';
import './CrudOptions.css';

const CrudOptions = (props) => {
    const [error, setError] = useState('');
    
    const [modalDelete, setModalDelete] = useState(false);
    const handleCloseDelete = () => setModalDelete(false);
    const handleShowDelete = () => setModalDelete(true);
    
    const [modalInfo, setModalInfo] = useState(false);
    const handleCloseInfo = () => setModalInfo(false);    

    const [info, setInfo] = useState('');    

    function confirmDelete() {
        setModalDelete(false);
        props.crudOperation('del', props.registerId);
    };

    function ShowInfo(informacoes){     
        return informacoes.map(state =>
            <tr key={state.key}>
                <td>{state.key}</td>
                <td>{state.key==='sexo'? genderDescription(state.value) : state.value}</td>
            </tr>
        );
    };

    function genderDescription(gender){
        switch (gender){
            case 'M': return 'Masculino';
            case 'F': return 'Feminino';
            case 'N': return 'Não Binário';
            default: return 'N/D';
        }
    }

    const loadInfo = async (e) => {                
        try {
            const apiData = await CrudService.info(props.resource, props.registerId);
            if (apiData.status === 200){
                let myArray = [];
                for (var [key, value] of Object.entries(apiData.data)) {
                    myArray.push({key, value});
                }
                setInfo(myArray);
                setModalInfo(true);
            }else{
                alert('Não foi possível consultar as informações.');
            }
        } catch (error) {
            setError(error);
        }
    };

    useEffect(function () {
        if (error){
            alert(error);
        }        
    }, [error]);

    return (
        <div className="crud-options">
            <Button variant='info' size="sm" title="Visualizar" onClick={loadInfo}>
                <FontAwesomeIcon icon={faInfo} />
            </Button>{' '}

            <Button variant="primary" size="sm" title="Editar" onClick={() => props.crudOperation('edit', props.registerId)}>
                <FontAwesomeIcon icon={faEdit} />
            </Button>{' '}

            <Button variant="danger" size="sm" title="Excluir" onClick={handleShowDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <Modal
                show={modalDelete}
                onHide={handleCloseDelete}
                animation={false}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirme a exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir o registro de {props.registerName} {props.registerId}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseDelete}>
                        <FontAwesomeIcon icon={faTimes} /> Cancelar
                    </Button>
                    <Button variant="success" onClick={confirmDelete}>
                        <FontAwesomeIcon icon={faCheck} /> Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={modalInfo}
                onHide={handleCloseInfo}
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Informações Detalhadas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Identificador</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {info ? ShowInfo(info): false}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseInfo}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CrudOptions;