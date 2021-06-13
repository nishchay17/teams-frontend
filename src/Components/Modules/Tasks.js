import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import moment from "moment";
import axios from "axios";
import { Flex } from "rebass";
import { motion } from "framer-motion";

import "./module.css";
import { useUser } from "../../Provider/UserProvider";
import Loader from "../library/Loader";
import Container from "../library/Container";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -200 },
  show: { opacity: 1, y: 0 },
};

const Tasks = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/me`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      const data = res.data.user;
      setIsLoading(false);
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
      await axios.get(`${process.env.REACT_APP_URL}/task/${type}/${id}`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
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
    <Container>
      <h3 className="mt-5">Your Tasks</h3>
      {isLoading ? (
        <Flex height="35rem" alignItems="center">
          <Loader />
        </Flex>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="row mt-4 "
          >
            <motion.div variants={item} className="col-sm-4">
              <Card className="assigned">
                <Card.Body style={{ width: "100%", height: "100%" }}>
                  <Card.Title>
                    Assigned
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
                                    <a href={`/tasks/${item._id} `}>More...</a>
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
            </motion.div>
            <motion.div variants={item} className="col-sm-4">
              <Card className="in-progress">
                <Card.Body>
                  <Card.Title>
                    In Progress
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
                                    <a href={`/tasks/${item._id} `}>More...</a>
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
            </motion.div>
            <motion.div variants={item} className="col-sm-4">
              <Card className="completed">
                <Card.Body>
                  <Card.Title>
                    Complete
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
                                    <a href={`/tasks/${item._id} `}>More...</a>
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
            </motion.div>
          </motion.div>
        </DragDropContext>
      )}
    </Container>
  );
};

export default Tasks;
