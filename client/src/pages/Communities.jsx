import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import categories from '../assets/categories/Categories';
import { getPublic } from '../utils/RequestPublic';
import default_thumbnail_community from '../assets/img_default/default_thumbnail_community.jpeg';
import { Link } from 'react-router-dom';

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [communitiesRandom, setCommunitiesRandom] = useState([]);
  const [categoryRandom, setCategoryRandom] = useState(null);
  const getCommunitiesByCategory = async (category) => {
    try {
      const response = await getPublic('communities/category/' + category);
      setCommunities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCommunitiesRandom = async () => {
    try {
      const random = categories[Math.floor(Math.random() * categories.length)];
      setCategoryRandom(random);
      const response = await getPublic(
        'communities/category/' + random.toLowerCase()
      );
      setCommunitiesRandom(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCommunities = async () => {
    try {
      const response = await getPublic('communities/');
      setCommunities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommunities();
    getCommunitiesRandom();
  }, []);
  return (
    <Container>
      <Row>
        <Col lg={2} md={12} sm={12}>
          <div className="card-reddit">
            Categories
            <hr />
            {['All Communities', ...categories].map((category, index) => {
              return (
                <div
                  key={index}
                  className="pointer categories"
                  onClick={() =>
                    category !== 'All Communities'
                      ? getCommunitiesByCategory(category.toLowerCase())
                      : getCommunities()
                  }
                >
                  {category}
                </div>
              );
            })}
          </div>
        </Col>
        <Col lg={6} md={12} sm={12}>
          <div className="card-reddit">
            Today's Top Growing Communities
            <hr />
            {Object.values(communities).map((community, index) => {
              return (
                <Link to={`/r/${community._id}`}>
                  <div key={index} className="pointer categories">
                    <img
                      className="community-thumbnail"
                      src={default_thumbnail_community}
                      alt="img-default"
                    />{' '}
                    r/{community.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </Col>
        <Col lg={4} md={12} sm={12}>
          {
            <div className="card-reddit">
              {categoryRandom}
              <hr />
              {Object.values(communitiesRandom).map((community, index) => {
                return (
                  <div key={index} className="pointer categories">
                    <img
                      className="community-thumbnail"
                      src={default_thumbnail_community}
                      alt="img-default"
                    />{' '}
                    r/{community.title}
                  </div>
                );
              })}
            </div>
          }
        </Col>
      </Row>
    </Container>
  );
};
export default Communities;
