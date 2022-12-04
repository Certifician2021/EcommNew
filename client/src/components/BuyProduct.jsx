import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container,Row } from "reactstrap";

export default function BuyProduct({ data, closeModal, setShow, show }) {
  console.log(data);

  const handleClose = () => {
    setShow(false);
    closeModal();
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto" }}>
             <h4 style={{textAlign:"center"}}>Select Payment Mode</h4>
             <Container>
                
             </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
