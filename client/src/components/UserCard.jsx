import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { authenticate } from '../utils/RequestPrivate';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import penIcon from '../assets/icons/pen.png';
import Moment from 'react-moment';
import { authContext } from './../contexts/Auth';

const UserCard = (props) => {
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState(null);
  const [admin, setAdmin] = useState(false);
  const { auth } = useContext(authContext);

  const getUser = async () => {
    console.log(props.environment, 'props.environment')
    let usernameSplit = props.environment.split('/');
    let username = usernameSplit[usernameSplit.length - 1];
    try {
      const response = await authenticate('users/' + username);
      if (response.data) {
        setUser(response.data);
        setUrl(response.data.avatarUrl);
        if (response.data._id === auth.data.data._id) setAdmin(true);
      } else setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(
        `http://localhost:4000/api/v1/users/${user.username}/image`,
        formData,
        config
      )
      .then((response) => {
        setUrl(response.data.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getUser();
  }, [props.environment]);
  return (
    <div>
      {user !== null && url ? (
        <div style={{ padding: '0px' }} className="card-reddit">
          <div style={{ height: '90px' }}>
            <div
              style={{
                backgroundImage:
                  'url(http://localhost:4000/uploads/users/background/no-background.jpeg)',
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
              src={`http://localhost:4000/uploads/users/avatar/${url}`}
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

            <p>user/{user.username}</p>
            <p style={{ fontWeight: 'bold' }}>Cake Day</p>
            <Moment format="YYYY/MM/DD" local>
              {user.createdAt}
            </Moment>
            <div style={{ width: '100%' }}></div>
            <Button
              as={Link}
              to="/create-post"
              block
              className="mt-2"
              variant="outline-secondary"
            >
              Create Post
            </Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default UserCard;
