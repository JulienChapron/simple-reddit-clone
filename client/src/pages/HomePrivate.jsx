import React, { useState, useEffect, useContext } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import EditPost from '../components/EditPost';
import PostsList from '../components/PostsList';
import FiltersPosts from '../components/FiltersPosts';
import SubredditsRandom from '../components/SubredditsRandom';
import categories from '../assets/categories/Categories';
import { getPublic } from '../utils/RequestPublic';
import { environmentContext } from '../contexts/Environment';

const HomePrivate = () => {
  const { environment, setEnvironmentContext } = useContext(environmentContext);
  const [subredditsRandom, setSubredditsRandom] = useState([]);
  const [categoryRandom, setCategoryRandom] = useState(null);
  const setEnv = () => {
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
    setEnv();
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={8} md={6} sm={12}>
          <div className="card-reddit">
            <EditPost />
          </div>
          <div className="card-reddit">
            <FiltersPosts />
          </div>
          <div className="card-reddit">
            <PostsList environment={environment} />
          </div>
        </Col>
        <Col lg={4} md={6} sm={12}>
          <SubredditsRandom
            environment={environment}
            categoryRandom={categoryRandom}
            subredditsRandom={subredditsRandom}
          />
          <SubredditsRandom
            environment={environment}
            categoryRandom={categoryRandom}
            subredditsRandom={subredditsRandom}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default HomePrivate;
