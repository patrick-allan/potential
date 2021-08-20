import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfo, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import './CrudOptions.css';

const CrudOptions = (props) => {
    const [modalDelete, setModalDelete] = useState(false);
    const handleClose = () => setModalDelete(false);
    const handleShow = () => setModalDelete(true);

    function confirmDelete(){        
        setModalDelete(false);
        props.crudOperation('del', props.registerId);
    }

    return (
        <div className="crud-options">
            <Button variant='info' size="sm" title="Visualizar" onClick={() => props.crudOperation('info', props.registerId)}>
                <FontAwesomeIcon icon={faInfo}/>
            </Button>{' '}

            <Button variant="primary" size="sm" title="Editar" onClick={() => props.crudOperation('edit', props.registerId)}>
                <FontAwesomeIcon icon={faEdit}/>
            </Button>{' '}
            
            <Button variant="danger" size="sm" title="Excluir" onClick={handleShow}>
                <FontAwesomeIcon icon={faTrashAlt}/>
            </Button>

            <Modal show={modalDelete} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirme a exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente excluir o registro de {props.registerName} {props.registerId}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes}/> Cancelar
                    </Button>
                    <Button variant="success" onClick={confirmDelete}>
                        <FontAwesomeIcon icon={faCheck}/> Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CrudOptions;