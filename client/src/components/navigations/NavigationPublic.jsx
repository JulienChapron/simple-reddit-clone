import React from "react";
import { Link } from "react-router-dom";
import {
  NavDropdown,
  Nav,
  Button,
  Form,
  FormControl,
  Navbar,
} from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Simple Reddit Clone</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        <Nav className="ml-auto">
          <Link to="/signin">
            <Button className="mr-1" variant="dark">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="mr-1" variant="dark">
              Sign Up
            </Button>
          </Link>
          <NavDropdown
            alignRight="false"
            title="Parameters"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">Theme</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navigation;
