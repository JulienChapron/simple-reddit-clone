import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { randomUtils } from "./../utils/Random";
import {authenticate} from "./../utils/RequestPrivate"
import { authContext } from './../contexts/Auth';
import { useHistory } from 'react-router-dom';


const Signup = () => {
  const [random, setRandom] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken } = useContext(authContext);
  const [error, setError] = useState('');
  let history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const randomFunc = () => {
    let array = randomUtils();
    setRandom(array);
  };
  const handleSubmit = async () => {
    const data = {
      email: email,
      username: username,
      password: password,
    };
    try {
      const response = await authenticate('auth/signup', data);
      console.log(response.error)
      if (response.token) {
        history.push("/")
        setAuthToken(response);
        
      } else if (response.error) {
        setError(response.error);
      }  else {
        setError(response[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    randomFunc();
  }, []);
  return (
    <Container>
      <Row>
        <Col lg={8} md={6} sm={12}>
          <h4 className="mt-2">Sign Up</h4>
          <div className="card-reddit">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                onChange={onChangeEmail}
                type="email"
                placeholder="Email"
                value={email}
              />
              <div className="invalid-feedback">
                Please choose an email.
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                onChange={onChangeUsername}
                type="text"
                placeholder="Username"
                value={username}
              />
              <div className="invalid-feedback">
                Please choose an email.
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                onChange={onChangePassword}
                type="password"
                placeholder="Password"
                value={password}
              />
              <div className="invalid-feedback">
                Please choose an email.
              </div>
            </Form.Group>
            <p className="text-danger">{error}</p>
            <Button onClick={handleSubmit} variant="primary" >
              Sign Up
            </Button>
          </div>
        </Col>
        <Col lg={4} md={6} sm={12}>
          <div className="mt-2">
            <h4>Username generator</h4>
            <div className="card-reddit">
              {random.map((username, index) => {
                return (
                  <p
                    key={index}
                    className="pointer"
                    onClick={() => setUsername(username)}
                  >
                    {username}
                  </p>
                );
              })}
              <Button size="sm" variant="dark" onClick={randomFunc}>Generate</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Signup;
