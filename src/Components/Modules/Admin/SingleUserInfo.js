import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { Redirect, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useUser } from "../../../Provider/UserProvider";
import Username from "../../library/Username";
import { Button } from "rebass";
import ShowModal from "../../library/ShowModal";
import Container from "../../library/Container";
import Loader from "../../library/Loader";

const SingleUserInfo = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [assignCount, setAssignCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [removeFlag, setRemoveFlag] = useState(false);
  const [adminFlag, setAdminFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const params = useParams();
  const { userDetails } = useUser();

  useEffect(() => getEmployees(), []);
  useEffect(() => getSelectedEmployee(), [allUsers]);

  useEffect(() => {
    setAssignCount(user?.taskAssigned?.length);
    setProgressCount(user?.taskInProgress?.length);
    setCompletedCount(user?.taskCompleted?.length);
  }, [user]);

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/all`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      const data = res.data.users;
      console.log(data);
      setAllUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getSelectedEmployee = () => {
    allUsers.map((user) => {
      if (user._id === params.id) {
        console.log(user);
        setUser(user);
      }
    });
  };

  const getDate = (assignDate) => {
    let date;
    date = moment(assignDate).format("MMMM D, YYYY");
    return date;
  };

  const showRemoveUserModal = () => {
    setRemoveFlag(true);
    setAdminFlag(false);
  };

  const hideRemoveUserModal = () => {
    setRemoveFlag(false);
    setAdminFlag(false);
  };

  const deleteUser = async () => {
    console.log(user);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}/user/delete/${user._id}`,
        {
          headers: { Authorization: `Bearer ${userDetails.userState.token}` },
        }
      );
      const data = res.data.user;
      console.log(data);
      hideRemoveUserModal();
      history.push("/all-users");
    } catch (error) {
      console.log(error);
    }
  };

  const makeAdmin = async (data) => {
    let reqData = {
      employeeId: user.employeeId,
    };
    console.log(reqData);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_URL}/user/make-admin`,
        {
          ...reqData,
        },
        {
          headers: { Authorization: `Bearer ${userDetails.userState.token}` },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const showMakeAdminModal = () => {
    setAdminFlag(true);
    setRemoveFlag(false);
  };

  const hideMakeAdminModal = () => {
    setAdminFlag(false);
    setRemoveFlag(false);
  };

  return (
    <Container>
      {isLoading ? (
        <div style={{ height: "35rem" }}>
          <Loader />
        </div>
      ) : (
        <div>
          <div className=" mt-3 pr-0 mt-3"></div>
          <div style={{ display: "flex" }}>
            <h3 className="mt-5 " style={{ marginRight: "2rem" }}>
              User Information
            </h3>
            {!user.isAdmin && (
              <Button
                className="mt-5 py-1"
                style={{ width: "10rem", height: "2.5rem" }}
                onClick={showMakeAdminModal}
              >
                Make Admin
              </Button>
            )}
          </div>

          <div
            className="mt-2 align-items-center user-info"
            style={{ display: "flex" }}
          >
            <span>
              <div>Name</div>
              <div>{user.name}</div>
            </span>
            <span style={{ marginLeft: "3rem" }}>
              <div>Email</div>
              <div>{user.email}</div>
            </span>
            <span style={{ marginLeft: "3rem" }}>
              <div>Employee Id</div>
              <div>{user.employeeId}</div>
            </span>
            <span style={{ marginLeft: "auto" }}>
              <Button
                onClick={showRemoveUserModal}
                style={{ backgroundColor: "#ee5a5a" }}
              >
                Remove User
              </Button>
            </span>
          </div>

          <h3 className="mt-5 ">Tasks</h3>
          <Row className="mt-4 ">
            <Col sm={4}>
              <Card className="assigned">
                <Card.Body style={{ width: "100%", height: "100%" }}>
                  <Card.Title>
                    Assigned{" "}
                    <span className="task-count-circle">{assignCount}</span>
                  </Card.Title>
                  {user?.taskAssigned?.map((item) => (
                    <Card className="bg-primary mt-3">
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <span className="assignInfo">
                          Assigned by {item.assignedBy.name} on{" "}
                          {getDate(item.createdAt)}
                        </span>
                        <br />
                        <a href={`/tasks/${item._id} `}>More...</a>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
              <Card className="in-progress">
                <Card.Body style={{ width: "100%", height: "100%" }}>
                  <Card.Title>
                    In Progress
                    <span className="task-count-circle">{progressCount}</span>
                  </Card.Title>
                  {user?.taskInProgress?.map((item) => (
                    <Card className="bg-primary mt-3">
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <span className="assignInfo">
                          Assigned by {item.assignedBy.name} on{" "}
                          {getDate(item.createdAt)}
                        </span>
                        <br />
                        <a href={`/tasks/${item._id} `}>More...</a>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
              <Card className="completed">
                <Card.Body style={{ width: "100%", height: "100%" }}>
                  <Card.Title>
                    Completed
                    <span className="task-count-circle">{completedCount}</span>
                  </Card.Title>
                  {user?.taskCompleted?.map((item) => (
                    <Card className="bg-primary mt-3">
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <span className="assignInfo">
                          Assigned by {item.assignedBy.name} on{" "}
                          {getDate(item.createdAt)}
                        </span>
                        <br />
                        <a href={`/tasks/${item._id} `}>More...</a>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {removeFlag && (
            <ShowModal
              user={user}
              text={`Are you sure you want to remove ${user.name}?`}
              resultText={"User removed successfully!"}
              handleChange={deleteUser}
              hideModal={hideRemoveUserModal}
            />
          )}
          {adminFlag && (
            <ShowModal
              user={user}
              text={`Are you sure you want to make ${user.name} Admin?`}
              resultText={`Updated role of ${user.name} as Admin`}
              handleChange={makeAdmin}
              hideModal={hideMakeAdminModal}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default SingleUserInfo;
