import React, { Component, useState } from 'react';
import {Button, Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter} from 'react-bootstrap'

function Modal_warning(props) {

    const [show, setShow] = useState(props);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (          
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Atenção</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.conteudo}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>            
          </Modal.Footer>
        </Modal>      
    );

}

export default Modal_warning;