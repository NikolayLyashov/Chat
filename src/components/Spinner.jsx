import React from 'react';

export const Spinner = () => (
  <div className="d-flex justify-content-center align-items-center h-100 text-primary">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
