/* eslint-disable no-mixed-operators */
import React,
{
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import axios from 'axios';
import * as Yup from 'yup';
import AuthorizationContext from '../context/AuthorizationContext';
import routes from '../routes.js';
import useAuthorizationData from '../useAuthorizationData';

export const Registration = () => {
  const { t } = useTranslation();

  const { setAuth } = useAuthorizationData();

  const inputRef = useRef();
  const history = useHistory();

  const [userExists, setUserExists] = useState(false);
  const { setAuthorization } = useContext(AuthorizationContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().min(3, t('yup.characters'))
        .max(20, t('yup.characters')).required(t('yup.required')),
      password: Yup.string().min(6, t('yup.passwordMin'))
        .max(20, t('yup.characters')).required(t('yup.required')),
      confirmPassword: Yup.string().required(t('yup.required')).oneOf([Yup.ref('password')], t('yup.passwordConfirm')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.requiredSignup, { username, password });
        setAuth(data);

        setAuthorization('success');
        history.push('/');
      } catch (e) {
        setUserExists(true);
      }
    },
  });

  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signUpForm.title')}</h1>
      <div className="form-floating mb-3 form-group">
        <input
          placeholder={t('signUpForm.name')}
          ref={inputRef}
          name="username"
          required=""
          id="username"
          className={cn('form-control', { 'is-invalid': userExists || formik.errors.username && formik.touched.username })}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="form-label" htmlFor="username">{t('signUpForm.name')}</label>
        {formik.errors.username && formik.touched.username && <div placement="right" className="invalid-tooltip">{formik.errors.username}</div>}
      </div>
      <div className="form-floating mb-3 form-group">
        <input
          placeholder={t('signUpForm.password')}
          name="password"
          aria-describedby="passwordHelpBlock"
          required=""
          type="password"
          id="password"
          className={cn('form-control', { 'is-invalid': userExists || formik.errors.password && formik.touched.password })}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="form-label" htmlFor="password">{t('signUpForm.password')}</label>
        {formik.errors.password && formik.touched.password && <div placement="right" className="invalid-tooltip">{formik.errors.password}</div>}
      </div>
      <div className="form-floating mb-4 form-group">
        <input
          placeholder={t('signUpForm.confirmPassword')}
          name="confirmPassword"
          required=""
          type="password"
          id="confirmPassword"
          className={cn('form-control', { 'is-invalid': userExists || formik.errors.confirmPassword && formik.touched.confirmPassword })}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="form-label" htmlFor="confirmPassword">{t('signUpForm.passwordConfirm')}</label>
        {formik.errors.confirmPassword
        && formik.touched.confirmPassword
        && <div placement="right" className="invalid-tooltip">{formik.errors.confirmPassword}</div>}
        {userExists && <div placement="right" className="invalid-tooltip">{t('signUpForm.error.userExists')}</div>}
      </div>
      <button type="submit" className="w-100 btn btn-outline-primary">{t('signUpForm.button')}</button>
    </form>
  );
};

export default Registration;
