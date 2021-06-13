import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Button } from "rebass";
import FormInput from "../Form/FormInput";
import { AiOutlineClose } from "react-icons/ai";

const AddUserModal = (props) => {
  const [show, setShow] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setShow(false);
    props.hideAddUserModal();
  };

  const submitHandler = (data) => {
    console.log(data);
    setShow(false);
    props.addUser(data);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-style"
        className="modal-text"
      >
        <Modal.Header>
          <AiOutlineClose
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={handleClose}
          />
        </Modal.Header>
        <Modal.Body>
          {props.text}
          <FormInput
            register={register}
            placeholder={"Enter email"}
            name="email"
            errors={errors}
            required
            type="text"
            className="modal-text"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit(submitHandler)}
            style={{ width: "5rem", height: "3rem" }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUserModal;
