import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { authContext } from '../contexts/Auth';
import { authenticate } from './../utils/RequestPrivate';

const Signin = () => {
  let history = useHistory();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken } = useContext(authContext);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      username: username,
      password: password,
    };
    try {
      const response = await authenticate('auth/signin', data);
      if (response.token) {
        history.push('/');
        setAuthToken(response);
      } else if (response[0].message) {
        setError(response[0].message);
      } else {
        setError(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h4 className="mt-2">Login</h4>
      <div className="card-reddit">
        <Form.Group controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={onChangeUsername}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </Form.Group>
        <p className="text-danger">{error}</p>
        <Button variant="primary" onClick={handleSubmit}>
          Sign In
        </Button>
      </div>
      <div className="mt-2 text-right">
        New to Reddit?{' '}
        <Button as={Link} to="/signup" className="mr-1" variant="dark">
          Sign Up
        </Button>
      </div>
    </Container>
  );
};
export default Signin;
