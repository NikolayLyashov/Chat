/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import ApiContext from '../context/apiContext';
import { actions } from '../store/slices';

export const Modal = () => {
  const socket = useContext(ApiContext);

  const modal = useSelector((state) => state.modalReducer);
  const { channels } = useSelector((state) => state.channelsReducer);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const closeModal = () => {
    dispatch(actions.isModal({ isOpen: false }));
  };

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: Yup.object({
      channelName: Yup.string().min(3).required().max(20),
    }),

    onSubmit: (({ channelName }) => {
      if (modal.type === 'renameChannel') {
        socket.emit('renameChannel', { name: channelName, id: modal.extra.channelId }, () => {

        });
        closeModal();
        return;
      }

      socket.emit('newChannel', { name: channelName }, () => {

      });

      closeModal();
    }),

    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (modal.type !== 'removeChannel') {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    if (modal.type === 'renameChannel') {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const removeChannel = () => {
    if (modal.type === 'removeChannel') {
      socket.emit('removeChannel', { id: modal.extra.channelId }, () => {

      });
      const adminId = channels.find(({ name }) => name === 'general').id;
      dispatch(actions.changeCurrentChannelID(adminId));
    }

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
            <div className="modal-header">
              <div className="modal-title h4">{(modal.type === 'renameChannel') ? 'Переименовать канал' : 'Добавить канал' }</div>
              <button aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" onClick={closeModal} />
            </div>
            <div className="modal-body">
              {(modal.type === 'removeChannel')
                ? (
                  <>
                    <p className="lead">Уверены?</p>
                    <div className="d-flex justify-content-end">
                      <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
                      <button type="button" className="btn btn-danger" onClick={removeChannel}>Удалить</button>
                    </div>
                  </>
                ) : (
                  <form className="" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.channelName}
                        name="channelName"
                        data-testid="add-channel"
                        className={cn('mb-2', 'form-control', { 'is-invalid': formik.submitCount && formik.errors.channelName })}
                        ref={inputRef}
                        onBlur={formik.handleBlur}
                      />
                      {(formik.submitCount && formik.errors.channelName) ? <div className="invalid-feedback"> От 3 до 20 символов </div> : null}
                      <div className="d-flex justify-content-end">
                        <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
                        <button type="submit" className="btn btn-primary">Отправить</button>
                      </div>
                    </div>
                  </form>
                )}
            </div>
          </div>
        </div>
      </div>
      {modal.isOpen && <div className="fade modal-backdrop show" />}
    </>
  );
};

export default Modal;
