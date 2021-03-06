import React, { useContext } from 'react';
import { authContext } from '../../contexts/Auth';
import { environmentContext } from '../../contexts/Environment';
import { themeContext } from '../../contexts/Theme';
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
  const { environment } = useContext(environmentContext);
  const { theme, setThemeContext } = useContext(themeContext);

  const toggleTheme = () => {
    if (theme === 'light') {
      setThemeContext('dark');
    } else {
      setThemeContext('light');
    }
  };

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
    <Navbar
      variant={theme === 'light' ? 'light' : 'dark'}
      bg={theme === 'light' ? 'light' : 'dark'}
      expand="lg"
    >
      <Link className="" to="/">
        <Navbar.Brand>Simple Reddit Clone</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav bg={theme === 'light' ? 'light' : 'dark'}>
          <NavDropdown title={environment} id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to={'/'}>
              Home
            </NavDropdown.Item>
            <NavDropdown.Item>Popular</NavDropdown.Item>
            <NavDropdown.Item>All</NavDropdown.Item>
            <NavDropdown.Item>Top communities</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="theme-input mr-sm-2"
          />
        </Form>
        <Nav className="ml-auto">
          <Link to="/create-community">
            <Button className="m-1" variant="outline-secondary">
              Create Community
            </Button>
          </Link>
          <Link to="/create-post">
            <Button className="m-1" variant="outline-secondary">
              Create Post
            </Button>
          </Link>
          <NavDropdown
            alignRight
            title={auth.data.data.username}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item as={Link} to={'/user/' + auth.data.data.username}>
              Profile
            </NavDropdown.Item>
            <div className="switch">
              Night Mode
              <Form.Check
                className="switch-label"
                type="switch"
                id="custom-switch"
                onChange={toggleTheme}
              />
            </div>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogOut}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationPrivate;
