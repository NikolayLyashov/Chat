import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/slices';
import { Channels } from '../components/Channels';
import { Spinner } from '../components/Spinner';
import { Chat } from '../components/Chat';
import { Modal } from '../components/Modal';
import useAuthorizationData from '../useAuthorizationData';
import routes from '../routes.js';

export const Home = () => {
  const dispatch = useDispatch();
  const [loadingData, setLoadingData] = useState(true);

  const modal = useSelector((state) => state.modalReducer);
  const { userAuth: token } = useAuthorizationData();

  useEffect(async () => {
    try {
      const { data } = await axios.get(routes.authorization, { headers: { Authorization: `Bearer ${token}` } });
      dispatch(actions.setInitialState(data));
      setLoadingData(false);
      return null;
    } catch (error) {
      return <Redirect to="/login" />;
    }
  }, []);

  if (loadingData) {
    return <Spinner />;
  }
  return (
    <>
      {modal.isOpen ? <Modal /> : null}
      <div className="container flex-grow-1 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white">
          <Channels />
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Home;
