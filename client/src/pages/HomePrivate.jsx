import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import EditPost from '../components/homePrivate/EditPost';
import { Link } from 'react-router-dom';

const HomePrivate = () => {
  return (
    <Container>
      <Row>
        <Col lg={8} md={6} sm={12}>
          <div className="card-reddit">
            <EditPost />
          </div>
          <div className="card-reddit">Top new / by day, month, year, all</div>
          <div className="card-reddit">List post (inifinite loop)</div>
        </Col>
        <Col lg={4} md={6} sm={12}>
          <div className="card-reddit">
            <p>Top communities by theme/finance/hack/tech (random)</p>
            <Link to="/communities">
            <Button className="mr-1" variant="dark">
              View All
            </Button>
          </Link>
          </div>
          <div className="card-reddit">
            Tending communities / all by nb members
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default HomePrivate;
