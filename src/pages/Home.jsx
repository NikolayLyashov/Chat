import React, { useContext } from 'react';
import { Navigation } from '../components/Navigation';
import AuthorizationContext from '../context';

export const Home = () => {
  const data = useContext(AuthorizationContext);
  console.log(data);
  return (
    <Navigation />
  );
};

export default Home;
