import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaGraduationCap, FaUsers, FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <FaGraduationCap className="me-2" />
            Student Management System
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/students">
              <Nav.Link>
                <FaUsers className="me-1" />
                All Students
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/students/add">
              <Nav.Link>
                <FaPlus className="me-1" />
                Add Student
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
