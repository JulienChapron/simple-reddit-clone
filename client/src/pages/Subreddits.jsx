import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { getPublic } from '../utils/RequestPublic';
import { Link, useHistory } from 'react-router-dom';
import SubredditsRandom from '../components/SubredditsRandom';
import categories from '../assets/categories/Categories';
import CategoriesList from '../components/CategoriesList';
import CategoryTop from '../components/CategoryTop';

const Subreddits = () => {
  let history = useHistory();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [subreddits, setSubreddits] = useState([]);
  const getSubredditsByCategory = async (category) => {
    try {
      if (category !== 'All Categories') {
        const response = await getPublic(
          'subreddits/category/' + category.toLowerCase()
        );
        setSubreddits(response.data);
      } else {
        const response = await getPublic('subreddits');
        setSubreddits(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('passage 1',location.pathname)
    if (location.pathname) {
      console.log('passage')
      const params = window.location.href.split('/');
      const category = params[params.length - 1];
      setSelectedCategory(category);
      getSubredditsByCategory(category);
    }
    return history.listen((location) => {
      console.log('passage', location.pathname);
      const params = location.pathname.split('/');
      const category = params[params.length - 1];
      setSelectedCategory(category);
      getSubredditsByCategory(category);
    });
  }, [history]);
  return (
    <Container>
      <Row>
        <Col lg={2} md={12} sm={12}>
          <CategoriesList selectedCategory={selectedCategory} />
        </Col>
        <Col lg={6} md={12} sm={12}>
          <CategoryTop
            subreddits={subreddits}
            selectedCategory={selectedCategory}
          />
        </Col>
        <Col lg={4} md={12} sm={12}>
          <SubredditsRandom />
          <SubredditsRandom />
        </Col>
      </Row>
    </Container>
  );
};
export default Subreddits;
