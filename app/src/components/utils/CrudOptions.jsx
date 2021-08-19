import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './CrudOptions.css';

export default function CrudOptions (){
    return(
        <div className="crud-options">
            <Button variant="info" size="sm" title="Visualizar"><FontAwesomeIcon icon={faInfo} title="Editar"/></Button>{' '}
            <Button variant="primary" size="sm" title="Editar"><FontAwesomeIcon icon={faEdit} title="Editar"/></Button>{' '}
            <Button variant="danger" size="sm" title="Excluir"><FontAwesomeIcon icon={faTrashAlt} title="Apagar"/></Button>
        </div>
    );
};