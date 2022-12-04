import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Product({ data, closeModal, setShow, show }) {
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
          <Modal.Title>{data.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto" }}>
          <div style={{ display: "flex" }}>
            <img
              alt={data.productName}
              src={data.productImageUrl}
              style={{ height: "300px" }}
            />
            <div style={{ margin: "20px" }}>
              <h3>{data.productName}</h3>
              <span style={{ color: "blue", fontSize: "12px" }}>
                Visit the Store
              </span>
              <br />
              <span style={{ color: "blue", fontSize: "12px" }}>
                195 Ratings
              </span>
              <div style={{fontWeight:"500"}}>About this item :</div>
              <p style={{fontSize:"14px"}}>
                {data.productDescription}
              </p>
            </div>
          </div>
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
