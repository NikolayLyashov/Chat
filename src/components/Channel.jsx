/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/slices';

export const Channel = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name, removable } = props;
  const { currentChannelId } = useSelector((state) => state.channelsReducer);

  const setCurrentId = () => {
    dispatch(actions.changeCurrentChannelID(id));
  };

  const buttonCurrentClass = cn({
    'btn-secondary': id === currentChannelId,
  });

  if (!removable) {
    return (
      <li className="nav-item" role="presentation">
        <button type="button" className={cn(`w-100 px-4 rounded-0 text-start btn ${buttonCurrentClass}`)} onClick={setCurrentId}>
          <span className="me-3">#</span>
          {name}
        </button>
      </li>
    );
  }

  return (
    <div role="presentation" className="d-flex dropdown btn-group">
      <button type="button" className={cn(`w-100 rounded-0 text-start text-truncate btn px-4  ${buttonCurrentClass}`)} onClick={setCurrentId}>
        <span className="me-3">#</span>
        {name}
      </button>
      <button
        aria-haspopup="true"
        aria-label="drop-down"
        aria-expanded="false"
        type="button"
        className={cn(`flex-grow-0 dropdown-toggle dropdown-toggle-split btn  ${buttonCurrentClass}`)}
        data-bs-toggle="dropdown"
      />
      <div x-placement="bottom-start" aria-labelledby="" className="dropdown-menu">
        <a
          href="#"
          className="dropdown-item"
          role="button"
          onClick={() => dispatch(actions.isModal({ isOpen: true, type: 'removeChannel', extra: { channelId: id } }))}
        >
          {t('channel.delete')}
        </a>
        <a
          href="#"
          className="dropdown-item"
          role="button"
          onClick={() => dispatch(actions.isModal({ isOpen: true, type: 'renameChannel', extra: { channelId: id } }))}
        >
          {t('channel.rename')}
        </a>
      </div>
    </div>
  );
};

Channel.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  removable: PropTypes.bool,
};

Channel.defaultProps = {
  name: '',
  id: 1,
  removable: false,
};

export default Channel;
