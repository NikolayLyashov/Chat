/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import signupImg from '../../assets/images/signup.jpg';
import AuthorizationContext from '../context/AuthorizationContext';

export const Signup = () => {
  const { t } = useTranslation();

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
        const { data } = await axios.post('/api/v1/signup', { username, password });

        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);

        setAuthorization('success');
        history.push('/');
      } catch (e) {
        setUserExists(true);
        console.log(e.message);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupImg} alt="signup" className="rounded-circle" />
              </div>
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
                  {formik.errors.confirmPassword && formik.touched.confirmPassword && <div placement="right" className="invalid-tooltip">{formik.errors.confirmPassword}</div>}
                  {userExists && <div placement="right" className="invalid-tooltip">{t('signUpForm.error.userExists')}</div>}
                </div>
                <button type="submit" className="w-100 btn btn-outline-primary">{t('signUpForm.button')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
