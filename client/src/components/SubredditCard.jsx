import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { authContext } from '../contexts/Auth';
import { getPublic } from '../utils/RequestPublic';
import UploadAvatar from './UploadAvatar';
import UploadBackground from './UploadBackground';

const SubredditCard = (props) => {
  const { auth } = useContext(authContext);
  const [subreddit, setSubreddit] = useState(null);
  const [admin, setAdmin] = useState(false);
  const getSubreddit = async () => {
    const params = window.location.href.split('/');
    const subreddit = params[1];
    try {
      const response = await getPublic('subreddits/' + subreddit);
      setSubreddit(response.data[0]);
      if (response.data[0] && response.data[0].userId === auth.data.data._id) setAdmin(true);
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
          <UploadBackground data={subreddit} admin={admin} type="subreddits" />
          <UploadAvatar data={subreddit} admin={admin} type="subreddits" />
          <div style={{ marginTop: '40px', padding: '10px' }}>
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
