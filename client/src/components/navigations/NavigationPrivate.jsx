import React, { useState, useEffect, useContext } from 'react';
import { authContext } from '../../contexts/Auth';
import { environmentContext } from '../../contexts/Environment';
import { authenticate } from '../../utils/RequestPrivate';
import {
  NavDropdown,
  Nav,
  Button,
  Form,
  FormControl,
  Navbar,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const NavigationPrivate = () => {
  let history = useHistory();
  const { setAuthToken, auth } = useContext(authContext);
  const { setEnvironmentContext, environment } = useContext(environmentContext);
  const [community, setCommunity] = useState('');
  const onLogOut = async () => {
    try {
      const response = await authenticate('auth/logout', auth.token);
      history.push('/');
      localStorage.removeItem('user');
      setAuthToken({ data: null, token: null });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Link to="/">
        <Navbar.Brand>Simple Reddit Clone</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavDropdown
            title={environment}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item>Home</NavDropdown.Item>
            <NavDropdown.Item>Popular</NavDropdown.Item>
            <NavDropdown.Item>All</NavDropdown.Item>
            <NavDropdown.Item>Top communities</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        <Nav className="ml-auto">
          <Link to="/create-community">
            <Button className="mr-1" variant="dark">
              Create Community
            </Button>
          </Link>
          <Link to="/create-post">
            <Button className="mr-1" variant="dark">
              Create Post
            </Button>
          </Link>
          <NavDropdown
            alignRight="false"
            title={auth.data.data.username}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to={'/user/' + auth.data.data.username}>
              User
            </NavDropdown.Item>
            <NavDropdown.Item>Night mode</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogOut}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationPrivate;
