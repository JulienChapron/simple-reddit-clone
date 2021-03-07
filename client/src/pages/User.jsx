import React, { useEffect, useContext } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import PostsList from '../components/user/PostsList';
import UserCard from '../components/user/UserCard';
import { environmentContext } from '../contexts/Environment';

const User = () => {
  const { environment, setEnvironmentContext } = useContext(environmentContext);
  const getEnv = () => {
    const params = window.location.href.split('/');
    const username = params[params.length - 1];
    setEnvironmentContext('user/' + username);
  };
  useEffect(() => {
    getEnv();
  }, [environment]);
  return (
    <Container>
      <div>
        <Row>
          <Col lg={8} md={12} sm={12}>
            <div className="card-reddit">
              <PostsList environment={environment} />
            </div>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <UserCard environment={environment} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default User;
