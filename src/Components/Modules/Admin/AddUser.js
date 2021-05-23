import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Sidebar from "../../library/Sidebar";
import Username from "../../library/Username";
import Select from "react-select";
import axios from "axios";
import { useUser } from "../../../Provider/UserProvider";
import FormInput from "../../Form/FormInput";
import { useForm } from "react-hook-form";
import { Label } from "@rebass/forms";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import UsersInfo from "./UsersInfo";

const AddUser = () => {
  const { userDetails } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const button = () => {
    console.log("button clicked");
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/all`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      const data = res.data.users;
      console.log(data);
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Sidebar />
        <div className="offset-md-11 pr-0 mt-3">
          <Username />
        </div>
        <div className="mt-5">
          <h3 className="offset-md-1 users-count-text">
            All Users
            <span className="task-count-circle">{allUsers.length}</span>
          </h3>
          <div className="offset-md-11 pr-0 add-user-btn" onClick={button}>
            <IconContext.Provider value={{ size: "2rem" }}>
              <span>
                <AiOutlinePlus className="plus-icon" />{" "}
              </span>
              <span className="plus-icon-text">User</span>
            </IconContext.Provider>
          </div>
        </div>
        {allUsers.map((user) => {
          return (
            <UsersInfo
              userName={user.name}
              assigned={user.taskAssigned}
              inProgress={user.taskInProgress}
              completed={user.taskCompleted}
              empId={user.employeeId}
              id={user._id}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default AddUser;
