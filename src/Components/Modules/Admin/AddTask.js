import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Sidebar from "../../library/Sidebar";
import Username from "../../library/Username";
import Select from "react-select";
import axios from "axios";
import { useUser } from "../../../Provider/UserProvider";
import FormInput from "../../Form/FormInput";
import { useForm } from "react-hook-form";
import { Label, Textarea } from "@rebass/forms";
import { Button } from "rebass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import Container from "../../library/Container";

const AddTask = () => {
  const { userDetails } = useUser();
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingUserList, setIsFetchingUserList] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    label: "Select employee",
    value: "",
  });
  const [employees, setEmployees] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setError("");
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  function resetAll() {
    reset();
    setSelectedEmployee({
      label: "Select employee",
      value: "",
    });
    setFile(null);
    setDescription("");
    setRefetch((re) => !re);
  }
  console.log(description);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => employeeList(), [userDetails]);

  const employeeList = async () => {
    console.log(userDetails);
    setIsFetchingUserList(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/all`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      const data = res.data.users;
      console.log(data);
      setEmployees(() => {
        let temp = [];
        data.map((employee) => {
          temp.push({
            label: employee.name,
            value: employee._id,
          });
        });
        return temp;
      });
      setIsFetchingUserList(false);
      console.log(employees);
    } catch (error) {
      console.log(error);
      setIsFetchingUserList(false);
    }
  };

  const isEmpty = (params) => {
    if (params === []) return true;
    else return false;
  };

  const handleChange = (e) => {
    setAssignedTo(e.value);
    setSelectedEmployee(e);
  };

  const handleDesChange = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const submitHandler = async (data) => {
    console.log(data);
    setError("");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", data.title);
    formData.append("description", description);
    formData.append("assignedTo", assignedTo);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/task/create/v2`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userDetails.userState.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (res.data.status) {
        resetAll();
        toast.success("Task added successfully!");
      } else {
        resetAll();
        setError(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      resetAll();
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="offset-md-11 pr-0 mt-3"></div>
      <div className="d-flex justify-content-between">
        <h3 className="mt-5">Add Task</h3>
        <Button
          className="mt-4 py-1"
          style={{ width: "8rem", height: "2.5rem" }}
          type="submit"
          form="add"
        >
          Add
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        id="add"
        className="row mt-5"
      >
        <Col md={5}>
          <FormInput
            label="Title"
            placeholder="Enter title"
            register={register}
            name="title"
            errors={errors}
            required
            type="text"
          />
        </Col>
        <Col md={5}>
          <Form.Group>
            <Form.Label className="mb-2 addTask">Assigned To</Form.Label>
            {isFetchingUserList ? (
              <p>Loading User list</p>
            ) : (
              <Select
                options={employees}
                placeholder={"Select employee"}
                onChange={handleChange}
                value={selectedEmployee}
                name={"assignedTo"}
                required
                isSearchable={true}
                isDisabled={isEmpty(employees)}
                classNamePrefix="select-employee"
                className="select-employee"
              />
            )}
          </Form.Group>
        </Col>
        <Col md={12} className="mt-2 ">
          <Label className="addTask">Description</Label>
          <Textarea
            name="description"
            placeholder="Type here"
            style={{ width: "53rem", borderColor: "#A7A7A7" }}
            className="add-description"
            onChange={handleDesChange}
            height="9rem"
            errors={errors}
            type="text"
          />
        </Col>
        <Col md={12} className="mt-5 ">
          <span className="addTask">Media</span>
          <div
            className="border border-secondary add-media"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop media here ...</p>
            ) : file ? (
              <> {file?.name} is selected </>
            ) : (
              <div>
                <p>Select or drag and drop file here</p>
              </div>
            )}
          </div>
        </Col>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default AddTask;
