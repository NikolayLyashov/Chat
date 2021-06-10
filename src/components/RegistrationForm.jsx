/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => (

  <Formik
    initialValues={{ username: '', password: '' }}
    validationSchema={Yup.object({
      username: Yup.string()
        .required(),
      password: Yup.string()

        .required('asd'),
    })}
    onSubmit={(values) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
      }, 400);
    }}
  >
    <Form className="w-50">
      <h1 className="text-center mb-4">Войти</h1>

      <div className="form-floating mb-3 form-group">
        <Field name="username" type="text" placeholder="Ваш ник" id="username" className="form-control" />
        <label htmlFor="username">Ваш ник</label>
      </div>

      <div className="form-floating mb-3 form-group">
        <Field name="password" type="password" placeholder="Ваш ник" id="password" className="form-control" />
        <label htmlFor="password">Пароль</label>
        <ErrorMessage name="password" />
      </div>

      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </Form>
  </Formik>

);

export default RegistrationForm;
