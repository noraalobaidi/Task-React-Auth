import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SigninModal from './SigninModal';
import SignupModal from './SignupModal';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/products">
          <Navbar.Brand>Chicken Shop</Navbar.Brand>
        </Link>
        <Nav>
          <SignupModal />
          <SigninModal />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
