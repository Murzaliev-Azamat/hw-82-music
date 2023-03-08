import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TracksHistory from './features/tracksHistory/TracksHistory';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlise';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <div className="App">
      <Container maxWidth="sm" sx={{mt: 2}} >
        <AppToolBar/>
        <Routes>
          <Route path="/" element={<Artists/>}/>
          <Route path="/" element={(
            <ProtectedRoute isAllowed={user && user.role === 'admin'}>
              <Artists/>
            </ProtectedRoute>
          )}/>
          <Route path="/albums/:id" element={<Albums/>}/>
          <Route path="/tracks/:id" element={<Tracks/>}/>
          <Route path="/tracks_history" element={<TracksHistory/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
