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

    //const [infoLoaded, setInfoLoaded] = useState('');
    const [modalInfo, setModalInfo] = useState(false);
    const handleCloseInfo = () => setModalInfo(false);
    //const handleShowInfo = () => setModalInfo(true);

    const [info, setInfo] = useState('');
    const [infoKey, setInfoKey] = useState('');

    function confirmDelete() {
        setModalDelete(false);
        props.crudOperation('del', props.registerId);
    }

    function ShowInfo(informacoes){
        console.log('ShowInfo', informacoes);
        return ';';
    }

    const loadInfo = async (e) => {                
        try {
            const apiData = await CrudService.info(props.resource, props.registerId);
            if (apiData.status === 200){
                let arr = [];
                for (var [key, value] of Object.entries(apiData.data)) {
                    arr[key] = value;                    
                }
                console.log('obj: ', apiData.data);
                console.log('arr: ', arr);
                setInfo(arr);
                setModalInfo(true);
            }else{
                alert('Não foi possível consultar as informações.');                
            }            
        } catch (error) {
            setError(error);
        }
    }   

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
                    {info.id ? ShowInfo(info) : ''}
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