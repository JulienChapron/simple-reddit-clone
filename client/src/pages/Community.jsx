import React, { useContext, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import CommunityCard from '../components/community/CommunityCard';
import { environmentContext } from '../contexts/Environment';
import PostsList from '../components/user/PostsList';

const Community = () => {
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
            <PostsList environment={environment} />
          </div>
        </Col>
        <Col lg={4} md={12} sm={12}>
          <CommunityCard />
        </Col>
      </Row>
    </Container>
  );
};
export default Community;
