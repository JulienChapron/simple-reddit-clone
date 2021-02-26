import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { authenticate } from '../utils/RequestPrivate';
import { Link } from 'react-router-dom';
import { environmentContext } from './../contexts/Environment';
import EditPost from '../components/homePrivate/EditPost';
import PostsList from '../components/user/PostsList';

const User = () => {
  const { setEnvironmentContext, environment } = useContext(environmentContext);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const getUser = async () => {
    const params = window.location.href.split('/');
    const username = params[params.length - 1];
    setEnvironmentContext('u/' + username);
    try {
      const response = await authenticate('users/' + username);
      if (response.data) {
        setUser(response.data);
        if (response.data._id === auth.data.data._id) setAdmin(true);
      } else setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [window.location.href]);
  return (
    <Container>
      {user !== null ? (
        <div>
          <Row>
            <Col lg={8} md={12} sm={12}>
              <div className="card-reddit">
                <EditPost />
              </div>
              <div className="card-reddit">
                <PostsList environment={environment} />
              </div>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <div className="card-reddit">
                <img className="community-img" src="" alt="image-community" />
                <p>user.username</p>
                <Link to={'/user/' + user.username + '/create-post'}>
                  {admin ? (
                    <Button block className="mr-1" variant="dark">
                      Create Post
                    </Button>
                  ) : undefined}
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div>403, No authorized</div>
      )}
    </Container>
  );
};
export default User;
