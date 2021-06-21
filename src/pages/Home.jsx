import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Navigation } from '../components/Navigation';
import { actions } from '../store/slices';
import { Channels } from '../components/Channels';
import { Spinner } from '../components/Spinner';
import { Chat } from '../components/Chat';

export const Home = () => {
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } });
    console.log(data);
    dispatch(actions.setInitialState(data));
    setLoadingData(false);
  }, []);

  if (loadingData) {
    return <Spinner />;
  }
  return (
    <div className="d-flex flex-column h-100">
      <Navigation />
      <div className="container flex-grow-1 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white">
          <Channels />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
