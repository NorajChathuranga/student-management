import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <div className="text-center">
          <p className="mb-0">
            &copy; 2025 Student Management System. Built with React & Spring Boot.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
