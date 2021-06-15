/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentChannel } from '../store/currentChannel';

export const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannel = useSelector((state) => state.currentChannel);
  const dispatch = useDispatch();

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name }) => (
        <li key={id} className="nav-item" onClick={() => dispatch(changeCurrentChannel(id))}>
          <button type="button" className={`w-100 px-4 rounded-0 text-start btn ${cn({ 'btn-secondary': id === currentChannel })}`}>
            <span className="me-3">#</span>
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Channels;
