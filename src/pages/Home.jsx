import React from 'react';
import axios from 'axios';
import { Navigation } from '../components/Navigation';

export const Home = () => {
  const token = localStorage.getItem('token');
  axios.get('/api/v1/data', { Headers: { Authorization: `Bearer ${token}` } });

  return (
    <Navigation />
  );
};

export default Home;
