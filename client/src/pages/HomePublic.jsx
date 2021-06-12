import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const HomePublic = () => {
  return (
    <Container>
      <Row>
        <Col lg={8} md={6} sm={12}>
          <div className="card-reddit">Top new / by day, month, year, all</div>
          <p>test</p>
          <div className="card-reddit">List post (inifinite loop)</div>
        </Col>
        <Col lg={4} md={6} sm={12}>
          <div className="card-reddit">Top subreddits by theme/finance/hack/tech (random)</div>
          <div className="card-reddit">Tending subreddits / all by nb members</div>
        </Col>
      </Row>
    </Container>
  );
};
export default HomePublic;
