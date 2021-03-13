import React, { useContext, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import SubredditCard from '../components/SubredditCard';
import { environmentContext } from '../contexts/Environment';
import PostsList from '../components/PostsList';
import EditPost from '../components/EditPost';

const Subreddit = () => {
  const { environment, setEnvironmentContext } = useContext(environmentContext);
  const env = () => {
    const params = window.location.href.split('/');
    const subreddit = params[params.length - 1];
    setEnvironmentContext('subreddit/' + subreddit);
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
          <PostsList environment={environment} />
        </Col>
        <Col lg={4} md={12} sm={12}>
          <SubredditCard />
        </Col>
      </Row>
    </Container>
  );
};
export default Subreddit;
