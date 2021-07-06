/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ApiContext from '../../context/apiContext';
import { actions } from '../../store/slices';
import { ModalHeader } from '../ModalHeader';

export const RemoveModal = () => {
  const socket = useContext(ApiContext);

  const modal = useSelector((state) => state.modalReducer);
  const { channels } = useSelector((state) => state.channelsReducer);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(actions.isModal({ isOpen: false }));
  };

  const removeChannel = () => {
    socket.emit('removeChannel', { id: modal.extra.channelId }, () => {

    });
    const adminId = channels.find(({ name }) => name === 'general').id;
    dispatch(actions.changeCurrentChannelID(adminId));

    closeModal();
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: 'block' }}
        onClick={(e) => (e.currentTarget === e.target) && closeModal()}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <ModalHeader title="Удалить канал" />
            <div className="modal-body">
              <>
                <p className="lead">Уверены?</p>
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
                  <button type="button" className="btn btn-danger" onClick={removeChannel}>Удалить</button>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      {modal.isOpen && <div className="fade modal-backdrop show" />}
    </>
  );
};

export default RemoveModal;
