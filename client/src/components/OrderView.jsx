import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container,Row } from "reactstrap";

export default function OrderView({ transactionID, orderID, closeModal, setShow, show }) {

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
             <h4 style={{textAlign:"center"}}>Order Status</h4>
             <h5 style={{color:"green",textAlign:"center"}}>Payment Successfull!!</h5>
             <span style={{color:"blue"}}>Order ID - {orderID}</span><br/>
             <span style={{color:"blue"}}>Transaction ID - {transactionID}</span>
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
