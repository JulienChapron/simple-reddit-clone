import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import penIcon from '../assets/icons/pen.png';
import axios from 'axios';
import { authContext } from '../contexts/Auth';
import { getPublic } from '../utils/RequestPublic';

const SubredditCard = (props) => {
  const { auth } = useContext(authContext);
  const [subreddit, setSubreddit] = useState(null);
  const [url, setUrl] = useState(null);
  const [admin, setAdmin] = useState(false);
  const onChangeUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const config = {
      headers: {
        authorization: `Bearer ${auth.token}`,
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(
        `http://localhost:4000/api/v1/subreddits/${subreddit.subreddit}/image`,
        formData,
        config
      )
      .then((response) => {
        setUrl(response.data.data);
      })
      .catch((error) => {});
  };
  const getSubreddit = async () => {
    const params = window.location.href.split('/');
    const subreddit = params[params.length - 1];
    try {
      const response = await getPublic('subreddits/' + subreddit);
      setSubreddit(response.data[0]);
      if (response.data[0].userId === auth.data.data._id) setAdmin(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSubreddit();
  }, [url]);
  return (
    <div>
      {subreddit !== null ? (
        <div style={{ padding: '0px' }} className="card-reddit">
          <div style={{ height: '90px' }}>
            <div
              style={{
                backgroundImage:
                  'url(http://localhost:4000/uploads/subreddits/background/no-background.jpeg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                height: '100%',
                width: '100%',
              }}
              alt="background"
            />
          </div>
          <div style={{ padding: '10px', marginTop: '-50px', width: '100%' }}>
            <img
              style={{ width: '80px', height: '80px', borderRadius: '100%' }}
              src={`http://localhost:4000/uploads/subreddits/photo/${subreddit.photoUrl}`}
              alt="image-subreddit"
            />
            <label
              style={{
                border: 'solid 1px black',
                marginLeft: '-10px',
                borderRadius: '100%',
                background: '#ffffff',
              }}
              htmlFor="myImage"
            >
              <img src={penIcon} className="icon" alt="icon-pen" />
            </label>
            <input
              className="hidden"
              type="file"
              id="myImage"
              onChange={onChangeUpload}
            />

            <p className="font-weight-bold">{subreddit.description}</p>
            <div style={{ width: '100%' }}></div>
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