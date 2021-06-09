/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import '../../assets/application.scss';

const Form = () => (
  <form className="w-50">
    <h1 className="text-center mb-4">Войти</h1>
    <div className="form-floating mb-3 form-group">
      <input name="username" autoComplete="username" required="" placeholder="Ваш ник" id="username" className="form-control" value="" />
      <label htmlFor="username">Ваш ник</label>
    </div>
    <div className="form-floating mb-4 form-group">
      <input name="password" autoComplete="current-password" required="" placeholder="Пароль" type="password" id="password" className="form-control" value="" />
      <label className="form-label" htmlFor="password">Пароль</label>
    </div>
    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
  </form>
);

export default Form;
