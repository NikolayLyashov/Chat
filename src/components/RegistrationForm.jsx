/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import userAuthorization from '../api';
import AuthorizationContext from '../../assets/context';

const RegistrationForm = () => {
  const { authorization, setAuthorization } = useContext(AuthorizationContext);
  const formClass = cn('form-control', { 'is-invalid': authorization === 'failure' });

  const formik = useFormik({
    initialValues: { username: '', password: '' },

    validationSchema: Yup.object({
      username: Yup.string()
        .required(),
      password: Yup.string()
        .required(),
    }),

    onSubmit: ({ username, password }) => {
      userAuthorization(username, password)
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          setAuthorization('success');
        }).catch(() => setAuthorization('failure'));
    },
  });

  return (
    <>
      {authorization === 'success' ? <Redirect to="/" /> : null}
      <form onSubmit={formik.handleSubmit} className="w-50">
        <h1 className="text-center mb-4">Войти</h1>

        <div className="form-floating mb-3 form-group">
          <input
            name="username"
            type="username"
            placeholder="Ваш ник"
            id="username"
            className={formClass}
            required
            autoComplete="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <label htmlFor="username">Ваш ник</label>
        </div>

        <div className="form-floating mb-4 form-group">
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            id="password"
            className={formClass}
            required
            autoComplete="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label htmlFor="password">Пароль</label>
          <div className="invalid-tooltip">
            Неверное имя пользвателя или пароль
          </div>
        </div>

        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
      </form>
    </>
  );
};

export default RegistrationForm;
