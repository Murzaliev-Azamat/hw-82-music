import React from 'react';
import './App.css';
import FormForPosts from './features/posts/FormForPosts';
import { Container } from '@mui/material';
import CardForPost from './components/UI/CardForPost/CardForPost';
import Posts from './features/posts/Posts';
import Spinner from './components/UI/Spinner/Spinner';

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{mt: 2}} >
        <FormForPosts/>
        <Posts/>
      </Container>
    </div>
  );
}

export default App;
