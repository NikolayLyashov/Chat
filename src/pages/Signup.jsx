/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
// import signupImg from '../../assets/images/signup.jpeg';
import { Navigation } from '../components/Navigation';

export const Signup = () => {
  const a = 1;
  return (
    <div className="d-flex flex-column h-100">
      <Navigation />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  {/* <img src={signupImg} alt="signup" /> */}
                </div>
                <form className="w-50">
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <div className="form-floating mb-3 form-group">
                    <input placeholder="От 3 до 20 символов" name="username" required="" id="username" className="form-control is-invalid" value="" />
                    <label className="form-label" htmlFor="username">Имя пользователя</label>
                    <div placement="right" className="invalid-tooltip">Обязательное поле</div>
                  </div>
                  <div className="form-floating mb-3 form-group">
                    <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required="" type="password" id="password" className="form-control" value="" />
                    <div className="invalid-tooltip">Обязательное поле</div>
                    <label className="form-label" htmlFor="password">Пароль</label>
                  </div>
                  <div className="form-floating mb-4 form-group">
                    <input placeholder="Пароли должны совпадать" name="confirmPassword" required="" type="password" id="confirmPassword" className="form-control" value="" />
                    <div className="invalid-tooltip">err</div>
                    <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                  </div>
                  <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
