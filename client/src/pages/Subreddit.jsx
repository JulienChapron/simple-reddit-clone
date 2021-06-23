import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import SubredditCard from '../components/SubredditCard';
import PostsList from '../components/PostsList';
import EditPost from '../components/EditPost';
import UploadBackground from '../../src/components/UploadBackground';
import { getPublic } from '../utils/RequestPublic';

const Subreddit = () => {
  const [subreddit, setSubreddit] = useState(null);
  const [subredditUrl, setSubredditUrl] = useState(null);
  const getSubreddit = async () => {
    const params = window.location.href.split('/');
    setSubredditUrl(params[4]);
    console.log(params[4]);
    try {
      const response = await getPublic('subreddits/' + subredditUrl);
      if (response.data[0]) {
        setSubreddit(response.data[0]);
      }
      console.log(subreddit, 'subreddit');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSubreddit();
  }, []);
  return (
    <div>
      {subreddit ? (
        <UploadBackground data={subreddit} type="subreddit" />
      ) : null}
      <Container>
        <div style={{ height: '50px', backgroundColor: '#fff' }} />
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
  );
};
export default Subreddit;
