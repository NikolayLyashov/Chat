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
import ApiContext from '../../context/apiContext';
import { actions } from '../../store/slices';
import { ModalHeader } from '../ModalHeader';

export const RenameModal = () => {
  const socket = useContext(ApiContext);
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modalReducer);
  const { channels } = useSelector((state) => state.channelsReducer);
  const { name } = channels.find(({ id }) => id === modal.extra.channelId);
  const channelNames = channels.map((channel) => channel.name);

  const inputRef = useRef();

  const closeModal = () => {
    dispatch(actions.isModal({ isOpen: false }));
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    if (modal.type === 'renameChannel') {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const formik = useFormik({
    initialValues: { channelName: name },
    validationSchema: Yup.object({
      channelName: Yup.string().min(3, '3 to 20 characters').required().max(20, '3 to 20 characters')
        .notOneOf(channelNames, 'not a unique name'),
    }),

    onSubmit: (({ channelName }) => {
      socket.emit('renameChannel', { name: channelName, id: modal.extra.channelId }, () => {

      });
      closeModal();
    }),

    validateOnChange: false,
    validateOnBlur: false,
  });

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
            <ModalHeader title="Переименовать канал" />
            <div className="modal-body">
              <form className="" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.channelName}
                    name="channelName"
                    data-testid="add-channel"
                    className={cn('mb-2', 'form-control', { 'is-invalid': formik.errors.channelName })}
                    ref={inputRef}
                    onBlur={formik.handleBlur}
                  />
                  {(formik.errors.channelName === '3 to 20 characters') ? <div className="invalid-feedback"> От 3 до 20 символов </div> : null}
                  {(formik.errors.channelName === 'not a unique name') ? <div className="invalid-feedback"> Введите уникальное имя</div> : null}
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
                    <button type="submit" className="btn btn-primary">Отправить</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {modal.isOpen && <div className="fade modal-backdrop show" />}
    </>
  );
};

export default RenameModal;
