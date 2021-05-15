import React, { useEffect, useState } from "react";
import "./module.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import Username from "../library/Username";
import Sidebar from "../library/Sidebar";
import { useUser } from "../../Provider/UserProvider";
import { useHistory } from "react-router";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import moment from "moment";

const Tasks = () => {
  const [task, setTask] = useState(null);
  const [assignCount, setAssignCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const history = useHistory();
  const { userDetails } = useUser();

  useEffect(() => getTasks(), [userDetails]);

  useEffect(() => {
    setAssignCount(task?.taskAssigned.length);
    setProgressCount(task?.taskInProgress.length);
    setCompletedCount(task?.taskCompleted.length);
  }, [task]);

  const getTasks = async () => {
    if (!userDetails.userState.token) history.push("/");
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/me`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      const data = res.data.user;
      console.log(data);
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (typeIncoming, id) => {
    if (!typeIncoming || !id) return;
    let type = "";
    if (typeIncoming === "taskAssigned") type = "isAssigned";
    else if (typeIncoming === "taskInProgress") type = "inProcess";
    else if (typeIncoming === "taskCompleted") type = "isCompleted";
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/task/${type}/${id}`,
        {
          headers: { Authorization: `Bearer ${userDetails.userState.token}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    console.log(result);
    // dropped outside the list
    if (!destination) {
      return;
    }
    let taskToBeMoved = {};
    task[source.droppableId].map((t) => {
      if (t._id === draggableId) taskToBeMoved = t;
    });
    setTask((pre) => {
      pre[source.droppableId] = pre[source.droppableId].filter((t) => {
        if (t._id !== draggableId) return t;
      });
      pre[destination.droppableId] = [
        ...pre[destination.droppableId],
        taskToBeMoved,
      ];
      setAssignCount(pre.taskAssigned.length);
      setProgressCount(pre.taskInProgress.length);
      setCompletedCount(pre.taskCompleted.length);
      return pre;
    });
    updateTaskStatus(destination.droppableId, draggableId);
    // console.log(taskToBeMoved);
  };

  const getDate = (assignDate) => {
    let date;
    date = moment(assignDate).format("MMMM D, YYYY");
    return date;
  };

  return (
    <div>
      <Container>
        <Sidebar />
        <div className="offset-md-11 pr-0 mt-3">
          <Username />
        </div>
        <h3 className="mt-5 offset-md-3">
          <u style={{ textDecorationColor: "#FDC960" }}>Your Tasks</u>
        </h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Row className="offset-md-3 mt-4">
            <Col sm={4}>
              <Card className="assigned">
                <Card.Body style={{ width: "100%", height: "100%" }}>
                  <Card.Title>
                    Assigned{" "}
                    <span className="task-count-circle">{assignCount}</span>
                  </Card.Title>
                  <Droppable
                    droppableId="taskAssigned"
                    style={{ width: "100%", height: "10rem" }}
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}>
                        {task?.taskAssigned.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card className="bg-primary mt-3">
                                  <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <span className="assignInfo">
                                      Assigned by {item.assignedBy.name} on{" "}
                                      {getDate(item.createdAt)}
                                    </span>
                                    <br />
                                    <a
                                      href="/task-detail"
                                      style={{ color: "blue" }}
                                    >
                                      Know more...
                                    </a>
                                  </Card.Body>
                                </Card>
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
              <Card className="in-progress">
                <Card.Body>
                  <Card.Title>
                    In Progress{" "}
                    <span className="task-count-circle">{progressCount}</span>
                  </Card.Title>
                  <Droppable
                    droppableId="taskInProgress"
                    width="100%"
                    height="100%"
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}>
                        {task?.taskInProgress.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index + task?.taskAssigned.length}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card className="bg-primary mt-3">
                                  <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <span className="assignInfo">
                                      Assigned by {item.assignedBy.name} on{" "}
                                      {getDate(item.createdAt)}
                                    </span>
                                    <br />
                                    <a
                                      href="/task-detail"
                                      style={{ color: "blue" }}
                                    >
                                      Know more...
                                    </a>
                                  </Card.Body>
                                </Card>
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
              <Card className="completed">
                <Card.Body>
                  <Card.Title>
                    Complete{" "}
                    <span className="task-count-circle">{completedCount}</span>
                  </Card.Title>
                  <Droppable
                    droppableId="taskCompleted"
                    width="100%"
                    height="100%"
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef}>
                        {task?.taskCompleted.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index + task?.taskInProgress.length}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card className="bg-primary mt-3">
                                  <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <span className="assignInfo">
                                      Assigned by {item.assignedBy.name} on{" "}
                                      {getDate(item.createdAt)}
                                    </span>
                                    <br />
                                    <a
                                      href="/task-detail"
                                      style={{ color: "blue" }}
                                    >
                                      Know more...
                                    </a>
                                  </Card.Body>
                                </Card>
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
