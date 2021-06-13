/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import AuthorizationContext from '../context';

const RegistrationForm = () => {
  const { authorization, setAuthorization } = useContext(AuthorizationContext);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required(),
        password: Yup.string()
          .required(),
      })}
      onSubmit={({ username, password }) => {
        axios.post('/api/v1/login', {
          username,
          password,
        }).then(({ data }) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          setAuthorization(true);
        }).catch(() => setAuthorization(false));
      }}
    >
      <>
        {authorization ? <Redirect to="/" /> : null}
        <Form className="w-50">
          <h1 className="text-center mb-4">Войти</h1>

          <div className="form-floating mb-3 form-group">
            <Field name="username" type="text" placeholder="Ваш ник" id="username" className="form-control " required autoComplete="username" />
            <label htmlFor="username">Ваш ник</label>
          </div>

          <div className="form-floating mb-4 form-group">
            <Field name="password" type="password" placeholder="Ваш ник" id="password" className="form-control " required autoComplete="password" />
            <label htmlFor="password">Пароль</label>
            <div className="invalid-tooltip">
              <h1>h</h1>
            </div>
          </div>

          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
        </Form>
      </>
    </Formik>
  );
};

export default RegistrationForm;
