import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Authorization from '../components/Authorization';
import signupImg from '../../assets/images/signup.jpg';
import routes from '../routes.js';

export const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupImg} alt="signup" className="rounded-circle" />
              </div>
              <Authorization />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginForm.description')}</span>
                <Link to={routes.signup}>{t('loginForm.registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
