import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { actions } from '../store/slices';

export const ModalHeader = ({ title }) => {
  const dispatch = useDispatch();
  return (
    <div className="modal-header">
      <div className="modal-title h4">{title}</div>
      <button aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" onClick={() => dispatch(actions.isModal({ isOpen: false }))} />
    </div>
  );
};

ModalHeader.propTypes = {
  title: PropTypes.string,
};

ModalHeader.defaultProps = {
  title: '',
};

export default ModalHeader;
