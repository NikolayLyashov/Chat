/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import AuthorizationContext from '../context/AuthorizationContext';
import useAuthorizationData from '../useAuthorizationData';

const Authorization = () => {
  const { t } = useTranslation();

  const { setAuth } = useAuthorizationData();

  const { authorization, setAuthorization } = useContext(AuthorizationContext);

  const formClass = cn('form-control', { 'is-invalid': authorization === 'failure' });
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: { username: '', password: '' },

    validationSchema: Yup.object({
      username: Yup.string()
        .required(),
      password: Yup.string()
        .required(),
    }),

    onSubmit: ({ username, password }) => {
      axios.post('/api/v1/login', { username, password })
        .then(({ data }) => {
          setAuth(data);

          setAuthorization('success');
        }).catch(() => {
          setAuthorization('failure');
        });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      {authorization === 'success' ? <Redirect to="/" /> : null}
      <form onSubmit={formik.handleSubmit} className="w-50">
        <h1 className="text-center mb-4">{t('loginForm.title')}</h1>

        <div className="form-floating mb-3 form-group">
          <input
            ref={inputRef}
            name="username"
            type="username"
            placeholder={t('loginForm.name')}
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
            placeholder={t('loginForm.password')}
            id="password"
            className={formClass}
            required
            autoComplete="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label htmlFor="password">Пароль</label>
          <div className="invalid-tooltip">
            {t('loginForm.error')}
          </div>
        </div>

        <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('loginForm.button')}</button>
      </form>
    </>
  );
};

export default Authorization;
