import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useUser } from "../../../Provider/UserProvider";
import Username from "../../library/Username";
import { Button } from "rebass";
import ShowModal from "../../library/ShowModal";

const SingleUserInfo = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [assignCount, setAssignCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [removeFlag, setRemoveFlag] = useState(false);
  const [adminFlag, setAdminFlag] = useState(false);

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

  return (
    <Container>
      <div className="offset-md-10 mt-3 pr-0 mt-3"></div>
      <div style={{ display: "flex" }}>
        <h3 className="mt-5 offset-md-1" style={{ marginRight: "2rem" }}>
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

      <Row className="offset-md-1 align-items-center user-info">
        <Col sm={2}>
          <div>Name</div>
          <div>{user.name}</div>
        </Col>
        <Col sm={2}>
          <div>Email</div>
          <div>{user.email}</div>
        </Col>
        <Col sm={5}>
          <div>Employee Id</div>
          <div>{user.employeeId}</div>
        </Col>
        <Col className="btn">
          <Button
            onClick={showRemoveUserModal}
            style={{ backgroundColor: "#ee5a5a" }}
          >
            Remove User
          </Button>
        </Col>
      </Row>

      <h3 className="mt-5 offset-md-1">
        <u style={{ textDecorationColor: "#FDC960" }}>Tasks</u>
      </h3>
      <Row className="mt-4 offset-md-1">
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
        <Col sm={2}>
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
          text={`Are you sure you want to remove ${user.name}`}
          resultText={"User removed successfully!"}
          handleChange={deleteUser}
        />
      )}
      {adminFlag && (
        <ShowModal
          user={user}
          text={`Are you sure you want to make ${user.name} Admin`}
          resultText={`Updated role of ${user.name} as Admin`}
          handleChange={makeAdmin}
        />
      )}
    </Container>
  );
};

export default SingleUserInfo;