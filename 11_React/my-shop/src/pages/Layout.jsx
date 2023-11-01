import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function Layout(props) {
  return (
    <>
      <header>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#">쇼핑몰</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>홈</Nav.Link>
              <Nav.Link>장바구니</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Outlet />

      {/* <footer>푸터 영역</footer> */}
    </>
  );
}

export default Layout;