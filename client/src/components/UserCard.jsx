import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { authenticate } from '../utils/RequestPrivate';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';
import { authContext } from './../contexts/Auth';
import UploadAvatar from '../../src/components/UploadAvatar';
import UploadBackground from '../../src/components/UploadBackground';

const UserCard = (props) => {
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState(null);
  const [admin, setAdmin] = useState(false);
  const { auth } = useContext(authContext);

  const getUser = async () => {
    console.log(props.environment, 'props.environment');
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
          <UploadBackground data={user} admin={admin} type="user" />
          <UploadAvatar data={user} admin={admin} type="user" />
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
      ) : (
        ''
      )}
    </div>
  );
};
export default UserCard;
