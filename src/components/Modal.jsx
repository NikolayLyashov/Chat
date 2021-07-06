/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector } from 'react-redux';
import { RemoveModal } from './modal/RemoveModal';
import { AddChannelModal } from './modal/AddChannelModal';
import { RenameModal } from './modal/RenameModal';

export const Modal = () => {
  const modal = useSelector((state) => state.modalReducer);

  switch (modal.type) {
    case 'renameChannel':
      return <RenameModal />;

    case 'removeChannel':
      return <RemoveModal />;

    case 'addChannel':
      return <AddChannelModal />;

    default: {
      const err = new Error('There is no such type of modal window');
      throw err;
    }
  }
};

export default Modal;
