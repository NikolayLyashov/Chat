// import React from 'react';
// import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
// import { actions } from '../store/slices';

// export const ModalButtons = ({ type }) => {
//   const dispatch = useDispatch();

//   const closeModal = () => {
//     dispatch(actions.isModal({ isOpen: false }));
//   };

//   if (type === 'removeChannel') {
//     return (
//       <div className="d-flex justify-content-end">
//         <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
//         <button type="button" className="btn btn-danger">Удалить</button>
//       </div>
//     );
//   }

//   if (type === 'addChannel') {
//     return (
//       <div className="d-flex justify-content-end">
//         <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
//         <button type="submit" className="btn btn-primary">Добавить</button>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex justify-content-end">
//       <button type="button" className="me-2 btn btn-secondary" onClick={closeModal}>Отменить</button>
//       <button type="submit" className="btn btn-primary">Отправить</button>
//     </div>
//   );
// };

// ModalButtons.propTypes = {
//   type: PropTypes.string,
// };

// ModalButtons.defaultProps = {
//   type: '',
// };

// export default ModalButtons;
