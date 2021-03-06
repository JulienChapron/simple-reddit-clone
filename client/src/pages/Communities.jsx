import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { getPublic } from '../utils/RequestPublic';
import { Link } from 'react-router-dom';
import CommunitiesRandom from '../components/CommunitiesRandom';
import categories from '../assets/categories/Categories';

const Communities = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [communities, setCommunities] = useState([]);
  const getCommunitiesByCategory = async (category) => {
    try {
      const response = await getPublic('communities/category/' + category);
      setCommunities(response.data);
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
  }, []);
  return (
    <Container>
      <Row>
        <Col lg={2} md={12} sm={12}>
          <div className="card-reddit">
            <h5>Categories</h5>
            <hr />
            {['All Categories', ...categories].map((category, index) => {
              return (
                <div
                  key={index}
                  className={
                    category === selectedCategory
                      ? 'selected-category pointer'
                      : 'pointer category'
                  }
                  onClick={() =>
                    category !== 'All Categories'
                      ? getCommunitiesByCategory(category.toLowerCase()) &&
                        setSelectedCategory(category)
                      : getCommunities() && setSelectedCategory(category)
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
            <h5>Today's Top Growing Communities</h5>
            <hr />
            {Object.values(communities).map((community, index) => {
              return (
                <Link to={`/subreddit/${community.subreddit}`}>
                  <div key={index} className="pointer categories">
                    <img
                      className="community-thumbnail"
                      src={`http://localhost:4000/uploads/communities/photo/${community.photoUrl}`}
                      alt="img-default"
                    />{' '}
                    subreddit/{community.subreddit}
                  </div>
                </Link>
              );
            })}
          </div>
        </Col>
        <Col lg={4} md={12} sm={12}>
          <CommunitiesRandom />
          <CommunitiesRandom />
        </Col>
      </Row>
    </Container>
  );
};
export default Communities;
