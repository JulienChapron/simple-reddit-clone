import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { authContext } from '../contexts/Auth';
import { getPublic } from '../utils/RequestPublic';
import categories from '../assets/categories/Categories';
import { environmentContext } from '../contexts/Environment';

const SubredditCard = (props) => {
  const { auth } = useContext(authContext);
  const { environment, setEnvironmentContext } = useContext(environmentContext);
  const [subreddit, setSubreddit] = useState(null);
  const [backgrounColorCategory, setBackgrounColorCategory] = useState(null);
  const [admin, setAdmin] = useState(false);
  const getSubreddit = async () => {
    const params = window.location.href.split('/');
    const subreddit = params[4];
    setEnvironmentContext('subreddit/' + subreddit);
    try {
      const response = await getPublic('subreddits/' + subreddit);
      categories.map((category) => {
        if (response.data[0].category === category.name.toLowerCase()) {
          setBackgrounColorCategory(category.color);
        }
      });
      if (response.data[0]) setSubreddit(response.data[0]);
      if (response.data[0] && response.data[0].userId === auth.data.data._id)
        setAdmin(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSubreddit();
  }, []);
  return (
    <div>
      {subreddit !== null && subreddit !== undefined ? (
        <div style={{ padding: '0px' }} className="card-reddit">
          <div
            style={{
              color: '#fff',
              backgroundColor: backgrounColorCategory,
              padding: '10px',
            }}
          >
            About the community
          </div>
          <div style={{ padding: '10px' }}>
            <p style={{ minHeight: '30px' }}>{subreddit.description}</p>
            <p style={{ minHeight: '30px' }}>0 members</p>
            {admin ? (
              <Button
                as={Link}
                to="/create-post"
                block
                className="mr-1"
                variant="outline-secondary"
              >
                Create Post
              </Button>
            ) : null}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default SubredditCard;
