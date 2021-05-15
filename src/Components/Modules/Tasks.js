import React, { useEffect, useState } from "react";
import "./module.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import Avatar from "../library/Avatar";
import Sidebar from "../library/Sidebar";
import { useUser } from "../../Provider/UserProvider";
import { useHistory } from "react-router";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Tasks = () => {
  const [task, setTask] = useState(null);
  const history = useHistory();
  const { userDetails } = useUser();

  useEffect(() => getTasks(), [userDetails]);
  const getTasks = async () => {
    if (!userDetails.userState.token) history.push("/");
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/me`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      console.log(res);
      let count = 0;
      res.data.user.taskAssigned.map((tasks) => {
        tasks.index = count;
        count++;
      });
      res.data.user.taskInProgress.map((tasks) => {
        tasks.index = count;
        count++;
      });
      res.data.user.taskCompleted.map((tasks) => {
        tasks.index = count;
        count++;
      });
      setTask(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Container>
        <Sidebar />
        <div className="offset-md-10 pr-0">
          <Avatar />
        </div>
        <h3 className="mt-5 offset-md-3">
          <u style={{ textDecorationColor: "#facf5a" }}>Your Tasks</u>
        </h3>
        <DragDropContext>
          <Row className="offset-md-3">
            <Col sm={4}>
              <Card className="task-box">
                <Card.Body>
                  <Card.Title>Assigned</Card.Title>
                  <Droppable droppableId="assigned">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}>
                        {task?.taskAssigned.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={0}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item.description}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
              <Card className="task-box">
                <Card.Body>
                  <Card.Title>In Progress</Card.Title>
                  <Droppable droppableId="inProgress">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}>
                        {task?.taskInProgress.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={1}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item.description}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={2}>
              <Card className="task-box">
                <Card.Body>
                  <Card.Title>Complete</Card.Title>
                  <Droppable droppableId="inProgress">
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}>
                        {task?.taskCompleted.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={2}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item.description}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </DragDropContext>
      </Container>
    </div>
  );
};

export default Tasks;
