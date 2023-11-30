// VerticalNavbar.js
import React from 'react';
import styled from 'styled-components';
import ThreeLogo from '../ThreeLogo';

const NavbarContainer = styled.div`
  height: 100vh; /* Utilisez la hauteur de la vue pour occuper tout l'écran */
  width: 200px;
  background-color: #333;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
`;

const LinksContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const NavbarLink = styled.a`
  padding: 10px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const VerticalNavbar = () => {
  return (
    <NavbarContainer>
      <LogoContainer>
        <ThreeLogo />
      </LogoContainer>
      <LinksContainer>
        <NavbarLink href="/Accueil">Accueil</NavbarLink>
        <NavbarLink href="/Register">Ajouter un compte</NavbarLink>
        <NavbarLink href="/Music">Ajouter une musique</NavbarLink>
        {/* Ajoutez d'autres liens selon vos besoins */}
      </LinksContainer>
    </NavbarContainer>
  );
};

export default VerticalNavbar;
