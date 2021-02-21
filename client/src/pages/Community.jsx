import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { getPublic } from '../utils/RequestPublic';
import { Link } from 'react-router-dom';
import default_community from '../assets/img_default/default_thumbnail_community.jpeg';

const Community = () => {
  const [community, setCommunity] = useState('');
  const getCommunity = async () => {
    const params = window.location.href.split('/');
    const idCategory = params[params.length-1];
    try {
      const response = await getPublic('communities/' + idCategory);
      setCommunity(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommunity();
  }, []);
  return (
    <Container>
      <Row>
        <Col lg={8} md={12} sm={12}>
          <div className="card-reddit">getPostByIdCommunity</div>
        </Col>
        <Col lg={4} md={12} sm={12}>
          <div className="card-reddit">
            <img className="community-img" src={default_community} alt="image-community"/>
            <p>{community.title}</p>
            <Link to="/create-post">
            <Button block className="mr-1" variant="dark">
              Create Post
            </Button>
          </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Community;
