import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #4caf50;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;

const MusicForm = ({ title }) => {
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [musicFile, setMusicFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Artiste:', artist);
    console.log('Album:', album);
    console.log('Fichier musical:', musicFile);
  };

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const handleAlbumChange = (e) => {
    setAlbum(e.target.value);
  };

  const handleMusicFileChange = (e) => {
    setMusicFile(e.target.files[0]);
  };

  return (
    <Card>
      <Title>{title}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nom de l'artiste"
          value={artist}
          onChange={handleArtistChange}
        />
        <Input
          type="text"
          placeholder="Nom de l'album"
          value={album}
          onChange={handleAlbumChange}
        />
        <Input
          type="file"
          accept=".mp3, .wav"
          onChange={handleMusicFileChange}
        />
        <Button type="submit">Envoyer</Button>
      </Form>
    </Card>
  );
};

export default MusicForm;
