import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Sidebar from "../../library/Sidebar";
import Username from "../../library/Username";
import Select from "react-select";
import axios from "axios";
import { useUser } from "../../../Provider/UserProvider";
import FormInput from "../../Form/FormInput";
import { useForm } from "react-hook-form";
import { Label } from "@rebass/forms";
import { Button } from "rebass";

const AddTask = () => {
  const { userDetails } = useUser();
  const [assignedTo, setAssignedTo] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => employeeList(), [userDetails]);

  let employees = [];

  const employeeList = async () => {
    console.log(userDetails);
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/all`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      const data = res.data.users;
      console.log(data);
      data.map((employee) => {
        employees.push({
          label: employee.name,
          value: employee._id,
        });
      });
      console.log(employees);
    } catch (error) {
      console.log(error);
    }
  };

  const isEmpty = (params) => {
    if (params === []) return true;
    else return false;
  };

  const handleChange = (e) => {
    setAssignedTo(e.value);
  };

  const submitHandler = async (data) => {
    let reqData = {
      name: data.title,
      description: data.description,
      assignedTo: assignedTo,
    };
    console.log(reqData);
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/task/create`,
      {
        ...reqData,
      },
      {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      }
    );
    console.log(res);
    reset();
    /*try {
        const res = await axios.post(`${process.env.REACT_APP_URL}/task/create`, {
          headers: { Authorization: `Bearer ${userDetails.userState.token}` },
        });
        const data = res.data.user;
        console.log(data);
        setTask(data);
      } catch (error) {
        console.log(error);
      }*/
  };

  return (
    <div>
      <Container>
        <Sidebar />
        <div className="offset-md-11 pr-0 mt-3">
          <Username />
        </div>
        <h3 className="mt-5 offset-md-1">Add Task</h3>
        <Row className="mt-5 offset-md-1">
          <Col md={5}>
            <FormInput
              label="Title"
              register={register}
              name="title"
              errors={errors}
              required
              type="text"
            />
          </Col>
          <Col md={5}>
            <Form>
              <Form.Group>
                <Form.Label className="addTask">Assigned To</Form.Label>
                <Select
                  options={employees}
                  placeholder={"Select employee"}
                  onChange={handleChange}
                  name={"assignedTo"}
                  isSearchable={true}
                  isDisabled={isEmpty(employees)}
                  className={"select-employee"}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={5} className="mt-5 ">
            <FormInput
              label="Description"
              register={register}
              name="description"
              placeholder="Type here"
              errors={errors}
              required
              type="text"
            />
          </Col>
        </Row>
        <Button marginLeft="49rem" onClick={handleSubmit(submitHandler)}>
          Add Task
        </Button>
      </Container>
    </div>
  );
};

export default AddTask;
/**
 * onChange={handleChange}
                  value={props.transactionTypes.filter(function (option) {
                    return option.value === transactionType;
                  })}
        <Form className="mt-5 offset-md-3">

                  isDisabled={!isNotEmpty(employees)}
                  <Form.Group>
                <Form.Label className="addTask">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  onChange={handleChange}
                  style={{ width: "20rem", height: "3rem" }}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Label className="addTask">Assigned To</Form.Label>
                <Select
                  options={employees}
                  placeholder={"Select employee"}
                  onChange={handleChange}
                  name={"assignedTo"}
                  isSearchable={true}
                  isDisabled={isEmpty(employees)}
                />
              </Form.Group>
            </Col>
            <Col md={5} className="mt-5">
              <Form.Group>
                <Form.Label className="addTask">Description</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Add description"
                  onChange={handleChange}
                  style={{ width: "46rem", height: "10rem" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" onClick={submitHandler}>
            Submit
          </Button>
        </Form>
    
 */
