import React, { useContext, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import { environmentContext } from '../contexts/Environment';
import { useParams } from 'react-router-dom';
import { getPost } from '../../../server/controllers/posts';
const PostView = () => {
  let { id } = useParams();
  let { type } = useParams();
  let { name } = useParams();
  const { environment, setEnvironmentContext } = useContext(environmentContext);
  const getPost = async () => {
      try {
        if (props.environment === 'Home') {
          const response = await getPublic('posts/new');
          setPosts(response.data);
        } else {
          const response = await getPublic('posts/' + props.environment);
          setPosts(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
  }
  const getEnv = () => {
    setEnvironmentContext(type + '/' + name);
  };
  useEffect(() => {
    getEnv();
    getPost()
  }, [environment]);
  return (
    <Container>
      <div>
        <Row>
          <Col lg={8} md={12} sm={12}>
            POST VIEW
          </Col>
          <Col lg={4} md={12} sm={12}>
            <UserCard environment={environment} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default PostView;
