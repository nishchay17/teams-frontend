import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "rebass";

const ShowJoiningKeyModal = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-text"
        dialogClassName="modal-style"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowJoiningKeyModal;
