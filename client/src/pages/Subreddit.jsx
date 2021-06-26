import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import SubredditCard from '../components/SubredditCard';
import PostsList from '../components/PostsList';
import EditPost from '../components/EditPost';
import { getPublic } from '../utils/RequestPublic';
import categories from '../assets/categories/Categories';

const Subreddit = () => {
  const [subreddit, setSubreddit] = useState(null);
  const [subredditUrl, setSubredditUrl] = useState(null);
  const [backgrounColorCategory, setBackgrounColorCategory] = useState(null);
  const getSubreddit = async () => {
    const params = window.location.href.split('/');
    setSubredditUrl(params[4]);
    try {
      const response = await getPublic('subreddits/' + params[4]);
      setSubreddit(response.data);
      categories.map((category) => {
        if (response.data[0].category === category.name.toLowerCase()) {
          setBackgrounColorCategory(category.color);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSubreddit();
  }, []);
  return (
    <div>
      {subreddit && (
        <div>
          <div
            style={{ height: '70px', backgroundColor: backgrounColorCategory }}
          />
          <div
            style={{ height: '90px', marginTop: '0px' }}
            className="card-reddit"
          >
            <Container>TEST</Container>
          </div>
          <Container>
            <Row>
              <Col lg={8} md={12} sm={12}>
                <div className="card-reddit">
                  <EditPost />
                </div>
                <PostsList environment={'subreddit/' + subredditUrl} />
              </Col>
              <Col lg={4} md={12} sm={12}>
                <SubredditCard environment={'subreddit/' + subredditUrl} />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};
export default Subreddit;
