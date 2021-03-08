import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import EditPost from '../components/EditPost';
import SubredditsRandom from '../components/SubredditsRandom';
import categories from '../assets/categories/Categories';
import { getPublic } from '../utils/RequestPublic';
import { environmentContext } from '../contexts/Environment';

const HomePrivate = () => {
  const { environment, setEnvironmentContext } = useContext(environmentContext);
  const [subredditsRandom, setSubredditsRandom] = useState([]);
  const [categoryRandom, setCategoryRandom] = useState(null);
  const getEnv = () => {
    setEnvironmentContext('Home');
  };
  const getSubredditsRandom = async () => {
    try {
      const random = categories[Math.floor(Math.random() * categories.length)];
      setCategoryRandom(random);
      const response = await getPublic(
        'subreddits/category/' + random.toLowerCase()
      );
      setSubredditsRandom(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSubredditsRandom();
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
          <SubredditsRandom
            environment={environment}
            categoryRandom={categoryRandom}
            subredditsRandom={subredditsRandom}
          />
          <div className="card-reddit">
            Tending subreddits / all by nb members
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default HomePrivate;
