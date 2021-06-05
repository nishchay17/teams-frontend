import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "rebass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUserModal = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    setShow(false);
    props.deleteUser();
    toast.success("User removed successfully!");
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-style"
        className="modal-text"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleDelete}
            style={{ marginRight: "1rem" }}
          >
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DeleteUserModal;
