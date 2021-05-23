import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useUser } from "../../../Provider/UserProvider";
import Username from "../../library/Username";

const SingleUserInfo = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [task, setTask] = useState([]);
  const [assignCount, setAssignCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const history = useHistory();
  const params = useParams();
  console.log(params.id);
  const { userDetails } = useUser();

  useEffect(() => getEmployees(), []);
  useEffect(() => getSelectedEmployee(), []);

  useEffect(() => {
    //setAssignCount(task?.taskAssigned.length);
    //setProgressCount(task?.taskInProgress.length);
    //setCompletedCount(task?.taskCompleted.length);
  }, [task]);

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
      console.log(params.id);
      if (user.id === params.id) {
        console.log("jehgfgj");
        setUser(user);
      }
    });
  };

  const getDate = (assignDate) => {
    let date;
    date = moment(assignDate).format("MMMM D, YYYY");
    return date;
  };

  return (
    <Container>
      {console.log(user)}
      <div className="offset-md-10 mt-5 pr-0 mt-3">
        <Username username={task ? task.name : ""} />
      </div>
      <h3 className="mt-5 offset-md-1">
        <u style={{ textDecorationColor: "#FDC960" }}>Your Tasks</u>
      </h3>
      <Row className="mt-4 offset-md-1">
        <Col sm={4}>
          <Card className="assigned">
            <Card.Body style={{ width: "100%", height: "100%" }}>
              <Card.Title>
                Assigned{" "}
                <span className="task-count-circle">{assignCount}</span>
              </Card.Title>
              {/*task?.taskAssigned.map((item) => {
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
                </Card>;
              })*/}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="in-progress">
            <Card.Body style={{ width: "100%", height: "100%" }}>
              <Card.Title>
                In Progress
                <span className="task-count-circle">{assignCount}</span>
              </Card.Title>
              {/*task?.taskInProgress.map((item) => {
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
                </Card>;
              })*/}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={2}>
          <Card className="completed">
            <Card.Body style={{ width: "100%", height: "100%" }}>
              <Card.Title>
                Completed
                <span className="task-count-circle">{assignCount}</span>
              </Card.Title>
              {/*task?.taskCompleted.map((item) => {
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
                </Card>;
              })*/}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleUserInfo;
/**
 *
 */
