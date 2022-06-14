import React from "react";
import { observer } from "mobx-react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import authStore from "../stores/AuthStore";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import SignoutButton from "./SignoutButton";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/products">
          <Navbar.Brand>Chicken Shop</Navbar.Brand>
        </Link>
        <Nav>
          {authStore.user ? (
            <>
              <h3 style={{ color: "white" }}>
                Hello {authStore.user.username}{" "}
              </h3>
              <SignoutButton />
            </>
          ) : (
            <>
              <SignupModal />
              <SigninModal />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default observer(NavBar);
