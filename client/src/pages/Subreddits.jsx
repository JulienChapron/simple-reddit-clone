import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { getPublic } from '../utils/RequestPublic';
import { Link, useHistory } from 'react-router-dom';
import SubredditsRandom from '../components/SubredditsRandom';
import categories from '../assets/categories/Categories';

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
    console.log('passage useEffect');
    return history.listen((location) => {
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
          <div className="card-reddit">
            <h5>Categories</h5>
            {selectedCategory}
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
                    setSelectedCategory(category) &
                    getSubredditsByCategory(category)
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
            <h5>Today's Top Growing Subreddits</h5>
            <hr />
            {Object.values(subreddits).map((subreddit, index) => {
              return (
                <Link to={`/subreddit/${subreddit.subreddit}`}>
                  <div key={index} className="pointer categories">
                    <img
                      className="subreddit-thumbnail"
                      src={`http://localhost:4000/uploads/subreddits/photo/${subreddit.photoUrl}`}
                      alt="img-default"
                    />{' '}
                    subreddit/{subreddit.subreddit}
                  </div>
                </Link>
              );
            })}
          </div>
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
