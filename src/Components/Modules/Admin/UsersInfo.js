import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "rebass";
import SingleUserInfo from "./SingleUserInfo";

const UsersInfo = (props) => {
  return (
    <div>
      <Card
        className="mt-4 offset-md-1"
        style={{ marginRight: "20px", borderWidth: "3px" }}
      >
        <Link
          to={`/user/ ${props.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Card.Body>
            <Row className="justify-content-between align-items-center">
              <Col md={8}>
                <Card.Title className="user-name">{props.userName}</Card.Title>
                <div>
                  <span className="task-status">
                    Task(s) assigned {props.assigned.length}
                  </span>
                  <span className="task-status">
                    Task(s) in progress {props.inProgress.length}
                  </span>
                  <span className="task-status">
                    Task(s) completed {props.completed.length}
                  </span>
                </div>
              </Col>
              <Col md={2}>
                <Button>Remove User</Button>
              </Col>
            </Row>
          </Card.Body>
        </Link>
      </Card>
    </div>
  );
};

export default UsersInfo;
