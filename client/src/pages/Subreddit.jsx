import React, { useContext, useEffect, useState } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import SubredditCard from '../components/SubredditCard';
import PostsList from '../components/PostsList';
import EditPost from '../components/EditPost';

const Subreddit = () => {
  const [environment, setEnvironment] = useState(null)
  const env = () => {
    const params = window.location.href.split('/');
    const env = params[params.length - 1];
    setEnvironment(env)
  };
  useEffect(() => {
    env();
  }, []);
  return (
    <Container>
      <Row>
        <Col lg={8} md={12} sm={12}>
          <div className="card-reddit">
            <EditPost />
          </div>
          <PostsList environment={'subreddit/'+ environment} />
        </Col>
        <Col lg={4} md={12} sm={12}>
          <SubredditCard environment={'subreddit/' + environment}/>
        </Col>
      </Row>
    </Container>
  );
};
export default Subreddit;
