import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

export const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannel = useSelector((state) => state.currentChannel);

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name }) => (
        <li key={id} className="nav-item">
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
