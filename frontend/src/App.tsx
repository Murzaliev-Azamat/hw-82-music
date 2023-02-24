import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{mt: 2}} >
        <Routes>
          <Route path="/" element={(
            <Artists/>
          )}/>
          <Route path="/albums/:id" element={(
            <Albums/>
          )}/>
          <Route path="/tracks/:id" element={(
            <Tracks/>
          )}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
