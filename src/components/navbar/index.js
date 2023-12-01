// Navbar.js
import React from 'react';
import styled from 'styled-components';
import three from '../ThreeLogo'

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
      <NavbarTitle>backoffice</NavbarTitle>
    </NavbarContainer>
  );
};

export default Navbar;
