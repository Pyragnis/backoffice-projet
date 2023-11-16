// MyForm.js
import React from 'react';
import styled from 'styled-components';
import SubmitButton from '../SubmitButton';

const FormCard = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* Ajout de cette ligne pour centrer en hauteur */
  margin-top:12%;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%; /* Ajustement de la largeur pour centrer les éléments internes */
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
  
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;



const Form = ({ title }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire
  };

  return (
    <FormCard>
      <FormTitle>{title}</FormTitle>
      <FormContainer onSubmit={handleSubmit}>
        <FormLabel>Identifiant :</FormLabel>
        <FormInput type="text" required />

        <FormLabel>Mot de passe :</FormLabel>
        <FormInput type="password" required />

        <SubmitButton type="submit">Envoyer</SubmitButton>
      </FormContainer>
    </FormCard>
  );
};

export default Form;
