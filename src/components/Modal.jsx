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
import ApiContext from '../apiContext';
import { actions } from '../store/slices';

export const Modal = () => {
  const socket = useContext(ApiContext);

  const modal = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const closeModal = () => {
    dispatch(actions.isModal({ isOpen: false }));
  };

  const formik = useFormik({
    initialValues: { newChannel: '' },
    validationSchema: Yup.object({
      newChannel: Yup.string().min(3).required().max(20),
    }),
    onSubmit: (({ newChannel }) => {
      socket.emit('newChannel', { name: newChannel }, () => {
        console.log('test');
      });
      dispatch(actions.isModal({ isOpen: false }));
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
              <div className="modal-title h4">Добавить канал</div>
              <button aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" onClick={closeModal} />
            </div>
            <div className="modal-body">
              <form className="" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.newChannel}
                    name="newChannel"
                    data-testid="add-channel"
                    className={cn('mb-2', 'form-control', { 'is-invalid': formik.submitCount && formik.errors.newChannel })}
                    ref={inputRef}
                    onBlur={formik.handleBlur}
                  />
                  {(formik.submitCount && formik.errors.newChannel) ? <div className="invalid-feedback"> От 3 до 20 символов </div> : null}
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
                    <button type="submit" className="btn btn-primary">Добавить</button>
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

export default Modal;
