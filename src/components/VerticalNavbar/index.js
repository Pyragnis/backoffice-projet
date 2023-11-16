// VerticalNavbar.js
import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  height: 100%;
  width: 200px;
  background-color: #333;
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
`;

const NavbarLink = styled.a`
  padding: 10px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  display: block;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const VerticalNavbar = () => {
  return (
    <NavbarContainer>
      <NavbarLink href="#">Accueil</NavbarLink>
      <NavbarLink href="#">Utilisateurs</NavbarLink>
      <NavbarLink href="#">Produits</NavbarLink>
      <NavbarLink href="#">Statistiques</NavbarLink>
      {/* Ajoutez d'autres liens selon vos besoins */}
    </NavbarContainer>
  );
};

export default VerticalNavbar;
