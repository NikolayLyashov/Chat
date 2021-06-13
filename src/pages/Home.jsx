import React, { useEffect } from 'react';
import axios from 'axios';
import { Navigation } from '../components/Navigation';

export const Home = () => {
  useEffect(() => {});
  const token = localStorage.getItem('token');
  axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } });

  return (
    <Navigation />
  );
};

export default Home;
