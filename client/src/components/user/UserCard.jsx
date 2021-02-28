import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { authenticate } from '../../utils/RequestPrivate';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const UserCard = (props) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const getUser = async () => {
    let usernameSplit = props.environment.split('/');
    let username = usernameSplit[usernameSplit.length - 1];
    try {
      const response = await authenticate('users/' + username);
      if (response.data) {
        setUser(response.data);
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
        console.log(response.data.data, 'test');
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getUser();
  }, [props.environment]);
  return (
    <div>
      {user !== null ? (
        <div className="card-reddit">
          <img className="user-avatar" src={`http://localhost:4000/uploads/users/${user._id}/avatar/${user.avatarUrl}`} alt="image-community"/>
          <div>
          <label for="myImage">
            <img src="https://goo.gl/pB9rpQ"/>
          </label>
          <input className="hidden" type="file" id="myImage" onChange={onChangeUpload} />
          </div>
          <p className="font-weight-bold" >{user.username}</p>
          <Link to={'/user/' + user.username + '/create-post'}>
            {admin ? (
              <Button block className="mr-1" variant="dark">
                Create Post
              </Button>
            ) : undefined}
          </Link>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default UserCard;
