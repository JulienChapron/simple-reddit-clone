import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import EditPost from '../components/homePrivate/EditPost';
import CommunitiesRandom from '../components/CommunitiesRandom';
import categories from '../assets/categories/Categories';
import { getPublic } from '../utils/RequestPublic';
import { environmentContext } from '../contexts/Environment';

const HomePrivate = () => {
  const { environment, setEnvironmentContext } = useContext(environmentContext);
  const [communitiesRandom, setCommunitiesRandom] = useState([]);
  const [categoryRandom, setCategoryRandom] = useState(null);
  const getEnv = () => {
    setEnvironmentContext('Home');
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
  useEffect(() => {
    getCommunitiesRandom();
    getEnv();
  }, []);

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
          <CommunitiesRandom
            environment={environment}
            categoryRandom={categoryRandom}
            communitiesRandom={communitiesRandom}
          />
          <div className="card-reddit">
            Tending communities / all by nb members
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default HomePrivate;
