// Navbar.js
import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #333; /* Dark gray background */
  padding: 15px;
`;

const NavbarTitle = styled.h1`
  color: white;
  margin: 0;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarTitle>Mon Site</NavbarTitle>
    </NavbarContainer>
  );
};

export default Navbar;
