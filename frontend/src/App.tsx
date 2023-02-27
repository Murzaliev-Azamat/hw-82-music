import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import SecretPage from './features/users/SecretPage';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{mt: 2}} >
        <AppToolBar/>
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
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/secret" element={<SecretPage/>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
